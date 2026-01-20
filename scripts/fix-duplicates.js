/**
 * Fix Duplicate Text in Recipes
 *
 * Removes duplicate sentences, repeated phrases, and other text issues
 */

require('dotenv').config();
const db = require('../config/database');

// Fix duplicate patterns in text
function fixDuplicates(text) {
    let fixed = text;

    // Fix triple word duplications (be very specific)
    fixed = fixed.replace(/pink pink pink/gi, 'pink');
    fixed = fixed.replace(/post oak wood wood/gi, 'post oak wood');
    fixed = fixed.replace(/Alabama Alabama/gi, 'Alabama');
    fixed = fixed.replace(/wood wood/gi, 'wood');

    // Fix duplicates caused by affiliate link insertion
    // Pattern: "pink pink <a...>pink butcher paper</a>" -> "<a...>pink butcher paper</a>"
    fixed = fixed.replace(/pink pink (<a[^>]+>pink butcher paper<\/a>)/gi, '$1');

    // Pattern: "<a...>post oak wood</a> wood" -> "<a...>post oak wood</a>"
    fixed = fixed.replace(/(<a[^>]+>post oak wood<\/a>) wood/gi, '$1');

    // Pattern: "Alabama <a...>Alabama white sauce</a>" -> "<a...>Alabama white sauce</a>"
    fixed = fixed.replace(/Alabama (<a[^>]+>Alabama[^<]+<\/a>)/gi, '$1');

    // Fix triple meat shredding claws
    fixed = fixed.replace(/using meat shredding claws using meat shredding claws using meat shredding claws/gi, 'using meat shredding claws');
    fixed = fixed.replace(/meat shredding claws using meat shredding claws using meat shredding claws/gi, 'meat shredding claws');

    // Generic duplicate sentence pattern - matches "X. X." where X is identical
    // Use a function to find and remove duplicate sentences
    fixed = removeDuplicateSentences(fixed);

    // Remove near-duplicates where one has affiliate link and one doesn't
    fixed = removeNearDuplicates(fixed);

    // Fix duplicate thermometer recommendations (3 in a row)
    fixed = fixed.replace(/Use a reliable instant-read thermometer for accurate readings\.\s*Use an instant-read thermometer for accuracy\.\s*Use an instant-read thermometer for accuracy\./gi,
        'Use an instant-read thermometer for accuracy.');

    // Fix duplicate thermometer recommendations (2 in a row)
    fixed = fixed.replace(/Use a reliable instant-read thermometer for accurate readings\.\s*Use an instant-read thermometer for accuracy\./gi,
        'Use an instant-read thermometer for accuracy.');

    fixed = fixed.replace(/Use an instant-read thermometer for accuracy\.\s*Use an instant-read thermometer for accuracy\./gi,
        'Use an instant-read thermometer for accuracy.');

    // Fix "Season with X for best results. We recommend X for best results." (redundant recommendation)
    fixed = fixed.replace(/Season with ([^.]+) for best results\.\s*We recommend [^.]+ for best results\./gi,
        'Season with $1 for best results.');

    // Fix "Season with X for best results. We recommend <a>X</a> for best results." (redundant with link)
    fixed = fixed.replace(/Season with [^<.]+ for best results\.\s*We recommend (<a[^>]+>[^<]+<\/a>) for best results\./gi,
        'We recommend $1 for best results.');

    // Fix double rub recommendations at sentence start
    fixed = fixed.replace(/(Season with [^.]+for best results\.)\s*We recommend [^.]+for best results\./gi, '$1');

    // Fix "Try X. Or use a pre-made rub like X." (redundant)
    fixed = fixed.replace(/Try ([^.]+) for extra flavor\.\s*Or use a pre-made rub like [^.]+\./gi,
        'Try $1 for extra flavor.');

    // Clean up double periods
    fixed = fixed.replace(/\.\.+/g, '.');

    // Clean up extra spaces
    fixed = fixed.replace(/\s+/g, ' ');
    fixed = fixed.trim();

    return fixed;
}

// Remove duplicate consecutive sentences
function removeDuplicateSentences(text) {
    // Split into sentences (keeping the period)
    const sentences = text.match(/[^.!?]+[.!?]+/g);
    if (!sentences) return text;

    const result = [];
    for (let i = 0; i < sentences.length; i++) {
        const current = sentences[i].trim();
        const prev = result.length > 0 ? result[result.length - 1].trim() : null;

        // Only add if not a duplicate of previous sentence
        if (!prev || current.toLowerCase() !== prev.toLowerCase()) {
            result.push(current);
        }
    }

    return result.join(' ');
}

// Remove near-duplicate sentences (one plain text, one with affiliate link)
function removeNearDuplicates(text) {
    let fixed = text;

    // Pattern: "Plain text recommendation. <a href>Same recommendation</a>."
    // Keep the one WITH the affiliate link

    // "Or use a pre-made rub like X. Or use a pre-made rub like <a...>X</a>."
    fixed = fixed.replace(/Or use a pre-made rub like ([^<.]+)\.\s*Or use a pre-made rub like (<a[^>]+>[^<]+<\/a>)\./gi,
        'Or use a pre-made rub like $2.');

    // "Try X for extra flavor. Try <a...>X</a> for extra flavor."
    fixed = fixed.replace(/Try ([^<.]+) for extra flavor\.\s*Try (<a[^>]+>[^<]+<\/a>) for extra flavor\./gi,
        'Try $2 for extra flavor.');

    // "We recommend X for best results. We recommend <a...>X</a> for best results."
    fixed = fixed.replace(/We recommend ([^<.]+) for best results\.\s*We recommend (<a[^>]+>[^<]+<\/a>) for best results\./gi,
        'We recommend $2 for best results.');

    // "Use an instant-read thermometer for accuracy. Use an <a...>instant-read thermometer</a> for accuracy."
    fixed = fixed.replace(/Use an instant-read thermometer for accuracy\.\s*Use an (<a[^>]+>instant-read thermometer<\/a>) for accuracy\./gi,
        'Use an $1 for accuracy.');

    // "Use a reliable instant-read thermometer for accurate readings. Use an <a...>instant-read thermometer</a> for accuracy."
    fixed = fixed.replace(/Use a reliable instant-read thermometer for accurate readings\.\s*Use an (<a[^>]+>instant-read thermometer<\/a>) for accuracy\./gi,
        'Use an $1 for accuracy.');

    // "using meat shredding claws. using <a...>meat shredding claws</a>."
    fixed = fixed.replace(/using meat shredding claws\.\s*using (<a[^>]+>meat shredding claws<\/a>)\./gi,
        'using $1.');

    // Capitalized version: "Using meat shredding claws. Using <a...>meat shredding claws</a>."
    fixed = fixed.replace(/Using meat shredding claws\.\s*Using (<a[^>]+>meat shredding claws<\/a>)\./gi,
        'Using $1.');

    return fixed;
}

async function fixAllRecipes() {
    console.log('Waiting for database initialization...');
    await db.initPromise;

    console.log('\nFetching all recipes...');

    const recipes = db.queryAll(`
        SELECT id, title, instructions
        FROM recipes
    `);

    console.log(`Found ${recipes.length} recipes to check.\n`);

    let fixedCount = 0;
    let totalIssues = 0;

    for (const recipe of recipes) {
        try {
            const instructions = JSON.parse(recipe.instructions || '[]');
            let recipeModified = false;
            let issuesInRecipe = 0;

            const fixedInstructions = instructions.map((instruction, index) => {
                const fixed = fixDuplicates(instruction);
                if (fixed !== instruction) {
                    recipeModified = true;
                    issuesInRecipe++;
                    console.log(`Fixed: ${recipe.title} - Step ${index + 1}`);
                }
                return fixed;
            });

            if (recipeModified) {
                const updatedJson = JSON.stringify(fixedInstructions);
                db.execute(
                    'UPDATE recipes SET instructions = ? WHERE id = ?',
                    [updatedJson, recipe.id]
                );
                fixedCount++;
                totalIssues += issuesInRecipe;
            }
        } catch (err) {
            console.error(`Error processing ${recipe.title}:`, err.message);
        }
    }

    console.log('\n========================================');
    console.log('Fix complete!');
    console.log(`Recipes fixed: ${fixedCount}`);
    console.log(`Total steps fixed: ${totalIssues}`);
    console.log('========================================\n');

    process.exit(0);
}

fixAllRecipes().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});

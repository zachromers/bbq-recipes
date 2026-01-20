/**
 * Fix Thermometer Links
 *
 * Removes thermometer recommendations from smoker/grill temperature steps
 * These should only appear on meat temperature checking steps
 */

require('dotenv').config();
const db = require('../config/database');

// Check if this is a smoker/grill temperature step (NOT meat temp)
function isSmokerTempStep(instruction) {
    const lower = instruction.toLowerCase();

    // Definite smoker/grill temp indicators
    const smokerIndicators = [
        'smoke at',
        'preheat',
        'smoker to',
        'grill to',
        'grill at',
        'increase to',
        'heat to',
        'cook at',
        'set to',
        'maintain'
    ];

    // Definite meat temp indicators (should NOT be flagged)
    const meatTempIndicators = [
        'internal temp',
        'internal temperature',
        'remove at',
        'done at',
        'done when',
        'reaches',
        'probe tender',
        'until internal'
    ];

    // Check if it's a smoker temp step
    const hasSmokerIndicator = smokerIndicators.some(ind => lower.includes(ind));

    // Check if it's specifically about meat temp
    const hasMeatIndicator = meatTempIndicators.some(ind => lower.includes(ind));

    // If it has both, prioritize meat temp (thermometer is appropriate)
    if (hasMeatIndicator) {
        return false;
    }

    return hasSmokerIndicator;
}

// Remove thermometer text from an instruction
function removeThermometerText(instruction) {
    let cleaned = instruction;

    // Remove various thermometer recommendation patterns (both linked and plain text)

    // Pattern: ". Use an <a...>instant-read thermometer</a> for accuracy."
    cleaned = cleaned.replace(/\.\s*Use an?\s*<a[^>]*>[^<]*thermometer[^<]*<\/a>\s*for\s*(accuracy|accurate readings)\.?/gi, '.');

    // Pattern: ". Use a reliable <a...>instant-read thermometer</a> for accurate readings."
    cleaned = cleaned.replace(/\.\s*Use a reliable\s*<a[^>]*>[^<]*thermometer[^<]*<\/a>\s*for\s*accurate readings\.?/gi, '.');

    // Pattern: Plain text ". Use a reliable instant-read thermometer for accurate readings."
    cleaned = cleaned.replace(/\.\s*Use a reliable instant-read thermometer for accurate readings\.?/gi, '.');

    // Pattern: Plain text ". Use an instant-read thermometer for accuracy."
    cleaned = cleaned.replace(/\.\s*Use an? instant-read thermometer for accuracy\.?/gi, '.');

    // Pattern: Any remaining thermometer recommendation
    cleaned = cleaned.replace(/\.\s*Use\s*(an?|a reliable)\s*[^.]*thermometer[^.]*\.?/gi, '.');

    // Clean up double periods
    cleaned = cleaned.replace(/\.\.+/g, '.');

    // Clean up trailing whitespace before period
    cleaned = cleaned.replace(/\s+\./g, '.');

    // Ensure it ends with a period
    cleaned = cleaned.trim();
    if (cleaned && !cleaned.endsWith('.')) {
        cleaned += '.';
    }

    return cleaned;
}

async function fixThermometerLinks() {
    console.log('Waiting for database initialization...');
    await db.initPromise;

    console.log('\nFetching all recipes...');

    const recipes = db.queryAll(`
        SELECT id, title, slug, instructions
        FROM recipes
    `);

    console.log(`Found ${recipes.length} recipes to check.\n`);

    let fixedCount = 0;
    let totalStepsFixed = 0;

    for (const recipe of recipes) {
        try {
            const instructions = JSON.parse(recipe.instructions || '[]');
            let recipeModified = false;
            let stepsFixedInRecipe = 0;

            const updatedInstructions = instructions.map((instruction, index) => {
                // Check if this step is a smoker/grill temp step AND mentions thermometer
                const lower = instruction.toLowerCase();
                if (isSmokerTempStep(instruction) && lower.includes('thermometer')) {
                    const cleaned = removeThermometerText(instruction);
                    if (cleaned !== instruction) {
                        recipeModified = true;
                        stepsFixedInRecipe++;
                        console.log(`Fixed: ${recipe.title} - Step ${index + 1}`);
                    }
                    return cleaned;
                }
                return instruction;
            });

            if (recipeModified) {
                const updatedJson = JSON.stringify(updatedInstructions);
                db.execute(
                    'UPDATE recipes SET instructions = ? WHERE id = ?',
                    [updatedJson, recipe.id]
                );
                fixedCount++;
                totalStepsFixed += stepsFixedInRecipe;
            }
        } catch (err) {
            console.error(`Error processing ${recipe.title}:`, err.message);
        }
    }

    console.log('\n========================================');
    console.log(`Fix complete!`);
    console.log(`Recipes fixed: ${fixedCount}`);
    console.log(`Total steps fixed: ${totalStepsFixed}`);
    console.log('========================================\n');

    process.exit(0);
}

fixThermometerLinks().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});

/**
 * Update All Recipes with Affiliate Links
 *
 * Goes through all recipes and adds relevant affiliate links
 * to instructions based on product keywords and context
 */

require('dotenv').config();
const db = require('../config/database');

// Product affiliate links with keywords to match
const productLinks = {
    // Tools
    'meat shredder': {
        text: 'meat shredding claws',
        url: 'https://amzn.to/45o2kZb'
    },
    'butcher paper': {
        text: 'pink butcher paper',
        url: 'https://amzn.to/45hT9JR'
    },
    'meat injector': {
        text: 'meat injector',
        url: 'https://amzn.to/45oUiPU'
    },
    'grill gloves': {
        text: 'heat-resistant gloves',
        url: 'https://amzn.to/4sOEBLN'
    },
    'rib rack': {
        text: 'rib rack',
        url: 'https://amzn.to/3ZkOZxc'
    },
    'grilling basket': {
        text: 'grilling basket',
        url: 'https://amzn.to/4qu7fAa'
    },

    // Thermometers - ONLY for checking meat temperature
    'thermapen': {
        text: 'instant-read thermometer',
        url: 'https://amzn.to/4pHJX8N'
    },

    // Woods
    'apple wood': {
        text: 'apple wood pellets',
        url: 'https://amzn.to/4qvCQS9'
    },
    'hickory': {
        text: 'hickory wood chunks',
        url: 'https://amzn.to/3LJxGTx'
    },
    'cherry wood': {
        text: 'cherry wood chunks',
        url: 'https://amzn.to/49Q8keF'
    },
    'oak wood': {
        text: 'post oak wood',
        url: 'https://amzn.to/45lpwrb'
    },
    'mesquite': {
        text: 'mesquite pellets',
        url: 'https://amzn.to/463uusF'
    },
    'alder wood': {
        text: 'alder wood',
        url: 'https://amzn.to/3ZnJRbI'
    },
    'pellets': {
        text: 'wood pellets',
        url: 'https://amzn.to/3ZnJRbI'
    },

    // Rubs by category
    'killer hogs rub': {
        text: 'Killer Hogs BBQ Rub',
        url: 'https://amzn.to/4jMW3Mx'
    },
    'beef rub': {
        text: 'Meat Church Holy Cow Rub',
        url: 'https://amzn.to/49JLdCr'
    },
    'pork rub': {
        text: 'Bad Byron\'s Butt Rub',
        url: 'https://amzn.to/4r7080M'
    },
    'poultry rub': {
        text: 'Plowboys Yardbird Rub',
        url: 'https://amzn.to/4jPzLtv'
    },
    'all purpose rub': {
        text: 'Killer Hogs BBQ Rub',
        url: 'https://amzn.to/4jMW3Mx'
    },
    'prime rib rub': {
        text: 'Traeger Prime Rib Rub',
        url: 'https://amzn.to/3LTp6BG'
    },
    'ribs rub': {
        text: 'Blues Hog Dry Rub',
        url: 'https://amzn.to/4baMOnm'
    },

    // Sauces
    'bbq sauce': {
        text: 'Sweet Baby Ray\'s BBQ Sauce',
        url: 'https://amzn.to/4sMZYNy'
    },
    'vinegar sauce': {
        text: 'Killer Hogs Vinegar Sauce',
        url: 'https://amzn.to/3NsjTRP'
    },
    'white sauce': {
        text: 'Big Bob Gibson White Sauce',
        url: 'https://amzn.to/4sQNxjJ'
    },
    'teriyaki': {
        text: 'Mr. Yoshida\'s Teriyaki',
        url: 'https://amzn.to/3NFZ6Kx'
    }
};

// Create affiliate link HTML
function createLink(text, url) {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="product-link">${text}</a>`;
}

// Check if instruction already has affiliate links
function hasAffiliateLink(instruction) {
    return instruction.includes('class="product-link"') || instruction.includes('amzn.to');
}

// Check if this is a smoker/grill temperature step (NOT meat temp)
function isSmokerTempStep(instruction) {
    const lower = instruction.toLowerCase();
    // These indicate smoker/grill temperature, not meat temperature
    return (lower.includes('smoke at') ||
            lower.includes('preheat') ||
            lower.includes('smoker to') ||
            lower.includes('grill to') ||
            lower.includes('increase to') ||
            lower.includes('heat to')) &&
           !lower.includes('internal');
}

// Check if this is a meat temperature step
function isMeatTempStep(instruction) {
    const lower = instruction.toLowerCase();
    return (lower.includes('internal temp') ||
            lower.includes('internal temperature') ||
            lower.includes('remove at') ||
            lower.includes('done at') ||
            lower.includes('reaches') ||
            lower.includes('probe tender')) &&
           (lower.includes('°f') || lower.includes('degrees'));
}

// Get the appropriate rub for a category
function getRubForCategory(category, recipeTitle) {
    const lowerTitle = recipeTitle.toLowerCase();

    // Check recipe title for specific meat types
    if (lowerTitle.includes('rib')) {
        return productLinks['ribs rub'];
    }
    if (lowerTitle.includes('prime rib')) {
        return productLinks['prime rib rub'];
    }
    if (lowerTitle.includes('brisket') || lowerTitle.includes('beef') ||
        lowerTitle.includes('tri-tip') || lowerTitle.includes('chuck')) {
        return productLinks['beef rub'];
    }
    if (lowerTitle.includes('chicken') || lowerTitle.includes('turkey') ||
        lowerTitle.includes('poultry') || lowerTitle.includes('wing')) {
        return productLinks['poultry rub'];
    }
    if (lowerTitle.includes('pork') || lowerTitle.includes('pulled') ||
        lowerTitle.includes('ham') || lowerTitle.includes('bacon')) {
        return productLinks['pork rub'];
    }
    if (lowerTitle.includes('lamb')) {
        return productLinks['all purpose rub'];
    }

    // Fall back to category
    switch (category) {
        case 'beef':
            return productLinks['beef rub'];
        case 'pork':
            return productLinks['pork rub'];
        case 'chicken':
            return productLinks['poultry rub'];
        case 'lamb':
            return productLinks['all purpose rub'];
        case 'seafood':
            return productLinks['all purpose rub'];
        default:
            return productLinks['killer hogs rub'];
    }
}

// Process recipe instructions
function processRecipeInstructions(instructions, category, recipeTitle) {
    let hasRubLink = false;
    let hasThermometerLink = false;

    // First pass - clean up and process each instruction
    let processed = instructions.map(instruction => {
        // Remove any existing affiliate links first (we'll re-add correctly)
        let clean = instruction.replace(/<a[^>]*class="product-link"[^>]*>([^<]*)<\/a>/g, '$1');

        // Check if this instruction mentions rub/seasoning
        const mentionsRub = /\b(rub|season|seasoning|spice)\b/i.test(clean);

        // Check if this is about meat temperature (not smoker temp)
        const mentionsMeatTemp = isMeatTempStep(clean);
        const mentionsSmokerTemp = isSmokerTempStep(clean);

        // Add rub link if mentions rub and we haven't added one yet
        if (mentionsRub && !hasRubLink) {
            const rub = getRubForCategory(category, recipeTitle);
            if (/apply rub|season with|coat with|apply.*rub|rub generously/i.test(clean)) {
                // Add recommendation after the instruction
                clean = clean.replace(/\.$/, '') + `. We recommend ${createLink(rub.text, rub.url)} for best results.`;
                hasRubLink = true;
            } else if (/mix.*rub|create.*rub|combine.*season/i.test(clean)) {
                clean = clean.replace(/\.$/, '') + `. Or use a pre-made rub like ${createLink(rub.text, rub.url)}.`;
                hasRubLink = true;
            }
        }

        // Add thermometer link ONLY for meat temperature checks, NOT smoker temp
        if (mentionsMeatTemp && !mentionsSmokerTemp && !hasThermometerLink) {
            clean = clean.replace(/\.$/, '') + `. Use an ${createLink('instant-read thermometer', productLinks['thermapen'].url)} for accuracy.`;
            hasThermometerLink = true;
        }

        // Add butcher paper link
        if (/wrap.*butcher paper|butcher paper/i.test(clean) && !hasAffiliateLink(clean)) {
            clean = clean.replace(/butcher paper/i, createLink('pink butcher paper', productLinks['butcher paper'].url));
        }

        // Add meat shredder link for pulling
        if (/pull pork|shred|pulling/i.test(clean) && !hasAffiliateLink(clean) && !/pull.*from bone/i.test(clean)) {
            clean = clean.replace(/\.$/, '') + ` using ${createLink('meat shredding claws', productLinks['meat shredder'].url)}.`;
        }

        // Add wood links
        if (/apple wood|apple chips/i.test(clean) && !hasAffiliateLink(clean)) {
            clean = clean.replace(/apple wood|apple chips/i, createLink('apple wood pellets', productLinks['apple wood'].url));
        }
        if (/hickory wood|hickory chips/i.test(clean) && !hasAffiliateLink(clean)) {
            clean = clean.replace(/hickory wood|hickory chips|hickory/i, createLink('hickory wood chunks', productLinks['hickory'].url));
        }
        if (/cherry wood|cherry chips/i.test(clean) && !hasAffiliateLink(clean)) {
            clean = clean.replace(/cherry wood|cherry chips/i, createLink('cherry wood chunks', productLinks['cherry wood'].url));
        }
        if (/post oak|oak wood/i.test(clean) && !hasAffiliateLink(clean)) {
            clean = clean.replace(/post oak|oak wood/i, createLink('post oak wood', productLinks['oak wood'].url));
        }
        if (/mesquite/i.test(clean) && !hasAffiliateLink(clean)) {
            clean = clean.replace(/mesquite/i, createLink('mesquite pellets', productLinks['mesquite'].url));
        }
        if (/alder wood|alder chips/i.test(clean) && !hasAffiliateLink(clean)) {
            clean = clean.replace(/alder wood|alder chips/i, createLink('alder wood', productLinks['alder wood'].url));
        }

        // Add BBQ sauce link
        if (/brush with.*sauce|glaze with.*sauce|serve with.*sauce|toss.*sauce/i.test(clean) && !hasAffiliateLink(clean)) {
            if (/bbq sauce|barbecue sauce/i.test(clean)) {
                clean = clean.replace(/bbq sauce|barbecue sauce/i, createLink('BBQ sauce', productLinks['bbq sauce'].url));
            }
        }

        // Add vinegar sauce link for Carolina style
        if (/vinegar sauce|carolina.*sauce/i.test(clean) && !hasAffiliateLink(clean)) {
            clean = clean.replace(/vinegar sauce/i, createLink('vinegar sauce', productLinks['vinegar sauce'].url));
        }

        // Add white sauce link
        if (/white sauce|alabama.*sauce/i.test(clean) && !hasAffiliateLink(clean)) {
            clean = clean.replace(/white sauce/i, createLink('Alabama white sauce', productLinks['white sauce'].url));
        }

        // Add teriyaki link
        if (/teriyaki/i.test(clean) && !hasAffiliateLink(clean)) {
            clean = clean.replace(/teriyaki sauce|teriyaki/i, createLink('teriyaki sauce', productLinks['teriyaki'].url));
        }

        return clean;
    });

    // Second pass - if no rub link was added, find a seasoning step and add one
    if (!hasRubLink) {
        const rub = getRubForCategory(category, recipeTitle);
        for (let i = 0; i < processed.length; i++) {
            const lower = processed[i].toLowerCase();
            if ((lower.includes('season') || lower.includes('salt') || lower.includes('pepper') ||
                 lower.includes('spice') || lower.includes('coat')) && !hasAffiliateLink(processed[i])) {
                processed[i] = processed[i].replace(/\.$/, '') + `. Try ${createLink(rub.text, rub.url)} for extra flavor.`;
                hasRubLink = true;
                break;
            }
        }
    }

    // If still no rub link, add to first prep step
    if (!hasRubLink && processed.length > 1) {
        const rub = getRubForCategory(category, recipeTitle);
        // Find first step that isn't about trimming or prep
        for (let i = 0; i < Math.min(3, processed.length); i++) {
            if (!hasAffiliateLink(processed[i])) {
                processed[i] = processed[i].replace(/\.$/, '') + `. Season with ${createLink(rub.text, rub.url)} for best results.`;
                break;
            }
        }
    }

    return processed;
}

// Main update function
async function updateAllRecipes() {
    console.log('Waiting for database initialization...');
    await db.initPromise;

    console.log('\nFetching all recipes...');

    const recipes = db.queryAll(`
        SELECT r.id, r.title, r.slug, r.instructions, c.slug as category_slug
        FROM recipes r
        LEFT JOIN categories c ON r.category_id = c.id
    `);

    console.log(`Found ${recipes.length} recipes to process.\n`);

    let updatedCount = 0;

    for (const recipe of recipes) {
        try {
            const instructions = JSON.parse(recipe.instructions || '[]');
            const updatedInstructions = processRecipeInstructions(instructions, recipe.category_slug, recipe.title);

            const updatedJson = JSON.stringify(updatedInstructions);

            db.execute(
                'UPDATE recipes SET instructions = ? WHERE id = ?',
                [updatedJson, recipe.id]
            );
            console.log(`Updated: ${recipe.title}`);
            updatedCount++;
        } catch (err) {
            console.error(`Error processing ${recipe.title}:`, err.message);
        }
    }

    console.log('\n========================================');
    console.log(`Update complete!`);
    console.log(`Recipes updated: ${updatedCount}`);
    console.log('========================================\n');

    process.exit(0);
}

updateAllRecipes().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});

/**
 * Add placeholder images to all recipes
 *
 * Uses Lorem Picsum for reliable placeholder images
 * Each category gets a consistent set of seed values for reproducible images
 */

require('dotenv').config();
const db = require('../config/database');

// Seed ranges for each category to get different but consistent images
// Lorem Picsum uses seed values to return consistent images
const categorySeeds = {
    pork: { start: 100, count: 20 },
    beef: { start: 200, count: 20 },
    lamb: { start: 300, count: 20 },
    chicken: { start: 400, count: 20 },
    seafood: { start: 500, count: 20 }
};

// Build Lorem Picsum URL with seed for consistent images
function getImageUrl(seed, width = 800, height = 600) {
    return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

async function addImages() {
    // Wait for database to be ready
    console.log('Waiting for database initialization...');
    await db.initPromise;
    console.log('Database ready.\n');

    // Get all recipes with their categories
    const recipes = db.queryAll(`
        SELECT r.id, r.title, r.slug, c.slug as category_slug
        FROM recipes r
        LEFT JOIN categories c ON r.category_id = c.id
        ORDER BY r.id
    `);

    console.log(`Found ${recipes.length} recipes to update.\n`);

    // Track which image index to use for each category
    const categoryIndex = {
        pork: 0,
        beef: 0,
        lamb: 0,
        chicken: 0,
        seafood: 0
    };

    let updated = 0;

    for (const recipe of recipes) {
        const category = recipe.category_slug || 'pork';
        const seeds = categorySeeds[category] || categorySeeds.pork;

        // Get a unique seed for this recipe within its category
        const seed = `${category}-${seeds.start + (categoryIndex[category] % seeds.count)}`;
        const imageUrl = getImageUrl(seed);

        // Update the recipe
        db.execute(`
            UPDATE recipes SET image_url = ? WHERE id = ?
        `, [imageUrl, recipe.id]);

        console.log(`✓ ${recipe.title} -> ${imageUrl}`);

        // Increment the index for this category
        categoryIndex[category]++;
        updated++;
    }

    console.log(`\n✅ Updated ${updated} recipes with images.`);

    // Show summary by category
    console.log('\nImages assigned per category:');
    for (const [cat, count] of Object.entries(categoryIndex)) {
        console.log(`  ${cat}: ${count} recipes`);
    }
}

addImages().catch(err => {
    console.error('Error adding images:', err);
    process.exit(1);
});

/**
 * Extract all recipes for proofreading
 */

require('dotenv').config();
const db = require('../config/database');

async function extractRecipes() {
    await db.initPromise;

    const recipes = db.queryAll(`
        SELECT r.id, r.title, r.description, r.instructions, c.name as category
        FROM recipes r
        JOIN categories c ON r.category_id = c.id
        ORDER BY c.name, r.title
    `);

    console.log(`Total recipes: ${recipes.length}\n`);

    recipes.forEach(r => {
        console.log('='.repeat(70));
        console.log(`ID: ${r.id} | Category: ${r.category}`);
        console.log(`Title: ${r.title}`);
        console.log(`Description: ${r.description}`);
        console.log('Instructions:');
        const instructions = JSON.parse(r.instructions);
        instructions.forEach((inst, i) => {
            // Remove HTML tags for readability
            const clean = inst.replace(/<[^>]*>/g, '');
            console.log(`  ${i+1}. ${clean}`);
        });
        console.log('');
    });

    process.exit(0);
}

extractRecipes().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});

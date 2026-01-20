/**
 * Update Recipe with Affiliate Links
 *
 * Updates the Classic Smoked Pulled Pork recipe instructions
 * to include relevant affiliate links to store products
 */

require('dotenv').config();
const db = require('../config/database');

async function updateRecipeLinks() {
    console.log('Waiting for database initialization...');
    await db.initPromise;

    console.log('Updating Classic Smoked Pulled Pork recipe...');

    // Updated instructions with affiliate links
    const updatedInstructions = [
        'Trim excess fat from pork shoulder, leaving 1/4 inch cap.',
        'Coat pork with yellow mustard as a binder.',
        'Mix all dry ingredients to create the rub. For competition-quality results, try <a href="https://amzn.to/4jMW3Mx" target="_blank" rel="noopener noreferrer" class="product-link">Killer Hogs BBQ Rub</a>.',
        'Apply rub generously, covering all surfaces.',
        'Let rest in refrigerator overnight.',
        'Preheat smoker to 225°F with apple wood. We recommend <a href="https://amzn.to/4qvCQS9" target="_blank" rel="noopener noreferrer" class="product-link">Bear Mountain Apple Pellets</a> for a sweet, mild smoke.',
        'Place pork fat-side up on smoker.',
        'Smoke until internal temp reaches 165°F (about 6 hours). Use a reliable thermometer like the <a href="https://amzn.to/4pHJX8N" target="_blank" rel="noopener noreferrer" class="product-link">ThermoWorks Thermapen ONE</a> for accurate readings.',
        'Wrap in <a href="https://amzn.to/45hT9JR" target="_blank" rel="noopener noreferrer" class="product-link">pink butcher paper</a> and continue cooking.',
        'Remove at 203°F internal temperature.',
        'Rest for 1 hour before pulling.',
        'Pull pork using <a href="https://amzn.to/45o2kZb" target="_blank" rel="noopener noreferrer" class="product-link">meat shredding claws</a> and mix with any collected juices. Serve with your favorite BBQ sauce like <a href="https://amzn.to/4sMZYNy" target="_blank" rel="noopener noreferrer" class="product-link">Sweet Baby Ray\'s</a>.'
    ];

    const instructionsJson = JSON.stringify(updatedInstructions);

    // Update the recipe
    const result = db.execute(
        'UPDATE recipes SET instructions = ? WHERE slug = ?',
        [instructionsJson, 'classic-smoked-pulled-pork']
    );

    console.log('Recipe updated successfully!');
    console.log('Instructions now include affiliate links for:');
    console.log('- Killer Hogs BBQ Rub');
    console.log('- Bear Mountain Apple Pellets');
    console.log('- ThermoWorks Thermapen ONE');
    console.log('- Bryco Goods Pink Butcher Paper');
    console.log('- Alpha Grillers Meat Shredder Claws');
    console.log('- Sweet Baby Ray\'s BBQ Sauce');

    process.exit(0);
}

updateRecipeLinks().catch(err => {
    console.error('Error updating recipe:', err);
    process.exit(1);
});

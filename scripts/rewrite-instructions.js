/**
 * Rewrite Recipe Instructions
 *
 * Rewrites recipe instructions from scratch with embedded store product links.
 * Run one recipe at a time for review.
 *
 * Usage: node scripts/rewrite-instructions.js <recipe-slug>
 */

require('dotenv').config();
const db = require('../config/database');

// Helper to create affiliate link HTML
function link(text, url) {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="product-link">${text}</a>`;
}

// Product URLs from the store
const products = {
    // Tools
    grillingToolSet:  'https://amzn.to/4sPyVkL',
    grillBrush:       'https://amzn.to/4pQPkCW',
    meatClaws:        'https://amzn.to/45o2kZb',
    meatInjector:     'https://amzn.to/45oUiPU',
    bastingBrush:     'https://amzn.to/3NqjiQF',
    grillPress:       'https://amzn.to/4jSxG0f',
    ribRack:          'https://amzn.to/3ZkOZxc',
    butcherPaper:     'https://amzn.to/45hT9JR',
    grillingBasket:   'https://amzn.to/4qu7fAa',
    grillGloves:      'https://amzn.to/4sOEBLN',

    // Rubs
    killerHogsRub:    'https://amzn.to/4jMW3Mx',
    meatChurchHolyCow:'https://amzn.to/49JLdCr',
    badByrons:        'https://amzn.to/4r7080M',
    traegerPrimeRib:  'https://amzn.to/3LTp6BG',
    hardcoreCarnivore:'https://amzn.to/4bs55g7',
    plowboysYardbird: 'https://amzn.to/4jPzLtv',
    dizzyPig:         'https://amzn.to/4jSoNDK',
    bluesHogRub:      'https://amzn.to/4baMOnm',

    // Sauces
    sweetBabyRays:    'https://amzn.to/4sMZYNy',
    stubbsOriginal:   'https://amzn.to/4qWE2Oe',
    bluesHogSauce:    'https://amzn.to/4qwiNmN',
    killerHogsVinegar:'https://amzn.to/3NsjTRP',
    bigBobGibsonWhite:'https://amzn.to/4sQNxjJ',
    bachansJapanese:  'https://amzn.to/4r6BzB5',
    kosmosQ:          'https://amzn.to/3Nvtjfh',
    rufusTeague:      'https://amzn.to/3LKJ811',
    mrYoshidas:       'https://amzn.to/3NFZ6Kx',

    // Wood
    traegerSignature: 'https://amzn.to/3ZnJRbI',
    pitBossComp:      'https://amzn.to/3LVwEnp',
    weberHickory:     'https://amzn.to/3LJxGTx',
    jealousDevil:     'https://amzn.to/4pQRiDk',
    bearMtnApple:     'https://amzn.to/4qvCQS9',
    westernPostOak:   'https://amzn.to/45lpwrb',
    lumberJackMesq:   'https://amzn.to/463uusF',
    weberCherry:      'https://amzn.to/49Q8keF',

    // Thermometers
    thermapen:        'https://amzn.to/4pHJX8N',
    meaterPlus:       'https://amzn.to/4r8Xd7L',
    thermoProTP20:    'https://amzn.to/45njh66',
    inkbirdWifi:      'https://amzn.to/4pKxBwV',
    thermoworksRFX:   'https://amzn.to/4sQlxNi',
    lavatoolsJavelin: 'https://amzn.to/4bFPl94',
    weberIGrill:      'https://amzn.to/49vg2Mp',
};

// ============================================================
// Rewritten instructions by recipe slug
// ============================================================
const rewrittenRecipes = {
    'classic-smoked-pulled-pork': [
        'Start by trimming your pork shoulder. Remove any loose flaps of meat and trim the fat cap down to about 1/4 inch thick so the rub can penetrate and the bark forms evenly.',
        'Slather the entire pork shoulder with a thin coat of yellow mustard. This acts as a binder for the rub and won\'t affect the final taste.',
        `Apply a generous coating of BBQ rub on all sides, pressing it into every crevice. For a competition-quality bark, we love ${link("Bad Byron's Butt Rub", products.badByrons)}.`,
        'Wrap the seasoned pork tightly in plastic wrap and refrigerate overnight, or at least 4 hours, so the rub can marry with the meat.',
        'Remove the pork from the fridge about 45 minutes before cooking to let it come to room temperature while you get your smoker going.',
        `Fire up your smoker and bring it to a steady 225\u00B0F. Load up with ${link('Bear Mountain Apple Pellets', products.bearMtnApple)} for a sweet, fruity smoke that pairs perfectly with pork.`,
        'Place the pork shoulder fat-side up on the smoker grate and close the lid. Resist the urge to peek \u2014 every time you open the lid you lose heat and smoke.',
        `After about 3 hours, begin spritzing the pork every 45 minutes with a 50/50 mix of apple cider vinegar and apple juice using a ${link('silicone basting brush', products.bastingBrush)} to keep the surface moist and build bark.`,
        `When the internal temperature hits 165\u00B0F the meat will hit \u201Cthe stall\u201D \u2014 this is normal. Verify with an ${link('instant-read thermometer', products.thermapen)} for an accurate reading, then wrap the pork tightly in ${link('pink butcher paper', products.butcherPaper)} to power through the stall while keeping the bark intact.`,
        'Return the wrapped pork to the smoker and continue cooking until the internal temperature reaches 203\u00B0F and a probe slides in with almost no resistance.',
        `Remove the pork from the smoker, keeping it wrapped, and let it rest in a cooler (no ice) for at least 1 hour \u2014 up to 4 hours is even better. Use ${link('heat-resistant gloves', products.grillGloves)} when handling the hot meat.`,
        `Unwrap and shred the pork using ${link('meat shredding claws', products.meatClaws)}. Pour any juices that collected in the butcher paper back over the meat. Serve on buns with ${link("Sweet Baby Ray's BBQ Sauce", products.sweetBabyRays)}.`,
    ],
};

// ============================================================

async function main() {
    await db.initPromise;

    const slug = process.argv[2];

    if (!slug) {
        console.log('Available recipes to rewrite:');
        Object.keys(rewrittenRecipes).forEach(s => console.log(`  - ${s}`));
        console.log('\nUsage: node scripts/rewrite-instructions.js <recipe-slug>');
        process.exit(0);
    }

    const newInstructions = rewrittenRecipes[slug];
    if (!newInstructions) {
        console.error(`No rewritten instructions found for slug: ${slug}`);
        console.log('Available:', Object.keys(rewrittenRecipes).join(', '));
        process.exit(1);
    }

    // Verify recipe exists
    const recipe = db.queryOne('SELECT id, title, instructions FROM recipes WHERE slug = ?', [slug]);
    if (!recipe) {
        console.error(`Recipe not found in database: ${slug}`);
        process.exit(1);
    }

    console.log(`\nRecipe: ${recipe.title}`);
    console.log(`Slug:   ${slug}`);
    console.log(`Steps:  ${newInstructions.length}`);
    console.log('\nNew instructions:');
    newInstructions.forEach((step, i) => {
        // Strip HTML for display
        const plain = step.replace(/<[^>]+>/g, '');
        console.log(`  ${i + 1}. ${plain}`);
    });

    // Update
    const json = JSON.stringify(newInstructions);
    db.execute('UPDATE recipes SET instructions = ? WHERE slug = ?', [json, slug]);

    console.log('\nDone! Instructions updated in the database.');
    process.exit(0);
}

main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});

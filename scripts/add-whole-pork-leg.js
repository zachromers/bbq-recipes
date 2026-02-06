/**
 * Add Smoked Whole Pork Leg (Fresh Ham) Recipe
 *
 * Inserts a single new pork recipe with full instructions (affiliate links),
 * extended description (with AdSense placeholders), and a picsum image.
 *
 * Usage: node scripts/add-whole-pork-leg.js
 */

require('dotenv').config();
const db = require('../config/database');

// Helper to create affiliate link HTML
function link(text, url) {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="product-link">${text}</a>`;
}

// Product URLs
const P = {
    badByrons:     'https://amzn.to/4r7080M',
    apple:         'https://amzn.to/4qvCQS9',
    thermapen:     'https://amzn.to/4pHJX8N',
    butcherPaper:  'https://amzn.to/45hT9JR',
    gloves:        'https://amzn.to/4sOEBLN',
    bastingBrush:  'https://amzn.to/3NqjiQF',
    injector:      'https://amzn.to/45oUiPU',
    sweetBabyRays: 'https://amzn.to/4sMZYNy',
};

const adPlaceholder = `
<div class="recipe-story-ad">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-format="fluid"
         data-ad-layout-key="-fb+5w+4e-db+86"
         data-ad-client="ca-pub-2820189081885169"
         data-ad-slot="7825096579"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</div>`;

// Generate slug from title
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 100);
}

const recipe = {
    title: 'Smoked Whole Pork Leg (Fresh Ham)',
    description: 'A show-stopping whole pork leg smoked low and slow until the skin crackles and the meat is fall-apart tender — perfect for feeding a crowd.',
    extended_description: `
<p>There are certain cooks that make you feel like a true pitmaster, and smoking a whole pork leg is right at the top of that list. The first time I put one on my smoker, I was honestly a little intimidated by the sheer size of the thing. But once that smoke started rolling and the kitchen filled with the most incredible aroma, I knew I was in for something special. Ten hours later, I pulled off a mahogany-skinned beauty with meat so tender it practically fell off the bone. I've been hooked ever since.</p>

<p>A whole fresh ham — which is just an uncured, unsmoked pork leg — is one of the most impressive cuts you can serve. It feeds twenty people easily, making it the perfect centerpiece for holiday gatherings, graduation parties, family reunions, or any event where you want jaws to drop when you carry it to the table. The mix of lean meat and rich collagen means every slice has incredible depth of flavor and a silky, melt-in-your-mouth texture.</p>

${adPlaceholder}

<p>I love serving this with classic sides that can hold their own next to such a bold main course. A tangy vinegar-based coleslaw cuts through the richness beautifully. Baked beans cooked low and slow with a little brown sugar and bacon are a must. Cornbread, mac and cheese, and some quick-pickled onions round out the spread. For a Southern-style feast, add collard greens and sweet potato casserole to the table. And don't forget plenty of slider buns — leftover pulled pork leg makes some of the best sandwiches you'll ever eat.</p>

<p>There's a lot of room for creative variation here too. Try a Caribbean-inspired version with a mojo marinade of sour orange juice, garlic, and cumin. A Chinese-style approach with five-spice, soy sauce, and a honey glaze produces stunning results. For something closer to home, a simple salt-and-pepper Texas-style cook lets the smoke and pork flavor do all the talking. You can also experiment with different injection liquids — apple juice with butter is a classic, but chicken broth with Cajun seasoning adds a nice kick.</p>

${adPlaceholder}

<p>The real secret to a perfect smoked pork leg is patience and temperature control. Keep your smoker steady, trust the process when the stall hits, and give the meat a generous rest before carving. That rest period lets the juices redistribute throughout the leg, so every slice is moist and packed with flavor. Once you master this cook, you'll have a recipe that people talk about for years to come.</p>
`,
    ingredients: [
        '1 whole bone-in pork leg (fresh ham), about 18-20 lb',
        '1/2 cup yellow mustard (as binder)',
        '1 cup BBQ pork rub',
        '1 cup apple juice',
        '1/2 cup apple cider vinegar',
        '1/2 cup unsalted butter, melted',
        '2 tbsp Worcestershire sauce',
        '1 tbsp garlic powder',
        '1 tbsp onion powder',
        '1 tbsp smoked paprika',
        '1 tsp cayenne pepper',
        '1/2 cup brown sugar',
        '1/2 cup honey',
        'Apple wood pellets'
    ],
    instructions: [
        'Start by scoring the skin and fat cap of the pork leg in a 1-inch diamond pattern, cutting about 1/4 inch deep. This allows the rub to penetrate and helps render the fat during the long cook.',
        `Prepare the injection liquid by combining apple juice, melted butter, and Worcestershire sauce in a bowl. Using a ${link('meat injector', P.injector)}, inject the liquid deep into the meat every 2 inches across the entire leg, focusing on the thickest sections. This guarantees moisture all the way through during the 10-hour smoke.`,
        `Slather the entire pork leg with yellow mustard as a binder. Apply a heavy, even coating of BBQ rub on every surface, pressing it into the scored cuts. ${link("Bad Byron's Butt Rub", P.badByrons)} is our top pick — the blend of sweet and heat is tailor-made for a big pork cook like this.`,
        'Wrap the seasoned leg tightly in plastic wrap and refrigerate overnight, or at least 6 hours. A cut this large needs time for the rub to penetrate beyond the surface.',
        'Pull the pork leg from the fridge about 1 hour before cooking to take the chill off while you get your smoker ready.',
        `Fire up your smoker and stabilize it at 250°F. Load the hopper or firebox with ${link('Bear Mountain Apple Pellets', P.apple)} — the mild, fruity smoke complements pork beautifully and won\'t overpower a cook this long.`,
        `Place the pork leg on the smoker with the fat cap facing up so the rendering fat bastes the meat as it cooks. Insert a leave-in probe thermometer into the thickest part of the leg, away from the bone, so you can monitor progress. Close the lid and let the smoke do its work.`,
        `After about 3 hours, begin basting the leg every hour with a mixture of apple cider vinegar and apple juice using a ${link('silicone basting brush', P.bastingBrush)}. This builds layers of flavor on the bark and keeps the surface from drying out.`,
        `When the internal temperature hits around 165°F, the meat will stall — this is completely normal for a cut this size and can last a couple of hours. Verify with an ${link('instant-read thermometer', P.thermapen)} for an accurate spot-check, then wrap the leg in two overlapping sheets of ${link('pink butcher paper', P.butcherPaper)} to push through the stall while keeping that hard-earned bark intact.`,
        'Return the wrapped leg to the smoker and continue cooking. During the last 2 hours, mix together the brown sugar, honey, and a splash of apple juice to make a sweet glaze.',
        `The pork leg is done when the internal temperature reaches 203°F and a probe slides into the meat with almost no resistance. For a cut this large, always verify in multiple spots with your ${link('instant-read thermometer', P.thermapen)} — you want 200-205°F throughout the thickest sections.`,
        `Carefully transfer the wrapped pork leg to a cooler (no ice) using ${link('heat-resistant gloves', P.gloves)} and let it rest for at least 1.5 hours — up to 3 hours is even better. Unwrap, brush with the sweet glaze, then carve thick slices across the grain. Serve with ${link("Sweet Baby Ray's BBQ Sauce", P.sweetBabyRays)} on the side and watch it disappear.`,
    ],
    prep_time: 45,
    cook_time: 600,
    servings: 20,
    category_id: 1,
    image_url: 'https://picsum.photos/seed/pork-300/800/600',
    featured: 0,
};

async function addWholePorkLeg() {
    console.log('Waiting for database initialization...');
    await db.initPromise;

    const slug = generateSlug(recipe.title);
    console.log(`\nRecipe slug: ${slug}`);

    // Check for duplicates
    const existing = db.queryAll('SELECT id FROM recipes WHERE slug = ?', [slug]);
    if (existing.length > 0) {
        console.log(`Recipe already exists (id=${existing[0].id}). Skipping insert.`);
        process.exit(0);
    }

    db.execute(`
        INSERT INTO recipes (
            title, slug, description, extended_description, ingredients, instructions,
            prep_time, cook_time, servings, category_id, image_url, featured
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        recipe.title,
        slug,
        recipe.description,
        recipe.extended_description,
        JSON.stringify(recipe.ingredients),
        JSON.stringify(recipe.instructions),
        recipe.prep_time,
        recipe.cook_time,
        recipe.servings,
        recipe.category_id,
        recipe.image_url,
        recipe.featured,
    ]);

    console.log(`\nInserted: ${recipe.title}`);

    // Show summary
    const summary = db.queryAll(`
        SELECT c.name, COUNT(r.id) as count
        FROM categories c
        LEFT JOIN recipes r ON c.id = r.category_id
        GROUP BY c.id
        ORDER BY c.name
    `);

    console.log('\nTotal recipes by category:');
    summary.forEach(row => {
        console.log(`  ${row.name}: ${row.count}`);
    });

    process.exit(0);
}

addWholePorkLeg().catch(err => {
    console.error('Error adding recipe:', err);
    process.exit(1);
});

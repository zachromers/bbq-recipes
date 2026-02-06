/**
 * Rewrite ALL Recipe Instructions
 *
 * Deletes existing instructions and replaces them with fresh, hand-written
 * steps that embed affiliate links to store products where they fit naturally.
 *
 * Usage: node scripts/rewrite-all-instructions.js
 */

require('dotenv').config();
const db = require('../config/database');

// Helper to create affiliate link HTML
function link(text, url) {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="product-link">${text}</a>`;
}

// Product URLs from the store
const P = {
    // Tools
    toolSet:       'https://amzn.to/4sPyVkL',
    grillBrush:    'https://amzn.to/4pQPkCW',
    meatClaws:     'https://amzn.to/45o2kZb',
    injector:      'https://amzn.to/45oUiPU',
    bastingBrush:  'https://amzn.to/3NqjiQF',
    grillPress:    'https://amzn.to/4jSxG0f',
    ribRack:       'https://amzn.to/3ZkOZxc',
    butcherPaper:  'https://amzn.to/45hT9JR',
    grillBasket:   'https://amzn.to/4qu7fAa',
    gloves:        'https://amzn.to/4sOEBLN',
    // Rubs
    killerHogs:    'https://amzn.to/4jMW3Mx',
    holyCow:       'https://amzn.to/49JLdCr',
    badByrons:     'https://amzn.to/4r7080M',
    traegerPR:     'https://amzn.to/3LTp6BG',
    hardcore:      'https://amzn.to/4bs55g7',
    yardbird:      'https://amzn.to/4jPzLtv',
    dizzyPig:      'https://amzn.to/4jSoNDK',
    bluesHogRub:   'https://amzn.to/4baMOnm',
    // Sauces
    sweetBabyRays: 'https://amzn.to/4sMZYNy',
    stubbs:        'https://amzn.to/4qWE2Oe',
    bluesHogSauce: 'https://amzn.to/4qwiNmN',
    vinegarSauce:  'https://amzn.to/3NsjTRP',
    whiteSauce:    'https://amzn.to/4sQNxjJ',
    bachans:       'https://amzn.to/4r6BzB5',
    kosmosQ:       'https://amzn.to/3Nvtjfh',
    rufusTeague:   'https://amzn.to/3LKJ811',
    yoshidas:      'https://amzn.to/3NFZ6Kx',
    // Wood
    traegerBlend:  'https://amzn.to/3ZnJRbI',
    pitBoss:       'https://amzn.to/3LVwEnp',
    hickory:       'https://amzn.to/3LJxGTx',
    lumpCharcoal:  'https://amzn.to/4pQRiDk',
    apple:         'https://amzn.to/4qvCQS9',
    postOak:       'https://amzn.to/45lpwrb',
    mesquite:      'https://amzn.to/463uusF',
    cherry:        'https://amzn.to/49Q8keF',
    // Thermometers
    thermapen:     'https://amzn.to/4pHJX8N',
    meater:        'https://amzn.to/4r8Xd7L',
    thermoPro:     'https://amzn.to/45njh66',
    javelin:       'https://amzn.to/4bFPl94',
};

// ============================================================
// ALL REWRITTEN INSTRUCTIONS
// ============================================================

const recipes = {

// ────────────────────────────────────────
// PORK
// ────────────────────────────────────────

'classic-smoked-pulled-pork': [
    'Start by trimming your pork shoulder. Remove any loose flaps of meat and trim the fat cap down to about 1/4 inch thick so the rub can penetrate and the bark forms evenly.',
    'Slather the entire pork shoulder with a thin coat of yellow mustard. This acts as a binder for the rub and won\'t affect the final taste.',
    `Apply a generous coating of BBQ rub on all sides, pressing it into every crevice. For a competition-quality bark, we love ${link("Bad Byron's Butt Rub", P.badByrons)}.`,
    'Wrap the seasoned pork tightly in plastic wrap and refrigerate overnight, or at least 4 hours, so the rub can marry with the meat.',
    'Remove the pork from the fridge about 45 minutes before cooking to let it come to room temperature while you get your smoker going.',
    `Fire up your smoker and bring it to a steady 225°F. Load up with ${link('Bear Mountain Apple Pellets', P.apple)} for a sweet, fruity smoke that pairs perfectly with pork.`,
    'Place the pork shoulder fat-side up on the smoker grate and close the lid. Resist the urge to peek — every time you open the lid you lose heat and smoke.',
    `After about 3 hours, begin spritzing the pork every 45 minutes with a 50/50 mix of apple cider vinegar and apple juice using a ${link('silicone basting brush', P.bastingBrush)} to keep the surface moist and build bark.`,
    `When the internal temperature hits 165°F the meat will hit "the stall" — this is normal. Verify with an ${link('instant-read thermometer', P.thermapen)} for an accurate reading, then wrap the pork tightly in ${link('pink butcher paper', P.butcherPaper)} to power through the stall while keeping the bark intact.`,
    'Return the wrapped pork to the smoker and continue cooking until the internal temperature reaches 203°F and a probe slides in with almost no resistance.',
    `Remove the pork from the smoker, keeping it wrapped, and let it rest in a cooler (no ice) for at least 1 hour — up to 4 hours is even better. Use ${link('heat-resistant gloves', P.gloves)} when handling the hot meat.`,
    `Unwrap and shred the pork using ${link('meat shredding claws', P.meatClaws)}. Pour any juices that collected in the butcher paper back over the meat. Serve on buns with ${link("Sweet Baby Ray's BBQ Sauce", P.sweetBabyRays)}.`,
],

'competition-style-baby-back-ribs': [
    'Flip each rack of ribs bone-side up and remove the membrane. Slide a butter knife under the membrane at one end, grip it with a paper towel, and peel it off in one piece.',
    `Set the ribs on a sheet pan and apply a light coat of yellow mustard on both sides as a binder. Season generously with ${link("Blues Hog Dry Rub", P.bluesHogRub)}, pressing the rub into the meat.`,
    'Let the seasoned ribs sit at room temperature for about 30 minutes so the rub starts to sweat and adhere to the surface.',
    `Get your smoker running at a steady 250°F. For ribs, ${link('cherry wood chunks', P.cherry)} deliver a beautiful mahogany color and mild fruity flavor.`,
    `Stand the racks upright in a ${link('stainless steel rib rack', P.ribRack)} to maximize smoker space, or lay them flat meat-side up.`,
    'Smoke the ribs undisturbed for about 3 hours. The bark should be set and the color should be a deep reddish-brown.',
    'Lay out two sheets of heavy-duty foil per rack. Place each rack meat-side down on the foil, add a splash of apple juice and a few pats of butter, then seal the foil tightly.',
    'Return the wrapped ribs to the smoker for about 1.5 hours. The steam inside the foil will tenderize the meat.',
    `Carefully unwrap the ribs — steam will escape, so use ${link('heat-resistant gloves', P.gloves)}. Brush a thin layer of ${link("Blues Hog BBQ Sauce", P.bluesHogSauce)} on the meat side.`,
    `Place the sauced ribs back on the smoker unwrapped for 15-20 minutes to let the sauce tack up. Check that the internal temperature between the bones reads 195-203°F with an ${link('instant-read thermometer', P.thermapen)}.`,
    'The ribs are done when the meat has pulled back from the bones about 1/4 inch and a toothpick slides into the meat like warm butter. Rest for 10 minutes, then slice between the bones and serve.',
],

'smoked-pork-belly-burnt-ends': [
    'Cut the pork belly into roughly 1.5-inch cubes, keeping them as uniform as possible so they cook evenly.',
    `Season the cubes on all sides with ${link("Killer Hogs BBQ Rub", P.killerHogs)}. The sweet and savory profile works perfectly with rich pork belly.`,
    `Set your smoker to 250°F and add ${link('hickory wood chunks', P.hickory)} for a bold, smoky backbone.`,
    'Arrange the cubes directly on the smoker grate with a little space between each one. Smoke for about 2.5 hours until the exterior is firm and deeply colored.',
    'Transfer the cubes to a disposable aluminum pan. Add several pats of butter, a generous drizzle of honey, and a handful of brown sugar. Toss to coat.',
    'Cover the pan tightly with foil and return it to the smoker for about 1 hour. The butter and sugar will create a sticky, caramelized glaze.',
    `Remove the foil and pour in your favorite BBQ sauce — ${link("Sweet Baby Ray's", P.sweetBabyRays)} is a great choice. Gently stir to coat all the cubes.`,
    `Cook uncovered for another 30 minutes until the sauce thickens and the internal temperature of the cubes reaches 200°F. Check a few cubes with an ${link('instant-read thermometer', P.thermapen)} — they should be probe-tender and jiggly. Serve immediately.`,
],

'honey-garlic-smoked-pork-chops': [
    'Start by brining the pork chops. Dissolve 1/4 cup salt and 2 tablespoons sugar in 4 cups of cold water, submerge the chops, and refrigerate for 2 hours. This ensures juicy results.',
    'Remove the chops from the brine, pat them completely dry with paper towels, and let them sit at room temperature for 20 minutes.',
    `Season both sides of each chop with smoked paprika, salt, and pepper. For extra depth, add a light dusting of ${link("Killer Hogs BBQ Rub", P.killerHogs)}.`,
    'In a small bowl, whisk together honey, minced garlic, soy sauce, and olive oil to make the glaze. Set aside.',
    `Set your smoker to 250°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a sweet, mild smoke that complements pork beautifully.`,
    `Place the chops on the smoker and cook for about 45 minutes. At the halfway point, start brushing the honey garlic glaze onto the chops every 15 minutes using a ${link('silicone basting brush', P.bastingBrush)}.`,
    `The chops are done when the internal temperature reaches 145°F. Verify with an ${link('instant-read thermometer', P.thermapen)} inserted into the thickest part, away from the bone.`,
    'Rest the chops for 5 minutes, give them one final brush of glaze, and serve.',
],

'smoked-pork-tenderloin': [
    'Trim any silver skin from the tenderloins by sliding a sharp knife just underneath it and pulling it away. Silver skin won\'t break down during cooking and turns chewy.',
    'Finely chop the fresh rosemary and thyme, mince the garlic, and mix them into the olive oil to create an herb paste.',
    `Rub the herb paste all over the tenderloins, then season with salt and pepper. For a bolder crust, add a coating of ${link("Bad Byron's Butt Rub", P.badByrons)}.`,
    `Get your smoker up to 275°F and add ${link('cherry wood chunks', P.cherry)} for a subtle, fruity smoke that won\'t overpower the lean meat.`,
    'Place the tenderloins on the smoker grate and cook for about 1 hour. Tenderloin is lean, so avoid overcooking.',
    `Remove the tenderloins when the internal temperature hits 145°F — use an ${link('instant-read thermometer', P.thermapen)} to check the thickest part.`,
    'Tent loosely with foil and rest for 10 minutes. Slice into 1/2-inch medallions and serve.',
],

'carolina-vinegar-pulled-pork': [
    'Season the pork shoulder all over with a simple mix of salt, black pepper, and a pinch of cayenne. Keep the seasoning straightforward — the vinegar sauce is the star here.',
    `Set your smoker to 225°F. Load in ${link('hickory wood chunks', P.hickory)} for a traditional, assertive smoke flavor that holds up to the tangy sauce.`,
    'Place the pork shoulder fat-side up on the grate and let it smoke low and slow. Plan on about 1 to 1.25 hours per pound.',
    `While the pork smokes, make the Carolina vinegar sauce: combine apple cider vinegar, brown sugar, red pepper flakes, black pepper, salt, and cayenne in a saucepan. Bring to a simmer, stir until the sugar dissolves, and set aside. Or use ${link("Killer Hogs Vinegar Sauce", P.vinegarSauce)} for an authentic, ready-made option.`,
    `After about 6-7 hours, check the internal temperature. When it hits 165°F, wrap the pork in ${link('pink butcher paper', P.butcherPaper)} to push through the stall.`,
    `Continue cooking until the internal temperature reaches 203°F and a probe slides in like butter. Confirm with an ${link('instant-read thermometer', P.thermapen)}.`,
    `Pull the pork off the smoker and rest it, still wrapped, for at least 1 hour. Use ${link('heat-resistant gloves', P.gloves)} to transfer it.`,
    `Shred the pork using ${link('meat shredding claws', P.meatClaws)} and toss it generously with the vinegar sauce. Pile it onto buns and top with creamy coleslaw.`,
],

'smoked-pork-shoulder-steaks': [
    `Season the pork shoulder steaks on both sides with a generous coating of ${link("Bad Byron's Butt Rub", P.badByrons)}.`,
    `Get your smoker running at 275°F with ${link('hickory wood chunks', P.hickory)} for a robust, classic pork smoke.`,
    'Place the steaks directly on the smoker grate with space between each one for airflow.',
    'Smoke for about 1.5 hours, spritzing with apple juice every 45 minutes to keep the surface moist.',
    `Check for doneness — the steaks are ready when the internal temperature reaches 180°F and the meat is tender. Use an ${link('instant-read thermometer', P.thermapen)} to verify.`,
    'Rest for 5 minutes before serving. These are great alongside baked beans and cornbread.',
],

'maple-bourbon-glazed-ham': [
    'Score the surface of the ham in a diamond pattern, cutting about 1/4 inch deep. Press a whole clove into each intersection of the diamond cuts.',
    'In a saucepan, whisk together the maple syrup, bourbon, Dijon mustard, and brown sugar. Warm over low heat until the sugar dissolves, then remove from heat.',
    `Set your smoker to 275°F and add ${link('cherry wood chunks', P.cherry)} for a mild, slightly sweet smoke that pairs beautifully with the maple glaze.`,
    `Place the ham cut-side down on the smoker grate. Brush the first coat of glaze all over using a ${link('silicone basting brush', P.bastingBrush)}.`,
    'Smoke the ham for about 3 hours, brushing on more glaze every 30 minutes to build up a sticky, lacquered crust.',
    `The ham is done when the internal temperature reaches 140°F at the thickest point. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    `Use ${link('heat-resistant gloves', P.gloves)} to carefully transfer the ham to a cutting board. Rest for 20 minutes before carving.`,
],

'smoked-pork-spare-ribs': [
    'Trim the ribs St. Louis style by removing the rib tips and any loose flaps of meat. Flip the rack over and peel off the membrane from the bone side.',
    `Brush a thin coat of yellow mustard on both sides as a binder, then season heavily with ${link("Blues Hog Dry Rub", P.bluesHogRub)}. The sweet and tangy notes are tailor-made for spare ribs.`,
    `Get your smoker dialed in at 250°F. Load with ${link('cherry wood chunks', P.cherry)} for a rich color and mild fruity smoke.`,
    `Place the ribs meat-side up on the grate. If you\'re cooking multiple racks, use a ${link('stainless steel rib rack', P.ribRack)} to stand them upright and save space.`,
    'Smoke for about 3 hours, spritzing with apple cider vinegar every 45 minutes after the first hour. The bark should be a deep mahogany.',
    'Lay each rack on a sheet of heavy-duty foil, add a splash of apple juice and some brown sugar, and wrap tightly. Return to the smoker for about 2 hours.',
    `Unwrap the ribs carefully — use ${link('heat-resistant gloves', P.gloves)} as the steam is very hot. Brush with ${link("Sweet Baby Ray's BBQ Sauce", P.sweetBabyRays)} and place them back on the smoker unwrapped for 15-20 minutes so the sauce tacks up.`,
    `The ribs are done when the internal temperature reads 195-203°F between the bones. Verify with an ${link('instant-read thermometer', P.thermapen)}. The meat should have pulled back from the bone tips. Rest 10 minutes, then cut between the bones and serve.`,
],

'smoked-sausage-links': [
    'In a large bowl, combine the ground pork with salt, black pepper, paprika, sage, and red pepper flakes. Mix thoroughly with your hands until the seasonings are evenly distributed.',
    'Prepare the hog casings by soaking them in warm water for at least 30 minutes, then rinse them by running water through each one.',
    'Load the casings onto your stuffer tube and fill them with the seasoned pork, being careful not to overstuff. Twist into 6-inch links as you go.',
    'Prick any visible air bubbles with a pin. Place the links on a wire rack set over a sheet pan and refrigerate uncovered overnight so the casings dry and form a tacky surface called a pellicle.',
    `Set your smoker to 225°F. Use ${link('Bear Mountain Apple Pellets', P.apple)} for a mild, sweet smoke that complements the sausage without overpowering it.`,
    `Hang the links or lay them on the grate and smoke for about 2 hours. The sausages are done when the internal temperature reaches 160°F — check with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Let the sausages rest for a few minutes. The casings should be taut and snap when you bite through them.',
],

'cuban-mojo-pork': [
    'In a blender, combine the orange juice, lime juice, garlic cloves, cumin, oregano, and olive oil. Blend until smooth to create the mojo marinade.',
    'Place the pork shoulder in a large zip-top bag or deep container. Pour the marinade over the pork, making sure it coats all surfaces. Seal and refrigerate overnight, or at least 8 hours.',
    'Remove the pork from the marinade about 45 minutes before cooking. Reserve the leftover marinade for basting. Pat the pork lightly dry.',
    `Set your smoker to 275°F and add ${link('cherry wood chunks', P.cherry)} for a mild smoke that lets the citrus marinade shine through.`,
    `Place the pork on the smoker and cook for about 5 hours. Baste with the reserved marinade every hour using a ${link('silicone basting brush', P.bastingBrush)}.`,
    `The pork is done when the internal temperature reaches 203°F and a probe slides in with no resistance. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    `Pull the pork from the smoker using ${link('heat-resistant gloves', P.gloves)} and let it rest for 30 minutes. Shred with ${link('meat shredding claws', P.meatClaws)} and serve over rice and black beans with extra mojo drizzled on top.`,
],

'smoked-pork-loin-roast': [
    `Season the boneless pork loin generously on all sides with salt, pepper, and fresh rosemary. For extra flavor, try a light coating of ${link("Bad Byron's Butt Rub", P.badByrons)}.`,
    `Set your smoker to 250°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a mild, fruity smoke that won\'t overpower the lean meat.`,
    'Place the pork loin on the smoker grate and cook for about 2 hours. Since loin is lean, avoid opening the lid unnecessarily.',
    `In a small saucepan, warm the apple jelly with Dijon mustard until smooth. Brush this glaze onto the pork using a ${link('silicone basting brush', P.bastingBrush)}.`,
    `Continue cooking until the internal temperature reaches 145°F. Check with an ${link('instant-read thermometer', P.thermapen)} in the thickest part of the loin.`,
    'Remove from the smoker and let the pork loin rest for 15 minutes tented loosely with foil. Slice into 1/2-inch rounds and serve.',
],

'asian-bbq-pork-belly': [
    'Score the skin side of the pork belly in a crosshatch pattern, cutting about 1/4 inch deep. This helps the marinade penetrate and the skin crisp up later.',
    `In a bowl, whisk together the hoisin sauce, soy sauce, honey, five spice powder, and minced garlic to create the glaze. For extra umami depth, mix in a splash of ${link("Bachan's Japanese BBQ Sauce", P.bachans)}.`,
    'Coat the pork belly on all sides with the glaze. Place in a sealed container and refrigerate for at least 4 hours, or overnight for the best flavor.',
    `Set your smoker to 275°F and add ${link('cherry wood chunks', P.cherry)} for a mild, complementary smoke.`,
    `Place the pork belly on the smoker skin-side up. Smoke for about 3 hours, brushing with extra glaze every 30 minutes using a ${link('silicone basting brush', P.bastingBrush)}.`,
    `The pork belly is ready when the internal temperature reaches 200°F and the meat is probe-tender. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'For crispy skin, move the pork belly to a sheet pan and broil in the oven for 2-3 minutes, watching carefully to avoid burning.',
    'Let it rest for 10 minutes, then slice into thick pieces and serve with steamed rice.',
],

'memphis-dry-rub-ribs': [
    'Flip the racks bone-side up and remove the membrane. Get under it with a butter knife, then grip it with a paper towel and peel it off cleanly.',
    `Mix the paprika, brown sugar, chili powder, garlic powder, onion powder, cayenne, and black pepper to make the Memphis rub. For convenience, ${link("Blues Hog Dry Rub", P.bluesHogRub)} delivers an authentic Memphis flavor right out of the jar.`,
    'Apply the rub generously on both sides of each rack, pressing it into the meat. Place the ribs on a sheet pan and refrigerate uncovered for 2 hours so the rub forms a paste.',
    `Set your smoker to 250°F. In Memphis tradition, use ${link('hickory wood chunks', P.hickory)} for a bold, assertive smoke.`,
    'Place the ribs meat-side up and smoke for about 5 hours, maintaining a steady temperature. No wrapping needed for this recipe — we want maximum bark.',
    `The ribs are done when the internal temperature between the bones reads 195-203°F — check with an ${link('instant-read thermometer', P.thermapen)}. The meat should have pulled back from the bones about 1/4 inch.`,
    'This is a dry-rub recipe, so no sauce! Slice between the bones and serve with just the smoky, peppery bark. Dust with a final light sprinkle of rub at the table if desired.',
],

'smoked-porchetta': [
    'Toast the fennel seeds in a dry skillet over medium heat until fragrant, about 2 minutes. Crush them roughly with a mortar and pestle or the flat side of a knife.',
    'Finely chop the fresh rosemary and mince the garlic. Mix with the crushed fennel, olive oil, salt, and pepper to make an herb paste.',
    'Lay the pork belly skin-side down. Spread the herb paste evenly over the entire exposed meat surface.',
    'Roll the pork belly tightly from one end to the other, keeping the skin on the outside. Tie securely with butcher\'s twine at 1-inch intervals.',
    'Score the skin in a crosshatch pattern and rub it with coarse salt. This draws out moisture and promotes crispy skin.',
    `Set your smoker to 275°F with ${link('cherry wood chunks', P.cherry)} for a subtle, aromatic smoke.`,
    `Smoke the porchetta for about 4 hours until the internal temperature reaches 165°F. Check with an ${link('instant-read thermometer', P.thermapen)} in the center of the roll.`,
    `For crackling skin, transfer to a 450°F oven for 15-20 minutes until the skin blisters and puffs. Use ${link('heat-resistant gloves', P.gloves)} when handling.`,
    'Rest for 20 minutes before removing the twine and slicing into thick rounds. The herb swirl inside should be visible in every slice.',
],

'smoked-pork-cheeks': [
    `Pat the pork cheeks dry and season them generously with ${link("Killer Hogs BBQ Rub", P.killerHogs)} on all sides.`,
    `Set your smoker to 250°F with ${link('hickory wood chunks', P.hickory)} for a rich, traditional smoke.`,
    'Place the pork cheeks directly on the grate and smoke for about 2 hours until they develop a nice bark on the exterior.',
    'Transfer the smoked cheeks to a deep oven-safe pan or Dutch oven. Add sliced onions, beef broth, and a generous pour of BBQ sauce.',
    `Cover tightly with foil or a lid and return to the smoker (or move to a 300°F oven). Braise for about 2 more hours until the internal temperature reaches 200°F and the meat is fork-tender. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Serve the pork cheeks over creamy mashed potatoes, spooning the braising liquid over the top as a rich gravy.',
],

'cajun-smoked-pork-butt': [
    'Combine the Cajun seasoning, paprika, garlic powder, onion powder, cayenne, and thyme in a bowl to make the Cajun rub.',
    `Coat the pork butt on all sides with the rub, pressing it into the meat. For a shortcut with incredible flavor, use ${link("Killer Hogs BBQ Rub", P.killerHogs)} with an extra teaspoon of cayenne mixed in.`,
    'Wrap the seasoned pork tightly in plastic wrap and refrigerate overnight.',
    `The next day, set your smoker to 225°F. Load with ${link('hickory wood chunks', P.hickory)} for bold smoke that pairs well with the spicy Cajun seasoning.`,
    'Place the pork butt fat-side up on the smoker grate. Maintain your temperature and resist opening the lid for the first 3 hours.',
    `When the internal temperature reaches 165°F (check with an ${link('instant-read thermometer', P.thermapen)}), wrap the pork tightly in ${link('pink butcher paper', P.butcherPaper)}.`,
    'Return to the smoker and continue cooking until the internal temperature hits 203°F and a probe slides in like butter. This will take about 8 hours total.',
    `Rest the wrapped pork in a cooler for at least 1 hour. Shred with ${link('meat shredding claws', P.meatClaws)} and serve on po\' boy rolls with pickles and hot sauce.`,
],

'smoked-country-style-ribs': [
    `Season the country-style ribs on all sides with ${link("Bad Byron's Butt Rub", P.badByrons)} for a sweet and savory crust.`,
    `Set your smoker to 275°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a mild, fruity smoke.`,
    'Arrange the ribs on the smoker grate with space between each piece for even airflow.',
    'Smoke for about 2.5 hours, spritzing with apple juice every 45 minutes after the first hour to keep the surface moist.',
    `In a bowl, mix your BBQ sauce with honey. ${link("Sweet Baby Ray's", P.sweetBabyRays)} works perfectly here. Brush the glaze onto the ribs using a ${link('silicone basting brush', P.bastingBrush)}.`,
    `Continue cooking until the internal temperature reaches 195°F and the meat is tender. Check with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Brush on one more coat of the honey-BBQ glaze and let it tack up for 5 minutes. Serve immediately.',
],

'smoked-pork-crown-roast': [
    'If your butcher hasn\'t already, french the rib bones by scraping them clean. Wrap the exposed bone tips with small squares of foil to prevent them from burning.',
    `Season the crown roast generously inside and out with olive oil, fresh herbs, minced garlic, salt, and pepper. For a ready-made option, try ${link("Bad Byron's Butt Rub", P.badByrons)}.`,
    `Set your smoker to 275°F with ${link('cherry wood chunks', P.cherry)} for an elegant, subtle smoke.`,
    'Place the crown roast on the smoker with the bones pointing up. The hollow center can be filled with stuffing during the last hour if desired.',
    'Smoke for about 3 hours, maintaining a steady temperature. If making stuffing, add it to the center for the final hour of cooking.',
    `The roast is done when the internal temperature of the meat (not the stuffing) reaches 145°F. Check with an ${link('instant-read thermometer', P.thermapen)} between two ribs.`,
    `Carefully transfer the roast to a carving board using ${link('heat-resistant gloves', P.gloves)}. Rest for 20 minutes before removing the foil from the bones and carving between each rib.`,
],

'smoked-stuffed-pork-loin': [
    'Butterfly the pork loin by making a horizontal cut along the length, stopping about 1 inch from the opposite edge. Open it like a book and pound it gently to an even thickness.',
    'Layer the fresh spinach, shredded mozzarella, chopped sun-dried tomatoes, and minced garlic across the cut surface, leaving a 1-inch border on all sides.',
    'Roll the loin up tightly starting from one long side. Tie with butcher\'s twine at 1-inch intervals to hold the roll together securely.',
    `Season the outside of the roll with Italian seasoning, salt, and pepper. For more depth, dust with ${link("Killer Hogs BBQ Rub", P.killerHogs)}.`,
    `Set your smoker to 275°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a light, clean smoke.`,
    'Smoke for about 2 hours. Since the loin is lean, it cooks relatively fast.',
    `The stuffed loin is done when the internal temperature in the center of the roll reaches 145°F. Check carefully with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Rest for 10 minutes, then remove the twine and slice into 1-inch rounds. The colorful stuffing spiral makes each slice look gorgeous on the plate.',
],

// ────────────────────────────────────────
// BEEF
// ────────────────────────────────────────

'texas-style-smoked-brisket': [
    'Trim the brisket, removing hard chunks of fat and any thin, floppy edges of meat that would dry out. Trim the fat cap to about 1/4 inch — enough to protect the meat but thin enough for the rub to penetrate.',
    `Keep the seasoning simple and Texan: mix equal parts coarse black pepper and kosher salt with a touch of garlic powder. For a deeper, more complex bark, try ${link("Hardcore Carnivore Black", P.hardcore)}.`,
    'Apply the rub generously on all sides of the brisket, pressing it into the meat. Let it sit at room temperature for about 1 hour.',
    `Fire up your smoker to 250°F. Authentic Central Texas BBQ uses ${link('post oak wood', P.postOak)} — it gives a clean, medium smoke flavor that lets the beef shine.`,
    'Place the brisket fat-side up on the smoker grate. Close the lid and let it ride for about 6 hours without opening. Trust the process.',
    `Once the bark is set and the internal temperature reaches about 165°F, wrap the brisket in ${link('pink butcher paper', P.butcherPaper)}. This pushes through the stall while preserving that beautiful bark.`,
    'Return the wrapped brisket to the smoker and continue cooking until the internal temperature hits 203°F and the probe slides in with zero resistance — it should feel like poking warm butter.',
    `Verify doneness with an ${link('instant-read thermometer', P.thermapen)} in several spots across the flat. The thickest part of the flat should register 203°F.`,
    `Pull the brisket and rest it, still wrapped, in a cooler (no ice) for a minimum of 2 hours. Use ${link('heat-resistant gloves', P.gloves)} to handle it. Resting is not optional — this is what makes the meat juicy.`,
    'Unwrap and slice the flat against the grain into pencil-thick slices. Separate the point, cube it for burnt ends, or slice it separately. Serve with white bread, pickles, and onions.',
],

'smoked-beef-short-ribs': [
    'Trim any excess hard fat from the top of the short ribs, but leave the membrane on the bone side intact — it will render during the long cook.',
    `Season the ribs generously with ${link("Meat Church Holy Cow", P.holyCow)} for a bold, beefy flavor that complements the rich marbling.`,
    `Get your smoker to a steady 275°F with ${link('post oak wood', P.postOak)} for that authentic Texas flavor.`,
    'Place the short ribs bone-side down on the smoker grate. These are a large cut, so give them plenty of space for airflow.',
    'Smoke for about 6-8 hours, spritzing with beef broth every hour after the first 3 hours to keep the bark moist.',
    `The ribs are done when the internal temperature reads 203°F and a probe slides in with no resistance. Use an ${link('instant-read thermometer', P.thermapen)} to check the meatiest section between the bones.`,
    `Carefully remove the ribs using ${link('heat-resistant gloves', P.gloves)}. Rest for 30 minutes before serving. The meat should jiggle like jello when you shake the bone — that\'s perfection.`,
],

'smoked-tri-tip': [
    'Trim any excess fat and silver skin from the tri-tip, leaving a thin fat cap on one side.',
    `Mix garlic powder, onion powder, black pepper, salt, and a pinch of cayenne for a Santa Maria-style rub. For convenience, ${link("Meat Church Holy Cow", P.holyCow)} works great on tri-tip.`,
    'Season the tri-tip generously on all sides and let it rest at room temperature for 30 minutes.',
    `Set your smoker to 250°F with ${link('post oak wood', P.postOak)} for a traditional California BBQ experience.`,
    'Place the tri-tip on the smoker fat-side up. Smoke for about 60-90 minutes — tri-tip is a relatively quick cook compared to other smoked beef cuts.',
    `Remove the tri-tip when the internal temperature reaches 130°F for medium-rare or 135°F for medium. Check with an ${link('instant-read thermometer', P.thermapen)} in the thickest section.`,
    'Rest for 10 minutes, then identify the two different grain directions (tri-tip has them). Slice thinly against the grain for each section.',
],

'smoked-beef-tenderloin': [
    'Trim any silver skin and excess fat from the tenderloin. Tuck the thin tail end under and tie it with butcher\'s twine to create an even thickness for uniform cooking.',
    `Coat the tenderloin with olive oil and season with coarse black pepper, kosher salt, minced fresh rosemary, and garlic. For a stunning crust, use ${link("Hardcore Carnivore Black", P.hardcore)}.`,
    `Set your smoker to 250°F with ${link('cherry wood chunks', P.cherry)} for a mild smoke that won\'t overpower the delicate beef flavor.`,
    'Place the tenderloin on the smoker and cook for about 45-60 minutes. This is a lean, quick-cooking cut, so don\'t walk away.',
    `Start checking the internal temperature after 40 minutes. Remove at 125°F for medium-rare or 130°F for medium — use an ${link('instant-read thermometer', P.thermapen)} for precision.`,
    'Rest the tenderloin for 15 minutes tented loosely with foil. The temperature will carry over about 5 degrees. Slice into 1-inch thick medallions and serve.',
],

'smoked-prime-rib': [
    'Take the prime rib out of the fridge 1-2 hours before cooking to let it come to room temperature. This ensures even cooking throughout.',
    `Mix softened butter with minced garlic, chopped fresh rosemary, and fresh thyme to make an herb butter. Slather it generously all over the roast. Season with salt and pepper. For extra depth, add a dusting of ${link("Traeger Prime Rib Rub", P.traegerPR)}.`,
    `Set your smoker to 250°F with ${link('hickory wood chunks', P.hickory)} for a classic, robust smoke flavor.`,
    'Place the roast bone-side down on the smoker grate. The bones act as a natural rack.',
    `Smoke for 3-4 hours. Start checking the internal temperature after 2.5 hours using an ${link('instant-read thermometer', P.thermapen)} inserted into the center of the roast without touching bone.`,
    'Remove the prime rib when the internal temperature hits 125°F for medium-rare. It will carry over to about 130-135°F during rest.',
    `Carefully transfer the roast to a cutting board using ${link('heat-resistant gloves', P.gloves)}. Tent with foil and rest for at least 30 minutes — this is crucial for juicy results.`,
    'Slice between the bones for bone-in portions, or remove the bones and cut into thick slabs. Serve with horseradish cream and au jus.',
],

'smoked-beef-cheeks': [
    `Season the beef cheeks generously on all sides with ${link("Meat Church Holy Cow", P.holyCow)} for a bold, savory crust.`,
    `Set your smoker to 250°F with ${link('post oak wood', P.postOak)} for a clean, medium smoke.`,
    'Place the beef cheeks directly on the grate and smoke for about 3 hours until the exterior develops a dark bark.',
    'Transfer the smoked cheeks to a deep oven-safe pan or Dutch oven. Add quartered onions, garlic cloves, beef broth, and red wine.',
    'Cover tightly with foil or a lid and return to the smoker (or move to a 300°F oven). Braise for about 3 more hours.',
    `The cheeks are done when the internal temperature reaches 205°F and the meat falls apart when probed. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Serve the cheeks whole over creamy polenta or mashed potatoes, spooning the rich braising liquid over the top.',
],

'smoked-beef-ribs-dino-style': [
    'Flip the rack bone-side up and remove the membrane. Trim any hard pockets of fat but leave the good marbling intact.',
    `Keep the seasoning bold but simple — a generous coating of kosher salt, coarse black pepper, and garlic powder. ${link("Hardcore Carnivore Black", P.hardcore)} is an excellent choice for a dramatic, deep bark.`,
    `Set your smoker to 275°F with ${link('post oak wood', P.postOak)} for authentic Texas-style flavor.`,
    'Place the ribs bone-side down on the grate. These are big, thick cuts that need plenty of time and airflow.',
    'Smoke for about 6-7 hours, spritzing with beef broth occasionally after the bark has set (around hour 3).',
    `Start probing for tenderness around hour 5. The ribs are done when the internal temperature reads 203°F and the probe slides in like butter between the bones. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    `Use ${link('heat-resistant gloves', P.gloves)} to carefully remove the ribs. Rest for 15 minutes, then slice between the bones. Each rib should be like a little brisket on a stick.`,
],

'smoked-burgers': [
    'Form the ground beef into 6 patties about 3/4 inch thick. Make a shallow dimple in the center of each one with your thumb — this prevents the burgers from puffing up during cooking.',
    `Season both sides generously with salt, pepper, and garlic powder. For a next-level crust, try ${link("Hardcore Carnivore Black", P.hardcore)}.`,
    `Set your smoker to 250°F with ${link('hickory wood chunks', P.hickory)} for a smoky backbone.`,
    'Place the patties on the smoker grate and smoke for about 45 minutes to build deep smoke flavor.',
    `Check the internal temperature with an ${link('instant-read thermometer', P.thermapen)} — pull at 150°F if you plan to sear, as the sear will add a few degrees. For well-done, go to 160°F.`,
    'For the best results, finish the burgers with a quick sear on a screaming-hot grill or cast iron skillet for about 45 seconds per side. Add cheese during the sear if desired.',
    'Toast the buns on the grill, assemble with your favorite toppings, and serve immediately.',
],

'smoked-meatloaf': [
    'In a large bowl, combine the ground beef, breadcrumbs, eggs, diced onion, Worcestershire sauce, salt, and pepper. Mix gently with your hands — overmixing makes the meatloaf dense.',
    `Form the mixture into a loaf shape on a sheet of foil or in a loaf pan. For extra flavor, season the outside with a dusting of ${link("Killer Hogs BBQ Rub", P.killerHogs)}.`,
    `Set your smoker to 250°F with ${link('hickory wood chunks', P.hickory)} for a classic smoky flavor.`,
    'Place the meatloaf on the smoker grate (directly or in the pan) and smoke for about 2 hours.',
    `Brush the top generously with ${link("Sweet Baby Ray's BBQ Sauce", P.sweetBabyRays)} using a ${link('silicone basting brush', P.bastingBrush)}. Return to the smoker.`,
    `Continue cooking until the internal temperature reaches 160°F — verify with an ${link('instant-read thermometer', P.thermapen)} inserted into the center.`,
    'Rest for 10 minutes before slicing into thick portions. The smoky glaze on top should be sticky and caramelized.',
],

'smoked-beef-bologna': [
    'Score the outside of the bologna chub in a crosshatch pattern, cutting about 1/4 inch deep. This creates more surface area for smoke and seasoning.',
    `Brush the entire surface with yellow mustard as a binder, then coat generously with ${link("Killer Hogs BBQ Rub", P.killerHogs)}.`,
    `Set your smoker to 275°F with ${link('hickory wood chunks', P.hickory)} for a strong, classic smoke.`,
    'Place the bologna directly on the smoker grate and smoke for about 3 hours. The crosshatch cuts will open up and create crispy edges.',
    `The bologna is done when the internal temperature reaches 160°F. Check with an ${link('instant-read thermometer', P.thermapen)}.`,
    `Brush generously with ${link("Sweet Baby Ray's BBQ Sauce", P.sweetBabyRays)} in the last 15 minutes for a sticky glaze.`,
    'Slice into thick rounds and serve on white bread or as a snack. The smoky, crispy edges are the best part.',
],

'smoked-beef-clod': [
    'Trim any excess hard fat from the beef shoulder clod, but leave a thin layer to keep the meat moist during the long cook.',
    `Season generously with a simple mix of salt, coarse black pepper, and garlic powder. ${link("Meat Church Holy Cow", P.holyCow)} is a great all-in-one option for beef.`,
    `Set your smoker to 250°F with ${link('post oak wood', P.postOak)} for an authentic Central Texas flavor profile.`,
    'Place the clod fat-side up on the smoker grate. This is a long cook — plan on about 10 hours, so make sure you have plenty of fuel.',
    `When the bark is set and the internal temperature reaches about 165°F, wrap the clod in ${link('pink butcher paper', P.butcherPaper)} to push through the stall.`,
    `Continue smoking until the internal temperature reaches 203°F and the meat is probe-tender throughout. Check multiple spots with an ${link('instant-read thermometer', P.thermapen)}.`,
    `Use ${link('heat-resistant gloves', P.gloves)} to remove the clod from the smoker. Rest for at least 1 hour while still wrapped. Slice against the grain and serve.`,
],

'smoked-beef-jerky': [
    'Place the flank steak in the freezer for about 1 hour until it\'s firm but not frozen solid. This makes slicing much easier.',
    'Slice the beef about 1/4 inch thick, cutting against the grain for tender jerky. Keep the slices as uniform as possible.',
    'Mix the soy sauce, Worcestershire sauce, brown sugar, garlic powder, onion powder, and red pepper flakes in a bowl. Place the sliced beef in a zip-top bag and pour the marinade over it. Refrigerate overnight.',
    'Remove the beef from the marinade and pat each piece dry with paper towels. Arrange the slices on smoker racks in a single layer without overlapping.',
    `Set your smoker to 175°F with ${link('hickory wood chunks', P.hickory)} for a bold smoke. Jerky is smoked at a lower temperature to dehydrate rather than cook.`,
    `Smoke for about 4 hours. The jerky is done when it reaches 160°F internally (check a thick piece with an ${link('instant-read thermometer', P.thermapen)}) and bends without snapping — it should be dry but still pliable.`,
    'Let the jerky cool completely, then store in an airtight container. It will keep for 1-2 weeks at room temperature or several months in the freezer.',
],

'smoked-oxtails': [
    `Pat the oxtails dry and season generously with ${link("Meat Church Holy Cow", P.holyCow)} for a rich, savory crust.`,
    `Set your smoker to 275°F with ${link('hickory wood chunks', P.hickory)} for a bold smoke.`,
    'Place the oxtails directly on the smoker grate and smoke for about 3 hours until they develop a deep, dark bark.',
    'Transfer the smoked oxtails to a Dutch oven or deep braising pan. Add quartered onions, garlic cloves, beef broth, and red wine.',
    'Cover tightly and return to the smoker or move to a 300°F oven. Braise until the internal temperature reaches 205°F and the meat is fall-off-the-bone tender — about 3 more hours.',
    `Check a thick piece with an ${link('instant-read thermometer', P.thermapen)} to verify doneness. The meat should pull away from the bone effortlessly.`,
    'Serve the oxtails with the rich braising liquid spooned over mashed potatoes, rice, or grits.',
],

'smoked-chuck-roast': [
    `Season the chuck roast generously on all sides with ${link("Meat Church Holy Cow", P.holyCow)}. Chuck roast is sometimes called "poor man\'s brisket" and it delivers incredible beefy flavor.`,
    `Set your smoker to 250°F with ${link('post oak wood', P.postOak)} for an authentic, clean smoke.`,
    'Place the chuck roast on the smoker fat-side up and smoke for about 4 hours, spritzing with beef broth every hour after the first 2 hours.',
    `When the bark is set and the color is a deep mahogany, wrap the roast in ${link('pink butcher paper', P.butcherPaper)} and return to the smoker.`,
    `Continue cooking until the internal temperature reaches 203°F and the roast is probe-tender. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Rest for 30 minutes while still wrapped. You can slice it like brisket or shred it for sandwiches — both are delicious.',
],

'smoked-beef-ribs-korean-style': [
    'Mix soy sauce, sesame oil, brown sugar, minced garlic, grated Asian pear, and gochujang in a bowl to make the Korean marinade.',
    'Place the short ribs in a large zip-top bag, pour in the marinade, and seal. Refrigerate overnight, turning the bag occasionally.',
    `Remove the ribs from the marinade and pat them dry. Season lightly with salt and pepper. For extra depth, add a light dusting of ${link("Killer Hogs BBQ Rub", P.killerHogs)}.`,
    `Set your smoker to 275°F with ${link('cherry wood chunks', P.cherry)} for a mild smoke that won\'t compete with the bold Korean flavors.`,
    'Smoke the ribs for about 5 hours, basting with the reserved marinade every hour during the first 3 hours.',
    `The ribs are done when the internal temperature reaches 203°F and the meat is probe-tender. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Brush one final coat of the marinade over the ribs and let it glaze for a few minutes. Garnish with sesame seeds and sliced green onions before serving.',
],

'smoked-picanha': [
    'Score the fat cap in a crosshatch pattern, cutting about 1/4 inch deep. Be careful not to cut into the meat itself.',
    `Season the picanha generously with coarse salt — Brazilian style keeps it simple. Add black pepper and garlic powder if you like. For extra flavor, try ${link("Meat Church Holy Cow", P.holyCow)}.`,
    'Let the seasoned meat rest at room temperature for 30 minutes.',
    `Set your smoker to 250°F with ${link('post oak wood', P.postOak)} for a clean, beefy smoke.`,
    'Place the picanha fat-side up on the smoker grate. The fat will slowly render and baste the meat as it cooks.',
    `Smoke until the internal temperature reaches 130°F for medium-rare — check with an ${link('instant-read thermometer', P.thermapen)} in the thickest section.`,
    'Rest for 10 minutes, then slice against the grain into thin strips. The fat cap should be golden and slightly crispy.',
],

'smoked-beef-back-ribs': [
    'Flip the racks bone-side up and remove the membrane by loosening one corner with a butter knife and peeling it off with a paper towel.',
    `Season generously on both sides with a mix of salt, pepper, paprika, and garlic powder. ${link("Hardcore Carnivore Black", P.hardcore)} creates an incredible bark on these ribs.`,
    `Set your smoker to 275°F with ${link('hickory wood chunks', P.hickory)} for a bold, classic beef smoke.`,
    'Place the ribs bone-side down on the grate and smoke for about 5 hours. Spritz with beef broth every hour after the first 2 hours.',
    `The ribs are done when the internal temperature between the bones reads 203°F and the meat has pulled back from the bone tips. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Rest for 10 minutes, then slice between the bones and serve.',
],

'smoked-flank-steak': [
    `Coat the flank steak lightly with olive oil and season both sides generously with salt, pepper, and garlic powder. For a bolder finish, try ${link("Hardcore Carnivore Black", P.hardcore)}.`,
    `Set your smoker to 225°F with ${link('post oak wood', P.postOak)} for a mild, clean smoke.`,
    'Place the flank steak on the smoker grate and smoke for 30-45 minutes. Flank steak is thin and cooks fast, so keep a close eye on it.',
    `Start checking the internal temperature after 25 minutes with an ${link('instant-read thermometer', P.thermapen)}. Pull the steak at 130°F for medium-rare.`,
    'Rest for 10 minutes, then slice very thinly against the grain. Flank steak has long, visible muscle fibers — cutting against them is essential for tenderness.',
],

'smoked-beef-tongue': [
    `Season the beef tongue with a generous coating of ${link("Killer Hogs BBQ Rub", P.killerHogs)} on all sides.`,
    `Set your smoker to 275°F with ${link('hickory wood chunks', P.hickory)} for a bold smoke.`,
    'Smoke the tongue for about 3 hours until the exterior is deeply colored.',
    'Transfer to a braising pan or Dutch oven. Add quartered onions, garlic cloves, and bay leaves. Pour in enough beef broth to come halfway up the tongue.',
    `Cover tightly and braise at 300°F until the internal temperature reaches 200°F and the tongue is very tender — about 3 more hours. Check with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Let it cool slightly, then peel off the thick outer skin — it should come off easily. Dice the tender meat into small cubes.',
    'Warm corn tortillas and fill them with the diced tongue. Top with fresh cilantro, diced white onion, and a squeeze of lime.',
],

'smoked-beef-shank': [
    `Pat the beef shanks dry and season generously with ${link("Meat Church Holy Cow", P.holyCow)} on all sides.`,
    `Set your smoker to 275°F with ${link('hickory wood chunks', P.hickory)} for a rich, bold smoke.`,
    'Place the shanks directly on the grate and smoke for about 3 hours until they develop a deep, dark crust.',
    'Transfer the smoked shanks to a deep braising dish. Add chopped carrots, celery, onion, beef broth, and red wine.',
    'Cover tightly with foil and return to the smoker or move to a 300°F oven. Braise for about 4 more hours.',
    `The shanks are done when the internal temperature reaches 205°F and the meat is falling off the bone. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Serve the shanks with the braised vegetables and rich cooking liquid spooned over the top.',
],

// ────────────────────────────────────────
// LAMB
// ────────────────────────────────────────

'smoked-leg-of-lamb': [
    'Using a small, sharp knife, make deep slits all over the leg of lamb, about 1 inch apart. Push garlic slivers deep into each slit.',
    `Mix chopped fresh rosemary, olive oil, lemon zest, salt, and pepper into a paste. Rub it generously over the entire lamb leg. For additional depth, dust with ${link("Dizzy Pig All-Purpose Rub", P.dizzyPig)}.`,
    'Wrap the lamb tightly in plastic wrap and refrigerate overnight so the garlic and herbs can perfume the meat.',
    'Remove from the fridge 1 hour before cooking to bring it to room temperature.',
    `Set your smoker to 250°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a mild, sweet smoke that complements lamb beautifully.`,
    'Place the lamb leg on the smoker and cook for about 4 hours, maintaining a steady temperature.',
    `Start checking the internal temperature after 3 hours with an ${link('instant-read thermometer', P.thermapen)} in the thickest part, avoiding the bone. Remove at 145°F for medium.`,
    `Let the leg rest for 20 minutes tented with foil. Use ${link('heat-resistant gloves', P.gloves)} to transfer it. Carve against the grain and serve.`,
],

'smoked-lamb-ribs': [
    'Flip the racks bone-side up and remove the membrane by loosening a corner with a knife and peeling it off with a paper towel.',
    `Mix cumin, coriander, paprika, cinnamon, salt, and garlic powder for an aromatic rub. For a ready-made option, ${link("Dizzy Pig All-Purpose Rub", P.dizzyPig)} works wonderfully on lamb.`,
    'Apply the rub generously on both sides of each rack.',
    `Set your smoker to 275°F with ${link('cherry wood chunks', P.cherry)} for a mild, fruity smoke.`,
    'Place the ribs meat-side up on the grate and smoke for about 2.5 hours.',
    'If the ribs need more tenderness, wrap them in foil with a splash of beef broth and return to the smoker for another 30-45 minutes.',
    `The ribs are done when the internal temperature between the bones reads 195-203°F. Verify with an ${link('instant-read thermometer', P.thermapen)}. The meat should pull back from the bone tips.`,
    'Rest for 10 minutes, then cut between the bones and serve.',
],

'smoked-lamb-shoulder': [
    `Combine cumin, coriander, turmeric, paprika, and salt to make a Middle Eastern-inspired rub. Apply it all over the lamb shoulder, pressing into the surface. Alternatively, use ${link("Dizzy Pig All-Purpose Rub", P.dizzyPig)} for convenience.`,
    'Stud the shoulder with garlic cloves by making small slits and pushing them in. Wrap tightly and marinate overnight in the fridge.',
    `Set your smoker to 250°F with ${link('cherry wood chunks', P.cherry)} for a subtle, complementary smoke.`,
    'Place the lamb shoulder on the smoker and cook low and slow for about 6-7 hours.',
    `When the internal temperature reaches 165°F, wrap the shoulder in ${link('pink butcher paper', P.butcherPaper)} and return to the smoker.`,
    `Continue cooking until the internal temperature hits 203°F and the meat is completely probe-tender. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    `Rest for at least 30 minutes. Shred the lamb using ${link('meat shredding claws', P.meatClaws)} and serve on warm flatbread with yogurt sauce, pickled onions, and fresh herbs.`,
],

'smoked-lamb-chops': [
    'Pat the lamb loin chops dry with paper towels — dry surfaces sear better and take on more smoke.',
    `Mix olive oil with chopped fresh mint, rosemary, and minced garlic. Coat the chops on all sides. Season with salt and pepper. For more complexity, add a pinch of ${link("Dizzy Pig All-Purpose Rub", P.dizzyPig)}.`,
    `Set your smoker to 250°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a light, sweet smoke.`,
    'Place the chops on the smoker grate and smoke for 30-45 minutes. Lamb chops are thin and cook quickly.',
    `Check the internal temperature with an ${link('instant-read thermometer', P.thermapen)}. Remove at 145°F for medium — lamb chops are best when still pink in the center.`,
    'Rest for 5 minutes and serve. These are elegant enough for a dinner party but easy enough for a weeknight.',
],

'smoked-lamb-kebabs': [
    'In a large bowl, combine the ground lamb with grated onion, minced garlic, chopped parsley, cumin, allspice, salt, and pepper. Mix thoroughly with your hands until everything is evenly distributed.',
    'Divide the mixture into equal portions and form them around flat metal skewers, shaping each one into a long, flat cylinder about 1 inch thick.',
    'Place the skewers on a tray and refrigerate for 1 hour to firm up — this helps them hold together on the smoker.',
    `Set your smoker to 275°F with ${link('cherry wood chunks', P.cherry)} for a mild, complementary smoke.`,
    `Place the skewers on the smoker grate and cook for 45-60 minutes until the internal temperature reaches 160°F. Check with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Serve immediately with tzatziki sauce, warm pita bread, and a fresh cucumber-tomato salad.',
],

'moroccan-smoked-lamb-shanks': [
    `Season the lamb shanks generously with ras el hanout spice blend on all sides. If you don\'t have ras el hanout, ${link("Dizzy Pig All-Purpose Rub", P.dizzyPig)} with a pinch of cinnamon works well.`,
    `Set your smoker to 275°F with ${link('cherry wood chunks', P.cherry)} for a mild smoke.`,
    'Place the shanks on the smoker grate and smoke for about 2 hours until the exterior is deeply colored and aromatic.',
    'Transfer the shanks to a tagine or Dutch oven. Add canned diced tomatoes, chicken broth, and sliced onion. Cover tightly.',
    'Return to the smoker or move to a 300°F oven. Braise for about 4 more hours.',
    `The shanks are done when the internal temperature reaches 205°F and the meat is falling off the bone. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Add dried apricots and chickpeas during the last 30 minutes of cooking so they warm through and absorb the braising liquid.',
    'Serve over a bed of fluffy couscous with the braising liquid spooned generously over the top.',
],

'smoked-rack-of-lamb': [
    'Season the frenched racks of lamb with salt and pepper. Let them come to room temperature for about 30 minutes.',
    `Set your smoker to 250°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a delicate smoke that won\'t overwhelm the lamb.`,
    'Place the racks on the smoker bone-side down and smoke for about 30 minutes to build a light smoke flavor.',
    `Brush the meat side with Dijon mustard using a ${link('silicone basting brush', P.bastingBrush)}.`,
    'Mix breadcrumbs with finely chopped fresh herbs and melted butter. Press this crust firmly onto the mustard-coated surface.',
    `Return to the smoker and continue cooking until the internal temperature reaches 135°F for medium-rare. Check with an ${link('instant-read thermometer', P.thermapen)} between two ribs.`,
    'Rest for 10 minutes, then slice between the bones into individual chops. The herb crust should be golden and fragrant.',
],

'greek-smoked-lamb-leg': [
    'Make deep slits all over the lamb leg, about 1 inch apart and 2 inches deep. Push garlic clove halves into each slit.',
    'Mix lemon juice, olive oil, and dried oregano together. Pour this over the lamb, working it into all the slits. Season generously with salt and pepper.',
    'Place the lamb in a large dish, cover, and marinate overnight in the fridge, turning once.',
    `Set your smoker to 250°F with ${link('cherry wood chunks', P.cherry)} for a mild, fruity smoke.`,
    'Place the lamb leg on the smoker and cook for about 5 hours, maintaining a steady temperature.',
    `Start checking the internal temperature after 4 hours with an ${link('instant-read thermometer', P.thermapen)} in the thickest part, avoiding bone. Remove at 145°F for medium.`,
    `Use ${link('heat-resistant gloves', P.gloves)} to transfer the leg to a cutting board. Rest for 20 minutes before carving against the grain.`,
],

'smoked-lamb-neck': [
    `Season the lamb neck generously with ${link("Killer Hogs BBQ Rub", P.killerHogs)} on all sides.`,
    `Set your smoker to 275°F with ${link('cherry wood chunks', P.cherry)} for a mild smoke.`,
    'Place the lamb neck on the smoker grate and smoke for about 3 hours until the exterior is dark and richly flavored.',
    'Transfer to a braising pan. Add lamb or beef broth and red wine along with any aromatic vegetables you like.',
    `Cover tightly and braise until the internal temperature reaches 205°F and the meat is fork-tender — about 3 more hours. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Shred the meat off the bone and serve over mashed potatoes or polenta with the reduced braising liquid.',
],

'smoked-lamb-breast': [
    `Mix cumin, coriander, garlic powder, salt, and black pepper. Season the lamb breast generously on all sides. For a more complex flavor, try ${link("Dizzy Pig All-Purpose Rub", P.dizzyPig)}.`,
    `Set your smoker to 275°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a mild, sweet smoke.`,
    'Place the lamb breast on the smoker bone-side down and smoke for about 5 hours. This is a fatty cut that benefits from a long, slow cook.',
    `The breast is done when the internal temperature reads 195-203°F and the meat is tender between the ribs. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Rest for 15 minutes, then slice between the ribs and serve. The rendered fat and smoky bark make this an incredibly rich and flavorful cut.',
],

'smoked-lamb-burgers': [
    'In a bowl, combine the ground lamb with crumbled feta cheese, chopped fresh mint, and minced garlic. Mix gently — overworking the meat makes tough burgers.',
    'Form into 6 patties about 3/4 inch thick. Press a dimple into the center of each with your thumb.',
    `Season both sides with salt and pepper. For extra flavor, dust lightly with ${link("Dizzy Pig All-Purpose Rub", P.dizzyPig)}.`,
    `Set your smoker to 250°F with ${link('cherry wood chunks', P.cherry)} for a mild, complementary smoke.`,
    `Smoke the patties for about 45 minutes until the internal temperature reaches 160°F. Check with an ${link('instant-read thermometer', P.thermapen)}.`,
    'For a crispy exterior, sear quickly on a hot grill or skillet for 30 seconds per side.',
    'Serve in warm pita bread with tzatziki sauce, sliced cucumber, and red onion.',
],

'smoked-lamb-meatballs': [
    'Combine the ground lamb with breadcrumbs, egg, chopped parsley, cumin, and minced garlic. Mix gently until just combined.',
    'Form the mixture into golf ball-sized meatballs, rolling them between your palms. Place them on a sheet pan.',
    `Set your smoker to 275°F with ${link('cherry wood chunks', P.cherry)} for a light, fruity smoke.`,
    `Arrange the meatballs on the smoker grate with space between each one. Smoke for 45-60 minutes until the internal temperature reaches 160°F. Check with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Serve the meatballs with a cool yogurt-cucumber sauce and warm flatbread.',
],

'smoked-stuffed-lamb-shoulder': [
    'Butterfly the boneless lamb shoulder by slicing it open so it lays flat in an even layer.',
    'Spread the spinach, toasted pine nuts, crumbled feta, and minced garlic evenly over the cut surface, leaving a 1-inch border.',
    'Roll the shoulder up tightly and tie securely with butcher\'s twine at 1-inch intervals.',
    `Season the outside generously with salt, pepper, and fresh herbs. For a bolder crust, use ${link("Killer Hogs BBQ Rub", P.killerHogs)}.`,
    `Set your smoker to 275°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a mild, clean smoke.`,
    `Smoke for about 5 hours. If you want to pull the meat, cook to 195°F internal. For sliceable lamb, remove at 145°F. Check with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Rest for 20 minutes before removing the twine and slicing. The spinach and feta spiral inside makes a beautiful presentation.',
],

'turkish-smoked-lamb-kofte': [
    'Combine the ground lamb with grated onion, chopped parsley, cumin, sumac, allspice, and salt. Mix thoroughly until the mixture is smooth and well-blended.',
    'Shape the mixture onto flat metal skewers, forming long, flat sausage shapes about 1 inch thick. Press firmly so they hold together.',
    'Place on a tray and refrigerate for 30 minutes to firm up.',
    `Set your smoker to 300°F with ${link('cherry wood chunks', P.cherry)} for a light, quick smoke.`,
    `Place the skewers on the smoker grate and cook for 30-45 minutes until the internal temperature reaches 160°F. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Serve immediately on warm flatbread with grilled vegetables, sumac onion salad, and a drizzle of tahini.',
],

'smoked-lamb-loin': [
    'Coat the lamb loin with olive oil and minced garlic. Season with herbes de Provence, salt, and pepper.',
    `Set your smoker to 250°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a delicate, sweet smoke.`,
    'Place the loin on the smoker grate and cook for 45-60 minutes. Lamb loin is lean and cooks quickly, so watch it carefully.',
    `Remove when the internal temperature reaches 140°F — check with an ${link('instant-read thermometer', P.thermapen)} in the thickest part.`,
    'Rest for 10 minutes, then slice into 1-inch thick medallions and serve.',
],

'smoked-lamb-tacos': [
    `Season the lamb shoulder generously with your favorite taco seasoning. For a smoky twist, mix in some ${link("Killer Hogs BBQ Rub", P.killerHogs)}.`,
    `Set your smoker to 250°F with ${link('cherry wood chunks', P.cherry)} for a mild smoke.`,
    'Place the lamb shoulder on the smoker and cook low and slow for about 6 hours.',
    `The lamb is done when the internal temperature reaches 203°F and the meat shreds easily. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    `Shred the lamb using ${link('meat shredding claws', P.meatClaws)}. Warm corn tortillas on the grill or in a dry skillet.`,
    'Build your tacos with the shredded lamb, chimichurri sauce, diced onion, and fresh cilantro.',
],

'indian-spiced-smoked-lamb': [
    'In a bowl, mix yogurt with garam masala, turmeric, grated ginger, minced garlic, and salt to make a thick marinade.',
    'Make deep slits all over the lamb leg and coat it thoroughly with the yogurt marinade, pushing it into the slits. Cover and refrigerate overnight.',
    `Set your smoker to 250°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a mild smoke that won\'t compete with the bold spices.`,
    'Place the lamb on the smoker and cook for about 5 hours, maintaining a steady temperature.',
    `Check the internal temperature with an ${link('instant-read thermometer', P.thermapen)} in the thickest part, avoiding bone. Remove at 145°F for medium.`,
    `Rest for 20 minutes using ${link('heat-resistant gloves', P.gloves)} to transfer it. Carve and serve with warm naan bread and mango chutney.`,
],

'smoked-lamb-osso-buco': [
    'Pat the lamb shanks dry and season generously with salt and pepper.',
    `Set your smoker to 275°F with ${link('cherry wood chunks', P.cherry)} for a mild, fruity smoke.`,
    'Smoke the shanks for about 2 hours until the exterior develops a rich color and smoky crust.',
    'Transfer the shanks to a deep braising dish. Add white wine, crushed tomatoes, chopped carrots, and celery.',
    'Cover tightly and braise at 300°F for about 4 hours.',
    `The shanks are done when the internal temperature reaches 205°F and the meat is falling off the bone. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'While the shanks rest, prepare the gremolata by mixing lemon zest, minced garlic, and chopped parsley. Serve the shanks over risotto, topped with the bright gremolata.',
],

'smoked-lamb-saddle': [
    'Score the fat layer on the saddle in a crosshatch pattern, cutting about 1/4 inch deep.',
    `Mix olive oil with chopped fresh rosemary, thyme, and minced garlic. Rub this paste all over the lamb. Season with salt and pepper. For added complexity, dust with ${link("Dizzy Pig All-Purpose Rub", P.dizzyPig)}.`,
    `Set your smoker to 275°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a subtle, elegant smoke.`,
    'Place the saddle on the smoker and cook for about 3 hours, maintaining a steady temperature.',
    `Check the internal temperature with an ${link('instant-read thermometer', P.thermapen)} in the thickest part. Remove at 140°F for medium.`,
    `Rest for 20 minutes using ${link('heat-resistant gloves', P.gloves)} to handle it. Carve at the table for a dramatic presentation.`,
],

'smoked-lamb-and-apricot-tagine': [
    `Season the cubed lamb shoulder with ras el hanout and salt. If you don\'t have ras el hanout, ${link("Dizzy Pig All-Purpose Rub", P.dizzyPig)} with a pinch of cinnamon works as a substitute.`,
    `Set your smoker to 275°F with ${link('cherry wood chunks', P.cherry)} for a mild smoke.`,
    'Spread the lamb cubes on the smoker grate in a single layer and smoke for about 2 hours until they develop a smoky crust.',
    'Transfer the smoked lamb to a tagine or Dutch oven. Add dried apricots, almonds, chicken broth, and the cinnamon stick.',
    `Cover and simmer at 300°F until the lamb is tender and the internal temperature of the cubes reaches 195°F — about 2-3 more hours. Check with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Drizzle with honey and give it a final stir. Serve over fluffy couscous.',
],

// ────────────────────────────────────────
// CHICKEN
// ────────────────────────────────────────

'classic-smoked-whole-chicken': [
    'Remove the giblets from the cavity and pat the entire chicken dry with paper towels — inside and out. Dry skin is the key to crispy skin.',
    `Coat the chicken with olive oil. Mix paprika, garlic powder, onion powder, cayenne, salt, and pepper and apply the rub all over, including under the skin where you can loosen it. For a rub designed specifically for poultry, try ${link("Plowboys Yardbird Rub", P.yardbird)}.`,
    'Let the chicken sit at room temperature for 30 minutes so the rub adheres and the skin starts to dry.',
    `Set your smoker to 275°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a sweet, mild smoke that complements chicken perfectly.`,
    'Place the chicken breast-side up on the smoker grate. Close the lid and let it cook undisturbed for about 2.5-3 hours.',
    `The chicken is done when the internal temperature reaches 165°F in the thickest part of the breast and 175°F in the thigh. Verify with an ${link('instant-read thermometer', P.thermapen)} — always check both spots.`,
    'Rest for 15 minutes before carving. The juices need time to redistribute for the juiciest results.',
],

'smoked-chicken-wings': [
    'Pat the wings completely dry with paper towels. Toss them with baking powder, salt, paprika, and garlic powder. The baking powder is the secret to crispy smoked skin.',
    `Spread the wings on a wire rack set over a sheet pan and refrigerate uncovered for at least 4 hours, or overnight. This dries the skin further. Season with ${link("Plowboys Yardbird Rub", P.yardbird)} before cooking for maximum flavor.`,
    `Set your smoker to 250°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a clean, mild smoke.`,
    'Arrange the wings on the smoker grate in a single layer and smoke for about 1.5 hours.',
    'Increase the smoker temperature to 375°F for the last 30 minutes to crisp up the skin. This step makes all the difference.',
    `The wings are done when the internal temperature reaches 175°F. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    `Toss the wings in your favorite sauce — ${link("Sweet Baby Ray's BBQ Sauce", P.sweetBabyRays)} or buffalo sauce are classic choices. Serve immediately while the skin is still crispy.`,
],

'smoked-beer-can-chicken': [
    `Season the whole chicken generously inside and out with ${link("Plowboys Yardbird Rub", P.yardbird)}.`,
    'Open a can of beer and drink (or pour out) about half. Drop a tablespoon of butter into the can.',
    'Lower the chicken cavity onto the beer can so the chicken sits upright. Tuck the wing tips behind the back.',
    `Set your smoker to 275°F with ${link('cherry wood chunks', P.cherry)} for a mild, fruity smoke.`,
    'Carefully stand the chicken (on its beer can) on the smoker grate. The legs and can form a stable tripod.',
    `Smoke for about 2-2.5 hours. The chicken is done when the breast reaches 165°F and the thigh reaches 175°F. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    `Use ${link('heat-resistant gloves', P.gloves)} to carefully lift the chicken and can off the smoker. Rest for 10 minutes, then carefully remove the can and carve.`,
],

'smoked-chicken-thighs': [
    `Pat the bone-in chicken thighs completely dry. Coat with olive oil and season generously with ${link("Plowboys Yardbird Rub", P.yardbird)} for crispy, flavorful skin.`,
    `Set your smoker to 275°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a mild, sweet smoke.`,
    'Place the thighs skin-side up on the smoker grate. Smoke for about 1.5 hours.',
    `If you want sauced thighs, brush with ${link("Sweet Baby Ray's BBQ Sauce", P.sweetBabyRays)} during the last 15 minutes using a ${link('silicone basting brush', P.bastingBrush)}.`,
    `The thighs are done when the internal temperature reaches 175°F in the thickest part. Verify with an ${link('instant-read thermometer', P.thermapen)}. Chicken thighs are forgiving — they stay juicy even at higher temps.`,
],

'smoked-chicken-quarters': [
    `Season the leg quarters generously on all sides with ${link("Plowboys Yardbird Rub", P.yardbird)}.`,
    `Set your smoker to 275°F with ${link('cherry wood chunks', P.cherry)} for a mild smoke.`,
    'Place the quarters skin-side up on the smoker grate with space between each one for good airflow.',
    'Smoke for 2-2.5 hours, spritzing with apple cider vinegar every 45 minutes after the first hour to keep the skin from drying out.',
    `The quarters are done when the thigh reaches 175°F. Verify with an ${link('instant-read thermometer', P.thermapen)} in the thickest part of the thigh, away from bone.`,
    'Rest for 10 minutes before serving.',
],

'smoked-chicken-breast': [
    'Brine the chicken breasts by dissolving 1/4 cup salt and 2 tablespoons sugar in 4 cups cold water. Submerge the breasts and refrigerate for 2 hours. This is essential for juicy results since breast meat is lean.',
    `Remove from the brine, pat completely dry, and coat lightly with olive oil. Season with paprika, salt, and pepper. For more flavor, use ${link("Plowboys Yardbird Rub", P.yardbird)}.`,
    `Set your smoker to 250°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a mild smoke.`,
    'Place the breasts on the smoker grate and cook for 1-1.5 hours. Breast meat dries out easily, so don\'t walk away.',
    `Remove the breasts when the internal temperature reaches 160°F — check with an ${link('instant-read thermometer', P.thermapen)}. The temperature will carry over to 165°F during rest.`,
    'Rest for 10 minutes, then slice against the grain. Perfect for meal prep, salads, or sandwiches.',
],

'smoked-spatchcock-chicken': [
    'Place the chicken breast-side down. Using sharp kitchen shears, cut along both sides of the backbone to remove it completely. Flip the chicken over and press firmly on the breastbone until it cracks flat.',
    `Mix softened butter with chopped fresh herbs and minced garlic. Loosen the skin over the breast and thighs and spread the herb butter directly on the meat underneath. Season the outside with salt, pepper, and ${link("Plowboys Yardbird Rub", P.yardbird)}.`,
    `Set your smoker to 300°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a mild, sweet smoke.`,
    'Place the flattened chicken skin-side up on the smoker grate. Spatchcocking exposes more surface area, so it cooks faster and more evenly than a whole bird.',
    `Smoke for about 1.5-2 hours. The chicken is done when the breast reaches 165°F and the thigh reaches 175°F. Verify both with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Rest for 10 minutes, then carve. The skin should be golden and crispy all over.',
],

'smoked-buffalo-chicken-dip': [
    `Season 2 pounds of chicken breast with salt and pepper. Smoke at 275°F with ${link('Bear Mountain Apple Pellets', P.apple)} until the internal temperature reaches 165°F — check with an ${link('instant-read thermometer', P.thermapen)}.`,
    `Shred the smoked chicken using ${link('meat shredding claws', P.meatClaws)}.`,
    'In a cast iron skillet, combine the shredded chicken, softened cream cheese, ranch dressing, and buffalo sauce. Stir until everything is mixed together.',
    'Place the cast iron skillet on the smoker at 275°F and smoke for about 45 minutes, stirring once halfway through.',
    'Top with shredded cheddar cheese and return to the smoker until the cheese is melted and bubbly.',
    'Garnish with sliced green onions and serve hot with tortilla chips, celery sticks, or crackers.',
],

'smoked-chicken-drumsticks': [
    `Pat the drumsticks completely dry. Season generously with ${link("Plowboys Yardbird Rub", P.yardbird)}.`,
    `Set your smoker to 275°F with ${link('cherry wood chunks', P.cherry)} for a mild smoke.`,
    'Arrange the drumsticks on the smoker grate standing upright if possible, or laying flat with space between each one.',
    'Smoke for about 1.5 hours until the skin is set and has good color.',
    `Brush with ${link("Sweet Baby Ray's BBQ Sauce", P.sweetBabyRays)} using a ${link('silicone basting brush', P.bastingBrush)} and cook for 15 more minutes to let the sauce tack up.`,
    `The drumsticks are done when the internal temperature reaches 175°F. Check with an ${link('instant-read thermometer', P.thermapen)} in the thickest part without touching bone.`,
],

'smoked-chicken-salad': [
    `Season the chicken breasts with salt, pepper, and a light dusting of ${link("Plowboys Yardbird Rub", P.yardbird)}.`,
    `Smoke at 250°F with ${link('Bear Mountain Apple Pellets', P.apple)} for 1-1.5 hours until the internal temperature reaches 165°F. Check with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Let the chicken cool completely, then dice into small cubes.',
    'In a bowl, combine the diced smoked chicken with mayonnaise, diced celery, finely chopped red onion, and Dijon mustard.',
    'Season to taste with salt and pepper. Refrigerate for at least 1 hour to let the flavors meld.',
    'Serve on bread, in lettuce wraps, or over a bed of greens.',
],

'smoked-jerk-chicken': [
    'In a blender or food processor, combine scotch bonnet peppers, garlic cloves, lime juice, soy sauce, fresh thyme leaves, and a generous amount of jerk seasoning. Blend into a thick paste.',
    'Score the chicken pieces with shallow cuts. Coat thoroughly with the jerk marinade, working it into the cuts. Cover and marinate overnight in the fridge.',
    `Set your smoker to 275°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a mild smoke that lets the bold jerk flavors dominate.`,
    'Place the chicken pieces on the smoker grate and cook for about 2-2.5 hours.',
    `The chicken is done when the breast pieces reach 165°F and the thigh pieces reach 175°F. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Serve with rice and peas, fried plantains, and extra hot sauce on the side.',
],

'smoked-lemon-herb-chicken': [
    'Zest and juice 2 lemons. Mix the zest and juice with olive oil, chopped fresh herbs (rosemary, thyme, parsley), and minced garlic to create a bright marinade.',
    `Coat the chicken inside and out with the lemon herb mixture. Stuff the squeezed lemon halves inside the cavity. Season the outside with salt, pepper, and a dusting of ${link("Plowboys Yardbird Rub", P.yardbird)}.`,
    `Set your smoker to 275°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a clean, mild smoke.`,
    'Place the chicken breast-side up on the smoker grate and cook for about 3 hours.',
    `The chicken is done when the breast reaches 165°F and the thigh reaches 175°F. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Rest for 15 minutes before carving. The lemon and herb aroma when you slice into it is incredible.',
],

'smoked-chicken-tacos': [
    `Season the bone-in chicken thighs generously with your favorite taco seasoning. For a smoky twist, mix in some ${link("Plowboys Yardbird Rub", P.yardbird)}.`,
    `Set your smoker to 275°F with ${link('cherry wood chunks', P.cherry)} for a mild smoke.`,
    `Smoke the thighs for about 2.5 hours until the internal temperature reaches 175°F. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    `Shred the chicken using ${link('meat shredding claws', P.meatClaws)}.`,
    'Warm corn tortillas on the grill or in a dry skillet until pliable.',
    'Assemble the tacos with shredded chicken, salsa verde, diced onion, fresh cilantro, and a squeeze of lime.',
],

'smoked-teriyaki-chicken': [
    `Place the chicken thighs in a zip-top bag and pour in the teriyaki sauce. For an upgrade over bottled teriyaki, try ${link("Bachan's Japanese BBQ Sauce", P.bachans)}. Marinate in the fridge for at least 4 hours.`,
    'Remove the thighs from the marinade, reserving the liquid, and pat them slightly dry.',
    `Set your smoker to 275°F with ${link('cherry wood chunks', P.cherry)} for a mild, complementary smoke.`,
    `Smoke for about 2 hours, brushing with the reserved marinade mixed with honey every 30 minutes using a ${link('silicone basting brush', P.bastingBrush)}.`,
    `Continue cooking until the internal temperature reaches 175°F. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Garnish with toasted sesame seeds and sliced green onions. Serve over steamed rice.',
],

'smoked-chicken-nachos': [
    'If you don\'t have leftover smoked chicken, smoke 2 chicken breasts at 250°F until the internal temperature reaches 165°F, then shred.',
    'Spread a layer of tortilla chips on a large sheet pan or cast iron skillet.',
    'Top with the shredded smoked chicken, sliced jalapenos, and a generous amount of shredded Mexican-blend cheese.',
    `Place the pan on the smoker at 350°F with ${link('cherry wood chunks', P.cherry)} until the cheese is fully melted and bubbly — about 10-15 minutes.`,
    'Top with sour cream, salsa, guacamole, and fresh cilantro. Serve immediately while the chips are still crispy.',
],

'alabama-white-sauce-chicken': [
    `Season the whole chicken generously with ${link("Plowboys Yardbird Rub", P.yardbird)}.`,
    `Set your smoker to 275°F with ${link('hickory wood chunks', P.hickory)} for a classic Southern smoke.`,
    'Place the chicken breast-side up on the smoker and cook for about 3 hours.',
    `The chicken is done when the breast reaches 165°F. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    `While the chicken smokes, make the Alabama white sauce: whisk together mayonnaise, apple cider vinegar, lemon juice, prepared horseradish, salt, and pepper. You can also use ${link("Big Bob Gibson White Sauce", P.whiteSauce)} for an authentic Alabama original.`,
    'Rest the chicken for 15 minutes, then carve and serve with the white sauce on the side for dipping.',
],

'smoked-chicken-and-waffles': [
    'Soak the bone-in chicken thighs in buttermilk overnight in the fridge. This tenderizes the meat and creates a base for the crispy coating.',
    `Set your smoker to 250°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a mild smoke. Season the thighs with salt and pepper. Smoke until the internal temperature reaches 175°F — verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Set up a dredging station: seasoned flour in one dish (add Cajun seasoning for a kick). Remove the smoked thighs from the smoker and dredge them in the seasoned flour.',
    'Fry the dredged thighs in 350°F oil until the coating is golden and crispy — about 3-4 minutes since the chicken is already cooked through.',
    'While the chicken fries, toast or make your waffles.',
    'Plate each waffle with a piece of crispy smoked-then-fried chicken on top. Drizzle generously with warm maple syrup.',
],

'smoked-chicken-quesadillas': [
    'If you don\'t have leftover smoked chicken, smoke 2 chicken breasts at 250°F until the internal temperature reaches 165°F, then shred or dice.',
    'Saute sliced bell peppers and onions in a skillet over medium heat until softened and slightly charred.',
    'Lay a flour tortilla flat. Spread shredded Mexican-blend cheese over half, then add smoked chicken and the sauteed peppers and onions. Fold the tortilla in half.',
    'Cook the quesadilla on a hot grill or skillet for about 2-3 minutes per side until the tortilla is golden and crispy and the cheese is melted.',
    'Cut into wedges and serve with sour cream and salsa.',
],

'smoked-chicken-caesar-salad': [
    `Season the chicken breasts with salt, pepper, and a light coating of ${link("Plowboys Yardbird Rub", P.yardbird)}.`,
    `Smoke at 250°F with ${link('Bear Mountain Apple Pellets', P.apple)} for 1-1.5 hours until the internal temperature reaches 165°F. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Let the chicken cool slightly, then slice it into strips.',
    'Chop crisp romaine lettuce and place it in a large bowl. Toss with Caesar dressing until evenly coated.',
    'Plate the dressed romaine and top with sliced smoked chicken, freshly shaved Parmesan cheese, crunchy croutons, and a squeeze of lemon.',
],

'thai-smoked-chicken': [
    'In a bowl, whisk together coconut milk, red curry paste, fish sauce, and brown sugar to make the marinade.',
    'Place the chicken pieces in a large zip-top bag, pour in the marinade, seal, and refrigerate for at least 4 hours.',
    'Remove the chicken from the marinade, shaking off excess. Reserve the marinade for basting.',
    `Set your smoker to 275°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a mild smoke.`,
    `Smoke for about 2.5 hours, basting with the reserved marinade every 45 minutes using a ${link('silicone basting brush', P.bastingBrush)}.`,
    `The chicken is done when the breast reaches 165°F and the thigh reaches 175°F. Verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Garnish with fresh Thai basil leaves and serve with jasmine rice and a wedge of lime.',
],

// ────────────────────────────────────────
// SEAFOOD
// ────────────────────────────────────────

'cedar-plank-smoked-salmon': [
    'Soak the cedar plank in water for at least 2 hours before cooking. Place a heavy object on top to keep it submerged.',
    'Mix brown sugar, salt, black pepper, and chopped fresh dill to make the cure. Apply the cure generously on the flesh side of the salmon. Place the salmon skin-side down on a plate, cover with plastic wrap, and refrigerate for 4 hours.',
    'Rinse the cured salmon under cold water and pat completely dry with paper towels. Let it sit uncovered at room temperature for about 30 minutes until the surface develops a tacky sheen called a pellicle — this helps the smoke adhere.',
    `Set your smoker to 225°F. Use ${link('Traeger Signature Blend Pellets', P.traegerBlend)} for a balanced, mild smoke.`,
    'Place the salmon skin-side down on the soaked cedar plank. Put the plank directly on the smoker grate.',
    `Smoke for 45-60 minutes. The salmon is done when the internal temperature reaches 145°F and the flesh flakes easily with a fork. Check with an ${link('instant-read thermometer', P.thermapen)} in the thickest part.`,
    'Slide the salmon off the plank and serve immediately with lemon wedges and fresh dill.',
],

'smoked-shrimp': [
    'Peel and devein the shrimp, leaving the tails on for easy handling.',
    `Toss the shrimp with melted butter, Cajun seasoning, and minced garlic in a bowl. For a versatile seasoning, try ${link("Dizzy Pig All-Purpose Rub", P.dizzyPig)}.`,
    `Arrange the shrimp in a single layer on a ${link('grilling basket', P.grillBasket)} or directly on the smoker grate.`,
    `Set your smoker to 225°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a light, sweet smoke.`,
    'Smoke for 20-30 minutes. Shrimp cook fast — they\'re done when they turn pink and opaque. Don\'t overcook or they\'ll get rubbery.',
    'Squeeze fresh lemon juice over the top, garnish with chopped parsley, and serve immediately.',
],

'smoked-lobster-tails': [
    'Using sharp kitchen shears, cut each lobster tail down the center of the top shell, stopping just before the tail fin. Gently pull the shell apart and lift the meat up so it sits on top of the shell — this is called "butterflying."',
    'Melt butter with minced garlic and a squeeze of lemon juice.',
    `Brush the lobster meat generously with the garlic butter using a ${link('silicone basting brush', P.bastingBrush)}.`,
    `Set your smoker to 225°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a delicate, sweet smoke.`,
    'Place the lobster tails shell-side down on the smoker grate. Smoke for 30-45 minutes, basting with garlic butter every 10 minutes.',
    `The lobster is done when the meat is opaque and firm, and the internal temperature reaches 140°F. Check with an ${link('instant-read thermometer', P.thermapen)} in the thickest part.`,
    'Serve immediately with the remaining melted garlic butter for dipping.',
],

'smoked-trout': [
    'Prepare a brine by dissolving 1/4 cup salt and 2 tablespoons brown sugar in 4 cups cold water. Submerge the whole trout and refrigerate for 2 hours.',
    'Remove the trout from the brine, rinse under cold water, and pat dry. Stuff each cavity with fresh dill sprigs and thin lemon slices.',
    'Let the trout air-dry on a rack for about 30 minutes until the skin feels tacky to the touch.',
    `Set your smoker to 200°F with ${link('Traeger Signature Blend Pellets', P.traegerBlend)} for a mild, balanced smoke.`,
    `Smoke for about 1.5 hours until the fish flakes easily with a fork and the internal temperature reaches 145°F. Check with an ${link('instant-read thermometer', P.thermapen)}.`,
],

'smoked-oysters': [
    'Shuck the oysters carefully, keeping the deeper half of the shell and the oyster liquor.',
    'Melt butter with minced garlic and a dash of hot sauce.',
    `Top each oyster with a spoonful of the garlic butter using a ${link('silicone basting brush', P.bastingBrush)} or small spoon.`,
    `Set your smoker to 300°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a light, mild smoke.`,
    'Place the oysters on the half shell directly on the smoker grate and smoke for 10-15 minutes.',
    'Sprinkle grated Parmesan cheese over each oyster during the last 5 minutes so it melts and gets bubbly.',
    'Finish with a dash of hot sauce and serve immediately.',
],

'smoked-crab-legs': [
    'Partially split the crab legs lengthwise with kitchen shears to expose the meat — this lets the smoke flavor penetrate.',
    `Set your smoker to 250°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a light, sweet smoke.`,
    'Place the crab legs directly on the smoker grate and smoke for 25-30 minutes until heated through.',
    'While the crab smokes, melt butter with minced garlic and a teaspoon of Old Bay seasoning.',
    'Serve the smoked crab legs with the seasoned butter and plenty of lemon wedges for squeezing.',
],

'smoked-mahi-mahi': [
    `Coat the mahi mahi fillets lightly with olive oil and season with jerk seasoning. For a versatile option, try ${link("Dizzy Pig All-Purpose Rub", P.dizzyPig)}.`,
    `Set your smoker to 225°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a mild, sweet smoke.`,
    `Place the fillets on the smoker grate or in a ${link('grilling basket', P.grillBasket)} to prevent sticking.`,
    `Smoke for 35-45 minutes until the fish is opaque throughout and the internal temperature reaches 145°F. Check with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Top each fillet with a generous scoop of fresh mango salsa and serve with lime wedges.',
],

'smoked-scallops': [
    'Wrap each large sea scallop with a strip of bacon, securing with a toothpick through the center.',
    `Set your smoker to 275°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a light smoke.`,
    'Place the bacon-wrapped scallops on the smoker grate and smoke for 30-45 minutes.',
    'The scallops are done when the bacon is crispy and the scallops are firm and opaque inside.',
    'Drizzle with lemon butter and chopped fresh chives before serving.',
],

'smoked-tuna-steaks': [
    'Marinate the ahi tuna steaks in soy sauce and sesame oil for about 30 minutes at room temperature. Don\'t marinate longer or the acid will start to "cook" the tuna.',
    'Press sesame seeds onto both sides of each steak.',
    `Cold smoke at 150°F with ${link('Bear Mountain Apple Pellets', P.apple)} for just 20 minutes. You want smoke flavor without fully cooking the tuna.`,
    `Sear each steak on a screaming-hot grill or cast iron skillet for about 30 seconds per side. The inside should still be rare. Use a ${link('grilling tool set', P.toolSet)} for easy handling on the hot grill.`,
    'Slice against the grain and serve rare with wasabi, pickled ginger, and soy sauce.',
],

'smoked-catfish': [
    `Pat the catfish fillets dry and brush lightly with melted butter using a ${link('silicone basting brush', P.bastingBrush)}.`,
    `Season with Cajun seasoning on both sides. ${link("Dizzy Pig All-Purpose Rub", P.dizzyPig)} with a pinch of cayenne also works great.`,
    `Set your smoker to 225°F with ${link('hickory wood chunks', P.hickory)} for a classic Southern smoke.`,
    `Place the fillets on the smoker grate and smoke for 1-1.5 hours until the fish flakes easily and the internal temperature reaches 145°F. Check with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Serve with tartar sauce, lemon wedges, and coleslaw.',
],

'smoked-swordfish': [
    'Brush the swordfish steaks with olive oil and season with herbes de Provence, salt, and pepper.',
    `Set your smoker to 225°F with ${link('Traeger Signature Blend Pellets', P.traegerBlend)} for a mild, balanced smoke.`,
    `Smoke for 35-45 minutes until the fish is opaque and firm, and the internal temperature reaches 145°F. Check with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Top each steak with a pat of herb compound butter (softened butter mixed with fresh herbs and lemon zest) and serve.',
],

'smoked-clams': [
    'Scrub the clams thoroughly under cold running water. Discard any that are already open and won\'t close when tapped.',
    'Place the clams in a smoker-safe pan or cast iron skillet. Add white wine, butter, and minced garlic.',
    `Set your smoker to 300°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a light smoke.`,
    'Smoke until the clams open — about 15-20 minutes. Discard any clams that don\'t open.',
    'Garnish with fresh chopped parsley and serve immediately with crusty bread for soaking up the smoky broth.',
],

'smoked-mackerel': [
    'Prepare a brine by dissolving 1/4 cup salt and 2 tablespoons sugar in 4 cups cold water. Add a few bay leaves and peppercorns. Submerge the mackerel and refrigerate for 1 hour.',
    'Remove from the brine, rinse, and pat thoroughly dry. Let the fish air-dry on a rack for about 1 hour until the skin is tacky — this pellicle is crucial for smoke to adhere.',
    `Set your smoker to 200°F with ${link('Traeger Signature Blend Pellets', P.traegerBlend)} for a mild, balanced smoke.`,
    `Smoke for about 2 hours until the fish flakes easily and the internal temperature reaches 145°F. Check with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Serve the smoked mackerel with crackers and cream cheese, or flake it into a salad.',
],

'smoked-shrimp-boil': [
    'Place the baby potatoes in a large foil packet. Drizzle with olive oil, season with Old Bay, and seal the packet.',
    `Put the potato packet on the smoker at 275°F with ${link('Traeger Signature Blend Pellets', P.traegerBlend)} for a mild smoke. Cook for about 30 minutes until the potatoes are nearly tender.`,
    'Add sliced smoked sausage and halved ears of corn to the packet (or a second packet). Reseal and return to the smoker for 20 more minutes.',
    'Add the peeled shrimp to the packet for the final 10 minutes — shrimp cook fast and will turn rubbery if overcooked.',
    `Melt butter and mix with Old Bay seasoning. Dump everything onto a tray or newspaper and pour the seasoned butter over the top. Serve immediately with plenty of lemon wedges.`,
],

'smoked-halibut': [
    `Brush the halibut fillets lightly with olive oil and season with salt and white pepper. For more flavor, dust with ${link("Dizzy Pig All-Purpose Rub", P.dizzyPig)}.`,
    `Set your smoker to 225°F with ${link('Traeger Signature Blend Pellets', P.traegerBlend)} for a light, balanced smoke.`,
    `Place the fillets on the smoker grate or in a ${link('grilling basket', P.grillBasket)} to prevent sticking.`,
    `Smoke for 35-45 minutes until the fish is opaque and flakes easily. The internal temperature should reach 145°F — verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Make a quick caper lemon butter sauce by browning butter, then adding capers and a squeeze of lemon. Drizzle over the halibut and serve.',
],

'smoked-tilapia': [
    'Brush the tilapia fillets lightly with olive oil. Season with paprika, garlic powder, salt, and pepper.',
    'Place thin orange slices on top of each fillet for moisture and a hint of citrus flavor.',
    `Set your smoker to 225°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a light, sweet smoke.`,
    `Smoke for 35-45 minutes until the fish is opaque and flakes easily. The internal temperature should reach 145°F — verify with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Garnish with fresh cilantro and serve with rice.',
],

'smoked-mussels': [
    'Clean the mussels by scrubbing the shells and removing any beards. Discard any mussels that are open and won\'t close when tapped.',
    'Place the mussels in a cast iron pan or smoker-safe skillet. Add white wine, butter, minced garlic, and diced shallots.',
    `Set your smoker to 350°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a light, quick smoke.`,
    'Smoke until all the mussels open — about 10-15 minutes. Discard any that stay closed.',
    'Garnish with freshly chopped parsley and serve straight from the pan with crusty bread for dipping into the smoky broth.',
],

'smoked-sea-bass': [
    'Mix miso paste, mirin, and sake together to make a glaze. Brush the sea bass fillets generously with the miso glaze. Cover and marinate in the fridge for 2 hours.',
    `Set your smoker to 225°F with ${link('Bear Mountain Apple Pellets', P.apple)} for a delicate, sweet smoke.`,
    `Place the fillets on the smoker grate or in a ${link('grilling basket', P.grillBasket)} to prevent sticking.`,
    `Smoke for 45-60 minutes, brushing with more miso glaze halfway through using a ${link('silicone basting brush', P.bastingBrush)}.`,
    `The sea bass is done when the flesh is opaque and flakes easily. Verify the internal temperature reaches 145°F with an ${link('instant-read thermometer', P.thermapen)}.`,
],

'smoked-cod': [
    'Prepare a brine by dissolving 1/4 cup salt and 2 tablespoons sugar in 4 cups cold water. Submerge the cod fillets and refrigerate for 30 minutes.',
    'Remove from the brine, rinse under cold water, and pat completely dry. Let the fillets air-dry on a rack until the surface forms a tacky pellicle — about 30-45 minutes.',
    `Set your smoker to 200°F with ${link('Traeger Signature Blend Pellets', P.traegerBlend)} for a mild, clean smoke.`,
    `Smoke for about 2 hours until the fish flakes easily and the internal temperature reaches 145°F. Check with an ${link('instant-read thermometer', P.thermapen)}.`,
    'Flake the smoked cod for fish cakes, chowder, or serve it as-is with crackers.',
],

'smoked-salmon-dip': [
    'If you\'re starting with raw salmon, smoke it at 225°F until it reaches 145°F internally, then let it cool and flake it. Otherwise, flake 1 pound of pre-smoked salmon into small pieces.',
    'Beat the cream cheese in a bowl until smooth and fluffy.',
    'Stir in the sour cream, fresh lemon juice, and chopped fresh dill until well combined.',
    'Fold in the flaked smoked salmon gently — you want chunks of salmon throughout, not a uniform paste.',
    'Top with capers and a sprinkle of extra dill. Refrigerate for at least 30 minutes to let the flavors meld.',
    'Serve with crackers, toasted bread, or cucumber slices.',
],

};

// ============================================================
// Main — update all recipes in the database
// ============================================================

async function main() {
    await db.initPromise;

    const slugs = Object.keys(recipes);
    console.log(`\nRewriting instructions for ${slugs.length} recipes...\n`);

    let updated = 0;
    let skipped = 0;
    const errors = [];

    for (const slug of slugs) {
        const row = db.queryOne('SELECT id, title FROM recipes WHERE slug = ?', [slug]);
        if (!row) {
            console.log(`  SKIP (not in DB): ${slug}`);
            skipped++;
            continue;
        }

        const instructions = recipes[slug];
        const json = JSON.stringify(instructions);

        try {
            db.execute('UPDATE recipes SET instructions = ? WHERE id = ?', [json, row.id]);
            console.log(`  OK: ${row.title} (${instructions.length} steps)`);
            updated++;
        } catch (err) {
            console.log(`  ERROR: ${row.title} — ${err.message}`);
            errors.push(slug);
        }
    }

    console.log('\n========================================');
    console.log(`Updated: ${updated}`);
    console.log(`Skipped: ${skipped}`);
    console.log(`Errors:  ${errors.length}`);
    if (errors.length > 0) {
        console.log('Failed slugs:', errors.join(', '));
    }
    console.log('========================================\n');

    process.exit(0);
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});

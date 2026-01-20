/**
 * Add New Recipes Script
 * Adds 34 new BBQ recipes:
 * - 11 beef recipes
 * - 17 pork recipes
 * - 4 chicken recipes
 * - 2 lamb recipes
 */

require('dotenv').config();
const db = require('../config/database');

// New recipes organized by category
const newRecipes = {
    beef: [
        {
            title: 'Smoked Beef Barbacoa',
            description: 'Tender, shreddable beef cheeks and chuck with Mexican spices, perfect for tacos.',
            prep_time: 30,
            cook_time: 480,
            servings: 12,
            ingredients: [
                '4 lb beef chuck roast',
                '2 lb beef cheeks',
                '6 dried guajillo chiles',
                '4 chipotle peppers in adobo',
                '8 cloves garlic',
                '1/4 cup apple cider vinegar',
                '2 tbsp cumin',
                '1 tbsp oregano',
                '1 tsp cloves',
                '1 cup beef broth',
                'Salt and pepper'
            ],
            instructions: [
                'Toast dried chiles until fragrant and rehydrate in hot water.',
                'Blend chiles with chipotles, garlic, vinegar, and spices.',
                'Season beef generously with salt and pepper.',
                'Coat beef with chile paste.',
                'Smoke at 250°F for 4 hours until bark forms.',
                'Transfer to Dutch oven with beef broth.',
                'Cover and continue cooking until internal temp reaches 205°F and meat shreds easily.',
                'Shred beef and mix with cooking liquid.',
                'Serve in warm tortillas with onion and cilantro.'
            ]
        },
        {
            title: 'Smoked Pastrami',
            description: 'Classic New York deli-style pastrami smoked from corned beef.',
            prep_time: 30,
            cook_time: 540,
            servings: 14,
            ingredients: [
                '6 lb corned beef brisket flat',
                '1/4 cup coarse black pepper',
                '2 tbsp coriander seeds, crushed',
                '1 tbsp garlic powder',
                '1 tbsp onion powder',
                '1 tbsp brown sugar',
                '1 tsp mustard powder'
            ],
            instructions: [
                'Soak corned beef in cold water for 24 hours, changing water every 8 hours.',
                'Pat dry and let sit uncovered in fridge overnight.',
                'Mix pepper, coriander, and spices for the rub.',
                'Apply rub generously, pressing into meat.',
                'Smoke at 225°F with oak or hickory for 6 hours.',
                'Wrap in butcher paper at 165°F internal.',
                'Continue smoking until internal temp reaches 203°F and is probe tender.',
                'Rest wrapped for 1 hour.',
                'Slice thin against the grain.',
                'Serve on rye with mustard.'
            ]
        },
        {
            title: 'Coffee Rubbed Smoked Brisket',
            description: 'Bold brisket with a smoky coffee crust that adds depth without bitterness.',
            prep_time: 30,
            cook_time: 720,
            servings: 16,
            ingredients: [
                '14 lb whole packer brisket',
                '1/4 cup finely ground coffee',
                '1/4 cup coarse black pepper',
                '2 tbsp kosher salt',
                '2 tbsp dark brown sugar',
                '1 tbsp smoked paprika',
                '1 tbsp garlic powder',
                '1 tsp cayenne',
                'Post oak wood'
            ],
            instructions: [
                'Trim brisket, leaving 1/4 inch fat cap.',
                'Mix coffee with pepper, salt, sugar, and spices.',
                'Apply rub generously to all surfaces.',
                'Let rest at room temperature for 1 hour.',
                'Smoke at 250°F fat-side up with post oak.',
                'Spritz with beef broth every 90 minutes after bark sets.',
                'Wrap in butcher paper at 165°F internal.',
                'Continue cooking until internal temp reaches 203°F and is probe tender.',
                'Rest in cooler for 2 hours minimum.',
                'Slice against the grain and serve.'
            ]
        },
        {
            title: 'Smoked Beef Kabobs',
            description: 'Tender sirloin chunks with vegetables, kissed with smoke.',
            prep_time: 30,
            cook_time: 90,
            servings: 6,
            ingredients: [
                '2 lb sirloin, cut into 1.5 inch cubes',
                '2 bell peppers, chunked',
                '1 large red onion, chunked',
                '8 oz mushrooms',
                '1/4 cup olive oil',
                '2 tbsp Worcestershire sauce',
                '4 cloves garlic, minced',
                '1 tbsp smoked paprika',
                'Salt and pepper',
                'Metal skewers'
            ],
            instructions: [
                'Mix olive oil, Worcestershire, garlic, and seasonings.',
                'Toss beef in marinade for 2 hours.',
                'Thread beef and vegetables alternately on skewers.',
                'Season with salt and pepper.',
                'Smoke at 275°F for 45 minutes.',
                'Increase heat or transfer to hot grill.',
                'Sear until beef reaches 135°F internal for medium.',
                'Rest 5 minutes before serving.'
            ]
        },
        {
            title: 'Smoked Standing Rib Roast',
            description: 'Impressive holiday roast with a beautiful smoke ring and herb crust.',
            prep_time: 30,
            cook_time: 300,
            servings: 12,
            ingredients: [
                '10 lb standing rib roast (4 bones)',
                '4 tbsp softened butter',
                '6 cloves garlic, minced',
                '2 tbsp fresh rosemary, chopped',
                '2 tbsp fresh thyme',
                '2 tbsp kosher salt',
                '2 tbsp coarse black pepper',
                'Horseradish cream for serving'
            ],
            instructions: [
                'Remove roast from fridge 2 hours before cooking.',
                'Mix butter with garlic and herbs.',
                'Coat entire roast with herb butter.',
                'Season generously with salt and pepper.',
                'Smoke at 250°F with oak or hickory.',
                'Cook until internal temp reaches 120°F for rare (about 4-5 hours).',
                'Rest for 30 minutes (temp will rise to 130°F).',
                'Slice between ribs to serve.',
                'Serve with horseradish cream and au jus.'
            ]
        },
        {
            title: 'Smoked Brisket Burnt Ends',
            description: 'Caramelized, candy-like cubes of brisket point with intense flavor.',
            prep_time: 20,
            cook_time: 780,
            servings: 10,
            ingredients: [
                '6 lb brisket point',
                '1/4 cup beef rub',
                '1 cup BBQ sauce',
                '1/2 cup honey',
                '4 tbsp butter',
                '1/4 cup brown sugar',
                'Post oak or hickory wood'
            ],
            instructions: [
                'Season brisket point generously with rub.',
                'Smoke at 250°F for 6 hours until bark is set.',
                'Wrap in butcher paper and continue to 195°F internal.',
                'Cut into 1-inch cubes.',
                'Toss cubes with butter, honey, and brown sugar.',
                'Place in aluminum pan.',
                'Return to smoker uncovered for 1-2 hours.',
                'Add BBQ sauce and toss.',
                'Smoke until cubes are caramelized and jiggly.',
                'Internal temp should reach 205°F and cubes should be probe tender.'
            ]
        },
        {
            title: 'Reverse Seared Smoked Ribeye',
            description: 'Thick-cut ribeye smoked low then seared for the perfect crust.',
            prep_time: 15,
            cook_time: 75,
            servings: 2,
            ingredients: [
                '2 ribeye steaks, 1.5 inches thick',
                '2 tbsp olive oil',
                '2 tbsp coarse salt',
                '2 tbsp coarse black pepper',
                '4 tbsp butter',
                '4 cloves garlic',
                'Fresh thyme and rosemary'
            ],
            instructions: [
                'Let steaks come to room temperature.',
                'Season generously with salt and pepper.',
                'Smoke at 225°F until internal temp reaches 115°F (about 45 minutes).',
                'Heat cast iron skillet screaming hot.',
                'Add oil and sear steaks 1 minute per side.',
                'Add butter, garlic, and herbs.',
                'Baste steaks with butter.',
                'Remove at 130°F for medium-rare.',
                'Rest 5 minutes before slicing.'
            ]
        },
        {
            title: 'Smoked Beef Plate Ribs',
            description: 'Massive dinosaur ribs with incredible beefy flavor and smoke ring.',
            prep_time: 20,
            cook_time: 540,
            servings: 6,
            ingredients: [
                '1 rack beef plate ribs (3-4 bones, about 5 lb)',
                '3 tbsp coarse black pepper',
                '2 tbsp kosher salt',
                '1 tbsp garlic powder',
                'Beef broth for spritzing',
                'Post oak wood'
            ],
            instructions: [
                'Trim excess fat, leaving 1/4 inch cap.',
                'Remove membrane from bone side.',
                'Mix salt, pepper, and garlic for rub.',
                'Season ribs generously on all sides.',
                'Smoke at 275°F fat-side up for 4 hours.',
                'Spritz with beef broth every hour after bark sets.',
                'Wrap in butcher paper when bark is mahogany.',
                'Continue until internal temp reaches 203°F between the bones and is probe tender.',
                'Rest wrapped for 30 minutes.',
                'Slice between bones to serve.'
            ]
        },
        {
            title: 'Smoked Corned Beef',
            description: 'Transform store-bought corned beef into smoky perfection.',
            prep_time: 15,
            cook_time: 360,
            servings: 10,
            ingredients: [
                '5 lb corned beef brisket with spice packet',
                '2 tbsp brown sugar',
                '1 tbsp black pepper',
                '1 tbsp paprika',
                '1 tsp garlic powder',
                '1 tsp onion powder',
                'Hickory wood'
            ],
            instructions: [
                'Rinse corned beef and pat dry.',
                'Mix brown sugar with spices from packet and additional seasonings.',
                'Apply rub to all surfaces.',
                'Smoke at 250°F for 3 hours.',
                'Wrap in foil with 1/2 cup water.',
                'Continue cooking until internal temp reaches 200°F and is fork tender.',
                'Rest 20 minutes before slicing.',
                'Slice thin against the grain.',
                'Serve with cabbage and potatoes.'
            ]
        },
        {
            title: 'Smoked Beef Tallow Burger',
            description: 'Premium smash-style burger with beef tallow for ultimate flavor.',
            prep_time: 20,
            cook_time: 45,
            servings: 4,
            ingredients: [
                '1.5 lb ground beef (80/20)',
                '2 tbsp beef tallow',
                '1 tsp kosher salt',
                '1 tsp black pepper',
                '4 slices American cheese',
                '4 brioche buns',
                'Special sauce, lettuce, pickles'
            ],
            instructions: [
                'Divide beef into 8 loose balls (2 per burger).',
                'Season with salt and pepper.',
                'Smoke at 250°F for 20 minutes.',
                'Heat griddle or cast iron with beef tallow.',
                'Smash balls flat on hot surface.',
                'Cook 2 minutes until crispy edges.',
                'Flip and add cheese immediately.',
                'Stack two patties per bun.',
                'Add toppings and serve immediately.'
            ]
        },
        {
            title: 'Smoked Mississippi Pot Roast',
            description: 'The viral pot roast recipe adapted for the smoker with incredible depth.',
            prep_time: 15,
            cook_time: 420,
            servings: 8,
            ingredients: [
                '4 lb chuck roast',
                '1 packet ranch seasoning',
                '1 packet au jus mix',
                '8 pepperoncini peppers',
                '1/2 cup pepperoncini juice',
                '1/2 cup butter',
                'Salt and pepper'
            ],
            instructions: [
                'Season chuck roast with salt and pepper.',
                'Smoke at 275°F for 3 hours until bark forms.',
                'Transfer to Dutch oven or foil pan.',
                'Sprinkle with ranch and au jus mix.',
                'Add pepperoncini and juice.',
                'Top with butter.',
                'Cover tightly and return to smoker.',
                'Cook until internal temp reaches 205°F and meat shreds easily.',
                'Shred and mix with juices.',
                'Serve over mashed potatoes or on hoagie rolls.'
            ]
        }
    ],
    pork: [
        {
            title: 'Apple Cider Brined Smoked Pork Chops',
            description: 'Incredibly juicy thick-cut chops with sweet apple flavor.',
            prep_time: 30,
            cook_time: 90,
            servings: 4,
            ingredients: [
                '4 bone-in pork chops, 1.5 inches thick',
                '4 cups apple cider',
                '1/4 cup kosher salt',
                '1/4 cup brown sugar',
                '1 tbsp black peppercorns',
                '4 sprigs fresh thyme',
                '2 bay leaves',
                '2 tbsp BBQ rub',
                'Apple wood'
            ],
            instructions: [
                'Heat cider with salt, sugar, peppercorns, thyme, and bay leaves.',
                'Cool brine completely.',
                'Submerge pork chops in brine for 4-8 hours.',
                'Remove, rinse, and pat dry.',
                'Season with BBQ rub.',
                'Smoke at 250°F with apple wood.',
                'Cook until internal temp reaches 145°F (about 1-1.5 hours).',
                'Rest 10 minutes before serving.',
                'Serve with apple sauce.'
            ]
        },
        {
            title: 'Smoked Pork Carnitas',
            description: 'Mexican-style pulled pork with crispy edges, perfect for tacos.',
            prep_time: 25,
            cook_time: 420,
            servings: 12,
            ingredients: [
                '5 lb pork shoulder',
                '2 tbsp cumin',
                '1 tbsp oregano',
                '1 tbsp chili powder',
                '6 cloves garlic',
                '2 oranges, juiced',
                '2 limes, juiced',
                '1 white onion, quartered',
                'Salt and pepper'
            ],
            instructions: [
                'Mix cumin, oregano, chili powder, salt, and pepper.',
                'Season pork generously with spice mix.',
                'Smoke at 250°F for 4 hours until bark forms.',
                'Transfer to Dutch oven with citrus juice, garlic, and onion.',
                'Cover and continue cooking until internal temp reaches 205°F and meat pulls easily.',
                'Shred pork and spread on sheet pan.',
                'Broil until edges are crispy.',
                'Serve in warm tortillas with onion, cilantro, and lime.'
            ]
        },
        {
            title: 'Korean BBQ Smoked Pork Belly',
            description: 'Gochujang-glazed pork belly with Korean flavors.',
            prep_time: 30,
            cook_time: 300,
            servings: 8,
            ingredients: [
                '4 lb pork belly, skin removed',
                '1/4 cup gochujang',
                '3 tbsp soy sauce',
                '2 tbsp sesame oil',
                '3 tbsp honey',
                '4 cloves garlic, minced',
                '1 tbsp ginger, grated',
                'Sesame seeds',
                'Green onions'
            ],
            instructions: [
                'Score pork belly in crosshatch pattern.',
                'Mix gochujang, soy sauce, sesame oil, honey, garlic, and ginger.',
                'Reserve half of glaze for basting.',
                'Coat pork belly with remaining glaze.',
                'Marinate 4 hours or overnight.',
                'Smoke at 275°F for 3-4 hours.',
                'Baste with reserved glaze every 45 minutes.',
                'Cook until internal temp reaches 200°F and is probe tender.',
                'Slice thick and garnish with sesame seeds and green onions.',
                'Serve with lettuce wraps and kimchi.'
            ]
        },
        {
            title: 'Smoked Char Siu Pork',
            description: 'Chinese BBQ pork with signature red lacquered glaze.',
            prep_time: 25,
            cook_time: 180,
            servings: 6,
            ingredients: [
                '3 lb pork shoulder, cut into 2-inch strips',
                '1/4 cup hoisin sauce',
                '3 tbsp honey',
                '2 tbsp soy sauce',
                '2 tbsp Shaoxing wine',
                '1 tbsp five spice powder',
                '2 tbsp red bean curd (optional for color)',
                '4 cloves garlic'
            ],
            instructions: [
                'Mix all sauce ingredients except honey.',
                'Marinate pork strips overnight.',
                'Remove from marinade, reserve liquid.',
                'Smoke at 275°F for 2 hours.',
                'Mix reserved marinade with honey for glaze.',
                'Brush pork with glaze.',
                'Continue cooking until internal temp reaches 160°F, glazing every 20 minutes.',
                'Rest 10 minutes.',
                'Slice and serve over rice.',
                'Drizzle with any remaining glaze.'
            ]
        },
        {
            title: 'Sweet and Spicy Smoked Spare Ribs',
            description: 'Ribs with a perfect balance of heat and sweetness.',
            prep_time: 20,
            cook_time: 360,
            servings: 6,
            ingredients: [
                '2 racks spare ribs',
                '1/4 cup brown sugar',
                '2 tbsp paprika',
                '1 tbsp cayenne pepper',
                '1 tbsp garlic powder',
                '1 tbsp onion powder',
                '1 cup honey',
                '1/2 cup hot sauce',
                '1/4 cup butter'
            ],
            instructions: [
                'Remove membrane from ribs.',
                'Mix brown sugar, paprika, cayenne, garlic, and onion powder.',
                'Season ribs generously.',
                'Smoke at 250°F for 3 hours.',
                'Wrap in foil with a splash of apple juice.',
                'Cook 2 more hours.',
                'Mix honey, hot sauce, and melted butter for glaze.',
                'Unwrap ribs and brush with glaze.',
                'Cook 30 more minutes until internal temp reaches 195-203°F between the bones and meat pulls back.',
                'Glaze once more before serving.'
            ]
        },
        {
            title: 'Hawaiian Smoked Kalua Pork',
            description: 'Traditional Hawaiian pulled pork with smoky, salty flavor.',
            prep_time: 20,
            cook_time: 600,
            servings: 16,
            ingredients: [
                '8 lb pork shoulder',
                '2 tbsp Hawaiian sea salt',
                '2 tbsp liquid smoke (for extra smoke flavor)',
                '4 ti leaves or banana leaves (optional)',
                '1 tbsp black pepper'
            ],
            instructions: [
                'Pierce pork all over with a fork.',
                'Rub salt and liquid smoke into meat.',
                'Season with pepper.',
                'If using leaves, wrap pork in leaves then foil.',
                'Smoke at 225°F for 8-10 hours.',
                'Pork is done when internal temp reaches 205°F and falls apart.',
                'Shred pork, discarding fat.',
                'Mix shredded meat with juices.',
                'Serve with rice and macaroni salad.'
            ]
        },
        {
            title: 'Smoked Pork Belly Tacos',
            description: 'Crispy-edged pork belly bites perfect for street-style tacos.',
            prep_time: 25,
            cook_time: 300,
            servings: 8,
            ingredients: [
                '3 lb pork belly, cubed into 1-inch pieces',
                '2 tbsp chili powder',
                '1 tbsp cumin',
                '1 tbsp garlic powder',
                '1 tsp cayenne',
                'Corn tortillas',
                'Pickled onions',
                'Fresh cilantro',
                'Salsa verde'
            ],
            instructions: [
                'Mix chili powder, cumin, garlic, and cayenne.',
                'Toss pork belly cubes with seasoning.',
                'Smoke at 275°F for 3-4 hours.',
                'Cook until internal temp reaches 200°F and cubes are tender with crispy edges.',
                'Warm tortillas on grill.',
                'Fill tortillas with pork belly cubes.',
                'Top with pickled onions, cilantro, and salsa verde.'
            ]
        },
        {
            title: 'Smoked Ham Hocks',
            description: 'Rich, gelatinous ham hocks perfect for beans or greens.',
            prep_time: 15,
            cook_time: 360,
            servings: 6,
            ingredients: [
                '4 ham hocks (about 4 lb)',
                '2 tbsp black pepper',
                '1 tbsp garlic powder',
                '1 tbsp paprika',
                'Apple cider for spritzing',
                'Hickory wood'
            ],
            instructions: [
                'Rinse ham hocks and pat dry.',
                'Mix pepper, garlic, and paprika.',
                'Season hocks generously.',
                'Smoke at 250°F for 4-5 hours.',
                'Spritz with apple cider every hour.',
                'Wrap in foil if bark gets too dark.',
                'Cook until internal temp reaches 200°F and meat is falling off bone.',
                'Use in beans, greens, or soups.',
                'Or serve as main dish with sides.'
            ]
        },
        {
            title: 'Italian Smoked Pork Roast',
            description: 'Herb-crusted pork roast with Italian seasonings.',
            prep_time: 25,
            cook_time: 240,
            servings: 8,
            ingredients: [
                '4 lb boneless pork loin roast',
                '1/4 cup olive oil',
                '4 cloves garlic, minced',
                '2 tbsp fresh rosemary',
                '2 tbsp fresh sage',
                '1 tbsp fennel seeds',
                '1 tsp red pepper flakes',
                'Salt and pepper',
                'Cherry wood'
            ],
            instructions: [
                'Mix oil with garlic, herbs, and spices.',
                'Score pork loin in diamond pattern.',
                'Rub herb mixture all over, pressing into cuts.',
                'Refrigerate uncovered for 4 hours.',
                'Smoke at 250°F with cherry wood.',
                'Cook until internal temp reaches 145°F (about 3-4 hours).',
                'Rest 15 minutes.',
                'Slice and serve with pan juices.',
                'Pair with roasted vegetables or polenta.'
            ]
        },
        {
            title: 'Jamaican Jerk Smoked Pork',
            description: 'Fiery Caribbean-style smoked pork with authentic jerk seasoning.',
            prep_time: 30,
            cook_time: 420,
            servings: 10,
            ingredients: [
                '5 lb pork shoulder',
                '6 scotch bonnet peppers',
                '1 bunch green onions',
                '6 cloves garlic',
                '2 tbsp allspice',
                '1 tbsp thyme',
                '1 tbsp cinnamon',
                '1/4 cup soy sauce',
                '1/4 cup lime juice',
                'Pimento wood or apple wood'
            ],
            instructions: [
                'Blend peppers, green onions, garlic, and spices into paste.',
                'Add soy sauce and lime juice.',
                'Score pork deeply all over.',
                'Rub jerk paste into cuts and all surfaces.',
                'Marinate overnight.',
                'Smoke at 250°F for 6-7 hours.',
                'Wrap at 165°F if needed.',
                'Cook until internal temp reaches 203°F and meat pulls easily.',
                'Rest 30 minutes before pulling.',
                'Serve with rice and peas and festival bread.'
            ]
        },
        {
            title: 'Smoked Pig Shots',
            description: 'Bacon-wrapped sausage cups filled with cream cheese.',
            prep_time: 30,
            cook_time: 120,
            servings: 12,
            ingredients: [
                '1 lb thick-cut bacon',
                '1 lb smoked sausage, sliced into rounds',
                '8 oz cream cheese, softened',
                '1 cup shredded cheddar',
                '1/4 cup chopped jalapenos',
                '1/4 cup BBQ rub',
                'BBQ sauce for drizzling'
            ],
            instructions: [
                'Wrap bacon slice around sausage round to form cup.',
                'Secure with toothpick.',
                'Mix cream cheese, cheddar, and jalapenos.',
                'Fill each cup with cheese mixture.',
                'Season tops with BBQ rub.',
                'Smoke at 275°F for 1.5-2 hours.',
                'Bacon should be crispy and internal temp should reach 165°F.',
                'Drizzle with BBQ sauce.',
                'Remove toothpicks and serve.'
            ]
        },
        {
            title: 'Smoked Pork and Beans',
            description: 'Hearty smoked beans with chunks of pork.',
            prep_time: 20,
            cook_time: 240,
            servings: 12,
            ingredients: [
                '2 lb pork shoulder, cubed',
                '2 cans pinto beans',
                '2 cans navy beans',
                '1 cup BBQ sauce',
                '1/2 cup brown sugar',
                '1/2 cup molasses',
                '1 onion, diced',
                '6 strips bacon',
                'Salt and pepper'
            ],
            instructions: [
                'Season pork cubes with salt and pepper.',
                'Smoke pork at 275°F for 2 hours until bark forms.',
                'In large foil pan, combine beans, sauce, sugar, molasses, and onion.',
                'Add smoked pork cubes to beans.',
                'Lay bacon strips on top.',
                'Smoke uncovered for 2 more hours.',
                'Stir occasionally.',
                'Beans should be thick and bubbly.',
                'Serve as side dish or main course.'
            ]
        },
        {
            title: 'Smoked Pork Belly Bites',
            description: 'Sweet and savory bite-sized pork belly pieces.',
            prep_time: 20,
            cook_time: 180,
            servings: 8,
            ingredients: [
                '3 lb pork belly, cubed into 1-inch pieces',
                '1/4 cup BBQ rub',
                '1/2 cup brown sugar',
                '1/4 cup honey',
                '1/4 cup butter',
                '1/2 cup BBQ sauce'
            ],
            instructions: [
                'Toss pork belly cubes with BBQ rub.',
                'Arrange in single layer on smoker.',
                'Smoke at 275°F for 2 hours.',
                'Transfer to aluminum pan.',
                'Add butter, brown sugar, and honey.',
                'Cover and smoke 45 minutes.',
                'Uncover and add BBQ sauce.',
                'Cook until internal temp reaches 200°F and cubes are caramelized (about 15 more minutes).',
                'Toss to coat and serve with toothpicks.'
            ]
        },
        {
            title: 'Smoked Baby Back Ribs with Cherry Glaze',
            description: 'Tender baby backs with a sweet cherry cola glaze.',
            prep_time: 20,
            cook_time: 300,
            servings: 4,
            ingredients: [
                '2 racks baby back ribs',
                '1/4 cup BBQ rub',
                '1 cup cherry cola',
                '1/2 cup cherry preserves',
                '1/4 cup ketchup',
                '2 tbsp apple cider vinegar',
                '1 tsp garlic powder',
                'Cherry wood'
            ],
            instructions: [
                'Remove membrane from ribs.',
                'Season generously with BBQ rub.',
                'Smoke at 250°F with cherry wood for 3 hours.',
                'Simmer cherry cola, preserves, ketchup, vinegar, and garlic until thickened.',
                'Wrap ribs in foil with splash of cola.',
                'Cook 1.5 more hours.',
                'Unwrap and brush with cherry glaze.',
                'Cook until internal temp reaches 195-203°F between the bones and meat pulls back.',
                'Glaze once more before serving.'
            ]
        },
        {
            title: 'Smoked Pork Picnic Shoulder',
            description: 'Budget-friendly cut that rivals pork butt for pulled pork.',
            prep_time: 25,
            cook_time: 540,
            servings: 12,
            ingredients: [
                '8 lb pork picnic shoulder (bone-in)',
                '1/4 cup yellow mustard',
                '1/2 cup pork rub',
                'Apple cider vinegar spray',
                'Apple wood'
            ],
            instructions: [
                'Score the skin in crosshatch pattern if attached.',
                'Coat with mustard as binder.',
                'Apply rub generously to all surfaces.',
                'Refrigerate uncovered overnight.',
                'Smoke at 225°F for 6 hours.',
                'Spritz with vinegar every 90 minutes.',
                'Wrap in butcher paper at 165°F internal.',
                'Continue until internal temp reaches 203°F and is probe tender.',
                'Rest 1 hour in cooler.',
                'Pull meat, discarding skin and bone.'
            ]
        },
        {
            title: 'Smoked Pork Steaks St. Louis Style',
            description: 'St. Louis specialty - pork blade steaks grilled and smoked.',
            prep_time: 15,
            cook_time: 150,
            servings: 6,
            ingredients: [
                '6 pork blade steaks, 3/4 inch thick',
                '2 tbsp BBQ rub',
                '1 cup BBQ sauce',
                '1/4 cup apple cider',
                'Hickory wood'
            ],
            instructions: [
                'Season pork steaks with BBQ rub.',
                'Let sit 30 minutes at room temperature.',
                'Smoke at 275°F for 1 hour.',
                'Transfer to foil pan.',
                'Add apple cider and cover.',
                'Continue cooking until internal temp reaches 180°F (about 1 more hour).',
                'Uncover and brush with BBQ sauce.',
                'Smoke 15 more minutes until sauce is set.',
                'Serve with extra sauce on side.'
            ]
        },
        {
            title: 'Smoked Breakfast Sausage Fatty',
            description: 'Bacon-wrapped sausage roll stuffed with eggs and cheese.',
            prep_time: 30,
            cook_time: 180,
            servings: 8,
            ingredients: [
                '2 lb ground breakfast sausage',
                '1 lb thick-cut bacon',
                '6 scrambled eggs',
                '1 cup shredded cheddar cheese',
                '1/4 cup diced bell peppers',
                '1/4 cup diced onions',
                'BBQ rub'
            ],
            instructions: [
                'Create bacon weave on plastic wrap.',
                'Flatten sausage on bacon weave into rectangle.',
                'Layer scrambled eggs, cheese, peppers, and onions.',
                'Roll tightly using plastic wrap.',
                'Remove plastic wrap.',
                'Season exterior with BBQ rub.',
                'Smoke at 250°F for 2.5-3 hours.',
                'Internal temp should reach 165°F.',
                'Rest 10 minutes.',
                'Slice and serve for breakfast or brunch.'
            ]
        }
    ],
    chicken: [
        {
            title: 'Smoked Greek Chicken',
            description: 'Mediterranean-style chicken with lemon, oregano, and garlic.',
            prep_time: 25,
            cook_time: 180,
            servings: 6,
            ingredients: [
                '5 lb whole chicken',
                '1/4 cup olive oil',
                '4 lemons (2 juiced, 2 quartered)',
                '8 cloves garlic, minced',
                '3 tbsp dried oregano',
                '1 tbsp dried thyme',
                '2 tsp salt',
                '1 tsp black pepper',
                'Kalamata olives',
                'Feta cheese for serving'
            ],
            instructions: [
                'Mix olive oil, lemon juice, garlic, oregano, thyme, salt, and pepper.',
                'Rub mixture all over chicken, including under skin.',
                'Stuff cavity with lemon quarters and extra garlic.',
                'Marinate 4 hours or overnight.',
                'Smoke at 275°F for 2.5-3 hours.',
                'Chicken is done when internal temp reaches 165°F in breast, 175°F in thigh.',
                'Rest 15 minutes.',
                'Serve with olives, feta, and tzatziki sauce.',
                'Pair with Greek salad and pita bread.'
            ]
        },
        {
            title: 'Smoked Chicken Tikka',
            description: 'Indian-spiced chicken thighs with yogurt marinade.',
            prep_time: 30,
            cook_time: 150,
            servings: 6,
            ingredients: [
                '3 lb boneless chicken thighs',
                '1 cup plain yogurt',
                '2 tbsp garam masala',
                '1 tbsp turmeric',
                '1 tbsp cumin',
                '1 tbsp paprika',
                '1 tsp cayenne',
                '6 cloves garlic, minced',
                '2 inch ginger, grated',
                'Fresh cilantro'
            ],
            instructions: [
                'Mix yogurt with all spices, garlic, and ginger.',
                'Cut slits in chicken thighs.',
                'Coat chicken thoroughly with marinade.',
                'Marinate 4-24 hours.',
                'Remove from marinade, shake off excess.',
                'Smoke at 275°F for 2-2.5 hours.',
                'Chicken is done when internal temp reaches 175°F.',
                'Char edges on hot grill if desired.',
                'Garnish with cilantro.',
                'Serve with naan and raita.'
            ]
        },
        {
            title: 'Smoked Cajun Chicken',
            description: 'Spicy Louisiana-style chicken with bold blackened seasoning.',
            prep_time: 20,
            cook_time: 180,
            servings: 6,
            ingredients: [
                '5 lb whole chicken',
                '4 tbsp butter, melted',
                '3 tbsp Cajun seasoning',
                '1 tbsp paprika',
                '1 tbsp garlic powder',
                '1 tbsp onion powder',
                '1 tsp cayenne',
                '1 tsp thyme',
                'Pecan wood'
            ],
            instructions: [
                'Pat chicken dry.',
                'Mix melted butter with all seasonings.',
                'Rub butter mixture all over chicken and under skin.',
                'Let sit at room temperature 30 minutes.',
                'Smoke at 275°F with pecan wood.',
                'Cook 2.5-3 hours until internal temp reaches 165°F in breast, 175°F in thigh.',
                'Skin should be crispy and dark.',
                'Rest 15 minutes before carving.',
                'Serve with dirty rice and collard greens.'
            ]
        },
        {
            title: 'Smoked Orange Glazed Chicken',
            description: 'Sweet and tangy chicken with caramelized orange glaze.',
            prep_time: 20,
            cook_time: 180,
            servings: 6,
            ingredients: [
                '5 lb whole chicken',
                '1 cup orange marmalade',
                '1/4 cup soy sauce',
                '2 tbsp rice vinegar',
                '1 tbsp ginger, grated',
                '4 cloves garlic, minced',
                '1 tsp red pepper flakes',
                '2 oranges, quartered',
                'Salt and pepper'
            ],
            instructions: [
                'Season chicken with salt and pepper.',
                'Stuff cavity with orange quarters.',
                'Smoke at 275°F for 2 hours.',
                'Mix marmalade, soy sauce, vinegar, ginger, garlic, and pepper flakes.',
                'Brush glaze on chicken.',
                'Continue smoking, glazing every 20 minutes.',
                'Chicken is done when internal temp reaches 165°F in breast, 175°F in thigh.',
                'Rest 15 minutes.',
                'Serve with remaining glaze on side.'
            ]
        }
    ],
    lamb: [
        {
            title: 'Smoked Lamb Crown Roast',
            description: 'Elegant crown roast of lamb for special occasions.',
            prep_time: 30,
            cook_time: 180,
            servings: 8,
            ingredients: [
                '2 racks of lamb, frenched and tied into crown',
                '1/4 cup olive oil',
                '6 cloves garlic, minced',
                '3 tbsp fresh rosemary, chopped',
                '2 tbsp fresh thyme',
                '2 tbsp Dijon mustard',
                'Salt and pepper',
                'Paper frills for presentation'
            ],
            instructions: [
                'Mix oil, garlic, herbs, and mustard into paste.',
                'Season lamb crown with salt and pepper.',
                'Coat with herb paste.',
                'Cover bone tips with foil to prevent burning.',
                'Fill center with crumpled foil to keep shape.',
                'Smoke at 275°F for 2.5-3 hours.',
                'Remove when internal temp reaches 135°F for medium-rare.',
                'Rest 15 minutes.',
                'Replace foil with paper frills.',
                'Carve between ribs to serve.'
            ]
        },
        {
            title: 'Smoked Greek Lamb Gyro Meat',
            description: 'Homemade gyro meat with authentic spices, smoked for extra flavor.',
            prep_time: 30,
            cook_time: 120,
            servings: 8,
            ingredients: [
                '2 lb ground lamb',
                '1 lb ground beef',
                '1 large onion, grated',
                '6 cloves garlic, minced',
                '2 tbsp dried oregano',
                '1 tbsp cumin',
                '1 tbsp coriander',
                '1 tsp rosemary',
                '1 tsp marjoram',
                'Salt and pepper',
                'Pita bread and tzatziki for serving'
            ],
            instructions: [
                'Mix lamb and beef with grated onion.',
                'Add garlic and all spices.',
                'Mix thoroughly until paste-like consistency.',
                'Form into tight loaf shape.',
                'Refrigerate 2 hours to firm up.',
                'Smoke at 300°F for 1.5-2 hours.',
                'Cook until internal temp reaches 165°F.',
                'Rest 10 minutes.',
                'Slice very thin.',
                'Serve in warm pita with tzatziki, tomatoes, and onions.'
            ]
        }
    ]
};

// Generate slug from title
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 100);
}

// Add new recipes to database
async function addNewRecipes() {
    console.log('Waiting for database initialization...');
    await db.initPromise;

    console.log('\nStarting to add new recipes...');

    // Get category IDs
    const categories = db.queryAll('SELECT id, slug FROM categories');
    const categoryMap = {};
    categories.forEach(cat => {
        categoryMap[cat.slug] = cat.id;
    });

    console.log('Category mapping:', categoryMap);

    let totalInserted = 0;
    const insertedRecipes = [];

    // Insert recipes for each category
    for (const [category, categoryRecipes] of Object.entries(newRecipes)) {
        const categoryId = categoryMap[category];
        console.log(`\nInserting ${categoryRecipes.length} ${category} recipes...`);

        for (const recipe of categoryRecipes) {
            const slug = generateSlug(recipe.title);

            // Check if recipe already exists
            const existing = db.queryAll('SELECT id FROM recipes WHERE slug = ?', [slug]);
            if (existing.length > 0) {
                console.log(`  Skipping (exists): ${recipe.title}`);
                continue;
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
                recipe.extended_description || null,
                JSON.stringify(recipe.ingredients),
                JSON.stringify(recipe.instructions),
                recipe.prep_time,
                recipe.cook_time,
                recipe.servings,
                categoryId,
                recipe.image_url || null,
                recipe.featured || 0
            ]);

            console.log(`  Added: ${recipe.title}`);
            totalInserted++;
            insertedRecipes.push(recipe.title);
        }
    }

    console.log('\n========================================');
    console.log(`Addition complete! Added ${totalInserted} new recipes.`);
    console.log('========================================');

    // Show summary by category
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

    // Calculate totals for new recipes
    console.log('\nNew recipes added by category:');
    console.log(`  Beef: ${newRecipes.beef.length}`);
    console.log(`  Pork: ${newRecipes.pork.length}`);
    console.log(`  Chicken: ${newRecipes.chicken.length}`);
    console.log(`  Lamb: ${newRecipes.lamb.length}`);

    process.exit(0);
}

// Run the script
addNewRecipes().catch(err => {
    console.error('Error adding recipes:', err);
    process.exit(1);
});

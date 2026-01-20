/**
 * Store Routes
 *
 * Routes for the BBQ store section with product listings
 */

const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

/**
 * Store product data organized by category
 * All products have verified Amazon affiliate links
 */
const storeCategories = [
    {
        id: 'tools',
        name: 'BBQ Tools & Utensils',
        icon: '🍴',
        description: 'Essential tools for grilling and smoking perfection',
        products: [
            {
                id: 1,
                name: 'Weber Precision 3-Piece Grilling Tool Set',
                description: 'Professional-grade stainless steel tool set with spatula, tongs, and fork. Extra-long handles for safety.',
                price: 39.99,
                rating: 4.8,
                reviews: 1128,
                image: 'https://m.media-amazon.com/images/I/61zIUquidUL._AC_SL1500_.jpg',
                affiliate: 'https://amzn.to/4sPyVkL',
                badge: 'Best Seller'
            },
            {
                id: 2,
                name: 'GRILLART Grill Brush and Scraper',
                description: 'Heavy-duty stainless steel bristle brush with built-in scraper. Safe for all grill grates.',
                price: 16.96,
                rating: 4.6,
                reviews: 15079,
                image: 'https://m.media-amazon.com/images/I/81VOpHhWb0L._AC_SL1500_.jpg',
                affiliate: 'https://amzn.to/4pQPkCW'
            },
            {
                id: 3,
                name: 'Alpha Grillers Meat Shredder Claws',
                description: 'Ultra-sharp claws for shredding pulled pork and chicken. Heat-resistant and dishwasher safe.',
                price: 9.97,
                rating: 4.8,
                reviews: 2980,
                image: 'https://m.media-amazon.com/images/I/819XS5o9HbL._AC_SL1500_.jpg',
                affiliate: 'https://amzn.to/45o2kZb',
                badge: 'Top Rated'
            },
            {
                id: 4,
                name: 'Ofargo Stainless Steel Meat Injector Syringe Kit',
                description: 'Professional marinade injector with multiple needles. Perfect for deep flavor penetration.',
                price: 27.99,
                rating: 4.7,
                reviews: 5135,
                image: 'https://m.media-amazon.com/images/I/71mc1iwSa7L._AC_SL1500_.jpg',
                affiliate: 'https://amzn.to/45oUiPU'
            },
            {
                id: 5,
                name: 'BBQ Basting Brush Set',
                description: 'Set of heat-resistant silicone brushes in various sizes. Won\'t melt or shed bristles.',
                price: 22.99,
                rating: 4.6,
                reviews: 108,
                image: 'https://m.media-amazon.com/images/I/8115DVw8TzL._AC_SL1500_.jpg',
                affiliate: 'https://amzn.to/3NqjiQF'
            },
            {
                id: 6,
                name: 'Firsgrill Cast Iron Grill Presses',
                description: 'Heavy cast iron press for perfect smash burgers and bacon. Pre-seasoned and ready to use.',
                price: 28.79,
                rating: 4.8,
                reviews: 4621,
                image: 'https://m.media-amazon.com/images/I/41Xiz0GTA8L._AC_.jpg',
                affiliate: 'https://amzn.to/4jSxG0f'
            },
            {
                id: 7,
                name: 'Extra Long Stainless Steel Rib Rack',
                description: 'Holds multiple racks of ribs upright. Maximizes smoker space and ensures even cooking.',
                price: 23.99,
                rating: 4.6,
                reviews: 3285,
                image: 'https://m.media-amazon.com/images/I/71tJwRUisTL._AC_SL1500_.jpg',
                affiliate: 'https://amzn.to/3ZkOZxc'
            },
            {
                id: 8,
                name: 'Bryco Goods Pink Butcher Paper Roll',
                description: 'FDA approved pink butcher paper. Perfect for wrapping brisket during the stall.',
                price: 20.97,
                rating: 4.8,
                reviews: 3031,
                image: 'https://m.media-amazon.com/images/I/91zTgIQNM5L._AC_SL1500_.jpg',
                affiliate: 'https://amzn.to/45hT9JR'
            },
            {
                id: 9,
                name: 'Weber Deluxe Grilling Basket',
                description: 'Non-stick perforated basket for grilling veggies, shrimp, and small items.',
                price: 29.99,
                rating: 4.7,
                reviews: 8146,
                image: 'https://m.media-amazon.com/images/I/610BYJr0wGL._AC_SL1500_.jpg',
                affiliate: 'https://amzn.to/4qu7fAa'
            },
            {
                id: 10,
                name: 'RAPICCA 932°F Heat Resistant BBQ Grill Gloves',
                description: 'Extreme heat resistant gloves for handling hot meats and grill grates safely.',
                price: 22.39,
                rating: 4.6,
                reviews: 20194,
                image: 'https://m.media-amazon.com/images/I/81TAjsQBb+L._AC_SL1500_.jpg',
                affiliate: 'https://amzn.to/4sOEBLN'
            }
        ]
    },
    {
        id: 'rubs',
        name: 'Rubs & Seasonings',
        icon: '🧂',
        description: 'Award-winning rubs and seasonings from top pitmasters',
        products: [
            {
                id: 11,
                name: 'Killer Hogs BBQ Rub',
                description: 'Competition-proven all-purpose rub. Perfect balance of sweet, savory, and heat.',
                price: 39.99,
                rating: 5.0,
                reviews: 6,
                image: 'https://m.media-amazon.com/images/I/61Pb-Q4BxnL._SL1080_.jpg',
                affiliate: 'https://amzn.to/4jMW3Mx',
                badge: 'Award Winner'
            },
            {
                id: 12,
                name: 'Meat Church BBQ Rub Combo: Holy Cow (2-Pack)',
                description: 'Beef-specific rub with bold flavors. Ideal for brisket, steaks, and burgers.',
                price: 29.00,
                rating: 4.8,
                reviews: 301,
                image: 'https://m.media-amazon.com/images/I/61pvkBOLpDS._AC_SL1150_.jpg',
                affiliate: 'https://amzn.to/49JLdCr'
            },
            {
                id: 13,
                name: 'Bad Byron\'s Barbecue Rub, 26 Ounce',
                description: 'Sweet and savory blend perfect for pork. Competition secret weapon.',
                price: 23.99,
                rating: 4.5,
                reviews: 5,
                image: 'https://m.media-amazon.com/images/I/61G5YMp06vL._SL1500_.jpg',
                affiliate: 'https://amzn.to/4r7080M'
            },
            {
                id: 14,
                name: 'Traeger Prime Rib Rub with Rosemary and Garlic',
                description: 'Herb-forward blend with rosemary and garlic. Perfect for beef roasts.',
                price: 9.97,
                rating: 4.7,
                reviews: 21872,
                image: 'https://m.media-amazon.com/images/I/71tNfTM2wqL._SL1500_.jpg',
                affiliate: 'https://amzn.to/3LTp6BG',
                badge: 'Best Seller'
            },
            {
                id: 15,
                name: 'Hardcore Carnivore Black Seasoning Rub',
                description: 'Activated charcoal rub with deep savory notes. Creates stunning black bark.',
                price: 14.99,
                rating: 4.6,
                reviews: 7259,
                image: 'https://m.media-amazon.com/images/I/71SE1ORL1NL._SL1200_.jpg',
                affiliate: 'https://amzn.to/4bs55g7'
            },
            {
                id: 16,
                name: 'Plowboys Yardbird Rub',
                description: 'Designed specifically for poultry. Creates incredible crispy skin.',
                price: 9.99,
                rating: 4.4,
                reviews: 292,
                image: 'https://m.media-amazon.com/images/I/61lBeHn2llL._SL1200_.jpg',
                affiliate: 'https://amzn.to/4jPzLtv'
            },
            {
                id: 17,
                name: 'Dizzy Pig Dizzy Dust All-Purpose Seasoning Rub',
                description: 'Versatile all-purpose rub with balanced spices. Great on everything.',
                price: 43.50,
                rating: 4.6,
                reviews: 775,
                image: 'https://m.media-amazon.com/images/I/71em6WRlsBL._SL1500_.jpg',
                affiliate: 'https://amzn.to/4jSoNDK'
            },
            {
                id: 18,
                name: 'Blues Hog Original Dry Rub Seasoning',
                description: 'Sweet and tangy competition rub from Tennessee. Perfect for ribs.',
                price: 21.99,
                rating: 4.5,
                reviews: 525,
                image: 'https://m.media-amazon.com/images/I/61ZsdjoGZZL._SL1000_.jpg',
                affiliate: 'https://amzn.to/4baMOnm'
            }
        ]
    },
    {
        id: 'sauces',
        name: 'Sauces & Marinades',
        icon: '🍯',
        description: 'Premium BBQ sauces and marinades for every style',
        products: [
            {
                id: 19,
                name: 'Sweet Baby Ray\'s Barbecue Sauce',
                description: 'America\'s #1 selling BBQ sauce. Perfect balance of sweet and tangy.',
                price: 7.99,
                rating: 4.8,
                reviews: 284,
                image: 'https://m.media-amazon.com/images/I/71sj3ZSpujL._SL1500_.jpg',
                affiliate: 'https://amzn.to/4sMZYNy',
                badge: 'Best Seller'
            },
            {
                id: 20,
                name: 'Stubb\'s Original BBQ Sauce',
                description: 'Texas-style sauce with tomato, molasses, and spices. Gluten-free.',
                price: 5.27,
                rating: 4.4,
                reviews: 2257,
                image: 'https://m.media-amazon.com/images/I/71ThmxnY+QL._SL1500_.jpg',
                affiliate: 'https://amzn.to/4qWE2Oe'
            },
            {
                id: 21,
                name: 'Blues Hog Original Barbecue Sauce',
                description: 'Competition champion sauce with rich, thick texture. Award-winning.',
                price: 8.38,
                rating: 4.7,
                reviews: 1140,
                image: 'https://m.media-amazon.com/images/I/6168vM063YL._SL1500_.jpg',
                affiliate: 'https://amzn.to/4qwiNmN',
                badge: 'Award Winner'
            },
            {
                id: 22,
                name: 'Killer Hogs Vinegar Sauce',
                description: 'Eastern Carolina-style vinegar sauce. Perfect for pulled pork.',
                price: 31.48,
                rating: 5.0,
                reviews: 1,
                image: 'https://m.media-amazon.com/images/I/81Wq5mzo1eL._SL1500_.jpg',
                affiliate: 'https://amzn.to/3NsjTRP'
            },
            {
                id: 23,
                name: 'Big Bob Gibson Original White Sauce',
                description: 'Alabama-style white BBQ sauce. Tangy mayo-based, perfect for chicken.',
                price: 14.74,
                rating: 3.8,
                reviews: 1194,
                image: 'https://m.media-amazon.com/images/I/51xWeopYIBL._SL1000_.jpg',
                affiliate: 'https://amzn.to/4sQNxjJ'
            },
            {
                id: 24,
                name: 'Bachan\'s Japanese Barbecue Sauce',
                description: 'Original Japanese-American teriyaki-style sauce. Umami-rich flavor.',
                price: 11.48,
                rating: 4.8,
                reviews: 519,
                image: 'https://m.media-amazon.com/images/I/71UGa5RteVL._SL1500_.jpg',
                affiliate: 'https://amzn.to/4r6BzB5',
                badge: 'Trending'
            },
            {
                id: 25,
                name: 'Kosmos Q Original Competition BBQ Sauce',
                description: 'Thick, rich competition sauce that\'s won over 500 grand championships.',
                price: 19.95,
                rating: 4.6,
                reviews: 1484,
                image: 'https://m.media-amazon.com/images/I/51MJ0T1GCvL._SL1200_.jpg',
                affiliate: 'https://amzn.to/3Nvtjfh'
            },
            {
                id: 26,
                name: 'Rufus Teague Whiskey Maple BBQ Sauce',
                description: 'Kansas City-style with real whiskey and maple syrup. No high fructose corn syrup.',
                price: 12.95,
                rating: 4.5,
                reviews: 332,
                image: 'https://m.media-amazon.com/images/I/712Zc3DmybL._SL1500_.jpg',
                affiliate: 'https://amzn.to/3LKJ811'
            },
            {
                id: 27,
                name: 'Mr. Yoshida\'s Original Japanese Barbecue Marinade',
                description: 'Sweet teriyaki-style marinade and cooking sauce. Perfect for Asian-inspired BBQ.',
                price: 15.00,
                rating: 4.8,
                reviews: 2866,
                image: 'https://m.media-amazon.com/images/I/81Tc08j80IL._SL1500_.jpg',
                affiliate: 'https://amzn.to/3NFZ6Kx'
            }
        ]
    },
    {
        id: 'wood',
        name: 'Wood Chips & Pellets',
        icon: '🪵',
        description: 'Premium smoking woods for authentic BBQ flavor',
        products: [
            {
                id: 28,
                name: 'Traeger Signature Blend 100% All-Natural Wood Pellets',
                description: 'Hickory, maple, and cherry blend. All-purpose smoking pellets.',
                price: 19.99,
                rating: 4.8,
                reviews: 54231,
                image: 'https://m.media-amazon.com/images/I/71znF2bfMiL._AC_SL1500_.jpg',
                affiliate: 'https://amzn.to/3ZnJRbI',
                badge: 'Best Seller'
            },
            {
                id: 29,
                name: 'Pit Boss Competition Blend (20 lb)',
                description: 'Maple, hickory, and cherry blend. Great value for high-volume smoking.',
                price: 23.40,
                rating: 4.7,
                reviews: 7888,
                image: 'https://m.media-amazon.com/images/I/61ZojpK5XRL._AC_SL1000_.jpg',
                affiliate: 'https://amzn.to/3LVwEnp'
            },
            {
                id: 30,
                name: 'Weber Hickory Wood Chunks',
                description: 'Natural hickory chunks. Strong smoky flavor for beef and pork.',
                price: 10.10,
                rating: 4.7,
                reviews: 12405,
                image: 'https://m.media-amazon.com/images/I/71lTJ5fdAyL._AC_SL1500_.jpg',
                affiliate: 'https://amzn.to/3LJxGTx'
            },
            {
                id: 31,
                name: 'Jealous Devil Lump Charcoal',
                description: 'Premium hardwood lump charcoal. Burns hot and clean.',
                price: 95.94,
                rating: 4.6,
                reviews: 3646,
                image: 'https://m.media-amazon.com/images/I/81EdRlftK1L._AC_SL1500_.jpg',
                affiliate: 'https://amzn.to/4pQRiDk',
                badge: 'Premium'
            },
            {
                id: 32,
                name: 'Bear Mountain Apple Pellets',
                description: '100% apple wood pellets. Mild, sweet smoke perfect for poultry.',
                price: 30.67,
                rating: 4.7,
                reviews: 15365,
                image: 'https://m.media-amazon.com/images/I/81dxRFCj3-L._AC_SL1500_.jpg',
                affiliate: 'https://amzn.to/4qvCQS9'
            },
            {
                id: 33,
                name: 'Western Post Oak BBQ Wood Chips',
                description: 'Texas-style post oak chips. Authentic Central Texas BBQ flavor.',
                price: 25.95,
                rating: 4.7,
                reviews: 10015,
                image: 'https://m.media-amazon.com/images/I/81glBgDMf1L._AC_SL1500_.jpg',
                affiliate: 'https://amzn.to/45lpwrb'
            },
            {
                id: 34,
                name: 'Lumber Jack Mesquite Pellets',
                description: 'Pure mesquite pellets. Intense, earthy smoke for beef.',
                price: 37.99,
                rating: 4.4,
                reviews: 415,
                image: 'https://m.media-amazon.com/images/I/61dqLtW8C1L._AC_SL1500_.jpg',
                affiliate: 'https://amzn.to/463uusF'
            },
            {
                id: 35,
                name: 'Weber Cherry Wood Chunks',
                description: 'Natural cherry wood chunks. Mild, fruity smoke for all meats.',
                price: 10.10,
                rating: 4.7,
                reviews: 12405,
                image: 'https://m.media-amazon.com/images/I/71X+xxxK1fL._AC_SL1500_.jpg',
                affiliate: 'https://amzn.to/49Q8keF'
            }
        ]
    },
    {
        id: 'thermometers',
        name: 'Thermometers & Monitors',
        icon: '🌡️',
        description: 'Precision temperature monitoring for perfect results',
        products: [
            {
                id: 36,
                name: 'ThermoWorks Thermapen ONE',
                description: 'Professional instant-read thermometer. 1-second readings, waterproof.',
                price: 125.00,
                rating: 4.8,
                reviews: 925,
                image: 'https://m.media-amazon.com/images/I/71s28hOEP5L._SL1500_.jpg',
                affiliate: 'https://amzn.to/4pHJX8N',
                badge: 'Pro Choice'
            },
            {
                id: 37,
                name: 'MEATER Plus Smart Bluetooth Wireless Meat Thermometer',
                description: 'True wireless meat thermometer with extended Bluetooth range. App-guided cooking.',
                price: 99.95,
                rating: 4.3,
                reviews: 49697,
                image: 'https://m.media-amazon.com/images/I/61LshKzcdxL._SL1500_.jpg',
                affiliate: 'https://amzn.to/4r8Xd7L',
                badge: 'Best Seller'
            },
            {
                id: 38,
                name: 'ThermoPro TP20 500FT Wireless Meat Thermometer',
                description: 'Dual probe wireless thermometer with 500ft range. Great value option.',
                price: 42.72,
                rating: 4.6,
                reviews: 31848,
                image: 'https://m.media-amazon.com/images/I/71Z+2ZB9s7L._AC_SL1500_.jpg',
                affiliate: 'https://amzn.to/45njh66'
            },
            {
                id: 39,
                name: 'INKBIRD WiFi Wireless Meat Thermometer',
                description: 'WiFi-enabled thermometer system. Monitor from anywhere via app.',
                price: 96.88,
                rating: 4.5,
                reviews: 65,
                image: 'https://m.media-amazon.com/images/I/71znF7LlixL._SL1500_.jpg',
                affiliate: 'https://amzn.to/4pKxBwV'
            },
            {
                id: 40,
                name: 'ThermoWorks RFX Smart Wireless Meat Thermometer',
                description: 'Long-range wireless thermometer with smart features. Pro-level pit monitoring.',
                price: 275.00,
                rating: 3.9,
                reviews: 123,
                image: 'https://m.media-amazon.com/images/I/71yNyu1yHyL._SL1500_.jpg',
                affiliate: 'https://amzn.to/4sQlxNi',
                badge: 'Premium'
            },
            {
                id: 41,
                name: 'Lavatools Javelin PRO Digital Instant Read Meat Thermometer',
                description: 'Ultra-fast 2-second readings with ambidextrous display. Splash-proof design.',
                price: 42.99,
                rating: 4.7,
                reviews: 18046,
                image: 'https://m.media-amazon.com/images/I/51L7FM3evpL._SL1080_.jpg',
                affiliate: 'https://amzn.to/4bFPl94'
            },
            {
                id: 42,
                name: 'Weber 7203 iGrill Thermometer',
                description: 'Bluetooth thermometer with Weber app integration. Multiple probe support.',
                price: 99.99,
                rating: 4.6,
                reviews: 2453,
                image: 'https://m.media-amazon.com/images/I/71QDpvQUBAL._AC_SL1500_.jpg',
                affiliate: 'https://amzn.to/49vg2Mp'
            }
        ]
    }
];

/**
 * Store homepage
 * GET /store
 */
router.get('/', (req, res, next) => {
    try {
        const categories = Category.getAll();
        const selectedCategory = req.query.category || 'all';

        // Filter products if a specific category is selected
        let displayCategories = storeCategories;
        if (selectedCategory !== 'all') {
            displayCategories = storeCategories.filter(cat => cat.id === selectedCategory);
        }

        // Calculate total products
        const totalProducts = storeCategories.reduce((sum, cat) => sum + cat.products.length, 0);

        res.render('pages/store', {
            title: 'BBQ Store - Equipment & Accessories',
            description: 'Shop for BBQ equipment, tools, rubs, sauces, wood pellets, and thermometers.',
            categories,
            storeCategories: displayCategories,
            allCategories: storeCategories,
            selectedCategory,
            totalProducts
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;

/**
 * Reviews Routes
 *
 * Placeholder routes for product reviews section
 */

const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

/**
 * Reviews homepage
 * GET /reviews
 */
router.get('/', (req, res, next) => {
    try {
        const categories = Category.getAll();

        res.render('pages/reviews', {
            title: 'Product Reviews - BBQ Recipes',
            description: 'Read honest reviews of BBQ grills, smokers, and accessories.',
            categories
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;

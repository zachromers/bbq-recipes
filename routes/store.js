/**
 * Store Routes
 *
 * Placeholder routes for the store section
 */

const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

/**
 * Store homepage
 * GET /store
 */
router.get('/', (req, res, next) => {
    try {
        const categories = Category.getAll();

        res.render('pages/store', {
            title: 'BBQ Store - Equipment & Accessories',
            description: 'Shop for BBQ equipment, grills, smokers, and accessories.',
            categories
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;

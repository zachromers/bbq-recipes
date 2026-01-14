/**
 * Index Routes
 *
 * Handles homepage and general site routes
 */

const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const Category = require('../models/Category');

/**
 * Homepage
 * GET /
 */
router.get('/', (req, res, next) => {
    try {
        // Get featured recipes for the homepage
        const featuredRecipes = Recipe.getFeatured(6);

        // Get recent recipes
        const recentRecipes = Recipe.getRecent(8);

        // Get all categories with recipe counts
        const categories = Category.getAll();

        res.render('pages/home', {
            title: 'BBQ Recipes - Delicious Grilling & Smoking Recipes',
            description: 'Discover the best BBQ recipes for pork, beef, lamb, chicken, and seafood. Master the art of grilling and smoking with our tested recipes.',
            featuredRecipes,
            recentRecipes,
            categories
        });
    } catch (error) {
        next(error);
    }
});

/**
 * Search recipes
 * GET /search
 */
router.get('/search', (req, res, next) => {
    try {
        const query = req.query.q || '';
        let recipes = [];

        if (query.trim()) {
            recipes = Recipe.search(query);
        }

        const categories = Category.getAll();

        res.render('pages/search', {
            title: `Search Results for "${query}" - BBQ Recipes`,
            description: `Search results for "${query}" on BBQ Recipes`,
            query,
            recipes,
            categories
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;

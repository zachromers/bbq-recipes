/**
 * Recipe Routes
 *
 * Handles all recipe-related routes
 */

const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const Category = require('../models/Category');

/**
 * List all recipes
 * GET /recipes
 */
router.get('/', (req, res, next) => {
    try {
        const recipes = Recipe.getAll();
        const categories = Category.getAll();

        res.render('recipes/index', {
            title: 'All Recipes - BBQ Recipes',
            description: 'Browse all our delicious BBQ recipes for grilling and smoking.',
            recipes,
            categories,
            currentCategory: null
        });
    } catch (error) {
        next(error);
    }
});

/**
 * List recipes by category
 * GET /recipes/category/:slug
 */
router.get('/category/:slug', (req, res, next) => {
    try {
        const { slug } = req.params;
        const category = Category.getBySlugWithCount(slug);

        if (!category) {
            return res.status(404).render('pages/404', {
                title: 'Category Not Found',
                description: 'The recipe category you are looking for does not exist.'
            });
        }

        const recipes = Recipe.getByCategory(slug);
        const categories = Category.getAll();

        res.render('recipes/category', {
            title: `${category.name} Recipes - BBQ Recipes`,
            description: category.description || `Delicious ${category.name.toLowerCase()} BBQ recipes.`,
            category,
            recipes,
            categories,
            currentCategory: slug
        });
    } catch (error) {
        next(error);
    }
});

/**
 * View single recipe
 * GET /recipes/:slug
 */
router.get('/:slug', (req, res, next) => {
    try {
        const { slug } = req.params;
        const recipe = Recipe.getBySlug(slug);

        if (!recipe) {
            return res.status(404).render('pages/404', {
                title: 'Recipe Not Found',
                description: 'The recipe you are looking for does not exist.'
            });
        }

        const categories = Category.getAll();

        // Get related recipes from same category
        const relatedRecipes = Recipe.getByCategory(recipe.category_slug)
            .filter(r => r.id !== recipe.id)
            .slice(0, 4);

        res.render('recipes/show', {
            title: `${recipe.title} - BBQ Recipes`,
            description: recipe.description || `Learn how to make ${recipe.title} with this delicious BBQ recipe.`,
            recipe,
            relatedRecipes,
            categories
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;

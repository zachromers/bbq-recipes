/**
 * Recipe Model
 *
 * Handles all database operations for recipes
 */

const db = require('../config/database');

class Recipe {
    /**
     * Get all recipes with optional filtering
     */
    static getAll(options = {}) {
        let query = `
            SELECT r.*, c.name as category_name, c.slug as category_slug
            FROM recipes r
            LEFT JOIN categories c ON r.category_id = c.id
        `;

        const params = [];
        const conditions = [];

        if (options.categoryId) {
            conditions.push('r.category_id = ?');
            params.push(options.categoryId);
        }

        if (options.categorySlug) {
            conditions.push('c.slug = ?');
            params.push(options.categorySlug);
        }

        if (options.featured) {
            conditions.push('r.featured = 1');
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY r.created_at DESC';

        if (options.limit) {
            query += ' LIMIT ?';
            params.push(options.limit);
        }

        const recipes = db.queryAll(query, params);
        return recipes.map(recipe => this.parseRecipe(recipe));
    }

    /**
     * Get a single recipe by ID
     */
    static getById(id) {
        const recipe = db.queryOne(`
            SELECT r.*, c.name as category_name, c.slug as category_slug
            FROM recipes r
            LEFT JOIN categories c ON r.category_id = c.id
            WHERE r.id = ?
        `, [id]);

        return recipe ? this.parseRecipe(recipe) : null;
    }

    /**
     * Get a single recipe by slug
     */
    static getBySlug(slug) {
        const recipe = db.queryOne(`
            SELECT r.*, c.name as category_name, c.slug as category_slug
            FROM recipes r
            LEFT JOIN categories c ON r.category_id = c.id
            WHERE r.slug = ?
        `, [slug]);

        return recipe ? this.parseRecipe(recipe) : null;
    }

    /**
     * Get featured recipes
     */
    static getFeatured(limit = 6) {
        return this.getAll({ featured: true, limit });
    }

    /**
     * Get recipes by category
     */
    static getByCategory(categorySlug) {
        return this.getAll({ categorySlug });
    }

    /**
     * Get recent recipes
     */
    static getRecent(limit = 10) {
        return this.getAll({ limit });
    }

    /**
     * Create a new recipe
     */
    static create(data) {
        const slug = this.generateSlug(data.title);
        const ingredients = JSON.stringify(data.ingredients);
        const instructions = JSON.stringify(data.instructions);

        const result = db.execute(`
            INSERT INTO recipes (
                title, slug, description, extended_description, ingredients, instructions,
                prep_time, cook_time, servings, category_id, image_url, featured
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            data.title,
            slug,
            data.description,
            data.extended_description || null,
            ingredients,
            instructions,
            data.prep_time,
            data.cook_time,
            data.servings,
            data.category_id,
            data.image_url,
            data.featured ? 1 : 0
        ]);

        return this.getById(result.lastInsertRowid);
    }

    /**
     * Search recipes by title or description
     */
    static search(query) {
        const searchTerm = `%${query}%`;
        const recipes = db.queryAll(`
            SELECT r.*, c.name as category_name, c.slug as category_slug
            FROM recipes r
            LEFT JOIN categories c ON r.category_id = c.id
            WHERE r.title LIKE ? OR r.description LIKE ?
            ORDER BY r.created_at DESC
        `, [searchTerm, searchTerm]);

        return recipes.map(recipe => this.parseRecipe(recipe));
    }

    /**
     * Get recipe count by category
     */
    static getCountByCategory() {
        return db.queryAll(`
            SELECT c.id, c.name, c.slug, COUNT(r.id) as recipe_count
            FROM categories c
            LEFT JOIN recipes r ON c.id = r.category_id
            GROUP BY c.id
            ORDER BY c.name
        `);
    }

    /**
     * Parse recipe JSON fields
     */
    static parseRecipe(recipe) {
        return {
            ...recipe,
            ingredients: JSON.parse(recipe.ingredients || '[]'),
            instructions: JSON.parse(recipe.instructions || '[]'),
            total_time: (recipe.prep_time || 0) + (recipe.cook_time || 0)
        };
    }

    /**
     * Generate URL-friendly slug from title
     */
    static generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .substring(0, 100);
    }
}

module.exports = Recipe;

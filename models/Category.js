/**
 * Category Model
 *
 * Handles all database operations for recipe categories
 */

const db = require('../config/database');

class Category {
    /**
     * Get all categories
     */
    static getAll() {
        return db.queryAll(`
            SELECT c.*, COUNT(r.id) as recipe_count
            FROM categories c
            LEFT JOIN recipes r ON c.id = r.category_id
            GROUP BY c.id
            ORDER BY c.name
        `);
    }

    /**
     * Get a single category by ID
     */
    static getById(id) {
        return db.queryOne('SELECT * FROM categories WHERE id = ?', [id]);
    }

    /**
     * Get a single category by slug
     */
    static getBySlug(slug) {
        return db.queryOne('SELECT * FROM categories WHERE slug = ?', [slug]);
    }

    /**
     * Get category with recipe count
     */
    static getBySlugWithCount(slug) {
        return db.queryOne(`
            SELECT c.*, COUNT(r.id) as recipe_count
            FROM categories c
            LEFT JOIN recipes r ON c.id = r.category_id
            WHERE c.slug = ?
            GROUP BY c.id
        `, [slug]);
    }
}

module.exports = Category;

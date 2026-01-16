/**
 * Database Configuration and Connection
 *
 * Uses sql.js (SQLite compiled to WebAssembly) for cross-platform compatibility
 */

const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

// Database instance
let db = null;

// Ensure database directory exists
const dbPath = process.env.DATABASE_PATH || './database/recipes.db';
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

/**
 * Initialize the database
 */
async function initializeDatabase() {
    const SQL = await initSqlJs();

    // Load existing database or create new
    if (fs.existsSync(dbPath)) {
        const fileBuffer = fs.readFileSync(dbPath);
        db = new SQL.Database(fileBuffer);
    } else {
        db = new SQL.Database();
    }

    // Create tables
    db.run(`
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            slug TEXT NOT NULL UNIQUE,
            description TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            description TEXT,
            extended_description TEXT,
            ingredients TEXT NOT NULL,
            instructions TEXT NOT NULL,
            prep_time INTEGER,
            cook_time INTEGER,
            servings INTEGER,
            category_id INTEGER,
            image_url TEXT,
            featured INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (category_id) REFERENCES categories(id)
        )
    `);

    // Add extended_description column if it doesn't exist (for existing databases)
    try {
        db.run('ALTER TABLE recipes ADD COLUMN extended_description TEXT');
    } catch (e) {
        // Column already exists, ignore
    }

    // Create indexes
    db.run('CREATE INDEX IF NOT EXISTS idx_recipes_category ON recipes(category_id)');
    db.run('CREATE INDEX IF NOT EXISTS idx_recipes_slug ON recipes(slug)');
    db.run('CREATE INDEX IF NOT EXISTS idx_recipes_featured ON recipes(featured)');
    db.run('CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug)');

    // Insert default categories
    const categories = [
        ['Pork', 'pork', 'Delicious pork recipes including ribs, pulled pork, and chops'],
        ['Beef', 'beef', 'Beef recipes from brisket to burgers and steaks'],
        ['Lamb', 'lamb', 'Lamb recipes including chops, leg of lamb, and kebabs'],
        ['Chicken', 'chicken', 'Chicken recipes from wings to whole smoked birds'],
        ['Seafood', 'seafood', 'Grilled fish, shrimp, and other seafood delights']
    ];

    const checkStmt = db.prepare('SELECT id FROM categories WHERE slug = ?');
    const insertStmt = db.prepare('INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)');

    for (const [name, slug, description] of categories) {
        checkStmt.bind([slug]);
        if (!checkStmt.step()) {
            insertStmt.bind([name, slug, description]);
            insertStmt.step();
            insertStmt.reset();
        }
        checkStmt.reset();
    }

    checkStmt.free();
    insertStmt.free();

    // Save to file
    saveDatabase();

    console.log('Database initialized successfully');
    return db;
}

/**
 * Save database to file
 */
function saveDatabase() {
    if (db) {
        const data = db.export();
        const buffer = Buffer.from(data);
        fs.writeFileSync(dbPath, buffer);
    }
}

/**
 * Get database instance (initializes if needed)
 */
async function getDatabase() {
    if (!db) {
        await initializeDatabase();
    }
    return db;
}

/**
 * Helper to run a query and get all results
 */
function queryAll(sql, params = []) {
    const stmt = db.prepare(sql);
    if (params.length > 0) {
        stmt.bind(params);
    }

    const results = [];
    while (stmt.step()) {
        const row = stmt.getAsObject();
        results.push(row);
    }
    stmt.free();
    return results;
}

/**
 * Helper to run a query and get one result
 */
function queryOne(sql, params = []) {
    const results = queryAll(sql, params);
    return results.length > 0 ? results[0] : null;
}

/**
 * Helper to run an insert/update/delete
 */
function execute(sql, params = []) {
    db.run(sql, params);
    saveDatabase();
    return {
        lastInsertRowid: db.exec('SELECT last_insert_rowid()')[0]?.values[0]?.[0] || 0,
        changes: db.getRowsModified()
    };
}

// Initialize on module load
let initPromise = initializeDatabase();

module.exports = {
    getDatabase,
    queryAll,
    queryOne,
    execute,
    saveDatabase,
    initPromise
};

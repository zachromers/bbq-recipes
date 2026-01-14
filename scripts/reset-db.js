/**
 * Database Reset Script
 * Deletes the database file and reinitializes
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

const dbPath = process.env.DATABASE_PATH || './database/recipes.db';

// Delete database file if it exists
if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log('Database file deleted.');
}

// Reinitialize by requiring the database module
require('../config/database');
console.log('Database reinitialized.');
console.log('Run "npm run seed" to populate with sample data.');

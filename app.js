/**
 * BBQ Recipes - Main Application Entry Point
 *
 * A Node.js/Express application for sharing BBQ recipes
 */

require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

// Import routes
const indexRoutes = require('./routes/index');
const recipeRoutes = require('./routes/recipes');
const storeRoutes = require('./routes/store');
const reviewRoutes = require('./routes/reviews');

// Import error handler
const errorHandler = require('./config/errorHandler');

// Initialize Express app
const app = express();

// Configuration
const PORT = process.env.PORT || 3002;

// View engine setup (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Make site config available to all views
app.use((req, res, next) => {
    res.locals.siteName = process.env.SITE_NAME || 'BBQ Recipes Simply';
    res.locals.siteUrl = process.env.SITE_URL || 'https://bbqrecipessimply.com';
    res.locals.currentPath = req.path;

    // Helper function to format minutes as hours and minutes
    res.locals.formatTime = (minutes) => {
        if (!minutes) return '';
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hrs === 0) return `${mins} minutes`;
        if (mins === 0) return hrs === 1 ? '1 hour' : `${hrs} hours`;
        return `${hrs} ${hrs === 1 ? 'hour' : 'hours'} ${mins} ${mins === 1 ? 'minute' : 'minutes'}`;
    };

    next();
});

// Routes
app.use('/', indexRoutes);
app.use('/recipes', recipeRoutes);
app.use('/store', storeRoutes);
app.use('/reviews', reviewRoutes);

// 404 handler
app.use((req, res, next) => {
    res.status(404).render('pages/404', {
        title: 'Page Not Found',
        description: 'The page you are looking for does not exist.'
    });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`
    ╔══════════════════════════════════════════╗
    ║                                          ║
    ║   🔥 BBQ Recipes Server Running! 🔥      ║
    ║                                          ║
    ║   Local: http://localhost:${PORT}          ║
    ║                                          ║
    ╚══════════════════════════════════════════╝
    `);
});

module.exports = app;

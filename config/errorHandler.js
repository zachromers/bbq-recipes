/**
 * Global Error Handler Middleware
 *
 * Catches all errors and renders appropriate error pages
 */

function errorHandler(err, req, res, next) {
    // Log error for debugging
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);

    // Determine status code
    const statusCode = err.statusCode || err.status || 500;

    // Don't leak error details in production
    const isProduction = process.env.NODE_ENV === 'production';

    // Render error page
    res.status(statusCode).render('pages/error', {
        title: 'Error',
        description: 'An error occurred',
        statusCode,
        message: isProduction ? 'An unexpected error occurred' : err.message,
        stack: isProduction ? null : err.stack
    });
}

module.exports = errorHandler;

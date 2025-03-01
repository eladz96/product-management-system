// backend/src/utils/errorHandler.js

const { handleResponse } = require('./responseUtil');

// Global error-handling middleware
exports.errorHandler = (err, req, res, next) => {
    console.error('🔥 Error:', err.message || err);
    return handleResponse(res, err.status || 500, err.message || 'Internal Server Error');
};

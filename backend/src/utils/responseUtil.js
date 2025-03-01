// backend/src/utils/responseUtil.js

// Standardized API response function
exports.handleResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        success: statusCode >= 200 && statusCode < 300,
        message,
        data
    });
};

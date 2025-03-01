// backend/src/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const { handleResponse } = require('../utils/responseUtil');
const dotenv = require('dotenv');

dotenv.config();

// Middleware to verify JWT
exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return handleResponse(res, 401, 'Access denied. No token provided');

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return handleResponse(res, 400, 'Invalid token');
    }
};

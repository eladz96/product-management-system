// backend/src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define authentication routes
router.post('/register', authController.registerUser); // User registration
router.post('/login', authController.loginUser); // User login

module.exports = router;
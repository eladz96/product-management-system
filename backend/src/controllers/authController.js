// backend/src/controllers/authController.js

const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { handleResponse } = require('../utils/responseUtil');

dotenv = require('dotenv');
dotenv.config();

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return handleResponse(res, 400, 'Email already registered');
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });
        
        return handleResponse(res, 201, 'User registered successfully', newUser);
    } catch (error) {
        return handleResponse(res, 500, 'Error registering user', error);
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return handleResponse(res, 400, 'Invalid email or password');
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return handleResponse(res, 400, 'Invalid email or password');
        
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return handleResponse(res, 200, 'Login successful', { token });
    } catch (error) {
        return handleResponse(res, 500, 'Error logging in', error);
    }
};

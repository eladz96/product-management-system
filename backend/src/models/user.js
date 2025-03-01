// backend/src/models/user.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define User model
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false // We removed createdAt and updatedAt
});

module.exports = User;

// backend/src/config/database.js

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// Initialize Sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME,  
    process.env.DB_USER,  
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST, 
        dialect: 'mysql', 
        logging: false, 
    }
);

// Test database connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ MySQL Database Connected');
    } catch (error) {
        console.error('❌ Database Connection Error:', error);
    }
})();

module.exports = sequelize;

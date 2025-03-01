// backend/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const { handleResponse } = require('./src/utils/responseUtil');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Database Connection
sequelize.sync()
  .then(() => console.log('✅ MySQL Database Connected'))
  .catch(err => console.error('❌ Database Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

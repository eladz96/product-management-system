// backend/src/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define product routes
router.get('/', productController.getAllProducts); // Get all products
router.post('/', productController.createProduct); // Create a product
router.put('/:id', productController.updateProduct); // Update a product
router.delete('/:id', productController.deleteProduct); // Delete a product
router.get('/search', productController.searchProducts); // Search for products

module.exports = router;
// backend/src/controllers/productController.js

const Product = require('../models/product');
const esClient = require('../config/elasticsearch');
const { handleResponse } = require('../utils/responseUtil');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        return handleResponse(res, 200, 'Products fetched successfully', products);
    } catch (error) {
        return handleResponse(res, 500, 'Error fetching products', error);
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, userId } = req.body;
        const newProduct = await Product.create({ name, description, price, userId });

        // Sync to Elasticsearch
        await esClient.index({
            index: 'products',
            id: newProduct.id,
            body: { id: newProduct.id, name, description, price, userId }
        });

        return handleResponse(res, 201, 'Product created successfully', newProduct);
    } catch (error) {
        return handleResponse(res, 500, 'Error creating product', error);
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const product = await Product.findByPk(id);
        
        if (!product) return handleResponse(res, 404, 'Product not found');
        
        await product.update({ name, description, price });

        // Sync update to Elasticsearch
        await esClient.update({
            index: 'products',
            id: id,
            body: { doc: { name, description, price } }
        });

        return handleResponse(res, 200, 'Product updated successfully', product);
    } catch (error) {
        return handleResponse(res, 500, 'Error updating product', error);
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        
        if (!product) return handleResponse(res, 404, 'Product not found');
        
        await product.destroy();

        // Remove from Elasticsearch
        await esClient.delete({
            index: 'products',
            id: id
        });

        return handleResponse(res, 200, 'Product deleted successfully');
    } catch (error) {
        return handleResponse(res, 500, 'Error deleting product', error);
    }
};

const productController = require('../controllers/productController');
const express = require('express');
const productsRoutes = express.Router();

productsRoutes.get('/products', productController.getAllProducts);

productsRoutes.get('/product/:id', productController.getProductById);

productsRoutes.post('/product', productController.createProduct);

productsRoutes.put('/product/:id', productController.updateProduct);

productsRoutes.delete('/product/:id', productController.deleteProduct);

module.exports = productsRoutes;
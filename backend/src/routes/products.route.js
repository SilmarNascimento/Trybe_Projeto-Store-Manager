const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/products', productsController.getAllProducts);
route.get('/products/:id', productsController.getProductById);

module.exports = route;

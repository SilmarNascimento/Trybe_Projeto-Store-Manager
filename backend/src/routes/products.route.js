const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/', productsController.getAllProducts);
route.get('/:id', productsController.getProductById);
route.post('/', productsController.addProduct);
route.put('/:id', productsController.updateProduct);

module.exports = route;

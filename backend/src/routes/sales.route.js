const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/', salesController.getAllSales);
route.get('/:id', salesController.getSalesById);
route.post('/', salesController.addSales);
route.delete('/:id', salesController.deleteSale);
route.put('/:saleId/products/:productId/quantity', salesController.updateQuantity);

module.exports = route;

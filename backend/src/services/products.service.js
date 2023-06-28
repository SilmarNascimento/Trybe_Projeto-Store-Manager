const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  if (product) {
    return { status: 'SUCCESSFUL', data: product };
  }
  return { status: 'NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  findAll,
  findById,
};
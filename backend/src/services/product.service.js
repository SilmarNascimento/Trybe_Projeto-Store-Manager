const { productModel } = require('../models');

const findAll = async () => {
  const products = await productModel.findAll();
  if (products) {
    return { status: 'SUCCESSFUL', data: products };
  }
  return { status: 'NOT_FOUND', message: 'Products not found' };
};

const findById = async (productId) => {
  const product = await productModel.findById(productId);
  if (product) {
    return { status: 'SUCCESSFUL', data: product };
  }
  return { status: 'NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  findAll,
  findById,
};
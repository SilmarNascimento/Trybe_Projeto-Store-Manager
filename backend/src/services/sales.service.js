const { salesModel } = require('../models');

const findAll = async () => {
  const products = await salesModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (productId) => {
  const product = await salesModel.findById(productId);
  const saleInformation = product.map((item) => {
    const { saleId, ...data } = item;
    return data;
  });
  if (product) {
    return { status: 'SUCCESSFUL', data: saleInformation };
  }
  return { status: 'NOT_FOUND', message: 'Sale not found' };
};

module.exports = {
  findAll,
  findById,
};
const { productsModel } = require('../models');
const validateProduct = require('./validation/validateProduct');

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

const insert = async (data) => {
  const isValid = validateProduct(data);
  if (isValid) {
    return { status: isValid.status, message: isValid.message };
  }
  const insertId = await productsModel.insert(data);
  const newProduct = { insertId, ...data };
  return { status: 'CREATED', data: newProduct };
};

module.exports = {
  findAll,
  findById,
  insert,
};
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
  const isInvalid = validateProduct(data);
  if (isInvalid) {
    return { status: isInvalid.status, message: isInvalid.message };
  }
  const id = await productsModel.insert(data);
  const newProduct = { id, ...data };
  return { status: 'CREATED', data: newProduct };
};

const update = async (productId, productData) => {
  const isInvalid = validateProduct(productData);
  if (isInvalid) {
    return { status: isInvalid.status, message: isInvalid.message };
  }
  const product = await productsModel.findById(productId);
  if (!product) {
    return { status: 'NOT_FOUND', message: 'Product not found' };
  }
  await productsModel.update(productId, productData);
  const updatedProduct = {
    id: productId,
    ...productData,
  };
  return { status: 'SUCCESSFUL', data: updatedProduct };
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};
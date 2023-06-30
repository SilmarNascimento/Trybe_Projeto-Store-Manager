const { salesModel } = require('../models');
const validateSales = require('./validation/validateSales');

const findAll = async () => {
  const products = await salesModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (id) => {
  const product = await salesModel.findById(id);
  if (!product.length) {
    return { status: 'NOT_FOUND', message: 'Sale not found' };
  }
  const saleInformation = product.map((item) => {
    const { saleId, ...data } = item;
    return data;
  });
  return { status: 'SUCCESSFUL', data: saleInformation };
};

const insert = async (salesInformation) => {
  const errorResponse = validateSales(salesInformation);
  if (errorResponse.length) {
    const { status, message } = errorResponse[0];
    return { status, message };
  }
};

module.exports = {
  findAll,
  findById,
  insert,
};
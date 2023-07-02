const { salesModel } = require('../models');
const { validateProductId, validateSales } = require('./validation/validateInsertSales');

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
  const notFoundResponse = await validateProductId(salesInformation);
  if (notFoundResponse.length) {
    const { status, message } = notFoundResponse[0];
    return { status, message };
  }
  const id = await salesModel.insert(salesInformation);
  const data = { id, itemsSold: salesInformation };
  return { status: 'CREATED', data };
};

const deleteById = async (saleId) => {
  const sale = await salesModel.findById(saleId);
  if (!sale.length) {
    return { status: 'NOT_FOUND', message: 'Sale not found' };
  }
  const { status } = await salesModel.deleteById(saleId);
  if (status === 'SUCCESS') {
    return { status: 'NO_CONTENT' };
  }
  return { status: 'FAIL' };
};

module.exports = {
  findAll,
  findById,
  insert,
  deleteById,
};
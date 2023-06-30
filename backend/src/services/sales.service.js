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
  console.log(salesInformation);
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

module.exports = {
  findAll,
  findById,
  insert,
};
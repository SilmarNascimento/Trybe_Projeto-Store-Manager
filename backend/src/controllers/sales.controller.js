const { salesService } = require('../services');
const { mapStatus } = require('../utils/mapStatus');

const getAllSales = async (_request, response, _next) => {
  const { status, data } = await salesService.findAll();
  return response.status(mapStatus(status)).json(data);
};

const getSalesById = async (request, response, _next) => {
  const { id } = request.params;
  const { status, data, message } = await salesService.findById(id);
  if (!data) {
    return response.status(mapStatus(status)).json({ message });
  }
  return response.status(mapStatus(status)).json(data);
};

const addSales = async (request, response, _next) => {
  const salesInformation = request.body;
  const { status, data, message } = await salesService.insert(salesInformation);
  if (!data) {
    return response.status(mapStatus(status)).json({ message });
  }
  return response.status(mapStatus(status)).json(data);
};

const deleteSale = async (request, response, _next) => {
  const { id } = request.params;
  const { status, message } = await salesService.deleteById(id);
  if (message) {
    return response.status(mapStatus(status)).json({ message });
  }
  return response.status(mapStatus(status)).json();
};

const updateQuantity = async (request, response, _next) => {
  const { saleId, productId } = request.params;
  const quantity = request.body;
  const { status, data, message } = await salesService.putQuantity(saleId, productId, quantity);
  if (!data) {
    return response.status(mapStatus(status)).json({ message });
  }
  return response.status(mapStatus(status)).json(data);
};

module.exports = {
  getAllSales,
  getSalesById,
  addSales,
  deleteSale,
  updateQuantity,
};

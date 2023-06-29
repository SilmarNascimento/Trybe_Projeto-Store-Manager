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

module.exports = {
  getAllSales,
  getSalesById,
};
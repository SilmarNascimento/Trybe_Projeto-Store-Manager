const { productService } = require('../services');
const { mapStatus } = require('../utils/mapStatus');

const getAllProducts = async (_request, response, _next) => {
  const { status, data } = await productService.findAll();
  return response.status(mapStatus(status)).json(data);
};

const getProductById = async (request, response, _next) => {
  const { id } = request.params;
  const { status, data, message } = await productService.findById(id);
  if (!data) {
    return response.status(mapStatus(status)).json({ message });
  }
  return response.status(mapStatus(status)).json(data);
};

module.exports = {
  getAllProducts,
  getProductById,
};

const { productService } = require('../services');
const { mapStatus } = require('../utils/mapStatus');

const getAllProducts = async (_request, response, _next) => {
  const { status, data } = await productService.findAll();
  return response.status(mapStatus(status)).json(data);
};

module.exports = {
  getAllProducts,
};

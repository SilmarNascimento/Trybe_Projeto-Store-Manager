const { productsService } = require('../services');
const { mapStatus } = require('../utils/mapStatus');

const getAllProducts = async (_request, response, _next) => {
  const { status, data } = await productsService.findAll();
  return response.status(mapStatus(status)).json(data);
};

const getProductById = async (request, response, _next) => {
  const { id } = request.params;
  const { status, data, message } = await productsService.findById(id);
  if (!data) {
    return response.status(mapStatus(status)).json({ message });
  }
  return response.status(mapStatus(status)).json(data);
};

const searchProductByQuery = async (request, response, _next) => {
  const { q: query } = request.query;
  console.log(query);
  const { status, data, message } = await productsService.findByQuery(query);
  if (!data) {
    return response.status(mapStatus(status)).json({ message });
  }
  return response.status(mapStatus(status)).json(data);
};

const addProduct = async (request, response, _next) => {
  const newProduct = request.body;
  const { status, data, message } = await productsService.insert(newProduct);
  if (!data) {
    return response.status(mapStatus(status)).json({ message });
  }
  return response.status(mapStatus(status)).json(data);
};

const updateProduct = async (request, response, _next) => {
  const { id } = request.params;
  const productData = request.body;
  const { status, data, message } = await productsService.update(id, productData);
  if (!data) {
    return response.status(mapStatus(status)).json({ message });
  }
  return response.status(mapStatus(status)).json(data);
};

const deleteProduct = async (request, response, _next) => {
  const { id } = request.params;
  const { status, message } = await productsService.deleteById(id);
  if (message) {
    return response.status(mapStatus(status)).json({ message });
  }
  return response.status(mapStatus(status)).json();
};

module.exports = {
  getAllProducts,
  getProductById,
  searchProductByQuery,
  addProduct,
  updateProduct,
  deleteProduct,
};

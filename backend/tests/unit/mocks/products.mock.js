// Model Mocks
const allProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
];

const product01 = {
  id: 1,
  name: 'Martelo de Thor',
};

// Service Mocks
const insertProductResponse = [{
  insertId: 4,
}];

const newProduct = {
  name: 'Chackran da Xena',
};

// Controller Mocks
const allProductsFromController = {
  status: 'SUCCESSFUL',
  data: allProducts,
};

const productIdFromController = {
  status: 'SUCCESSFUL',
  data: product01,
};

const productIdFromControllerError = {
  status: 'NOT_FOUND',
  message: 'Product not found',
};

const insertProductFromService = {
  status: 'CREATED',
  data: newProduct,
};

const insertProductFromServiceError = {
  status: 'BAD_REQUEST',
  message: '"name" is required',
};

const insertInvalidNameFromServiveError = {
  status: 'INVALID_VALUE',
  message: '"name" length must be at least 5 characters long',
};

module.exports = {
  allProducts,
  product01,
  insertProductResponse,
  newProduct,
  allProductsFromController,
  productIdFromController,
  productIdFromControllerError,
  insertProductFromService,
  insertProductFromServiceError,
  insertInvalidNameFromServiveError,
};
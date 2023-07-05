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

const updateProductResponse = [{ affectedRows: 1 }];

// Service Mocks
const insertProductResponse = [{
  insertId: 4,
}];

const newProduct = {
  name: 'Chackran da Xena',
};

const reqWithoutName = {
  nome: 'Martelo do Batman',
};

const reqShortLength = {
  name: 'Mart',
};

const reqSuccessful = {
  name: 'Martelo do Batman',
};

const updatedProduct = {
  id: 1,
  ...reqSuccessful,
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

const searchQueryFromController = {
  status: 'SUCCESSFUL',
  data: [product01],
};

const updatedProductFromController = {
  status: 'SUCCESSFUL',
  data: updatedProduct,
};

const successDeletedProduct = {
  status: 'NO_CONTENT',
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

const failToConnect = { status: 'FAIL', message: 'Internal Server Error' };

module.exports = {
  allProducts,
  product01,
  reqWithoutName,
  reqShortLength,
  reqSuccessful,
  updatedProduct,
  updateProductResponse,
  insertProductResponse,
  newProduct,
  allProductsFromController,
  productIdFromController,
  searchQueryFromController,
  updatedProductFromController,
  successDeletedProduct,
  productIdFromControllerError,
  insertProductFromService,
  insertProductFromServiceError,
  insertInvalidNameFromServiveError,
  failToConnect,
};
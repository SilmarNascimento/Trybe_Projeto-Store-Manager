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

module.exports = {
  allProducts,
  product01,
  allProductsFromController,
  productIdFromController,
  productIdFromControllerError,
};
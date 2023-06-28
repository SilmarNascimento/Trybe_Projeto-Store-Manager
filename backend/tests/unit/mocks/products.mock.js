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
  status: 200,
  data: allProducts,
};

const productIdFromController = {
  status: 200,
  data: product01,
};

const productIdFromControllerError = {
  status: 404,
  message: 'Product not found',
};

module.exports = {
  allProducts,
  product01,
  allProductsFromController,
  productIdFromController,
  productIdFromControllerError,
};
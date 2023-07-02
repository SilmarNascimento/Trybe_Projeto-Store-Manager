// Model Mocks
const allSales = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2021-09-09T05:29:54.000Z',
    productId: 3,
    quantity: 15,
  },
];

const sale01 = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 10,
  },
];

const requestSalesBody = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const insertResponse = [{ insertId: 3 }];

const deletedResponse = [{ affectRows: 1 }]; 

// Service Mocks
const responseExpected = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const saleFoundByIdResponse = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 1,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 2,
    quantity: 5,
  },
];

const reqSalesWithoutId01 = [
  {
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const reqSalesWithoutId02 = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    quantity: 5,
  },
];

const reqSalesWithoutQuantity01 = [
  {
    productId: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const reqSalesWithoutQuantity02 = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
  },
];

const reqSalesNullQuantity01 = [
  {
    productId: 1,
    quantity: 0,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const reqSalesNullQuantity02 = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 0,
  },
];

const reqSalesNegativeQuantity01 = [
  {
    productId: 1,
    quantity: -1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const reqSalesNegativeQuantity02 = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: -5,
  },
];

const reqSalesInvalidProductId01 = [
  {
    productId: 5,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const reqSalesInvalidProductId02 = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 5,
    quantity: 5,
  },
];

const badRequestResponseErrorProduct = {
  status: 'BAD_REQUEST',
  message: '"productId" is required',
};

const badRequestResponseErrorQuantity = {
  status: 'BAD_REQUEST',
  message: '"quantity" is required',
};

const invalidValueResponseErrorProduct = { status: 'NOT_FOUND', message: 'Product not found' };

const invalidValueResponseErrorQuantity = {
  status: 'INVALID_VALUE',
  message: '"quantity" must be greater than or equal to 1',
};

const registeredSale = { status: 'CREATED', data: responseExpected };

// Controller Mocks
const allSalesFromController = { status: 'SUCCESSFUL', data: allSales };

const saleIdFromController = { status: 'SUCCESSFUL', data: sale01 };

const saleIdFromControllerError = { status: 'NOT_FOUND', message: 'Sale not found' };

const successDeletedSale = { status: 'NO_CONTENT' };

module.exports = {
  allSales,
  sale01,
  requestSalesBody,
  insertResponse,
  deletedResponse,
  responseExpected,
  saleFoundByIdResponse,
  reqSalesWithoutId01,
  reqSalesWithoutId02,
  reqSalesWithoutQuantity01,
  reqSalesWithoutQuantity02,
  reqSalesNullQuantity01,
  reqSalesNullQuantity02,
  reqSalesNegativeQuantity01,
  reqSalesNegativeQuantity02,
  reqSalesInvalidProductId01,
  reqSalesInvalidProductId02,
  badRequestResponseErrorProduct,
  badRequestResponseErrorQuantity,
  invalidValueResponseErrorProduct,
  invalidValueResponseErrorQuantity,
  registeredSale,
  allSalesFromController,
  saleIdFromController,
  saleIdFromControllerError,
  successDeletedSale,
};

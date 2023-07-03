// Model Mocks
const dateSale01 = '2021-09-09T04:54:29.000Z';

const allSales = [
  {
    saleId: 1,
    date: dateSale01,
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
    date: dateSale01,
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

const deletedResponse = [{ affectedRows: 1 }];

const updatedResponse = [{ affectedRows: 1 }];

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

const updatedresponseExpected = {
  saleId: 1,
  date: dateSale01,
  productId: 1,
  quantity: 5,
};

const saleFoundByIdResponse = [
  {
    saleId: 1,
    date: dateSale01,
    productId: 1,
    quantity: 1,
  },
  {
    saleId: 1,
    date: dateSale01,
    productId: 2,
    quantity: 5,
  },
];

const reqSalesWithoutId = [
  {
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const reqSalesWithoutQuantity = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
  },
];

const reqSalesNullQuantity = [
  {
    productId: 1,
    quantity: 0,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const reqSalesNegativeQuantity = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: -5,
  },
];

const reqSalesInvalidProductId = [
  {
    productId: 5,
    quantity: 1,
  },
  {
    productId: 2,
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

const badRequestProductIdNotFoundError = {
  status: 'NOT_FOUND',
  message: 'Product not found in sale',
};

const invalidValueResponseErrorProduct = { status: 'NOT_FOUND', message: 'Product not found' };

const invalidValueResponseErrorQuantity = {
  status: 'INVALID_VALUE',
  message: '"quantity" must be greater than or equal to 1',
};

const registeredSale = { status: 'CREATED', data: responseExpected };

const allSalesFromController = { status: 'SUCCESSFUL', data: allSales };

const saleIdFromController = { status: 'SUCCESSFUL', data: sale01 };

const saleIdFromControllerError = { status: 'NOT_FOUND', message: 'Sale not found' };

const successDeletedSale = { status: 'NO_CONTENT' };

const InternalServerError = { status: 'FAIL', message: 'Internal Server Error' };

module.exports = {
  allSales,
  sale01,
  requestSalesBody,
  insertResponse,
  deletedResponse,
  updatedResponse,
  responseExpected,
  updatedresponseExpected,
  saleFoundByIdResponse,
  reqSalesWithoutId,
  reqSalesWithoutQuantity,
  reqSalesNullQuantity,
  reqSalesNegativeQuantity,
  reqSalesInvalidProductId,
  badRequestResponseErrorProduct,
  badRequestResponseErrorQuantity,
  badRequestProductIdNotFoundError,
  invalidValueResponseErrorProduct,
  invalidValueResponseErrorQuantity,
  registeredSale,
  allSalesFromController,
  saleIdFromController,
  saleIdFromControllerError,
  successDeletedSale,
  InternalServerError,
};

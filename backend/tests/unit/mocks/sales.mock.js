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

// Controller Mocks
const allSalesFromController = {
  status: 'SUCCESSFUL',
  data: allSales,
};

const saleIdFromController = {
  status: 'SUCCESSFUL',
  data: sale01,
};

const saleIdFromControllerError = {
  status: 'NOT_FOUND',
  message: 'Sale not found',
};

module.exports = {
  allSales,
  sale01,
  requestSalesBody,
  insertResponse,
  allSalesFromController,
  saleIdFromController,
  saleIdFromControllerError,
};

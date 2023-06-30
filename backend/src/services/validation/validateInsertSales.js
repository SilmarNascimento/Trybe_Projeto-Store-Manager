const { salesModel } = require('../../models');
const { salesSchema } = require('./schema');

const validateSales = (array) => {
  let errorResponse = [];
  array.forEach((saleObject) => {
    const { error } = salesSchema.validate(saleObject);
    if (error && error.details[0].type === 'any.required') {
      errorResponse = [...errorResponse, { status: 'BAD_REQUEST', message: error.message }];
    }
    if (error && error.details[0].type === 'number.min') {
      errorResponse = [...errorResponse, { status: 'INVALID_VALUE', message: error.message }];
    }
  });
  return errorResponse;
};

const validateProductId = async (array) => {
  let registerError = [];
  array.forEach(async (saleObject) => {
    console.log('objeto para validação', saleObject);
    const { productId } = saleObject;
    const product = await salesModel.findById(productId);
    console.log('resposta do findById', product);
    if (!product.length) {
      registerError = [...registerError, { status: 'NOT_FOUND', message: 'Product not found' }];
    }
  });
  console.log('registro dos erros', registerError);
  return registerError;
};

module.exports = {
  validateSales,
  validateProductId,
};

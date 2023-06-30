const { salesSchema } = require('./schema');

const validateSales = (array) => {
  let errorResponse = [];
  array.forEach((saleObject) => {
    const { error } = salesSchema.validate(saleObject);
    if (error && error.details[0].type === 'any.required') {
      errorResponse = [...errorResponse, { status: 'BAD_REQUEST', message: error.message }];
    }
    if (error && error.details[0].type === 'number.min') {
      errorResponse = [...errorResponse, { status: 'INVALID_NUMBER', message: error.message }];
    }
  });
  return errorResponse;
};

module.exports = validateSales;
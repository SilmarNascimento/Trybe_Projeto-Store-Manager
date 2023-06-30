const { productSchema } = require('./schema');

const validateProduct = (obj) => {
  const { error } = productSchema.validate(obj);
  if (error && error.details[0].type === 'string.min') {
    return { status: 'INVALID_VALUE', message: error.message };
  }
  if (error && error.details[0].type === 'any.required') {
  return { status: 'BAD_REQUEST', message: error.message };
  }
};

module.exports = validateProduct;

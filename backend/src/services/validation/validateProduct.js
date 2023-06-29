const { productSchema } = require('./schema');

const validateProduct = (obj) => {
  const { error } = productSchema.validate(obj);
  if (error) {
    return { status: 'INVALID_VALUE', message: error.message };
  }
};

module.exports = validateProduct;

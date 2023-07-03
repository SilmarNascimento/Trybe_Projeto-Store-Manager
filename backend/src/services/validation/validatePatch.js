const { quantityPatchSchema } = require('./schema');

const validatePutQuantity = (obj) => {
  const { error } = quantityPatchSchema.validate(obj);
  if (error && error.details[0].type === 'number.min') {
    return { status: 'INVALID_VALUE', message: error.message };
  }
  if (error && error.details[0].type === 'any.required') {
  return { status: 'BAD_REQUEST', message: error.message };
  }
};

const validateProductId = (saleFound, productId) => {
  const productFound = saleFound.find((sale) => sale.productId === Number(productId));
  if (!productFound) {
    return { status: 'NOT_FOUND', message: 'Product not found in sale' };
  }
};

const validateInput = (obj, saleFound, productId) => {
  const quantityError = validatePutQuantity(obj);
  const productIdError = validateProductId(saleFound, productId);
  if (quantityError) {
    return { status: quantityError.status, message: quantityError.message };
  }
  if (productIdError) {
    return { status: productIdError.status, message: productIdError.message };
  }
};

module.exports = validateInput;

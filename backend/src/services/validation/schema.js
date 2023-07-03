const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required().min(5),
});

const quantitySchema = Joi.number()
.integer()
.min(1)
.required()
.messages({
  message: '"quantity" must be greater than or equal to 1',
});

const productIdSchema = Joi.number().integer().required();

const salesSchema = Joi.object({
  productId: productIdSchema,
  quantity: quantitySchema,
});

const quantityPatchSchema = Joi.object({
  quantity: quantitySchema,
});

module.exports = {
  productSchema,
  salesSchema,
  quantityPatchSchema,
};

const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required().min(5),
});

const salesSchema = Joi.object({
  productId: Joi.number()
    .integer()
    .required(),
  quantity: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      message: '"quantity" must be greater than or equal to 1',
    }),
});

module.exports = {
  productSchema,
  salesSchema,
};

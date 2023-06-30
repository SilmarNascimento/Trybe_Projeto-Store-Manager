const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required().min(5),
});

module.exports = {
  productSchema,
};

const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

//Create and compile mongoDB schema
const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  })
);

//Validate Client Rulesets
function validationRulesets(customer) {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string().required().min(5).max(50),
    phone: Joi.string().required().min(5).max(50)
  });

  return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validationRulesets = validationRulesets;

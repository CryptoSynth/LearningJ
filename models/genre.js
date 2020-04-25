const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

//Create & Compile mongoose model Schema
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});
const Genre = mongoose.model('Genre', genreSchema);

//Validation Rulesets
function validationRulesets(genre) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required()
  });
  return schema.validate(genre);
}

exports.Genre = Genre;
exports.validationRulesets = validationRulesets;
exports.genreSchema = genreSchema;

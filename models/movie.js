const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { genreSchema } = require('../models/genre');

//Movie Document
const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255
    },
    genre: {
      type: genreSchema,
      required: true
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    }
  })
);

//Validate Client Rulesets
function validationRulesets(movie) {
  const schema = Joi.object({
    title: Joi.string().required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().required().min(0).max(255),
    dailyRentalRate: Joi.number().required().min(0).max(255)
  });

  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validationRulesets = validationRulesets;

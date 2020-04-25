const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
const auth = require('../middleware/auth');

const validateRuleset = require('../middleware/validateRuleset');

router.post(
  '/',
  [auth, validateRuleset(validationRulesets)],
  async (req, res) => {
    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if (!rental) return res.status(404).send('no rental found.');

    if (rental.dateReturned)
      return res.status(400).send('Return already processed!');

    rental.return();
    await rental.save();

    await Movie.update(
      { _id: rental.movie._id },
      {
        $inc: { numberInStock: 1 }
      }
    );

    return res.send(rental);
  }
);

//Validation Rulesets
function validationRulesets(req) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  });

  return schema.validate(req);
}

module.exports = router;

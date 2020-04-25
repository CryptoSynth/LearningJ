const express = require('express');
const { Genre, validationRulesets } = require('../models/genre');

//middlware handler
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');

//router handler
const router = express.Router();

//GET
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send('The genre with the given ID does not exist!');

  res.send(genre);
});

//POST
router.post('/', auth, async (req, res) => {
  const { error } = validationRulesets(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name });

  await genre.save();
  res.send(genre);
});

//PUT
router.put('/:id', [auth, validateObjectId], async (req, res) => {
  const { error } = validationRulesets(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) return res.status(404).send('Sorry, that genre does not exist!');

  res.send(genre);
});

//DELETE
router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) return res.status(400).send('Sorry, that genre does not exist!');

  res.send(genre);
});

module.exports = router;

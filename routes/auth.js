const express = require('express');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

//route handler
const router = express.Router();

//POST
router.post('/', async (req, res) => {
  const { error } = validationAuthentication(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  const token = user.generateAuthToken();
  res.send(token);
});

function validationAuthentication(req) {
  const schema = Joi.object({
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(1024)
  });

  return schema.validate(req);
}

module.exports = router;

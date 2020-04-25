const express = require('express');
const { User, validationRulesets } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');

//middleware handler
const auth = require('../middleware/auth');

//route handler
const router = express.Router();

//GET
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

//POST
router.post('/', async (req, res) => {
  const { error } = validationRulesets(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User is already registered');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;

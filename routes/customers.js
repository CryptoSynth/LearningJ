//Install Modules
const express = require('express');
const { Customer, validationRulesets } = require('../models/customer');

//create router handle
const router = express.Router();

//POST
router.post('/', async (req, res) => {
  const { error } = validationRulesets(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  });

  await customer.save();
  res.send(customer);
});

//GET (Document)
router.get('/', async (req, res) => {
  const customer = await Customer.find().sort({ name: 1 });
  res.send(customer);
});

//Get (Document by ID)
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.send(customer);
  } catch (ex) {
    res.status(404).send('The given ID does not exist!');
  }
});

//PUT
router.put('/:id', async (req, res) => {
  const { error } = validationRulesets(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          isGold: req.body.isGold,
          name: req.body.name,
          phone: req.body.phone
        }
      },
      { new: true }
    );
    res.send(customer);
  } catch (ex) {
    res.status(404).send('The given ID does not exist!');
  }
});

//DELETE
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    res.send(customer);
  } catch (ex) {
    res.status(404).send('The given ID does not exist!');
  }
});

//export router handle
module.exports = router;

//Manage http://vidly.com/api/genres
// - User might have a drop down list to select genere
//Read genres (ex. Horror, Action, Thriller)
const express = require('express');
const Joi = require('@hapi/joi');

const app = express();
const __apipath = '/api/genres';

app.use(express.json());

const genres = [
  { id: 1, category: 'horror' },
  { id: 2, category: 'action' },
  { id: 3, category: 'thriller' }
];

//GET
app.get(__apipath, (req, res) => {
  res.send(genres);
});

app.get(`${__apipath}/:id`, (req, res) => {
  const genre = genres.find((e) => e.id === parseInt(req.params.id));
  if (!genre) return res.status(400).send('Sorry, that genre does not exist!');
  res.send(genre);
});

//POST
app.post(__apipath, (req, res) => {
  const { error } = valadationRuleset(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const addGenre = {
    id: genres.length + 1,
    category: req.body.category
  };

  genres.push(addGenre);
  res.send(addGenre);
});

//PUT
app.put(`${__apipath}/:id`, (req, res) => {
  const genre = genres.find((e) => e.id === parseInt(req.params.id));
  if (!genre) return res.status(400).send('Sorry, that genre does not exist!');

  const { error } = valadationRuleset(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.category = req.body.category;
  res.send(genre);
});

//DELETE
app.delete(`${__apipath}/:id`, (req, res) => {
  const genre = genres.find((e) => e.id === parseInt(req.params.id));
  if (!genre) return res.status(400).send('Sorry, that genre does not exist!');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

//Validation Rulesets
function valadationRuleset(genre) {
  const schema = Joi.object({
    category: Joi.string().min(3).required()
  });
  return schema.validate(genre);
}

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Lisetning on port ${port}...`);
});

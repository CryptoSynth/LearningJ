//Module Imports
const debug = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('@hapi/joi');
const logger = require('./logger');
const auth = require('./authentication');
const express = require('express');
const app = express();

//configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

//Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

//install built in express middleware function
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//install third party middleware function
app.use(helmet());
if (app.get('env') === 'development') {
  app.use(morgan('tiny')); //only for development
  debug('Mogan enabled...');
}

//install custom middleware function
app.use(logger);
app.use(auth);

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];

//GET
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with the given ID was not found!');
  res.send(course);
});

//POST
app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
});

//PUT
app.put('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(400).send('Course ID does not exist!');

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //update
  course.name = req.body.name;
  res.send(course);
});

//DELETE
app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(400).send('Course ID does not Exist!');

  const index = courses.indexOf(course);

  courses.splice(index, 1);

  res.send(course);
});

//function validation
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });

  return schema.validate(course);
}

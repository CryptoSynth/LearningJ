const express = require('express');
const Joi = require('@hapi/joi');
const router = express.Router();

//app code START HERE
const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];

router.get('/', (req, res) => {
  res.send(courses);
});

router.get('/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with the given ID was not found!');
  res.send(course);
});

//POST
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(400).send('Course ID does not exist!');

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //update
  course.name = req.body.name;
  res.send(course);
});

//DELETE
router.delete('/:id', (req, res) => {
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

module.exports = router;

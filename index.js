//Module Imports
const debug = require('debug')('app:debug');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');
const home = require('./routes/home');
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
  debug('Morgan enabled...');
}

//Templating Engine
app.set('view engine', 'pug');
app.set('views', './views'); //default

//router loadout
app.use('/', home);
app.use('/api/courses', courses);

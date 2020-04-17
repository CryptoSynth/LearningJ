const express = require('express');
const debug = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const genres = require('./routes/genres');
const app = express();

//Configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Server Password: ${config.get('mail.password')}`);

//Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Lisetning on port ${port}...`);
});

//Middleware Install
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Third Party Middleware Install
app.use(helmet());
if (app.get('env') === 'development') {
  app.use(morgan('tiny')); //DEV ENV ONLY
  debug('Morgan Enabled...');
}

//Template Engine
app.set('views engine', 'pug');
app.set('views', './views');

//Route Loadout
app.use('/api/genres', genres);

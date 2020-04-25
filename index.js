const express = require('express');
const winston = require('winston');
// require('winston-mongodb');
const app = express();

require('./startup/logging')(winston);
require('./startup/config')(app, winston);
require('./startup/middleware')(app, winston, express);
require('./startup/template')(app);
require('./startup/database')();
require('./startup/validation')();
require('./startup/routes')(app);
require('./startup/prod')(app);

//Port
const port = parseInt(process.env.PORT) || 3000;
const server = app.listen(port, () => {
  winston.info(`Listening on port ${port}...`);
});

module.exports = server;

const express = require('express');
const winston = require('winston');
require('winston-mongodb');
const app = express();

require('./startup/logging')(winston);
require('./startup/config')(app, winston);
require('./startup/malware')(app, winston, express);
require('./startup/template')(app);
require('./startup/database')();
require('./startup/validation')();
require('./startup/routes')(app);

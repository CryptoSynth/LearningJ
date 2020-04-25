const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

//connect mongoDB
module.exports = function () {
  const db = config.get('db');

  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      winston.log({
        level: 'info',
        message: `Connnected to ${db}...`
      });
    });
};

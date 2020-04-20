const mongoose = require('mongoose');
const winston = require('winston');

//connect mongoDB
module.exports = function () {
  mongoose
    .connect('mongodb://localhost/vidly', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      winston.log({
        level: 'info',
        message: 'Connnected to MongoDB...'
      });
    });
};

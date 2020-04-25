require('express-async-errors');

const { format } = require('winston');
const { combine, printf } = format;

module.exports = function (winston) {
  //subscribe to uncaughtExceptions FIX THROWING ERRORS
  winston.exceptions.handle(
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  );

  //subscribe to uncaugtRejections
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  //Format winston logging
  const myFormat = printf(({ level, message }) => {
    return `${level}: ${message}`;
  });

  //create logging transport
  winston.configure({
    format: combine(myFormat, format.colorize(), format.simple()),
    transports: [
      new winston.transports.Console({
        level: 'error'
      }),
      new winston.transports.Console({
        level: 'info'
      })
    ]
  });

  // winston.add(
  //   new winston.transports.MongoDB({
  //     db: 'mongodb://localhost/vidly',
  //     level: 'error'
  //   })
  // );
};

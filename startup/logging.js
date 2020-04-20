require('express-async-errors');

module.exports = function (winston) {
  //subscribe to uncaughtExceptions
  winston.exceptions.handle(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  );

  //subscribe to uncaugtRejections
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  //create logging transport
  winston.add(new winston.transports.File({ filename: 'error.log' }));
  winston.add(
    new winston.transports.MongoDB({
      db: 'mongodb://localhost/vidly',
      level: 'error'
    })
  );
};

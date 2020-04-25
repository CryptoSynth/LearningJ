const config = require('config');

module.exports = function (app, winston) {
  //Configuration
  winston.log({
    level: 'info',
    message: `Application Name: ${config.get('name')}`
  });

  if (!config.get('jwtPrivateKey')) {
    winston.log({
      level: 'info',
      message: config.get('jwtPrivateKey')
    });
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }
};

const config = require('config');

module.exports = function (app, winston) {
  //Configuration
  winston.log({
    level: 'info',
    message: `Application Name: ${config.get('name')}`
  });
  winston.log({
    level: 'info',
    message: `Mail Server: ${config.get('mail.host')}`
  });
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }

  //Port
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    winston.log({
      level: 'info',
      message: `Listening on port ${port}...`
    });
  });
};

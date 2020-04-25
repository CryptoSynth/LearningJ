const morgan = require('morgan');

module.exports = function (app, winston, express) {
  //Middleware Install
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  //Third Party Middleware Install
  if (app.get('env') === 'development') {
    app.use(morgan('tiny')); //DEV ENV ONLY
    winston.log({
      level: 'info',
      message: 'Morgan Enabled...'
    });
  }
};

const createError = require('http-errors');

const indexRouter = require('./index-route');
const ucpRouter = require('./ucp-index-route');
const signinRouter = require('./signin-route');
const signupRouter = require('./signup-route');

module.exports = app => {
  app.use('/', indexRouter);
  app.use('/ucp', ucpRouter);
  app.use('/signin', signinRouter);
  app.use('/signup', signupRouter);

  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use((err, req, res, next) => {
    res.locals.message = err.stack;

    res.status(err.status || 500);
    res.render('error');

    next();
  });
};

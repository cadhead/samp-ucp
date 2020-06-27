const createError = require('http-errors');

const indexRouter = require('./index-route');
const ucpRouter = require('./ucp-index-route');
const signinRouter = require('./ucp-signin-route');
// const signupRouter = require('./ucp-signup-route');

module.exports = app => {
  const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    req.flash(
      'authMessage',
      'You do not have the required permissions to view or read this content.'
    );
    return res.redirect('/signin');
  };

  app.use('/', indexRouter);
  app.use('/ucp', isAuthenticated, ucpRouter);
  app.use('/signin', signinRouter);
  // app.use("/signup", signupRouter);

  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
  });
};

const { Strategy } = require('passport-local');

const localSignin = require('./local-signin');
const localSignup = require('./local-signup');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use('local-signin', new Strategy(
    localSignin.config,
    localSignin.callback
  ));

  passport.use('local-signup', new Strategy(
    localSignup.config,
    localSignup.callback
  ));
};

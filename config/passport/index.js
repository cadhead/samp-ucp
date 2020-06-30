const { Strategy } = require('passport-local');

const UserService = require('../../services/user-service');

const localSignin = require('./local-signin');
const localSignup = require('./local-signup');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.ID);
  });

  passport.deserializeUser((id, done) => {
    return UserService.findUserById(id)
      .then(result => {
        return done(null, result);
      })
      .catch(err => {
        throw err;
      });
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

const User = require('../../controllers/user-controller');
const { getSignupMessage } = require('../error-messages');
const signupValidate = require('../../lib/signup-validate');

module.exports = {
  config: {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },

  callback(req, username, password, done) {
    signupValidate(req.body, (errors => {
      if (errors) {
        let message = req.flash('authMessage', errors);

        done(null, false, { message });
      } else {
        User.createUser({
          username,
          email: req.body.email,
          password,
          ip: req.ip
        })
          .then(res => {
            let message = req.flash('authMessage', getSignupMessage(res));

            done(null, res, { message });
          });
      }
    }));
  }
};

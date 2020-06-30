const User = require('../../controllers/user-controller');
const { getSignupMessage } = require('../error-messages');

module.exports = {
  config: {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },

  callback(req, username, password, done) {
    User.createUser({
      username,
      email: req.body.email,
      password,
      ip: req.ip
    })
      .then(res => {
        let message = req.flash('authMessage', getSignupMessage(res));

        return done(null, res, { message });
      });
  }
};

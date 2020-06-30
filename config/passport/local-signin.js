const User = require('../../controllers/user-controller');
const { getSigninMessage } = require('../error-messages');

module.exports = {
  config: {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },

  callback(req, username, password, done) {
    User.loginUser(username, password)
      .then(res => {
        let message = req.flash('authMessage', getSigninMessage(res));

        return done(null, res, { message });
      });
  }
};

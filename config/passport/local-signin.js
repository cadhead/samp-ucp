const User = require('../../controllers/user-controller');

const signinMessages = {
  ok: 'Successfully logged in.',
  wrongPass: 'Incorrect password.',
  notExist: 'User not exist. You can register it yourself!'
};

function getSigninMessage(res) {
  switch (res) {
    case null: {
      return signinMessages.notExist;
    }
    case false: {
      return signinMessages.wrongPass;
    }
    default: {
      return signinMessages.ok;
    }
  }
}

module.exports = {
  config: {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },

  callback(req, username, password, done) {
    let user = new User({
      Username: username
    });

    user.login(password)
      .then(res => {
        let message = req.flash('authMessage', getSigninMessage(res));

        return done(null, res, { message });
      });
  }
};

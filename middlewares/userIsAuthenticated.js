const { accessMessages } = require('../config/error-messages');

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash(
    'authMessage',
    accessMessages.notAccess
  );

  return res.redirect('/signin');
};

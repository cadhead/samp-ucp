const checkUserAuthenticated = require('./userIsAuthenticated');
const { accessMessages } = require('../config/error-messages');

module.exports = (page, req, res, next) => {
  const group = req.session.profile
    ? req.session.profile.group
    : null;

  if (!group) {
    switch (page.access) {
      case 0: {
        return next();
      }
      default: {
        return checkUserAuthenticated(req, res, next);
      }
    }
  }

  if (group < page.access) {
    return res.render('error', {
      title: `Can't access to ${page.title}...`,
      profile: page.profile,
      message: accessMessages.notAccess
    });
  }

  return next();
};

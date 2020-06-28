const Page = require('../models/page-model');
const checkUserAuthenticated = require('../middlewares/userIsAuthenticated');

function execCallback(cb) {
  if (cb && typeof cb === 'function') {
    cb();
  }
}

class PageController {
  constructor(config) {
    this.page = new Page(config);
  }

  render(req, res, next) {
    res.render(this.page.template, {
      title: this.page.title,
      profile: this.page.profile,
      access: this.page.access,
      ...this.page.locals
    });

    execCallback(next);
  }

  setTitle(title) {
    this.page.title = title;
  }

  static checkUserAccess(req, res, next) {
    const group = req.session.profile
      ? req.session.profile.group
      : null;

    if (!group) {
      switch (this.page.access) {
        case 0: return next();
        default: {
          return checkUserAuthenticated(req, res, next);
        }
      }
    }

    if (group < this.page.access) {
      req.flash(
        'accessRequiredMessage',
        'You do not have the required permissions to view or read this content.'
      );

      return res.redirect('/');
    }

    return next();
  }
}

module.exports = PageController;

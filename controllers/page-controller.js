const Page = require('../models/page-model');
const checkUserAuthenticated = require('../middlewares/userIsAuthenticated');
const { accessMessages } = require('../config/error-messages');

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
    this.update(req);

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

  update(req) {
    this.page.profile = req.session.profile;
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
        accessMessages.notAccess
      );

      return res.render('error', {
        title: `Can't access to ${this.page.title}...`,
        profile: this.page.profile,
        message: req.flash('accessRequiredMessage')
      });
    }

    return next();
  }
}

module.exports = PageController;

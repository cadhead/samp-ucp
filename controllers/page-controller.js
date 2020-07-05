const Page = require('../models/page-model');
const userIsHasAccess = require('../middlewares/userIsHasAccess');

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
      ...this.page.locals
    });

    execCallback(next);
  }

  setTitle(title) {
    this.page.title = title;
  }

  update(req) {
    if (req.session.profile) this.page.profile = req.session.profile;
  }

  static checkUserAccess(req, res, next) {
    return userIsHasAccess(this.page, req, res, next);
  }
}

module.exports = PageController;

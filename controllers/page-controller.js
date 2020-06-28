const Page = require('../models/page-model');

class PageController {
  constructor(config) {
    this.page = new Page(config);
  }

  render(req, res, next) {
    res.render(this.page.template);

    if (next && typeof next === 'function') {
      next();
    }
  }

  setTitle(title) {
    this.page.title = title;
  }
}

module.exports = PageController;

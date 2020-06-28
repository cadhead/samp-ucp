const Profile = require('./profile-model');

class Route {
  $title = '';

  template = 'index';

  access = 0;

  profile = new Profile({
    name: 'Guest'
  });

  locals = { };

  constructor(config) {
    Object.assign(this, config);
  }

  set title(newVal) {
    this.$title = newVal;

    return newVal;
  }

  get title() {
    return this.$title;
  }
}

module.exports = Route;

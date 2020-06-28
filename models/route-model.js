const Profile = require('./profile-model');

class Route {
  title = '';

  template = 'index';

  access = 0;

  profile = new Profile({
    name: 'Guest'
  });

  constructor(config) {
    Object.assign(this, config);
  }
}

module.exports = Route;

class Profile {
  name = '';

  email = '';

  registerDate = 0;

  loginDate = 0;

  IP = '0.0.0.0';

  group = 0;

  aLevel = 0;

  pLevel = 0;

  fill(config) {
    Object.assign(this, config);
  }
}

module.exports = Profile;

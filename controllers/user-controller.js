const User = require('../models/user-model');
const {
  passwordCompare,
  generateSalt,
  encryptPassword
} = require('../lib/encrypt');

class UserController {
  constructor(userData) {
    this.user = new User(userData);
  }

  getProfile() {
    return User.getProfile(this.user);
  }

  static createUser(params) {
    let {
      username,
      email,
      password,
      ip
    } = params;
    let salt = generateSalt(16);
    let hash = encryptPassword(password, salt);

    const user = new User({
      Username: username,
      Email: email,
      PassHash: hash,
      PassSalt: salt,
      RegisterDate: Math.round((new Date()).getTime() / 1000),
      LoginDate: Math.round((new Date()).getTime() / 1000),
      IP: ip
    });

    return User.findOneByUsername(user.Username, result => {
      if (result) {
        return false;
      }

      return User.createOne(user, err => {
        if (err) return null;

        return true;
      });
    });
  }

  login(password) {
    return User.findOneByUsername(this.user.Username, result => {
      if (!result) return null;

      this.user = result;
      const { PassHash, PassSalt } = this.user;

      if (!passwordCompare(password, PassHash, PassSalt)) {
        return false;
      }

      return result;
    });
  }
}

module.exports = UserController;

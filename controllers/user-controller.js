const User = require("../models/user-model");
const { passwordCompare } = require("../lib/encrypt");

class UserController {
  constructor(userData) {
    this.user = new User(userData);
  }

  getProfile() {
    return User.getProfile(this.user);
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
    })
  }

  
}

module.exports = UserController;

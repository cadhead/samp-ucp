const userService = require('../services/user-service');

/**
 * @private
 * Setup's user config
 *
 * @param {User} ctx
 * @param {Object} config
 */

function setup(ctx, config) {
  Object.assign(ctx, {
    Username: '',
    Email: '',
    PassHash: '',
    PassSalt: '',
    RegisterDate: 0,
    LoginDate: 0,
    IP: '0.0.0.0',
    PlayerGroup: 0,
    ALevel: 0,
    PLevel: 0
  }, config);
}

class User {
  constructor(config) {
    setup(this, config);
  }

  static getProfile(user) {
    return {
      name: user.Username,
      email: user.Email,
      registerDate: user.RegisterDate,
      loginDate: user.LoginDate,
      IP: user.IP,
      group: user.PlayerGroup,
      aLevel: user.ALevel,
      pLevel: user.PLevel
    };
  }

  // static findAll(callback) {

  // }

  static findOneById(id, callback) {
    return userService.findUserById(id)
      .then(res => {
        return callback(res);
      })
      .catch(err => {
        throw err;
      });
  }

  static findOneByUsername(username, callback) {
    return userService.findUserByName(username)
      .then(res => {
        return callback(res);
      })
      .catch(err => {
        throw err;
      });
  }

  static createOne(user, callback) {
    return userService.createUser(user)
      .then(res => {
        return callback(res);
      })
      .catch(err => {
        throw err;
      });
  }

  // static updateOne(user) {

  // }

  // static deleteOne(user) {

  // }
}

module.exports = User;

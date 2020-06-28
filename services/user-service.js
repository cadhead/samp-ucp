const db = require('../database');

/**
 * @private
 * Setup's user creation config
 *
 * @param {User} user
 * @returns {Object}
 */

function setupCreationQuery(user) {
  return {
    sql: 'INSERT INTO `accounts` '
      + '(`Username`, `Email`, `PassHash`, `PassSalt`, '
      + '`RegisterDate`, `LoginDate`, `IP`, `PlayerGroup`, '
      + '`ALevel`, `PLevel`) VALUES (?,?,?,?,?,?,?,?,?,?)',

    data: [
      user.Username,
      user.Email,
      user.PassHash,
      user.PassSalt,
      user.RegisterDate,
      user.LoginDate,
      user.IP,
      user.PlayerGroup,
      user.ALevel,
      user.PLevel
    ]
  };
}

module.exports = {
  findUserById(id) {
    return db.query('SELECT * FROM `accounts` WHERE ID = ?', [id])
      .then((result) => result[0]);
  },

  findUserByName(username) {
    return db.query('SELECT * FROM `accounts` WHERE Username = ?', [username])
      .then((result) => result[0]);
  },

  createUser(user) {
    const { sql, data } = setupCreationQuery(user);

    return db.query(sql, data)
      .then((result) => result.ID);
  }
};

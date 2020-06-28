const crypto = require('crypto');

function encryptPassword(password, salt) {
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
}

module.exports = {
  encryptPassword,

  passwordCompare(pass, hash, salt) {
    let hashedPass = encryptPassword(pass, salt);

    return hashedPass === hash;
  },

  generateSalt(size) {
    return crypto.randomBytes(size).toString('hex');
  }
};

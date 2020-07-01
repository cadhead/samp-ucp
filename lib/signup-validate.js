const { Validator } = require('node-input-validator');

module.exports = (inputs, cb) => {
  const validator = new Validator(
    inputs,
    {
      username: 'required|length:20,3',
      email: 'required|email|length:30,5',
      password: 'required',
      'server-terms-accept': 'accepted',
      'first-account-accept': 'accepted'
    }
  );

  validator.check().then(ok => {
    if (!ok) return cb(validator.errors);

    return cb(false);
  });
};

const { Validator } = require('../../config/error-messages');

module.exports = (inputs, cb) => {
  const validator = new Validator(
    inputs,
    {
      username: 'required|length:20,3',
      email: 'required|email|length:30,5',
      password: 'required',
      'server-terms-accept': 'accepted'
    }
  );

  validator.check().then(ok => {
    if (!ok) {
      let errorMessages = [];

      Object.values(validator.errors).forEach(err => {
        errorMessages.push(err.message);
      });

      return cb(errorMessages);
    }

    return cb(false);
  });
};

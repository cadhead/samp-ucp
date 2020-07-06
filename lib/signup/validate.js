const { Validator } = require('../../config/error-messages');
const SignupQuestions = require('./questions-controller');

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
    let questionsIsCorrect = SignupQuestions.checkQuestions(inputs);

    if (!ok || !questionsIsCorrect) {
      let errorMessages = [];

      if (validator.errors) {
        Object.values(validator.errors).forEach(err => {
          errorMessages.push(err.message);
        });
      }

      if (!questionsIsCorrect) {
        errorMessages.push('Wrong questions.');
      }

      return cb(errorMessages);
    }

    return cb(false);
  });
};

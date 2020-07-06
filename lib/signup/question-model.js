class Question {
  question = '';

  answers = [];

  constructor(params) {
    Object.assign(this, params);
  }
}

module.exports = Question;

const { shuffle, find } = require('lodash');
const Question = require('./question-model');
const { signupQuestionsList } = require('../../config');

class SignupQuestions {
  items = [];

  constructor(config = {}) {
    signupQuestionsList.forEach(q => {
      this.addQuestion(q);
    });

    if (config.questions) {
      config.questions.forEach(q => {
        this.addQuestion(q);
      });
    }
  }

  get() {
    return this.items;
  }

  addQuestion(params) {
    this.items.push(new Question(params));
  }

  shuffleQuestions(num, shuffleAnswers = true) {
    this.items = shuffle(this.items);
    this.items = this.items.slice(0, num);

    if (shuffleAnswers) this.shuffleAnswers();

    return this;
  }

  shuffleAnswers() {
    this.items.forEach(q => {
      shuffle(q.answers);
    });
  }

  static checkQuestions(data) {
    let wrongAnswers = [];
    Object.keys(data).forEach(key => {
      let q = find(signupQuestionsList, { id: key });
      let id = Number.parseInt(data[key], 10);
      if (q) {
        wrongAnswers.push(
          q.answers.find(item => item.id === id)
        );
      }
    });

    return !!wrongAnswers;
  }
}

module.exports = SignupQuestions;

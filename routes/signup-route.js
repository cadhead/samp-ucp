const router = require('express').Router();
const passport = require('passport');
const Page = require('../controllers/page-controller');
const User = require('../controllers/user-controller');
const { SignupQuestions } = require('../lib/signup');

const signupPage = new Page({
  title: 'Sign up',
  template: 'signup'
});

router.get('/', (req, res) => {
  res.locals.authMessages = req.flash('authMessage');
  res.locals.questions = new SignupQuestions()
    .shuffleQuestions(3)
    .get();

  signupPage.render(req, res);
});

router.post('/', passport.authenticate('local-signup', {
  failureFlash: true,
  failureRedirect: '/signup'
}), (req, res) => {
  req.session.user = new User(req.user);
  req.session.profile = req.session.user.getProfile();
  res.redirect('/ucp');
});

module.exports = router;

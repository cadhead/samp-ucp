const router = require('express').Router();
const passport = require('passport');
const User = require('../controllers/user-controller');
const Page = require('../controllers/page-controller');

const signinPage = new Page({
  title: 'Sign in',
  template: 'signin'
});

router.get('/', (req, res) => {
  res.locals.authMessages = req.flash('authMessage');

  signinPage.render(req, res);
});

router.post('/', passport.authenticate('local-signin', {
  failureFlash: true,
  failureRedirect: '/signin'
}), (req, res) => {
  req.session.user = new User(req.user);
  req.session.profile = req.session.user.getProfile();

  res.redirect('/ucp');
});

module.exports = router;

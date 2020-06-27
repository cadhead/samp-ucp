const router = require('express').Router();
const passport = require('passport');
const User = require('../controllers/user-controller');

router.get('/', (req, res) => {
  res.locals.authMessages = req.flash('authMessage');

  const profile = req.session.profile || {};

  res.render('signin', { profile, title: 'Sign in' });
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

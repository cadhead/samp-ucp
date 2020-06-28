module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash(
    'authMessage',
    'You do not have the required permissions to view or read this content.'
  );

  return res.redirect('/signin');
};

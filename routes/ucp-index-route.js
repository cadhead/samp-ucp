const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index', {
    profile: req.session.profile,
    title: 'User Control Panel'
  });
});

module.exports = router;

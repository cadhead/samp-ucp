const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'SA:MP RolePlay Server'
  });
});

module.exports = router;

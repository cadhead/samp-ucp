const router = require('express').Router();
const Page = require('../controllers/page-controller');

const indexPage = new Page({
  title: 'SA:MP RolePlay Server'
});

router.get('/', (req, res) => {
  indexPage.render(req, res);
});

module.exports = router;

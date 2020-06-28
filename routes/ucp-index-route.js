const router = require('express').Router();
const Page = require('../controllers/page-controller');

const ucpPage = new Page({
  title: 'User Control Panel',
  access: 1
});

router.get('/', Page.checkUserAccess.bind(ucpPage), (req, res) => {
  ucpPage.render(req, res);
});

module.exports = router;

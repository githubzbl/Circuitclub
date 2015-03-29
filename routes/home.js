// home.js
var router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: '电路分析' });
});

module.exports = router;
// home.js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: '电路分析' });
});

module.exports = router;
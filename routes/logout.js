// logout.js
var router = require('express').Router();
var User = require('../models/user');

// 退出
router.route('/').get(function (req, res) {
  req.session.user = null;
  res.redirect('/');
});


module.exports = router;

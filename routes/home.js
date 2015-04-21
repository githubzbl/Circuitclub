// home.js
var router = require('express').Router();
/* GET home page. */
router.get('/', function (req, res) {
  console.log('user in session:', req.session.user);
  res.render('index', { 
    title: '电路分析',
    user: req.session.user 
  });
});

module.exports = router;
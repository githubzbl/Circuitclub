// std.js
var express = require('express');
var router = express.Router();

router.route('/')
.get(function (req, res) {
	return res.render('std', {
		title: '我的主页'
	})
})
router.route('/onlinetest')
.get(function (req, res) {
	res.render('onlinetest', {
		title: '在线考试' 
	})
})

module.exports = router;
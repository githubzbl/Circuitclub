// std.js
var express = require('express');
var router = express.Router();

router.route('/')
.get(function (req, res) {
	if (req.session.logged_in) {
		return res.render('std', {
			title: 'My Home',
			user: req.session.name
		});
	}
})
router.route('/onlinetest')
.get(function (req, res) {
	res.render('onlinetest', {
		title: '在线考试' 
	})
})

module.exports = router;
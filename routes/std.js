// std.js
var express = require('express');
var router = express.Router();

router.route('/')
.get(function (req, res) {
	if (req.session.logged_in) {
		return res.render('std', {
			title: req.session.name + ' Home',
			user: req.session.name
		});
	}
});
router.route('/paperinfo')
.get(function (req, res) {
	return res.render('paperinfo');

});
router.route('/a')
.get(function (req, res) {
	return res.sendFile('../views/pages/a.html');

});
router.route('/onlinetest')
.get(function (req, res) {
	res.render('onlinetest', {
		title: '在线考试' 
	})
})

module.exports = router;
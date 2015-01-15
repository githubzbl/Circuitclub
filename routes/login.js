// login.js
var express = require('express');
var router = express.Router();


// 登录
router.route('/')
.get(function (req, res) {
	res.render('login', {
		title: '登录'
	})
})
.post(function (req, res) {
	console.log(req.body.username)
	console.log(req.body.password)
	if (req.body.username == 'admin')
		if (req.body.password == 'root')
			return res.redirect('/admin')
	// if (err)
	// req.session.msg= 'Error'
	// return res.redirect('/')
})

module.exports = router;

// login.js
var router = require('express').Router();

var users = require('./users');

// 登录
router.route('/')
.get(function (req, res) {
		res.render('login', {
			title: '登录'
		});
})
.post(function (req, res) {
	console.log(req.body.username);
	console.log(req.body.password);
	if (!users[req.body.username] || 
		req.body.password != users[req.body.username].password) {
		res.end('Bad name/passwd!');
	} else {
		req.session.logged_in = true;
		req.session.name = users[req.body.username].name;
		console.log('session:', req.session, 'session.name:', req.session.name);
		if (req.body.username === 'admin') {
			return res.redirect('/admin');
		} else {
			return res.redirect('/std');
		}

	}

	// if (req.body.username == 'admin')
	// 	if (req.body.password == 'root')
	// 		return res.redirect('/admin')
	// if (err)
	// req.session.msg= 'Error'
	// return res.redirect('/')
});

module.exports = router;

var router = require('express').Router();

var User = require('../models/user');

// 注册
router.route('/')
.get(function (req, res) {
	return res.render('signup', {
		title: '注册'
	})
})
.post(function (req, res, next) {
	var data = req.body;
	console.log(data);

	User.findOne({ username: data.username }, function (err, user) {
		if (err) return next(err);
		if (user) {
			return res.json({ err: 1 });    // 用户名已被占用
		} else {
				user = new User(data);
				user.save(function (err, user) {
				if (err) {
					console.log(err);
				}
				req.session.user = user;
				console.log('session:', req.session);
				res.json({success: 1});  // 注册成功
				});
			}
	});
	// console.log('body: ' + JSON.stringify(req.body));	
});

module.exports = router;

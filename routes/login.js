// login.js
var router = require('express').Router();
var User = require('../models/user');
// var users = require('./users');

// 登录
router.route('/')
.get(function (req, res) {
	return res.render('login', {
		title: '登录'
	})
})
.post(function (req, res, next) {
	var data = req.body;
	console.log('postdata:', data);
	User.findOne({ username: data.username }, function (err, user) {
		if (err) return next(err);
		if (!user) {
			return res.json({ err: 1 });    // 用户不存在
		} else {
			user.comparePassword(data.password, function(err, isMatch) {
	      if (err) {
	        console.log(err)
	      }

	      if (isMatch) {
	      	req.session.user = user;
	        // req.session.logged_in = true;
	        console.log('session:', req.session);
					return res.json({ success: 1 });  // 登录成功
	      } else {
	        return res.json({ err: 2 });  // 密码错误	      
    		}
			})
		}
	// console.log('body: ' + JSON.stringify(req.body));	
	});
});

module.exports = router;

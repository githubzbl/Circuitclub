var router = require('express').Router(),
	  crypto = require('crypto');

var User = require('../models/user.js');

// 注册
router.route('/')
.get(function (req, res) {
	return res.render('reg', {
		title: '注册'
	})
})
.post(function (req, res) {
	
	// verify 密码是否一致
	console.log(req.body['password'])
	console.log(req.body['password-repeat'])
	if (req.body['password'] != req.body['password-repeat']) {
		req.flash('error', '两次密码不一致，请重新输入。')
		console.log('两次密码输入不一致，请重新输入')
		return res.redirect('/reg')
	}
	
	// 生成口令散列值
	var md5 = crypto.createHash('md5')
	var password = md5.update(req.body.password).digest('base64')

	var newUser = new User({
		name: req.body.username,
		password: req.body.password
	})

		// 检查用户名是否存在
	// User.get(newUser.name, function (err, user) {
	// 	err = null
	// 	success = null
	// 	if (user)
	// 		err = '此用户名已被占用'
	// 	if (err) {
	// 		req.flash('error', err)
	// 		console.log(err)
	// 		return res.redirect('/reg')
	// 	}
		
	// 	//不存在则新增用户
	// 	newUser.save(function (err) {
	// 		if (err) {
	// 			req.flash('error', err)
	// 			console.log(err)
	// 			return res.redirect('/reg')
	// 		}
	// 		req.session.user = newUser
	// 		req.flash('success', '恭喜你注册成功')
	// 		res.redirect('/')
	// 	})	
	// })	
})

module.exports = router;

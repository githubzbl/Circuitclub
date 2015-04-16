var router = require('express').Router();

var User = require('../models/user.js');

// 注册
router.route('/')
.get(function (req, res) {
	return res.render('signup', {
		title: '注册'
	})
})
.post(function (req, res, next) {
	var data = req.body;
	console.log(data)
	User.findByUsrname(data.username, function (err, user) {
		if (err) return next(err);

		if (user) {
			res.json({ err: 1});
			
		} 
	});
			user = new User(data);
			user.save(function (err, user) {
				if (err) {
					console.log(err);
				}
				req.session.uid = user._id;
				res.redirect('/std');
			});
	// console.log('body: ' + JSON.stringify(req.body));
	
})

module.exports = router;

// std.js
var router = require('express').Router();
var _ = require('lodash');
var Question = require('../models/question');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.route('/home')
.get(function (req, res) {
	if (req.session.user) {
		var user = req.session.user;
		console.log('std req.session.user:', user);
		return res.render('std', {
			user: user,
			title: user.username + ' Home',
		});
	} else {
		return res.send('Not login!');
	}

});

router.route('/exam')
.get(function (req, res) {
	var user = req.session.user;
	res.render('paperInfo', {
		title: '考试信息',
		user: user
	});
});

router.route('/exam/start')
.get(function (req, res) {
	var user = req.session.user;
	Question.find( function (err, questions) {
		if (err) {
			console.log(err);
		}
		else {
			res.render('exam', {
				title: '正式考试',
				user: user,
				questions: questions
			});
		}
	});
});
// 发送文件
// router.route('/exam/start')
// .get(function (req, res, next) {
//   var options = {
//     root:  './public/',
//     dotfiles: 'deny',
//     headers: {
//         'x-timestamp': Date.now(),
//         'x-sent': true
//     }
//   };
  
//   // var fileName = req.params.name;
//   var fileName = 'a.html';
//   res.sendFile(fileName, options, function (err) {
//     if (err) {
//       console.log(err);
//       res.status(err.status).end();
//     }
//     else {
//       console.log('Sent:', fileName);
//     }
//   });
 
// });


module.exports = router;
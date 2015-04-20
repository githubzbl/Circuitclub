// std.js
var router = require('express').Router();
var _ = require('lodash');
var Question = require('../models/question');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


router.route('/')
.get(function (req, res) {
	// if (req.session.logged_in) {
		return res.render('std', {
			user: req.session.user,
			title: user.username + ' Home',
		});
	// }
});

router.route('/exam')
.get(function (req, res) {
	res.render('paperInfo', {
		title: '考试信息' 
	});
});
router.route('/exam/start')
.get(function (req, res) {
	Question.find( function (err, questions) {
		if (err) {
			console.log(err);
		}
		else {
			res.render('exam', {
				title: '正式考试',
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
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

router.route('/exam')
.get(function (req, res) {
	res.render('exam', {
		title: '在线考试' 
	});
});
router.route('/exam/start')
.get(function (req, res) {


})
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
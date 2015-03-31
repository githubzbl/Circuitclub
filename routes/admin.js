// admin.js
var router = require('express').Router();

var Question = require('../models/question');


router.route('/')
.get(function (req, res) {
	console.log('session:', req.session, 'session.name:', req.session.name);
	if (req.session.logged_in) {
		return res.render('admin', {
			title: 'Admin page',
			user: req.session.name
		});
	} else {
		res.writeHead(403),
		res.end('Not Authoried');
	}
})
router.route('/preview/ques/:id')
.get(function(req, res) {
	var id = req.params.id;  // why?

	Question.findById(id, function(err, question) {
		res.render('previewques', {
			title: question.id + '  题目预览页',
			question: question
		});
	});
});

router.route('/question/new')
.get(function (req, res) {
	return res.render('admin-newques', {
		title: '习题录入',
		question: {
			order: '',   // 题目序号
			type: '',			// 题目类型
			chapter:'',		// 题目章节
			degree: '',		// 题目难度系数
			content: '',  // 题目内容
			pic:'',
			answer: ''    // 题目答案
		}
	})
})
.post(function (req, res) {
	var id = req.body.question._id;
	var questionObj = req.body.question;
	var _question;

	if (id !== 'undefined') {
		Question.findById(id, function(err, question) {
			if(err) {
				console.log(err);
			} 
			_question = _.extend(question, questionObj);
			_question.save(function(err, question) {
				if(err) {
					console.log(err);
				}
				res.redirect('/admin/preview/ques/' + question.id);
			});
		});
	}
	else {
		_question = new Question({
			id: questionObj.id,
			type: questionObj.type,
			chapter: questionObj.chapter,
			degree: questionObj.degree,
			content: questionObj.content,
			answer: questionObj.answer,
			pic: questionObj.pic,
			order: questionObj.order
			// summary: questionObj.summary,
			// flash: questionObj.flash


		});

		_question.save(function(err, question) {
				if(err) {
					console.log(err);
				}
				res.redirect('/admin/preview/ques/' + question._id);
			});
	}
})


module.exports = router;
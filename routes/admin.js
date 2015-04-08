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
});
// 题库列表查看
router.route('/question/list')
.get(function (req, res) {
	var questions = [];
	questions.push({
		_id: "1",
		order: "1",		// 题目序号
		chapter: "1",  // 章节
		degree: "0.3",		// 题目难度系数
		content: "这是题目1内容",	// 题目内容
		// pic: String,			// 题目图片
		answer: "A"		// 题目答案
	});
	questions.push({
		_id: 2,
		order: 2,		// 题目序号
		chapter: 1,  // 章节
		degree: 0.3,		// 题目难度系数
		content: '这是题目2内容',	// 题目内容
		// pic: String,			// 题目图片
		answer: 'B'		// 题目答案
	});
	// console.log(questions);
	res.render('question-list',{
		title: '题目列表',
		questions: questions
	});
});

router.route('/question/preview/:order')
.get(function(req, res) {
	// var question = {
	// 	_id: 2,
	// 	order: 2,		// 题目序号
	// 	chapter: 1,  // 章节
	// 	degree: 0.3,		// 题目难度系数
	// 	content: '这是题目2内容',	// 题目内容
	// 	// pic: String,			// 题目图片
	// 	answer: 'B'		// 题目答案
	// };

	var order = req.params.order; 

	Question.findById(id, function(err, question) {
		res.render('quespreview', {
			title: question.order + '  题目预览页',
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
				res.redirect('/admin/question/preview/' + question.id);
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
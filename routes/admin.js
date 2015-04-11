// admin.js
var router = require('express').Router();
var _ = require('lodash');
var Question = require('../models/question');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

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
	Question.find( function (err, questions) {
		if (err) {
			console.log(err);
		}
		else {
			res.render('question-list',{
				title: '题目列表',
				questions: questions
			});
		}
	});
	// console.log(questions);
})
.delete( function (req, res) {
	var id = req.query.id;

	if (id) {
		Question.remove({_id: id}, function (err, question) {
			if (err) {
				console.log(err);
			}  else {
			  res.json({success: 1});
			}
		});
	}
	// body...
})

router.route('/question/preview/:id')
.get(function (req, res) {

	var id = req.params.id; 
	Question.findById(id, function(err, question) {
		if (err) {
			console.log(err);
			res.render('error', {
      message: err.message,   
      error: err
      });
		}
		// if (question) {
			res.render('quespreview', {
				title: question.order + '  题目预览页',
				question: question
			});
		// } else {
		// 	res.redirect('/');
		// }
	});
});

router.route('/question/new')
.get(function (req, res) {
	var question = {
			_id:'',
			order: '',   // 题目序号
			type: '',			// 题目类型
			chapter:'',		// 题目章节
			degree: '',		// 题目难度系数
			content: '',  // 题目内容
			pic:'',
			answer: ''    // 题目答案
		};

	res.render('admin-newques', {
		title: '题目录入',
		question: question
	});
})
.post(multipartMiddleware, function (req, res) {

	console.log(req.body.question);
	var id = req.body.question._id;
	console.log("id",id);
	var questionObj = req.body.question;
	var _question;
	// console.log("questionObj",questionObj);
	// 更新题目
	if (id) {
		Question.findById(id, function(err, question) {
			if(err) {
				console.log(err);
			} 
			// 将现更新的 questionObj 的属性加到数据库原有的 question 上
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
	
		_question = new Question(questionObj);

		_question.save(function(err, question) {
			if(err) {
				console.log(err);
			}
		// 	res.render('admin-newques', {
		// title: question._id + '题目录入',
		// question: question
			res.redirect('/admin/question/preview/' + question._id);
		});
	}
})


module.exports = router;
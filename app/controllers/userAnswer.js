// controlless/answer.js
var mongoose = require('mongoose');
var User = require('../models/user');
var Problem = require('../models/problem');
var userAnswer = require('../models/userAnswer');
var _ = require('lodash');

exports.save = function (req, res, next) {
  var userId = req.session.user._id;
  var _answer = req.body.answer;    // Array 学生回答的内容
  var problemIds = req.body.problem;  // Array 问题ID
  // console.log('quesIds', quesIds);
  // console.log('answerArr', _answer);

  // 将两个数组结合起来创建新answer对象并存入DB
  _.each(problemIds, function (id, key) {
    var answer = new userAnswer();
    answer.problem = id;
    answer.content = _answer[key];
    answer.user = userId;
    answer.save(function (err, user) {
      if (err) {
        return next(err);
      }
    });
    // console.log('answer', answer);
  });
  next();
};

exports.check = function (req, res) {
  var userId = req.session.user._id;
  var problemIds = req.body.problem;
  var problems = [];
  userAnswer
    .find({user: userId})
    .populate('problem')
    .exec(function (err, userAnsArr) {
      _.each(userAnsArr, function (userAns, key) {
        // console.log('****userAns', userAns);
        // console.log('****key', key);
        problems.push(userAns.problem);
        if (userAns.problem.answer !== userAns.content) {
          userAns.status = false;
        } else {
          userAns.status = true;
        }
      });
      res.render('examcheck', {
        title: 'Check Answer',
        userAnsArr: userAnsArr
      });
    });
}

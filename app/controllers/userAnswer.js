// controlless/answer.js
var mongoose = require('mongoose');
var User = require('../models/user');
var Question = require('../models/question');
var userAnswer = require('../models/userAnswer');
var _ = require('lodash');

exports.save = function (req, res, next) {
  // console.log('req.body:', req.body);
  var userId = req.session.user._id;
  var _answer = req.body.answer;    // Array 学生回答的内容
  var quesIds = req.body.question;  // Array 问题ID
  // console.log('quesIds', quesIds);
  // console.log('answerArr', _answer);

  // 将两个数组结合起来创建新answer对象并存入DB
  _.each(quesIds, function (id, key) {
    var answer = new userAnswer();
    answer.question = id;
    answer.content = _answer[key];
    answer.user = userId;
    answer.save(function (err, user) {
        if (err) {
          return next(err);
        }
        });
    // console.log('answer', answer);

  });
  // res.json({success: 1});  // 试卷存入成功
  next();
};
exports.check = function (req, res, next) {
  var userId = req.session.user._id;
  var _answer = req.body.answer;
  var quesIds = req.body.question;
  var questions = [];
  var result = [];

}

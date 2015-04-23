// controlless/answer.js
var mongoose = require('mongoose');
var User = require('../models/user');
var Question = require('../models/question');
var Answer = require('../models/answer');
var _ = require('lodash');

exports.save = function (req, res, next) {
  console.log('req.body:', req.body);
  var userId = req.session.user._id;
  var _answer = req.body.answer;
  var quesIds = _answer.question;  // Array 问题ID
  var conts = _answer.content; // Array 学生回答的内容
  console.log('quesIds', quesIds);
  console.log('contents', conts);
  res.send(req.body);

  // _.each(answers, function(ans, el) {
  //   var quesId = ans.question;
  //   var answer = new Answer(ans);
  //   console.log('quesId', quesId);
  //   console.log('ans', ans);
  //   answer.save(function (err, answer) {
  //     if (err) {
  //       return console.log(err);
  //     } else {
  //       arr.push(answer);
  //     }
  //   });
  // });

  //   res.json(JSON.stringify(arr));       // 试卷答案提交成功
}
exports.check = function (req, res, next) {


}
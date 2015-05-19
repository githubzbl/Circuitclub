// controlless/answer.js
var mongoose = require('mongoose');
var User = require('../models/user');
var Problem = require('../models/problem');
var userAnswer = require('../models/userAnswer');
var _ = require('lodash');
var Q = require('q');

exports.save = function (req, res, next) {
  var userId = req.session.user._id;
  var _answer = req.body.answer;    // Array 学生回答的内容
  var problemIds = req.body.problem;  // Array 问题ID
  // console.log('answerArr', _answer);

  // 将两个数组结合起来创建新answer对象并存入DB
  _.each(problemIds, function (id, key) {
    var answer = new userAnswer();
    answer.problem = id;
    answer.content = _answer[key];
    answer.user = userId;
    answer.save(function (err, user) {
      if (err) {
        console.error('answer save err:', err);
        return next(err);
      }
    });
    // console.log('answer', answer);
  });
  // next();
  res.render('exam-submit', {
    title: '提交成功',
    user: req.session.user
  });
};

// TODO 直接异步提交保存至数据库后可以立马查看到结果
exports.saveCheck = function (req, res) {
  var userId = req.session.user._id;
  var _answer = req.body.answer;    // Array 学生回答的内容
  var problemIds = req.body.problem;  // Array 问题ID
  var problems = [];

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
};

exports.check = function (req, res) {
  var userId = req.session.user._id;
  // var problemIds = req.body.problem;
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
        userAns.save(function (err, user) {
          if (err) {
            console.error('answer save err:', err);
            return next(err);
          }
        });
      });

      res.render('exam-check', {
        title: 'Check Answer',
        userAnsArr: userAnsArr
      });

    });
};

exports.getProblems = function (req, res) {
  var user = req.session.user;
  var userId = user._id;
  var problems = [];
  var id = req.query.id;
  console.log('****id***', id)

  userAnswer
    .find({user: userId})
    .populate('problem')
    .exec(function (err, userAnsArr) {
      res.render('std-wrongprobs', {
        title: user.name + '的题库',
        user: user,
        userAnsArr: userAnsArr
      });

    });
  // if (id) {
  // // userAnswer
  // //   .find({user: userId})
  // //   .populate('problem')
  // //   .exec(function (err, userAnsArr) {
  // //       res.json(JSON.stringify(userAnsArr));
  // //   });
  //   userAnswer
  //     .find({_id: id})
  //     .populate('problem')
  //     .exec(function (err, userAnswer) {
  //       res.json(JSON.stringify(userAnswer));
  //     })
  // }
};

exports.getWrongProblems = function (req, res) {
  var user = req.session.user;
  var userId = user._id;
  // var problemIds = req.body.problem;
  var problems = [];

  userAnswer
    .find({user: userId})
    .find({status: false})
    .populate('problem')
    .exec(function (err, userAnsArr) {
      res.render('std-wrongprobs', {
        title: user.name + '的错题库',
        user: user,
        userAnsArr: userAnsArr
      });

    });
};


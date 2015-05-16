var mongoose = require('mongoose');
var Problem = require('../models/problem');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var join = path.join;

exports.findAns = function (req, res) {
 Problem.find( function (err, problems) {
    if (err) {
      console.log(err);
    }
    else {
      var arr = [];
      _.each(problems, function (ques, key) {
        var ans = ques.answer;
        return arr.push(ans);
      });
      res.json(arr);
      console.log('arr:', arr);
    }
  });
  // body...
}

exports.new = function (req, res) {
  var problem = {
      _id:'',
      index: '',   // 题目序号
      type: '',     // 题目类型
      chapter:'',   // 题目章节
      difficulty: '',   // 题目难度系数
      content: '',  // 题目内容
      image: {},
      answer: ''    // 题目答案
    };

  res.render('admin-addprob', {
    title: '题目录入',
    user: req.session.user,
    problem: problem
  });
};
exports.preview = function (req, res) {
  var id = req.params.id;
  var user = req.session.user;
  Problem.findById(id, function(err, problem) {
    if (err) {
      console.log(err);
      res.render('error', {
      message: err.message,
      error: err
      });
    }
    // if (problem) {
      res.render('prob-preview', {
        title: '题目预览',
        user: user,
        problem: problem
      });
    // } else {
    //  res.redirect('/');
    // }
  });
}

exports.edit = function (req, res) {
  var id = req.params.id;
  var user = req.session.user;
  Problem.findById(id, function(err, problem) {
    if (err) {
      console.log(err);
      res.render('error', {
      message: err.message,
      error: err
      });
    }
    // if (problem) {
      res.render('prob-edit', {
        title: '编辑题目',
        user: user,
        problem: problem
      });
    // } else {
    //  res.redirect('/');
    // }
  });
};

exports.save = function (req, res) {
  console.log('req.body:', req.body);
  console.log('req.files:', req.files);
  var image = req.files.image;
  var id = req.body.problem._id;
  var problemObj = req.body.problem;
  var _problem;
  if (image) {
    _problem = {
      image: {
        name: image.name,
        path: image.path.slice(6)
      }
    }
  };
  problemObj = _.extend(problemObj, _problem);
  // console.log('problemObj:', problemObj);
  // console.log('_problem', _problem);
  // 更新题目
  if (id) {
    Problem.findById(id, function(err, problem) {
      if(err) {
        console.log(err);
      }
      // 将现更新的 problemObj 的属性加到数据库原有的 problem 上
      _problem = _.extend(problem, problemObj);
      _problem.save(function(err, problem) {
        if(err) {
          console.log(err);
        }
        res.redirect('/admin/problem/preview/' + problem.id);
      });
    });
  } else {
      _problem = new Problem(problemObj);
      _problem.save(function(err, problem) {
        if(err) {
          console.log(err);
        }

        res.redirect('/admin/problem/preview/' + problem._id);
      });

    }
};
exports.list = function (req, res) {
  var user = req.session.user;
  Problem.find( function (err, problems) {
    if (err) {
      console.log(err);
    }
    else {
      res.render('prob-list',{
        title: '题目列表',
        user: user,
        problems: problems
      });
    }
  });
};
exports.del = function (req, res) {
  var id = req.query.id;
  if (id) {
    Problem.remove({_id: id}, function (err, problem) {
      if (err) {
        console.log(err);
      }  else {
        res.json({success: 1});
      }
    });
  }
};


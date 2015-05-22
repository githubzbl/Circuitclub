var mongoose = require('mongoose');
var Problem = require('../models/problem');
var User = require('../models/user');
var userAnswer = require('../models/userAnswer');
var Paper = require('../models/paper');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var join = path.join;


exports.new = function (req, res) {
  var problem = {
    _id:'',
    index: '',   // 试卷序号
    name: '',
    problems: [] // 相关试题
  };

  res.render('admin-addprob', {
    title: '题目录入',
    user: req.session.user,
    problems: problems
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


var mongoose = require('mongoose');
var Problem = require('../models/problem');
var Paper = require('../models/paper');
var _ = require('lodash');
var path = require('path');
var join = path.join;


exports.new = function (req, res) {
  var user = req.session.user;

  Paper.find( function (err, papers) {
    if (err) {
      console.log(err);
    }
    else {
      res.render('admin-addprob',{
        title: '添加试题',
        user: user,
        papers: papers,
        problem: {}
      });
    }
  });

};

exports.preview = function (req, res) {
  var id = req.params.id;
  var user = req.session.user;
  Problem
    .findOne({_id: id})
    .populate('paper','name')
    .exec(function (err, problem) {
      if (err) {
        console.log(err);
      }
      res.render('prob-preview', {
        title: '题目预览',
        user: user,
        problem: problem
      });
  });
}

exports.edit = function (req, res) {
  var id = req.params.id;
  var user = req.session.user;
  Problem.findById(id, function (err, problem) {
    Paper.find({}, function (err, papers) {
      res.render('prob-edit', {
        title: '编辑题目',
        papers: papers,
        problem: problem
      });
    });
  });
};

exports.save = function (req, res) {
  console.log('req.body:', req.body);
  console.log('req.files:', req.files);
  var image = req.files.image;
  var id = req.body.problem._id;
  var problemObj = req.body.problem;
  var paperId = problemObj.paper;

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
        if (paperId) {
          Paper.findById(paperId, function (err, paper) {

            paper.problems.push(problem._id);
            paper.save(function (err, paper) {
              res.redirect('/admin/problem/preview/' + problem._id);
            });
          });
        }
      });
    });
  } else {
      console.log('paperId', paperId);
      _problem = new Problem(problemObj);
      _problem.save(function(err, problem) {
        if(err) {
          console.log(err);
        }
        if (paperId) {
          Paper.findById(paperId, function (err, paper) {
            paper.problems.push(problem._id);
            paper.save(function (err, paper) {
              res.redirect('/admin/problem/preview/' + problem._id);
            });
          });
        }
      });
    }
};
exports.list = function (req, res) {
  var user = req.session.user;
  Problem.fetch(function (err, problems) {
    if (err) {
      console.log(err);
    }
    else {
      res.render('admin-problist',{
        title: '题库',
        user: user,
        problems: problems
      });
    }
  });
}


exports.getList = function (req, res) {
  var user = req.session.user;
  var data = req.body;
  var type = req.body.type;
  var sort = req.body.sort;
  var diff = req.body.diff;
  console.log('data', data);
  console.log('sort', sort);
  console.log('type', type);
  console.log('diff', diff);

  /***TODO
    排序可以使用mongoose sort('-meta.updateAt')
    查询特定类型也可以 find({type: type})
    这样话对于大规模数据来说可能更好？
    但是就要写多个查询语句
    不知是一次查询后台所有数据后台处理好
    还是使用数据库的查询后台只是用于传输数据好
  ****/

  Problem
    .find()
    .exec(function (err, _problems) {
      var problems = _problems;
      if (err) {
        console.log(err);
      }
      if (type && (type !== 'all')) {
        problems = _.filter(_problems, function(index) {
          return index.type === type;
        });
      }
      if (sort === 'up') {
        problems.reverse();
      }
      if (diff && (diff !== 'all')) {
        problems = _.filter(_problems, function(index) {
          return index.difficulty === diff;
        });
      }
      res.render('prob-info', {
        user: user,
        problems: problems
      });
      // res.json(JSON.stringify(problems));
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


var mongoose = require('mongoose');
var User = require('../models/user');
var Problem = require('../models/problem');
var _ = require('lodash');

exports.index = function (req, res) {
  var user = req.session.user;
  return res.render('admin', {
    title: '管理员控制面板',
    user: user
  });
};

exports.adminRequired = function(req, res, next) {
  var user = req.session.user;
  if (user && user.role === 'admin') {
      next();
  } else {
    req.flash('info', '非法操作!');
    res.redirect('/');
  }
};

exports.delUser = function (req, res) {
  var id = req.query.id;
  if (id) {
    User.remove({_id: id}, function (err, user) {
      if (err) {
        console.log(err);
      }  else {
        req.flash('info', '成功删除');
        res.json({success: 1});
      }
    });
  }
};

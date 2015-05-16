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

  if (user.role === 'std') {
    return res.redirect('/signin');
  }
  next();
};
exports.delUser = function (req, res) {
  var id = req.query.id;
  if (id) {
    User.remove({_id: id}, function (err, user) {
      if (err) {
        console.log(err);
      }  else {
        res.json({success: 1});
      }
    });
  }
};

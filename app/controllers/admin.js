var mongoose = require('mongoose');
var User = require('../models/user');
var Question = require('../models/question');
var _ = require('lodash');


exports.adminRequired = function(req, res, next) {
  var user = req.session.user;

  if (user.role <= 10) {
    return res.redirect('/signin')
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

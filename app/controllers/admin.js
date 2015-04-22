var mongoose = require('mongoose');
var User = require('../models/user');
var Question = require('../models/question');


exports.adminRequired = function(req, res, next) {
  var user = req.session.user;

  if (user.role <= 10) {
    return res.redirect('/signin')
  }
  next();
};

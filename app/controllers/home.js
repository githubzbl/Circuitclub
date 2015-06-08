// home.js
var Paper = require('../models/paper');
var Problem = require('../models/problem');
var userAnswer = require('../models/userAnswer');

exports.index = function (req, res) {
  Paper
    .find({})
    .populate({path: 'problem', options: {limit: 5}})
    .exec (function (err, papers) {
      if (err) {
        console.log('index err:', err);
      }
      console.log('user in session:', req.session.user);
      res.render('index', {
        title: '电路分析',
        user: req.session.user,
        papers: papers,
        message: req.flash('info')
      });
    });
};

var mongoose = require('mongoose');
var User = require('../models/user');
var Question = require('../models/question');

// signup
exports.showSignup = function(req, res) {
  res.render('signup', {
    title: '注册'
  })
}

exports.showSignin = function(req, res) {
  res.render('login', {
    title: '登录'
  })
}

exports.signup = function(req, res) {
  var data = req.body;
  console.log(data);

  User.findOne({ username: data.username }, function (err, user) {
    if (err) return next(err);
    if (user) {
      return res.json({ err: 1 });    // 用户名已被占用
    } else {
        user = new User(data);
        user.save(function (err, user) {
        if (err) {
          console.log(err);
        }
        req.session.user = user;
        console.log('session:', req.session);
        res.json({success: 1});  // 注册成功
        });
      }
  });
  // console.log('body: ' + JSON.stringify(req.body));  
}

// login 登录
exports.login = function(req, res) {
  var data = req.body;
  console.log('postdata:', data);
  User.findOne({ username: data.username }, function (err, user) {
    if (err) return next(err);
    if (!user) {
      return res.json({ err: 1 });    // 用户不存在
    } else {
      user.comparePassword(data.password, function(err, isMatch) {
        if (err) {
          console.log(err)
        }

        if (isMatch) {
          req.session.user = user;
          // req.session.logged_in = true;
          console.log('session:', req.session);
          return res.json({ success: 1 });  // 登录成功
        } else {
          return res.json({ err: 2 });  // 密码错误       
        }
      })
    }
  // console.log('body: ' + JSON.stringify(req.body));  
  });
}

// logout
exports.logout =  function(req, res) {
  delete req.session.user
  //delete app.locals.user

  res.redirect('/')
}
//  学生主页
exports.index = function (req, res) {
  var user = req.session.user;

  res.render('std', {
      user: user,
      title: user.username + ' Home',
    }); 
};
// 考试信息
exports.examInfo = function (req, res) {
  var user = req.session.user;
  res.render('paperInfo', {
    title: '考试信息',
    user: user
  });
};
// 正式考试
exports.examStart = function (req, res) {
  var user = req.session.user;
  Question.find( function (err, questions) {
    if (err) {
      console.log(err);
    }
    else {
      res.render('exam', {
        title: '正式考试',
        user: user,
        questions: questions
      });
    }
  });
};



// userlist page
exports.list = function(req, res) {
  User.fetch(function(err, users) {
    if (err) {
      console.log(err)
    }

    res.render('userlist', {
      title: '学生用户列表页',
      users: users
    });
  });
}

// middleware for user
exports.loginRequired = function(req, res, next) {
  var user = req.session.user;

  if (!user) {
    return res.redirect('/login');
  }

  next()
};
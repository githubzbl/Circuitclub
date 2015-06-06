// config/routes

var Home = require('../app/controllers/home');
var User = require('../app/controllers/user');
var Admin = require('../app/controllers/admin');
var Problem = require('../app/controllers/problem');
var Paper = require('../app/controllers/paper');
var userAnswer = require('../app/controllers/userAnswer');
var Image = require('../app/controllers/image');
var multer = require('multer');


module.exports = function(app) {

  // pre handle user
  app.use(function(req, res, next) {
    var _user = req.session.user;
    app.locals.user = _user;
    next()
  });

  // 主页Index
  app.get('/', Home.index);

  // 注册登录
  app.post('/signup', User.signup);
  app.post('/login', User.login);
  app.get('/login', User.showSignin)
  app.get('/signup', User.showSignup)
  app.get('/logout', User.logout);

  /*** 学生模块 ***/
  // 学生主页
  app.get('/std/home', User.loginRequired, User.index);
  // 个人信息
  app.get('/std/profile', User.loginRequired, User.profile);
  app.post('/std/profile', User.loginRequired, multer(), User.setProfile);
  // 考试记录
  app.get('/std/myproblems/bank', User.loginRequired, userAnswer.getProblems);
  app.post('/std/myproblems', User.loginRequired, userAnswer.getTypeProblems);

  // 学生考试
  app.get('/std/exam/start', User.loginRequired, User.examInfo);
  app.get('/std/exam/paper', User.loginRequired, User.examStart);
  app.post('/std/exam/check', User.loginRequired, multer(), userAnswer.save);
  app.get('/std/exam/check', User.loginRequired, userAnswer.check);
  // app.post('/std/exam/check', User.loginRequired, multer(), userAnswer.save, userAnswer.check);


  /*** 管理员模块 ***/
  // 管理员控制面板
  app.get('/admin', Admin.index);
  // 学生用户管理
  app.get('/admin/userlist', User.list);
  app.delete('/admin/userlist', Admin.delUser);
  // 习题管理
  app.get('/admin/problem/new', Problem.new);
  app.post('/admin/problem/new', multer({ dest: './public/images/'}), Problem.save);
  app.get('/admin/problem/preview/:id', Problem.preview);
  app.get('/admin/problem/edit/:id', Problem.edit);
  app.get('/admin/problemBank/list', Problem.list);
  app.delete('/admin/problemBank/list', Problem.del);
  app.post('/admin/problemBank/list', Problem.getList);

  // 试卷管理
  app.get('/admin/paperBank/list', Paper.list);
  app.get('/admin/paper/new', Paper.new);
  app.post('/admin/paper/new', multer(), Paper.save);
  app.get('/admin/paper/edit/:id', Paper.edit);



}

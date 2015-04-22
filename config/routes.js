// config/routes

var Home = require('../app/controllers/home');
var User = require('../app/controllers/user');
// var Admin = require('../app/controllers/admin');

var Image = require('../app/controllers/image');


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
  // app.post('/user/signup', User.signup);
  // app.post('/user/login', User.login);  
  app.post('/signup', User.signup);
  app.post('/login', User.login);
  app.get('/signin', User.showSignin)
  app.get('/signup', User.showSignup)
  app.get('/logout', User.logout);
  
  // 学生用户
  app.get('/std/home', User.loginRequired, User.index);
  app.get('/std/exam', User.loginRequired, User.examInfo);
  app.get('/std/exam/start', User.loginRequired, User.examStart);

  // 管理员
  app.get('/admin/userlist', User.list);


}
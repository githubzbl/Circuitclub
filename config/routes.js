// config/routes

var Home = require('../app/controllers/home');
var User = require('../app/controllers/user');
var Admin = require('../app/controllers/admin');
var Ques = require('../app/controllers/question');
var Image = require('../app/controllers/image');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var multer   = require('multer');

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
  app.delete('/admin/userlist', Admin.delUser);
  app.get('/admin/question/new', Ques.new);
  app.post('/admin/question/new', multer({ dest: './public/images/'}), Ques.save);
  app.get('/admin/question/preview/:id', Ques.preview);
  app.get('/admin/question/edit/:id', Ques.edit);

  app.get('/upload', function (req, res) {
    
    res.render('upload', {
      title: '文件上传'
    })
  });
  app.post('/upload', multer({ dest: './public/images/'}), function (req, res) {
    
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);
    res.json({ success: 1}); // 上传成功
  });


}
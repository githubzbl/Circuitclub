var express   = require('express'),
       path   = require('path'),
    favicon   = require('serve-favicon'),
     logger   = require('morgan'),
 cookieParser = require('cookie-parser'),
 bodyParser   = require('body-parser'),
       moment = require('moment'),
          url = require('url'),
    session   = require('express-session'),   // session 支持
 RedisStore   = require('connect-redis')(session),
        flash = require('connect-flash'),
          hbs = require('express-hbs');

var config = require('./config.js');
var rediscloudURL = process.config.REDISCLOUD_URL;
var redisURL = rediscloudURL ? url.parse(rediscloudURL) : '';
// console.log('redisURL', redisURL)

var mongoose  = require('mongoose');
mongoose.connect(config.mongodb.url);

var app = express();
module.exports = app;


// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/app/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/app/views/pages'));
hbs.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);
  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});
hbs.registerHelper('moment', function(context, block) {
  if (moment) {
    var f = block.hash.format || "MMM DD, YYYY hh:mm:ss A";
    return moment(context).format(f);
  } else{
    return context;
  };
});

// 存储题目图片的目录
app.set('images', path.join(__dirname, '/public/images'));

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));  // 开发环境
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// TODO  heroku部署时候修改 session store
app.use(session({
  secret: config.sessionSecret,
  store: new RedisStore,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

require('./config/routes')(app);


// 静态资源，缓存三天
app.locals.moment = require('moment');
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: 259200000
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
    app.locals.pretty = true;
    // mongoose.set('debug', true);

} else {
  console.log('production config.');
  app.enable('trust proxy');
  app.enable('view cache');
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.set('port', process.env.PORT || config.port.local);
// app.set('env', 'produnction');

// console.log('process.env.NODE_ENV:', process.env.NODE_ENV);


var debug = require('debug')('new-exam');
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
console.log('\033[90m  Server listening on port ' + server.address().port +'\033[39m');


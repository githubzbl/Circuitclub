var express   = require('express'),
       path   = require('path'),
    favicon   = require('serve-favicon'),
     logger   = require('morgan'),
 cookieParser = require('cookie-parser'),
 bodyParser   = require('body-parser'),

    session   = require('express-session'),   // session 支持
 RedisStore   = require('connect-redis')(session);

 var hbs = require('express-hbs');


var mongoose  = require('mongoose');
mongoose.connect('mongodb://localhost/exam'); 

// var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();


// view engine setup
// express-hbs
// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views/pages'));
 hbs.registerHelper("debug", function(optionalValue) { 
  console.log("Current Context"); 
  console.log("====================");
  console.log(this);
  if (optionalValue) { 
    console.log("Value"); 
    console.log("===================="); 
    console.log(optionalValue);
} });

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// express-session
app.use(session({ 
  secret: 'my app secret',
  store: new RedisStore,
  resave: false,
  saveUninitialized: true
}));


// app.use('/', routes(app));
// app.use('/users', users);
require('./routes')(app);

app.locals.moment = require('moment');
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {
  console.log('production env.');
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



module.exports = app;

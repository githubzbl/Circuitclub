// index.js

module.exports = function (app) {
	app.use('/', require('./home'));
	app.use('/signup', require('./signup'));
	app.use('/login', require('./login'));
	app.use('/admin', require('./admin'));
	app.use('/std', require('./std'));
	


}

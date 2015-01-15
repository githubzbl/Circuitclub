// index.js

module.exports = function (app) {
	app.use('/', require('./home'))
	app.use('/reg', require('./reg'))
	app.use('/login', require('./login'))
	app.use('/admin', require('./admin'))
	app.use('/std', require('./std'))
	


}

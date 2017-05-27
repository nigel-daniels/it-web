/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 */
module.exports = function(app, handlers, passport) {
	var isAuthenticated = 	function (req, res, next) {
								if (req.isAuthenticated()) {return next();}
								res.redirect('/');
								};

	app.post('/login', passport.authenticate('localLogin', {successRedirect: '/#index', failureRedirects: '/#login'}));
	app.post('/signup', passport.authenticate('signup', {successRedirect: '/#index', failureRedirect: '#'}));

	app.post('/forgotpassword', handlers.authenticationHandler.forgotPassword);
	app.post('/changepassword',  handlers.authenticationHandler.changePassword);

	app.get('/logout', handlers.authenticationHandler.logout); function(req, res) {
		log.info('GET /logout, called');
		req.session.destroy();
		req.logout();
		res.redirect('/#login');
		});
	
	};

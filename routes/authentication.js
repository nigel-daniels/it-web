/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 */
module.exports = function(app, handlers, passport) {
	var isAuthenticated = 	function (req, res, next) {
								if (req.isAuthenticated()) {return next();}
								res.redirect('/');
								};

	app.post('/signup', passport.authenticate('local-signup', {successRedirect: '/#login', failureRedirect: '/#'}));
	app.post('/login', passport.authenticate('local-login', {successRedirect: '/#index', failureRedirects: '/#login'}));


	app.post('/forgotpassword', handlers.authenticationHandler.forgotPassword);
	app.post('/changepassword', isAuthenticated, handlers.authenticationHandler.changePassword);

	app.get('/logout', handlers.authenticationHandler.logout);
	};

/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 */
module.exports = function(app, handlers, passport) {

	app.post('/signup', handlers.authenticationHandler.signup);
	app.post('/login', passport.authenticate('local'), handlers.authenticationHandler.login);


	app.post('/forgot', handlers.authenticationHandler.forgotPassword);
	app.post('/changepwd', handlers.authenticationHandler.isAuthenticated, handlers.authenticationHandler.changePassword);

	app.get('/logout', handlers.authenticationHandler.logout);
	app.get('/authenticate', handlers.authenticationHandler.authenticate);
	};

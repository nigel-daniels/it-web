/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
module.exports = function(app, handlers) {
	// Post happens during authentication process
	app.get('/users', handlers.authenticationHandler.isAuthenticated, handlers.userHandler.getUsers);
	app.get('/user', handlers.authenticationHandler.isAuthenticated, handlers.userHandler.getUser);
	app.get('/user/:id', handlers.authenticationHandler.isAuthenticated, handlers.userHandler.getUserById);
	app.put('/user/:id', handlers.authenticationHandler.isAuthenticated, handlers.userHandler.putUser);
	app.delete('/user/:id', handlers.authenticationHandler.isAuthenticated, handlers.userHandler.deleteUser);
	};

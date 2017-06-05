/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 */
module.exports = function(app, handlers) {
	// Post happens during authentication process
	app.get('/user', handlers.authenticationHandler.isAuthenticated, handlers.userHandler.getUsers);
	app.get('/user/:id', handlers.authenticationHandler.isAuthenticated, handlers.userHandler.getUser);
	app.put('/user/:id', handlers.authenticationHandler.isAuthenticated, handlers.userHandler.putUser);
	app.delete('/user/:id', handlers.authenticationHandler.isAuthenticated, handlers.userHandler.deleteUser);
	};

/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 */
module.exports = function(app, handlers) {
	app.get('/user/:id', handlers.authenticationHandler.isAuthenticated, handlers.userHandler.getUser);
	//app.post('/user/', , handlers.userHandler.postUser); Happens during authentication process
	app.put('/user/:id', handlers.authenticationHandler.isAuthenticated, handlers.userHandler.putUser);
	app.delete('/user/:id', handlers.authenticationHandler.isAuthenticated, handlers.userHandler.deleteUser);
	};

/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 */
module.exports = function(app, handlers, passport) {
	var isAuthenticated = 	function (req, res, next) {
								if (req.isAuthenticated()) {return next();}
								res.redirect('/');
								};

	app.get('/user/:id', isAuthenticated, handlers.userHandler.getUser);
	//app.post('/user/', , handlers.userHandler.postUser); Happens during authentication process
	app.put('/user/:id', isAuthenticated, handlers.userHandler.putUser);
	app.delete('/user/:id', isAuthenticated, handlers.userHandler.deleteUser);
	};

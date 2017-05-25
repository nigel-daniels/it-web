/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 */
module.exports = function(app, handlers) {
	app.get('/users/', handlers.userHandler.getUsersCount);
	app.get('/user/:id', handlers.userHandler.getUser);
	app.get('/assets/dir*', handlers.userHandler.getFileAssets);
	app.get('/assets/all*', handlers.userHandler.getAllFileAssets);
	};

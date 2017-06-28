/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
define(['models/User'], function(User) {
	var UserCollection = Backbone.Collection.extend({
		model: 			User,
		url: 			'/users',
		});

	return UserCollection;
});

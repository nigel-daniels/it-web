/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
define(['app/profile/models/User'], function(User) {
	var UserCollection = Backbone.Collection.extend({
		model: 			User,
		url: 			'/user',
		});

	return UserCollection;
});

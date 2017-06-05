/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
define(function() {

	var ProfileModel = Backbone.Model.extend({
		defaults: {
            "content": "User information here"
		}
	});

	return ProfileModel;
});

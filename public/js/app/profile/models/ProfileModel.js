/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 */
define(function() {

	var ProfileModel = Backbone.Model.extend({
		defaults: {
			"heading": "Profile Page",
            "content": "User information here"
		}
	});

	return ProfileModel;
});

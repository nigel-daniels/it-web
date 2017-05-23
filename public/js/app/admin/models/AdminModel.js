/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 */
define(function() {

	var AdminModel = Backbone.Model.extend({
		defaults: {
			"heading": "Administration Page",
            "content": "Administration settings here."
		}
	});

	return AdminModel;
});

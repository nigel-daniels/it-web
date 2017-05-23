/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 */
define(function() {

	var Action1Model = Backbone.Model.extend({
		defaults: {
			"heading": "Action 1",
            "content": "Action 1 called!"
		}
	});

	return Action1Model;
});

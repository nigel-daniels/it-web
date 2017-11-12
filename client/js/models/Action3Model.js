/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
define(function() {

	var Action3Model = Backbone.Model.extend({
		defaults: {
			"heading": "Action 3",
            "content": "Action 3 called!"
		}
	});

	return Action3Model;
});

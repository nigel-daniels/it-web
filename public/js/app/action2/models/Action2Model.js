/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 */
define(function() {

	var Action2Model = Backbone.Model.extend({
		defaults: {
			"heading": "Action 2",
            "content": "Action 2 called!"
		}
	});

	return Action2Model;
});

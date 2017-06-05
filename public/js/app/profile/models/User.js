/**
 * Copyright 2017 Initiate Thiniing
 * Author: Nigel Daniels
 * MIT Licensed
 */
define(function(require) {
		var Role = 	{
				USER:	0,
				ADMIN:	1
				};

		var User = Backbone.Model.extend({
			urlRoot: 		'/asset',

			idAttribute: 	'_id',

			defaults:		function() {
								return {role: Role.USER};
								}
			});

		return User;
		});

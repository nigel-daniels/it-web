/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
define(['itRouter'], function(itRouter) {

	var initialize = function() {

		console.log('itInit - initialize, called.');
		$.notifyDefaults({
			type: 'minimalist'
			});

        Backbone.history.start();
        };


	/*var checkLogin = function(callback) {
		console.log('itInit - checkLogin, called.');
		$.get('/authenticate')
			.done(function() {return callback(true)})
			.fail(function() {return callback(false)});

        return callback(false);
        };

    var applicationStart = function(authenticated) {
		console.log('itInit - validateRequest, called.');
		if (window.location.hash !== 'reset') {
			if (!authenticated) {
				console.log('itInit - validateRequest, not authenticated redirect to login');
				window.location.hash = 'login';
				}
			}

		Backbone.history.start();
	};*/


	return {initialize: initialize};
    });

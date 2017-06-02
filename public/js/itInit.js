/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 */
define(['itRouter'], function(itRouter) {

//	var router = null;

	var initialize = function() {
		console.log('itInit initialize, called.');
        Backbone.history.start();

		$.notifyDefaults({
			type: 'minimalist'
			});

        checkLogin(startPage);
        };

	var checkLogin = function(callback) {
		console.log('itInit checkLogin, called.');
		/* $.ajax("/account/authenticated", {
			method: 	"GET",
			success:	function() {
				return callback(true);
                },
			error:		function() {
				return callback(false);
                }
            }); */
        return callback(false);
        };

    var startPage = function(authenticated) {
		console.log('itInit runApplication, called, authenticated? ' + authenticated);
		if (!authenticated) {
			console.log('itInit runApplication, going to login');
			window.location.hash = 'login';
		} else {
			console.log('itInit runApplication, going to index');
			window.location.hash = 'index';
            }
        };

	return {initialize: initialize};
    });

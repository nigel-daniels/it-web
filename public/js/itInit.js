/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
define(['itRouter'], function(itRouter) {

//	var router = null;

	var initialize = function() {
		console.log('itInit - initialize, called.');
		$.notifyDefaults({
			type: 'minimalist'
			});

        Backbone.history.start();
        };

	/*
	var checkLogin = function(callback) {
		console.log('itInit - checkLogin, called.');
		$.get('/authenticate')
			.done(function() {return callback(true)})
			.fail(function() {return callback(false)});

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
	*/

	return {initialize: initialize};
    });

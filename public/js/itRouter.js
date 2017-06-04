/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 */
define(['jsx!app/login/views/LoginView', 'jsx!app/login/views/ResetView',
	'jsx!app/index/views/IndexView', 'jsx!app/action1/views/Action1View',
	'jsx!app/action2/views/Action2View', 'jsx!app/action3/views/Action3View',
	'jsx!app/profile/views/ProfileView', 'jsx!app/admin/views/AdminView'],

	function(LoginView, ResetView, IndexView,
			Action1View, Action2View, Action3View,
			ProfileView, AdminView) {
		var itRouter = Backbone.Router.extend({
			currentView: 	null,

			routes: 		{
							'': 			'index',
							'login':		'login',
							'reset/:id':	'reset',
							'index':		'index',
							'action1': 		'action1',
							'action2':		'action2',
							'action3':		'action3',
							'profile':		'profile',
                            'admin':		'admin'
							},

			changeView: 	function(view, data) {
								console.log('itRouter - changeView, called.');
								var _this = this;

								if (view.requireLogin) {
									this.checkLogin(function(authenticated) {
										if (!authenticated) {
											console.log('itRouter - changeView, auth bad going to login');
											window.location.hash = 'login';
											return;
										} else {
											console.log('itRouter - changeView, auth bad going to view');
											_this.completeChange(view);
											}
										});
									} else {
										console.log('itRouter - changeView, no auth going to view');
										_this.completeChange(view);
										}
								},

			checkLogin:		function(callback) {
								console.log('itRouter - checkLogin, called');
								$.get('/authenticate')
									.done(function() {
										console.log('itRouter - checkLogin, auth ok');
										return callback(true)
										})
									.fail(function() {
										console.log('itRouter - checkLogin, auth bad');
										return callback(false)
										});
								},

			completeChange:	function(view) {
								console.log('itRouter - completeChange, called.');
								if (null !== this.currentView) {
									console.log('itRouter - completeChange, undelegate events.');
									this.currentView.undelegateEvents();
									}

								console.log('itRouter - completeChange, change view.');
								this.currentView = view;
								this.currentView.render();
								},

			login:			function() {
								console.log('itRouter - login, called.');
								this.changeView(new LoginView());
								},

			reset: 			function(id) {
								console.log('itRouter - reset, called.');
								this.changeView(new ResetView({id: id}));
								},

			index: 			function() {
								console.log('itRouter - index, called.');
								this.changeView(new IndexView());
								},

			action1:		function() {
								console.log('itRouter - action1 called.');
								this.changeView(new Action1View());
								},

			action2:		function() {
								console.log('itRouter - action2 called.');
								this.changeView(new Action2View());
								},

			action3:		function() {
								console.log('itRouter - action3 called.');
								this.changeView(new Action3View());
								},

			profile:		function() {
								console.log('itRouter - profile called.');
								this.changeView(new ProfileView());
								},

			admin:		function() {
								console.log('itRouter - admin called.');
								this.changeView(new AdminView());
								}
			});

	return new itRouter();
});

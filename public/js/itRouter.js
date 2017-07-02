/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
define(['jsx!views/login/LoginView', 'jsx!views/login/ResetView',
	'jsx!views/index/IndexView', 'jsx!views/action1/Action1View',
	'jsx!views/action2/Action2View', 'jsx!views/action3/Action3View',
	'jsx!views/profile/ProfileView', 'jsx!views/admin/AdminView', 'models/User',
	'models/UserCollection'],

	function(LoginView, ResetView, IndexView,
			Action1View, Action2View, Action3View,
			ProfileView, AdminView, User, UserCollection) {
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
											console.log('itRouter - changeView, auth bad redirect to login.');
											window.location.hash = 'login';
											return;
										} else {
											console.log('itRouter - changeView, auth ok going to view requested.');
											_this.completeChange(view);
											}
										});
									} else {
										console.log('itRouter - changeView, no auth requested, going to view');
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

								var _this = this;

								$.get('/authenticate')
									.done(function() {
										_this.user = new User();
										_this.user.fetch();
										_this.changeView(new IndexView({user: _this.user}));
										})
									.fail(function() {
										_this.changeView(new IndexView({user: {role: 0}}));
										});
								},

			action1:		function() {
								console.log('itRouter - action1 called.');
								this.changeView(new Action1View({user: this.user}));
								},

			action2:		function() {
								console.log('itRouter - action2 called.');
								this.changeView(new Action2View({user: this.user}));
								},

			action3:		function() {
								console.log('itRouter - action3 called.');
								this.changeView(new Action3View({user: this.user}));
								},

			profile:		function() {
								console.log('itRouter - profile called.');
								this.changeView(new ProfileView({user: this.user}));
								},

			admin:		function() {
								console.log('itRouter - admin called.');
								var userCollection = new UserCollection();
								userCollection.reset();
								this.changeView(new AdminView({user: this.user, collection: userCollection}));
								}
			});

	return new itRouter();
});

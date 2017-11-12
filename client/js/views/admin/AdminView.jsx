/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
define(['react', 'reactDom', 'itView', 'jsx!views/base/MenuView', 'jsx!views/admin/UserTable'],

	function(React, ReactDOM, itView, MenuView, UserTable) {

		var adminView = itView.extend({

            el:				$('#main'),

			events:			{
							'click .editUser':		'editUser',
							'click .deleteUser':	'deleteUser'
							},

			initialize:		function(options) {
								this.user = options.user;
								this.listenTo(this.user, 'update sort sync', this.render);
								this.listenTo(this.collection, 'update sort sync', this.render);
								},

			editUser:		function(event) {
								var id = $(event.currentTarget).parents('td:first').attr('id');
								var user = this.collection.get(id);
								var _this = this;

								console.log('AdminView - editUser, id = ' + id);
								console.log('AdminView - editUser, user = ' + JSON.stringify(user.toJSON()));

								var editModal = Backbone.ModalView.extend({
									  title: 	'<h4>Edit User</h4>',
									  body: 	'<form class="form-horizontal" id="user-form">' +
													'<div class="form-group">' +
														'<label for="first" class="col-sm-2 control-label">Username</label>' +
														'<div class="col-sm-10">' +
															'<input type="text" id="username" class="form-control" tabIndex="5" placeholder="Username"  data-error="A username is required." value="' + user.get('username') + '" required autoFocus/>' +
															'<span class="help-block with-errors"></span>' +
														'</div>' +
													'</div>' +
													'<div class="form-group">' +
														'<label for="last" class="col-sm-2 control-label">Role</label>' +
														'<div class="col-sm-10">' +
															'<select id="role" class="form-control">' +
																'<option value="0"' + (user.get('role') == 0 ? ' selected' : '') + '>User</option>' +
																'<option value="1"' + (user.get('role') == 1 ? ' selected' : '') + '>Administrator</option>' +
															'</select>' +
														'</div>' +
													'</div>' +
												'</form>',
									  backdrop:	'static',
									  buttons: 	[{
									    		className: 	'btn-primary ok',
									    		label: 		'Ok',
												close:		true
									  			}, {
									    		className: 	'btn-default cancel',
									    		label: 		'Cancel',
									    		close: 		true
									  			}],
									  events: 	{
									    		'click .modal-footer a.ok': 'onOk'
												},
									  onOk: 	function(event) {
									    			console.log('AdminView - editUser, editModal onOk called.');
													user.save({
														username:	$('#username').val(),
														role:		$('#role').val()
														}, {
														dataType: 	'text',
														success: 	function(model, response) {
																		console.log('AdminView - editUser, editModal onOk success');
																		//_this.collection.fetch();
																		},
														error: 		function(model, response) {
																		console.log('AdminView - editUser, editUser onOk error');
																			$.notify({
																				title: '<strong>Edit User Error</strong>',
																				icon: 'glyphicon glyphicon-warning-sign',
																				message: response.responseText
																				},{
																					type: 'danger'
																				});
																			}
														});
													}
									});

  								new editModal().render();
								},

			deleteUser:		function(event) {
								var id = $(event.currentTarget).parents('td:first').attr('id');
								var user = this.collection.get(id);
								var _this = this;

								console.log('AdminView - deleteUser, id = ' + id);

								var deleteModal = Backbone.ModalView.extend({
									  title: 	'<h4>Delete User - ' + user.get('username') + '</h4>',
									  body: 	'This user account will be permanently removed.',
									  backdrop:	'static',
									  buttons: 	[{
									    		className: 	'btn-primary ok',
									    		label: 		'Ok',
												close:		true
									  			}, {
									    		className: 	'btn-default cancel',
									    		label: 		'Cancel',
									    		close: 		true
									  			}],
									  events: 	{
									    		'click .modal-footer a.ok': 'onOk'
												},
									  onOk: 	function(event) {
													console.log('AdminView - deleteUser, deleteModal onOk called.');
													user.destroy({
														dataType: 	'text',
														success: 	function(model, response) {
																		console.log('AdminView - deleteUser, deleteModal onOk success');
																		_this.collection.remove(id);
																		},
														error: 		function(model, response) {
																		console.log('AdminView - deleteUser, deleteModal onOk error');
																			$.notify({
																				title: '<strong>Delete User Error</strong>',
																				icon: 'glyphicon glyphicon-warning-sign',
																				message: response.responseText
																				},{
																					type: 'danger'
																				});
																			}
														});
													}
									});

  								new deleteModal().render();
								},

            render:         function() {
                                ReactDOM.render(<Admin user={this.user.toJSON()} users={this.collection.toJSON()}/>, this.el);

  								$('[data-toggle="tooltip"]').tooltip();
								}
			});


		class Admin extends React.Component{
		    render() {

		        return (
					<div>
						<MenuView user={this.props.user}/>
						<div className="content">
							<h1 className="page-header">Administration</h1>

							<ul className="nav nav-tabs" role="tablist">
		    					<li role="presentation" className="active"><a href="#users" aria-controls="users" role="tab" data-toggle="tab">Users</a></li>
		    					<li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
		  					</ul>

							<div className="tab-content">
		  						<div role="tabpanel" className="tab-pane fade in active" id="users">
									<UserTable user={this.props.user} users={this.props.users}/>
		  						</div>
		  						<div role="tabpanel" className="tab-pane fade" id="settings">

		  						</div>
		  					</div>
						</div>
					</div>
		        	);
				}
			};

	return adminView;
	});

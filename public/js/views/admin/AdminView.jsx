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

			editUser:		function(event) {
								var id = $(event.currentTarget).parents('td:first').attr('id');
								var user = this.collection.get(id);
								console.log('AdminView - editUser, id = ' + id);

								var editModal = Backbone.ModalView.extend({
									  title: 	'<h4>Edit User</h4>',
									  body: 	'This user account will be permanently removed.',
									  backdrop:	'static',
									  buttons: 	[{
									    		className: 	'btn-primary ok',
									    		label: 		'Ok'
									  			}, {
									    		className: 	'btn-default cancel',
									    		label: 		'Cancel',
									    		close: 		true
									  			}],
									  events: 	{
									    		'click .modal-footer a.ok': 'onOk'
												},
									  onOk: 	function(event) {
									    			event.preventDefault();
									    			console.log('Ok clicked');
													}
									});

  								new editModal().render();
								},

			deleteUser:		function(event) {
								var id = $(event.currentTarget).parents('td:first').attr('id');
								var user = this.collection.get(id);
								//var _this = this;
								console.log('AdminView - deleteUser, id = ' + id);

								var deleteModal = Backbone.ModalView.extend({
									  title: 	'<h4>Delete User - ' + user.get('username') + '</h4>',
									  body: 	'This user account will be permanently removed.',
									  backdrop:	'static',
									  buttons: 	[{
									    		className: 	'btn-primary ok',
									    		label: 		'Ok'
									  			}, {
									    		className: 	'btn-default cancel',
									    		label: 		'Cancel',
									    		close: 		true
									  			}],
									  events: 	{
									    		'click .modal-footer a.ok': 'onOk'
												},
									  onOk: 	function(event) {
									    			event.preventDefault();
									    			console.log('Ok clicked');
													}
									});

  								new deleteModal().render();
								},

			initialize:		function(options) {
								this.user = options.user;
								this.listenTo(this.user, 'update sort sync', this.render);
								this.listenTo(this.collection, 'update sort sync', this.render);
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

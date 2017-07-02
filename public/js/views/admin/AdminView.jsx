/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
define(['react', 'reactDom', 'itView', 'jsx!views/base/MenuView'],

	function(React, ReactDOM, itView, MenuView) {

		var adminView = itView.extend({

            el:				$('#main'),

			initialize:		function(options) {
								//this.model = new AdminModel();
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

									<table className="table table-hover">
										<thead>
											<tr>
												<th>First Name</th>
												<th>Last Name</th>
												<th>Username</th>
												<th>Email</th>
												<th>Organisation</th>
												<th>Role</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Mark</td>
												<td>Otto</td>
												<td>@mdo</td>
												<td>mark@example.com</td>
												<td>Foo</td>
												<td>Administrator</td>
												<td>
													<div className="btn-group btn-group-sm" role="group" aria-label="User controls">
														<button type="button" className="btn btn-default" data-toggle="modal" data-target="#editUser">
															<span className="glyphicon glyphicon-pencil" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Edit user"></span>
														</button>
														<button type="button" className="btn btn-default" data-toggle="modal" data-target="#deleteUser">
															<span className="glyphicon glyphicon-trash" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Delete user"></span>
														</button>
													</div>
												</td>
											</tr>
											<tr>
												<td>Jacob</td>
												<td>Thornton</td>
												<td>@fat</td>
												<td>jacob@example.com</td>
												<td>Foo</td>
												<td>Administrator</td>
												<td>
													<div className="btn-group btn-group-sm" role="group" aria-label="User controls">
														<button type="button" className="btn btn-default" data-toggle="modal" data-target="#editUser">
															<span className="glyphicon glyphicon-pencil" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Edit user"></span>
														</button>
														<button type="button" className="btn btn-default" data-toggle="modal" data-target="#deleteUser">
															<span className="glyphicon glyphicon-trash" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Delete user"></span>
														</button>
													</div>
												</td>
											</tr>
											<tr>
												<td>Larry</td>
												<td>the Bird</td>
												<td>@twitter</td>
												<td>larry@example.com</td>
												<td>Foo</td>
												<td>User</td>
												<td>
													<div className="btn-group btn-group-sm" role="group" aria-label="User controls">
														<button type="button" className="btn btn-default" data-toggle="modal" data-target="#editUser">
															<span className="glyphicon glyphicon-pencil" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Edit user"></span>
														</button>
														<button type="button" className="btn btn-default" data-toggle="modal" data-target="#deleteUser">
															<span className="glyphicon glyphicon-trash" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Delete user"></span>
														</button>
													</div>
												</td>
											</tr>
										</tbody>
									</table>

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

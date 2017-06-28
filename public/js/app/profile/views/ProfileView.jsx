/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
define(['react', 'reactDom', 'itView', 'jsx!app/base/views/MenuView'],

	function(React, ReactDOM, itView, MenuView) {

		var ProfileView = itView.extend({

            el:				$('#main'),


			initialize:		function(options) {
								console.log('ProfileView - initilialize, options.user: ' + JSON.stringify(options.user));
								this.user = options.user;
								this.listenTo(this.user, 'update sort sync', this.render);
								},

			profileUpdate:	function(event) {

								this.user.save({
									name:			{
													first:	$('#first').val(),
													last:	$('#last').val()
													},
									email:			$('#email').val(),
									organisation:	$('#organisation').val()
									},{
									dataType: 	'text',
									success:	function(model, response) {
										console.log('ProfileView - profileUpdate, success response: ' + JSON.stringify(response));
										$.notify({
											title: 		'<strong>Done</strong>',
											icon: 		'glyphicon glyphicon-ok',
											message: 	'Your profile details were updated.'
											});
										},
									error:		function(model, response) {
										console.log('ProfileView - profileUpdate, error response: ' + JSON.stringify(response));
										$.notify({
											title: 		'<strong>Update Error</strong>',
											icon:		'glyphicon glyphicon-warning-sign',
											message: 	'There was a problem completing the update.'
											},{
											type: 'danger'
											});
										}
									});
								},

			passwordReset:	function(event) {

								},

            render:         function() {
                                ReactDOM.render(<Profile user={this.user.toJSON()}/>, this.el);
								var _this = this;

								$('#profile-form').validator()
									.on('submit', function (event) {
  										if (!event.isDefaultPrevented()) {
											event.preventDefault();
											_this.profileUpdate(event);
  											}
										})
									.off('input.bs.validator change.bs.validator focusout.bs.validator');

								$('#password-form').validator()
									.on('submit', function (event) {
  										if (!event.isDefaultPrevented()) {
											event.preventDefault();
											_this.passwordReset(event);
  											}
										})
									.off('input.bs.validator change.bs.validator focusout.bs.validator');
                                }
			});


		class Profile extends React.Component{
		    render() {

		        return (
					<div>
						<MenuView user={this.props.user}/>
						<div className='content'>
							<h1 className="page-header">Profile for {this.props.user.username}</h1>

							<ul className="nav nav-tabs" role="tablist">
		    					<li role="presentation" className="active"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile Details</a></li>
		    					<li role="presentation"><a href="#profile-password" aria-controls="password" role="tab" data-toggle="tab">Password</a></li>
		  					</ul>

							<div className="tab-content">
		  						<div role="tabpanel" className="tab-pane fade in active" id="profile">
									<form className="form-horizontal" id="profile-form">
										<div className="form-group">
											<label htmlFor="first" className="col-sm-2 control-label">First/Given Name</label>
											<div className="col-sm-10">
												<input type="text" id="first" className="form-control" tabIndex="5" placeholder="First/given name"  data-error="A first/given name is required." defaultValue={this.props.user.name.first} required autoFocus/>
												<span className="help-block with-errors"></span>
											</div>
										</div>
										<div className="form-group">
											<label htmlFor="last" className="col-sm-2 control-label">Last/Family Name</label>
											<div className="col-sm-10">
												<input type="text" id="last" className="form-control" tabIndex="10" placeholder="Last/family name"  data-error="A last/family name is required." defaultValue={this.props.user.name.last} required/>
												<span className="help-block with-errors"></span>
											</div>
										</div>
										<div className="form-group">
											<label htmlFor="organisation" className="col-sm-2 control-label">Organisation</label>
											<div className="col-sm-10">
												<input type="text" id="organisation" className="form-control" tabIndex="15" placeholder="Organisation name (optional)" defaultValue={this.props.user.organisation}/>
												<span className="help-block with-errors"></span>
											</div>
										</div>
										<div className="form-group">
											<label htmlFor="email" className="col-sm-2 control-label">E-mail</label>
											<div className="col-sm-10">
												<input type="email" id="email" className="form-control" tabIndex="20" placeholder="E-mail" data-error="A valid e-mail is required." defaultValue={this.props.user.email} required/><br/>
												<input type="email" id="email2" className="form-control" tabIndex="25" placeholder="Confirm e-mail" data-error="A confirmation e-mail is required." data-match="#email" data-match-error="The e-mails do not match." defaultValue={this.props.user.email} required/>
												<span className="help-block with-errors"></span>
											</div>
										</div>
										<div className="form-group">
											<div className="col-sm-offset-2 col-sm-10">
												<button type="submit" id="update" tabIndex="30" className="btn btn-default">Update</button>
											</div>
										</div>
									</form>
		  						</div>
		  						<div role="tabpanel" className="tab-pane fade" id="profile-password">
		  							<form className="form-horizontal" id="password-form">
										<div className="form-group">
											<label htmlFor="password" className="col-sm-2 control-label">Password</label>
											<div className="col-sm-10">
												<input type="password" id="password" className="form-control" tabIndex="35" placeholder="Password" data-error="A valid password is required." required/><br/>
												<input type="password" id="password2" className="form-control" tabIndex="40" placeholder="Confirm password" data-error="A confirmation password is required." data-match="#password" data-match-error="The passwords do not match." required/>
												<span className="help-block with-errors"></span>
											</div>
										</div>
										<div className="form-group">
											<div className="col-sm-offset-2 col-sm-10">
												<button type="submit" id="reset" tabIndex="30" className="btn btn-default">Reset</button>
											</div>
										</div>
									</form>
		  						</div>
		  					</div>
						</div>
					</div>
		        	);
				}
			};

	return ProfileView;
	});

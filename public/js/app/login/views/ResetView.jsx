/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 */
define(['react', 'reactDom'],

	function(React, ReactDOM) {

		var resetView = Backbone.View.extend({

            el:				$('#main'),

			requireLogin: 		false,

			reset:			function(event) {
									console.log('ResetView - reset, called');
									console.log('ResetView - reset, id: ' + this.id);
									
									$.post('/reset', {
										id:	this.id,
										password: $('#password').val()
										})
										.done(function() {
											$.notify({
												title: '<strong>Reset password</strong>',
												icon: 'fa fa-lock',
												message: 'Your password has been reset.'
												});
											$('#reset-login').removeClass('disabled');
										})
										.fail(function(err) {
											console.log('LoginView - forgot, error: ' + err.message);
											$.notify({
												title: '<strong>Forgot Password Error</strong>',
												icon: 'glyphicon glyphicon-warning-sign',
												message: err.message
												},{
												type: 'danger'
												});
											});
								},

            render:         function() {
                                ReactDOM.render(<Reset/>, this.el);

								var _this = this;

								$(function () {
  									$('[data-toggle="tooltip"]').popover();
									});

								$('#reset-form').validator()
									.on('submit', function (event) {
  										if (!event.isDefaultPrevented()) {
											_this.reset(event);
  											}
										})
									.off('input.bs.validator change.bs.validator focusout.bs.validator');
								}

			});


		class Reset extends React.Component{

		    render() {

				var passwordPattern = "(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$";

		        return (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <div className="login-brand">
                                    <div className="row">
                                        <div className="col-xs-2 login-logo">
                                            <img alt="Initiate Thinking Logo" src="media/images/LogoSReflect.png" height="80" width="63"/>
                                        </div>
                                        <div className="col-xs-10 login-main-title">
                                            <h1>Initiate Thinking<br/>Demo App</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel panel-default login-panel">
                                    <div className="panel-heading">
                                        <h2 className="panel-title login-title">Reset Password</h2>
                                    </div>
                                    <div className="panel-body">
                                        <div className="reset-view">
                                            <form className="form-horizontal reset-form" id="reset-form">
                                                <div className="form-group input-block-ico">
                                                    <p htmlFor="password" className="sr-only">Password</p>
                                                    <div className="input-group" data-toggle="tooltip" title="Password must contain one or more upper case, lower case, number/special characters and be at least 8 characters long to be valid.">
                                                        <div className="input-group-addon login-name-addon"><span className="fa fa-key" aria-hidden="true"/></div>
                                                        <input type="password" id="password" pattern={passwordPattern} className="form-control" tabIndex="5" placeholder="Password" data-error="A valid password is required." required/>
                                                    </div>
                                                    <div className="input-group">
                                                        <div className="input-group-addon login-name-addon"><span className="fa fa-key" aria-hidden="true"/></div>
                                                        <input type="password" id="password2" pattern={passwordPattern} className="form-control" tabIndex="10" placeholder="Confirm password" data-error="A confirmation password is required." data-match="#password" data-match-error="The passwords do not match." required/>
                                                    </div>
                                                    <span className="help-block with-errors"></span>
                                                </div>
                                                <div className="form-group">
                                                    <button className="btn btn-primary btn-block" type="submit" id="reset" tabIndex="15">Reset Password</button>
                                                    <a className="btn btn-block disabled" href="#login" id="reset-login" role="button" tabIndex="20">Back to Login</a>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4"></div>
                        </div>
                        <div className="footer">
                            <p>
                                <span className="glyphicon glyphicon-copyright-mark" aria-hidden="true"></span> 2017 Initiate Thinking <a id="cookies">Cookie Policy</a>
                            </p>
                        </div>
                    </div>
		        	);
				}
			};

	return resetView;
	});

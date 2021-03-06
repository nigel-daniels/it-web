/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
define(['log', 'react', 'reactDom', 'itView'],

	function(log, React, ReactDOM, itView) {

		var loginView = itView.extend({

            el:				$('#main'),

			requireLogin: 	false,

			signup:			function(event) {
								log.debug('LoginView - signup, called');
								log.debug('username: ' + $('#username').val());
								$.post('/signup', {
									first: $('#first').val(),
									last: $('#last').val(),
									organisation: $('#organisation').val(),
									username: $('#username').val(),
									password: $('#password').val(),
									email: $('#email').val(),
									})
									.done(function() {
										$('.login-title').text('Login');
				                        $('.signup-view').hide('slow');
				                        $('.login-view').show('slow');
										$('#login-name').focus();
									})
									.fail(function(err) {
										log.debug('LoginView - signup fail: ' + err.responseText);
										$.notify({
											title: '<strong>Signup Error</strong>',
											icon: 'glyphicon glyphicon-warning-sign',
											message: err.responseText
											},{
												type: 'danger'
											});
									});
								},

			login:			function(event) {
								log.debug('LoginView - login, called');
								$.post('/login', {
									username: $('#login-name').val(),
									password: $('#login-password').val()
									})
									.done(function() {
										log.debug('LoginView - login, login ok! switch to index view.');
										window.location.hash = 'index';
									})
									.fail(function(err) {
										if (err.status === 401) {
											log.debug('LoginView - login, bad username or password provided.');
											$.notify({
												title: '<strong>Bad Credentials</strong>',
												icon: 'fa fa-lock',
												message: 'The user name or password was incorrect.'
												});
										} else {
											log.debug('LoginView - login, error: ' + JSON.stringify(err));
											$.notify({
												title: '<strong>Login Error</strong>',
												icon: 'glyphicon glyphicon-warning-sign',
												message: err.responseText
												},{
												type: 'danger'
												});
											}
										});
								},

			forgot:			function(event) {
									log.debug('LoginView - forgot, called');
									$.post('/forgot', {
										username: $('#forgot-name').val()
										})
										.done(function() {
											$.notify({
												title: '<strong>Forgot password</strong>',
												icon: 'fa fa-lock',
												message: 'The reset email has been sent.'
												});

											$('.login-title').text('Login');
					                        $('.forgot-view').hide('slow');
					                        $('.login-view').show('slow');
											$('#login-name').focus();
										})
										.fail(function(err) {
											log.debug('LoginView - forgot, error: ' + JSON.stringify(err));
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
                                ReactDOM.render(<Login/>, this.el);

								var _this = this;

								$(function () {
  									$('[data-toggle="tooltip"]').popover();
									});

								$('#login-form').validator()
									.on('submit', function (event) {
  										if (!event.isDefaultPrevented()) {
											event.preventDefault();  // Stop us from navigating away b4 request is done
											_this.login(event);
  											}
										})
									.off('input.bs.validator change.bs.validator focusout.bs.validator');

								$('#signup-form').validator()
									.on('submit', function (event) {
	  									if (!event.isDefaultPrevented()) {
											event.preventDefault();
											_this.signup(event);
	  										}
										})
									.off('input.bs.validator change.bs.validator focusout.bs.validator');

								$('#forgot-form').validator()
									.on('submit', function (event) {
	  									if (!event.isDefaultPrevented()) {
											event.preventDefault();
											_this.forgot(event);
	  										}
										})
									.off('input.bs.validator change.bs.validator focusout.bs.validator');
								}

			});


		class Login extends React.Component{

            handleAction(event) {
                switch ($(event.currentTarget).attr('id')) {
                    case 'login-forgot':
                        $('.login-title').text('Forgot Password');
                        $('.login-view').hide('slow');
                        $('.forgot-view').show('slow');
						$('#forgot-name').focus();
                        break;
					case 'forgot-login':
                        $('.login-title').text('Login');
                        $('.forgot-view').hide('slow');
                        $('.login-view').show('slow');
						$('#login-name').focus();
                        break;
                    case 'login-signup':
                        $('.login-title').text('Sign Up');
                        $('.login-view').hide('slow');
                        $('.signup-view').show('slow');
						$('#first').focus();
                        break;
					case 'signup-login':
                        $('.login-title').text('Login');
                        $('.signup-view').hide('slow');
                        $('.login-view').show('slow');
						$('#login-name').focus();
                        break;
                    }
                }


		    render() {

				var passwordPattern = "(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$";

				var rfc5322 = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\" +
							"x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9]" +
							"(?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4]" +
							"[0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]" +
							")|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\" +
							"x0b\\x0c\\x0e-\\x7f])+)\\])";

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
            							<h2 className="panel-title login-title">Login</h2>
            						</div>
            						<div className="panel-body">
            							<div className="login-view">
            								<form className="form-horizontal login-form" id="login-form">
            									<div className="form-group input-block-ico">
            										<div className="input-group login-name-group">
            											<div className="input-group-addon login-name-addon"><span className="glyphicon glyphicon-user" aria-hidden="true"/></div>
            											<input type="text" className="form-control login-name-input" id="login-name" tabIndex='1' placeholder="User Name" data-error="The user name is required." required autoFocus/>
            										</div>
            										<div className="input-group login-password-group">
            											<div className="input-group-addon login-password-addon"><span className="fa fa-key" aria-hidden="true"/></div>
            											<input type="password" className="form-control login-password-input" id="login-password" tabIndex="5" data-error="The password is required." placeholder="Password" required/>
            										</div>
													<span className="help-block with-errors"></span>
            									</div>
            									<div className="form-group">
            										<button type="submit" className="btn btn-primary btn-block" id="login" tabIndex="10">Sign in</button>
            									</div>
            								</form>
            								<div className="row login-footer">
            									<div className="col-md-6 login-footer-left">
            										<a id="login-forgot" onClick={this.handleAction} tabIndex="15">Forgot password?</a>
            									</div>
            									<div className="col-md-6 login-footer-right">
            										<a id="login-signup" onClick={this.handleAction} tabIndex="20">Create account?</a>
            									</div>
            								</div>
            							</div>

            							<div className="signup-view" hidden>
            								<form className="form-horizontal signup-form" id="signup-form">
            									<div className="form-group input-block-ico">
            										<p htmlFor="first" className="sr-only">Your Name</p>
            										<div className="input-group">
            											<div className="input-group-addon login-name-addon"><span className="fa fa-address-card-o" aria-hidden="true"/></div>
            											<input type="text" id="first" className="form-control" tabIndex="25" placeholder="First/Given name"  data-error="A first/given name is required." required/>
            										</div>
            										<div className="input-group">
            											<div className="input-group-addon login-name-addon"><span className="fa fa-address-card-o" aria-hidden="true"/></div>
            											<input type="text" id="last" className="form-control" tabIndex="30" placeholder="Last/Family name" data-error="A last/family name is required." required/>
            										</div>
													<span className="help-block with-errors"></span>
            									</div>
            									<div className="form-group">
            										<p htmlFor="user-name" className="sr-only">User Name</p>
            										<div className="input-group">
            											<div className="input-group-addon login-name-addon"><span className="glyphicon glyphicon-user" aria-hidden="true"/></div>
            											<input type="text" id="username" className="form-control" tabIndex="35" placeholder="User name" data-error="A user name is required." required/>
            										</div>
													<span className="help-block with-errors"></span>
            									</div>
            									<div className="form-group">
            										<p htmlFor="organisation" className="sr-only">Organisation Name</p>
            										<div className="input-group">
            											<div className="input-group-addon login-name-addon"><span className="fa fa-building" aria-hidden="true"/></div>
            											<input type="text" id="organisation" className="form-control" tabIndex="40" placeholder="Organisation name (optional)"/>
            										</div>
            									</div>
            									<div className="form-group input-block-ico">
            										<p htmlFor="email" className="sr-only">Email address</p>
            										<div className="input-group">
            											<div className="input-group-addon login-name-addon"><span className="glyphicon glyphicon-envelope" aria-hidden="true"/></div>
            											<input type="email" id="email" pattern={rfc5322} className="form-control" tabIndex="45" placeholder="E-mail" data-error="A valid e-mail is required." required/>
            										</div>
            										<div className="input-group">
            											<div className="input-group-addon login-name-addon"><span className="glyphicon glyphicon-envelope" aria-hidden="true"/></div>
            											<input type="email" id="email2" pattern={rfc5322} className="form-control" tabIndex="50" placeholder="Validate e-mail" data-error="A confirmation e-mail is required." data-match="#email" data-match-error="The e-mails do not match." required/>
            										</div>
													<span className="help-block with-errors"></span>
            									</div>
            									<div className="form-group input-block-ico">
            										<p htmlFor="password" className="sr-only">Password</p>
            										<div className="input-group" data-toggle="tooltip" title="Password must contain one or more upper case, lower case, number/special characters and be at least 8 characters long to be valid.">
            											<div className="input-group-addon login-name-addon"><span className="fa fa-key" aria-hidden="true"/></div>
            											<input type="password" id="password" pattern={passwordPattern} className="form-control" tabIndex="55" placeholder="Password" data-error="A valid password is required." required/>
            										</div>
            										<div className="input-group">
            											<div className="input-group-addon login-name-addon"><span className="fa fa-key" aria-hidden="true"/></div>
            											<input type="password" id="password2" pattern={passwordPattern} className="form-control" tabIndex="60" placeholder="Validate password" data-error="A confirmation password is required." data-match="#password" data-match-error="The passwords do not match." required/>
            										</div>
													<span className="help-block with-errors"></span>
            									</div>
            									<div className="form-group">
            										<input type="checkbox" id="terms" tabIndex="70" data-error="You need to read and agree to the terms and conditions." required/> I agree to the <a id="termsLink">terms and conditions.</a>
													<span className="help-block with-errors"></span>
												</div>
												<div className="form-group">
            										<input type="checkbox" id="privacy" tabIndex="75" data-error="You need to read agree to the privacy policy." required/> I agree to the <a id="privacyLink">privacy policy.</a>
													<span className="help-block with-errors"></span>
            									</div>
            									<div className="form-group">
            										<button className="btn btn-primary btn-block" type="submit" id="signup" tabIndex="80">Sign up</button>
													<button className="btn btn-block" type="button" id="signup-login" onClick={this.handleAction}tabIndex="85">Back to Login</button>
            									</div>
            								</form>
            							</div>

            							<div className="forgot-view" hidden>
            								<p className="forgot-copy">This will send a message to your registered account e-mail address, allowing you to reset your password.</p>
            								<form className="form-horizontal forgot-form" id="forgot-form">
            									<div className="form-group">
            										<p htmlFor="forgot-name" className="sr-only">User name</p>
            										<div className="input-group">
            											<div className="input-group-addon login-name-addon"><span className="glyphicon glyphicon-user" aria-hidden="true"/></div>
            											<input type="text" id="forgot-name" className="form-control" tabIndex="90" placeholder="User name"  data-error="A user name is required." required/>
            										</div>
													<span className="help-block with-errors"></span>
            									</div>
            									<div className="form-group">
            										<button className="btn btn-primary btn-block" type="submit" id="forgot" tabIndex="95">Send e-mail</button>
													<button className="btn btn-block" type="button" id="forgot-login" onClick={this.handleAction}tabIndex="100">Back to Login</button>
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

	return loginView;
	});

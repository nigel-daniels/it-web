/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 */
define(['react', 'reactDom', 'itView'],

	function(React, ReactDOM, itView) {

		var loginView = itView.extend({

            el:				$('#main'),

			events:			{
							'click #signup':	'signup',
							'click #login':		'login'
							},

			signup:			function(event) {
								console.log('LoginView - signup, called');
								console.log('username: ' + $('#username').val());
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
										console.log('LoginView - signup fail: ' + err.responseText);
									});
								},

			login:			function(event) {
								console.log('LoginView - login, called');
								$.post('/login', {
									username: $('#login-name').val(),
									password: $('#login-password').val()
									})
									.done(function() {
										window.location.hash = 'index';
									})
									.fail(function(err) {
 										if (err.status === 400) {
											console.log('LoginView - login, bad username or password provided.');
										} else {
											console.log('LoginView - login, error: ' + err.responseText);
											}
									});
								},

            render:         function() {
                                ReactDOM.render(<Login/>, this.el);
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
            								<form className="form-horizontal login-form">
            									<div className="form-group input-block-ico">
            										<div className="input-group login-name-group">
            											<div className="input-group-addon login-name-addon"><span className="glyphicon glyphicon-user" aria-hidden="true"/></div>
            											<input type="text" className="form-control login-name-input" id="login-name" tabIndex='1' placeholder="User Name" required autoFocus/>
            										</div>
            										<div className="input-group login-password-group">
            											<div className="input-group-addon login-password-addon"><span className="fa fa-key" aria-hidden="true"/></div>
            											<input type="password" className="form-control login-password-input" id="login-password" tabIndex="5" placeholder="Password" required/>
            										</div>
            									</div>
            									<div className="form-group">
            										<button type="button" className="btn btn-primary btn-block" id="login" tabIndex="10">Sign in</button>
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
            								<form className="form-horizontal signup-form">
            									<div className="form-group input-block-ico">
            										<p htmlFor="first" className="sr-only">Your Name</p>
            										<div className="input-group">
            											<div className="input-group-addon login-name-addon"><span className="fa fa-address-card-o" aria-hidden="true"/></div>
            											<input type="text" id="first" className="form-control" tabIndex="25" placeholder="First/Given name" required/>
            										</div>
            										<div className="input-group">
            											<div className="input-group-addon login-name-addon"><span className="fa fa-address-card-o" aria-hidden="true"/></div>
            											<input type="text" id="last" className="form-control" tabIndex="30" placeholder="Last/Family name" required/>
            										</div>
            									</div>
            									<div className="form-group">
            										<p htmlFor="user-name" className="sr-only">User Name</p>
            										<div className="input-group">
            											<div className="input-group-addon login-name-addon"><span className="glyphicon glyphicon-user" aria-hidden="true"/></div>
            											<input type="text" id="username" className="form-control" tabIndex="35" placeholder="User name" required/>
            										</div>
            									</div>
            									<div className="form-group">
            										<p htmlFor="organisation" className="sr-only">Organisation Name</p>
            										<div className="input-group">
            											<div className="input-group-addon login-name-addon"><span className="fa fa-building" aria-hidden="true"/></div>
            											<input type="text" id="organisation" className="form-control" tabIndex="40" placeholder="Organisation name"/>
            										</div>
            									</div>
            									<div className="form-group input-block-ico">
            										<p htmlFor="email" className="sr-only">Email address</p>
            										<div className="input-group">
            											<div className="input-group-addon login-name-addon"><span className="glyphicon glyphicon-envelope" aria-hidden="true"/></div>
            											<input type="email" id="email" className="form-control" tabIndex="45" placeholder="E-mail" required/>
            										</div>
            										<div className="input-group">
            											<div className="input-group-addon login-name-addon"><span className="glyphicon glyphicon-envelope" aria-hidden="true"/></div>
            											<input type="email" id="email2" className="form-control" tabIndex="50" placeholder="Validate e-mail" required/>
            										</div>
            									</div>
            									<div className="form-group input-block-ico">
            										<p htmlFor="password" className="sr-only">Password</p>
            										<div className="input-group">
            											<div className="input-group-addon login-name-addon"><span className="fa fa-key" aria-hidden="true"/></div>
            											<input type="password" id="password" className="form-control" tabIndex="55" placeholder="Password" required/>
            										</div>
            										<div className="input-group">
            											<div className="input-group-addon login-name-addon"><span className="fa fa-key" aria-hidden="true"/></div>
            											<input type="password" id="password2" className="form-control" tabIndex="60" placeholder="Validate password" required/>
            										</div>
            									</div>
            									<div className="form-group">
            										<p>
            											<input type="checkbox" id="terms" tabIndex="70"/> I agree to the <a id="termsLink">terms and conditions.</a>
            										</p>
            										<p>
            											<input type="checkbox" id="privacy" tabIndex="75"/> I agree to the <a id="privacyLink">privacy policy.</a>
            										</p>
            									</div>
            									<div className="form-group">
            										<button className="btn btn-primary btn-block" type="button" id="signup" tabIndex="80">Sign up</button>
													<button className="btn btn-block" type="button" id="signup-login" onClick={this.handleAction}tabIndex="85">Back to Login</button>
            									</div>
            								</form>
            							</div>

            							<div className="forgot-view" hidden>
            								<p className="forgot-copy">This will send a message to your registered account e-mail address, allowing you to reset your password.</p>
            								<form className="form-horizontal forgot-form">
            									<div className="form-group">
            										<p htmlFor="forgot-name" className="sr-only">User name</p>
            										<div className="input-group">
            											<div className="input-group-addon login-name-addon"><span className="glyphicon glyphicon-user" aria-hidden="true"/></div>
            											<input type="text" id="forgot-name" className="form-control" tabIndex="90" placeholder="User name" required/>
            										</div>
            									</div>
            									<div className="form-group">
            										<button className="btn btn-primary btn-block" type="button" id="forgot" tabIndex="95">Send e-mail</button>
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

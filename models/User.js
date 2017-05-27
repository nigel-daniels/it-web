/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 */
module.exports = function(mongoose, bcrypt, nodemailer, config) {


	var Role = 	{
				USER:	0,
             	ADMIN:	1,
             	};

	// Create the Mongoose Schema
	var UserSchema = new mongoose.Schema({
            name: 		{
                        first:	{type: String, required: true},
                        last:	{type: String, required: true}
                        },
            username:   {type: String, unique: true, required: true},
            password:	{type: String, required: true},
			email:		{type: String, unique: true},
            organisation:	{type: mongoose.Schema.ObjectId},
			role:		{type: Number, default: Role.USER, required: true}
			});

	// Set up the model
	var User = mongoose.model('User', UserSchema);

	var validateRole =	function(value) {
							switch (value) {
								case Role.User:
									return true;
								case Role.ADMIN:
									return true;
								default:
									return false;
								}
							};

	// Create method that hashes pwd
	var createUser = 		function(newUser, callback) {

                    		var user = new User({
                    			name: 		{
											first:	newUser.first,
											last:	newUser.last
											},
	                            username:   newUser.username,
	                            email: 		newUser.email,
								password: 	config.passport.generateHash(newUser.password),
	                            organisation:	newUser.organisation,
								role:		newUser.role
								});

                    		user.save(callback);
                          	};

	var updatePassword = function(id, newPassword, callback) {
							log.info('User.changePassword, called');
							User.update({_id: id}, {password: config.passport.generateHash(newPassword)}, callback);
							};

	// Handle active users forgetting their password
	var forgotPassword = function(email, resetPasswordUrl, callback) {
							log.info('User.forgotPassword, called');

							User.findOne({email: email, active: true}, function findAccount(err, user) {
								if (err) {
									log.error('User.forgotPassword, Failed to find account');
									// account is invalid
									callback(false, 'We could not find an account associated with that email.'); // NLS
								} else {
									log.debug('User.forgotPassword, Found account, sending email');
									var smtpTransport = nodemailer.createTransport(nodemailerSmtp(config.mail));
									resetPasswordUrl += '/?id=' + user._id;

									smtpTransport.sendMail({
										from:		'no.reply@axiomode.com',
										to:			user.email,
										subject:	'Axiomode Password Request',
										text:		'Please use this link to reset your password: ' + resetPasswordUrl
										},
										function forgotPasswordResult(err) {
											if (err) {
												log.error('User.forgotPassword, Error sending email: ' + JSON.stringify(err));
												callback(false, 'Error sending email: ' + JSON.stringify(err)); // NLS
											} else {
												log.info('User.forgotPassword, Success sent email');
												callback(true, null);
											}
									});
								}
							});
						};



	return 	{
			User: 			User,
			Role:			Role,

			validateRole:	validateRole,

			createUser:		createUser,

			updatePassword:	updatePassword,
			forgotPassword:	forgotPassword
			};
	};

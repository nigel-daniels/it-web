/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 */
module.exports = function(mongoose, bcrypt, nodemailer, nodemailerSmtp, config) {
	const SALT_ROUNDS = 10;

	var Role = 	{
				USER:	'User',
             	ADMIN:	'Administrator'
             	};

	// Create the Mongoose Schema
	var UserSchema = new mongoose.Schema({
            name: 		{
                        first:	{type: String},
                        last:	{type: String}
                        },
            username:   {type: String, unique: true, required: true},
            password:	{type: String, required: true},
			email:		{type: String, unique: true},
            organisation:	{type: mongoose.Schema.ObjectId},
			role:			  {type: Number, default: Role.USER}
			});

	// checking if password is valid method
	UserSchema.methods.validPassword = 	function(password, callback) {
											log.debug('user.validPassword, called');
											return bcrypt.compareSync(password, this.password);
											};

	// Set up the model
	var User = mongoose.model('User', UserSchema);

	// Hash and salt the password
	var generateHash = 	function(password) {
							log.debug('User.generateHash, called');
    						return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS), null);
    						};

	// Create method
	var create = 		function(first, last, username, password, email, ,organisation, role, callback) {
							log.info('User.create, called');

                    		var user = new User({
                    			name: 		{
											first: 	first,
											last:	  last
											},
	                            username:   username,
	                            email: 		email,
								password: 	generateHash(password),
	                            organisation:	organisation,
								role:		role
								});
								
                    		user.save(callback);
                          	};



	// Handle active users forgetting their password
	var forgotPassword = 			function(email, resetPasswordUrl, callback) {
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

	var changePassword = 		function(id, newPassword, callback) {
									log.info('User.changePassword, called');
									User.update({_id: id}, {$set: {password: generateHash(newPassword)}}, {upsert: false},
											function changePasswordCallback(err) {
												if (err) {
													log.error('User.changePassword, Error changing password for ' + id);
													callback(false, 'There was an error while updating the password.\nThe error reported was \'' + err.message + '\''); // NLS
												} else {
													log.info('User.changePassword, Changed password for account ' + id);
													callback(true);
													}
										});
									};

	// Find single instance using the generated id
	var findById = 				function(id, callback) {
									log.info('User.findById, looking for ' + id);
									User.findOne({_id: id}, callback);
									};


	// Find single instance method using the email key
	var findByEmail = 			function(searchEmail, callback) {
									log.info('User.findByEmail, looking for ' + searchEmail);
									User.findOne({email: searchEmail}, callback);
									};

	// Find active members of an organisation
	var findOrgMembers =		function(id, role, callback) {
									log.info('User.findOrgMemebrs, called');
									if (role === null) {
										User.find({organisation: id, active: true}, callback);
									} else {
										User.find({organisation: id, active: true, role: role}, callback);
										}
									};

	var findByArray =			function(idArray, callback) {
									log.info('User.findByArray, called');
									log.debug('User.findByArray, array: ' + JSON.stringify(idArray));
									User.find({_id: {$in: idArray}, active: true}, callback);
									};

	var deactivateOrgMembers = 	function(id, callback) {
									log.info('User.reactivate, called');
									User.update({organisation: id}, {active: false}, {multi: true}, callback);
									};

	var activate =				function(id, callback) {
									log.info('User.activate, called');

									User.findOne({_id: id}, function(err, user) {
										if (err) {
											log.error('User.activate, error finding account');
											callback(false, 'Error activate account: ' + JSON.stringify(err));
										} else {
											log.debug('User.activate, Sending notification email');
											var smtpTransport = nodemailer.createTransport(nodemailerSmtp(config.mail));

											smtpTransport.sendMail({
												from:		'no.reply@axiomode.com',
												to:			user.email,
												subject:	'Axiomode Account Reactivated',
												text:		'This is an information only email that the Axiomode account for this email address has been reactivated.'
												});

											User.update({_id: id}, {active: true}, function(err) {
												if (err) {
													log.error('User.activate, error updating account');
													callback(false, 'Error reactivating account: ' + JSON.stringify(err));
												} else {
													log.info('User.activate, success');
													callback(true, null);
													}
												});
											}
										});
									};


	var deactivate =			function(id, callback) {
									log.info('User.deactivate, called');

									User.findOne({_id: id}, function(err, user) {
										if (err) {
											log.error('User.deactivate, error updating account');
											callback(false, 'Error deactivating account: ' + JSON.stringify(err));
										} else {
											log.debug('User.deactivate, Sending notification email');
											var smtpTransport = nodemailer.createTransport(nodemailerSmtp(config.mail));

											smtpTransport.sendMail({
												from:		'no.reply@axiomode.com',
												to:			user.email,
												subject:	'Axiomode Account Deactivated',
												text:		'This is an information only email that the Axiomode account for this email address has been deactivated.  If you think this is in error please contact your Axiomode account administrator.'
												});

											User.update({_id: id}, {active: false}, function(err) {
												if (err) {
													log.error('User.deactivate, error updating account');
													callback(false, 'Error deactivating account: ' + JSON.stringify(err));
												} else {
													log.info('User.deactivate, success');
													callback(true, null);
													}
												});
											}
										});
									};

	return 	{
			Role:					Role,

			create:					create,

			invite:					invite,

			forgotPassword:			forgotPassword,
			changePassword:			changePassword,

			findById:				findById,
			findByEmail:			findByEmail,
			findOrgMembers:			findOrgMembers,
			findByArray:			findByArray,

			deactivateOrgMembers:	deactivateOrgMembers,
			activate:				activate,
			deactivate:				deactivate,

			User: 					User
			};
	};

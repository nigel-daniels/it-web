/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 */
module.exports = function(mongoose, bcrypt, nodemailer, nodemailerSmtp, config) {
	var SALT_ROUNDS = 10;

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
	var create = 		function(newUser, callback) {
							log.info('User.create, called');

                    		var user = new User({
                    			name: 		{
											first:	newUser.first,
											last:	newUser.last
											},
	                            username:   newUser.username,
	                            email: 		newUser.email,
								password: 	generateHash(newUser.password),
	                            organisation:	newUser.organisation,
								role:		newUser.role
								});

                    		user.save(callback);
                          	};

	var findUserTotal = function(callback) {
							User.count({}, callback);
							};

	// Find single instance using the generated id
	var findById = 		function(searchId, callback) {
							log.info('User.findById, looking for ' + searchId);
							User.findOne({_id: searchId}, callback);
							};

	// Find single instance method using the username
	var findByUsername = function(searchUsername, callback) {
							log.info('User.findByUsername, looking for ' + searchUsername);
							User.findOne({username: searchUsername}, callback);
							};

	// Find single instance method using the email key
	var findByEmail = 	function(searchEmail, callback) {
							log.info('User.findByEmail, looking for ' + searchEmail);
							User.findOne({email: searchEmail}, callback);
							};

	var update =		function(updateUser, callback) {
							log.info('User.update, udate user.id ' + updateUser.id);
							User.update({_id: updateUser._id},
								{
								name:	{
										first:	updateUser.first,
										last:	updateUser.last
										},
                            	username:   	updateUser.username,
                            	email: 			updateUser.email,
								password: 		generateHash(updateUser.password),
                            	organisation:	updateUser.organisation,
								role:			updateUser.role
								},
								callback);
							};

	var updatePassword = function(id, newPassword, callback) {
							log.info('User.changePassword, called');
							User.update({_id: id}, {password: generateHash(newPassword)},
									function(err) {
										if (err) {
											log.error('User.changePassword, Error changing password for ' + id);
											callback(err, 'There was an error while updating the password.\nThe error reported was \'' + err.message + '\''); // NLS
										} else {
											log.info('User.changePassword, Changed password for account ' + id);
											callback(null);
											}
								});
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

	var deleteById = function(id, callback) {
						log.info('User.delete, called for id: ' + id);
						User.deleteOne({_id: id}, callback);
						};


	return 	{
			Role:					Role,

			create:					create,

			findById:				findById,
			findByEmail:			findByEmail,
			findByUsername:			findByUsername,
			findUserTotal:			findUserTotal,

			update:					update,
			updatePassword:			updatePassword,

			forgotPassword:			forgotPassword,

			deleteById:				deleteById,

			User: 					User
			};
	};

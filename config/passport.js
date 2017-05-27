/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 */
module.exports = function(passport, passportLocal, bcrypt, User) {
	var SALT_ROUNDS = 10;

	/* ***************************************
	 *  Passport login sessions
	 *************************************** */

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
		});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
			});
		});


	/* ***************************************
	 *  LOCAL SIGNUP Strategy
	 *************************************** */
	passport.use('localSignup', new passportLocal(
		{passReqToCallback:	true},

		function(req, username, password, done) {

			// Check we do have a user name and password
			if (username === 'undefined') {
				return done(new Error('The user name is required.'));
			} else if (password === 'undefined') {
				return done(new Error('The user name is required.'));
				}

			// Check the user does not already exist
			User.findOne({username: username}, function(err, user) {
				if (err) {return done(err);}

				if (user) {
					return done(new Error('The user name ' + username + + ' is in use.'));
				} else {
					// Ok now let's validate the required fields are here
					if ((req.body.name.first === 'undefined') || (req.body.name.last === 'undefined')) {
						return done(new Error('A first and last name are required.'));
					} else if (req.body.email === 'undefined') {
						return done(new Error('An e-mail address is required.'));
					} else if (req.body.role === 'undefined') {
						return done(new Error('A user role is required.'));
						}

					// Now check the email is unique
					User.findOne({email: req.body.email}, function(err, user) {
						if (err) {return done(err);}
						if (user) {
							return done(new Error('An account exists with this email address.'));
							}
						});

					// Let's set the user account as a regular user... Unless it is account 1
					var role = User.Role.USER;
					if (User.count({}, function(err, count){
						if (err) {return done(err);}
						if (count === 0) {role = User.Role.ADMIN;}
						}));

					// Ok Validation passed let's create the user
					var user = new User({
									name: 			{
													first: req.body.name.first,
													last: req.body.name.last
													},
									username:		username,
									password:		generateHash(password),
									email:			req.body.email,
									organisation: 	req.body.organisation,
									role:			role
									});

					// Ok let's persist the user
					user.save(function(err) {
						if (err) {
							return done(err);
						} else {
							return(null, user);
							}
						});
					}
				});
			}
		));


	/* ***************************************
	 *  LOCAL LOGIN Strategy
	 *************************************** */
    passport.use('localLogin', new passportLocal(
    	{passReqToCallback : true},

    	function(req, username, password, done) {
    		log.debug('passport.login, called.');
    		User.findOne({username: username}, function(err, user) {
				if (err) {return done(err);}

				if (user) {
					if (validatePassword(password)) {
						return done(null, user);
					} else {
						return done(new Error('Password provided was incorrect.'), false);
						}
				} else {
					return done(new Error('User for the user name ' + username + + ' was not found.'), false);
					}
				});
			}
    	));

	// Hash and salt the password
	var generateHash = 		function(password) {
								return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
								};

	var	validatePassword = 	function(password, callback) {
								return bcrypt.compareSync(password, this.password);
								};

	return {
		generateHash:		generateHash,
		validatePassword:	validatePassword
		}
	};

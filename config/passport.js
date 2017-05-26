/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 */
module.exports = function(passport, passportLocal, models) {

	/* ***************************************
	 *  Passport login sessions
	 *************************************** */

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		log.debug('passport.serializeUser, called');
		done(null, user.id);
		});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		models.User.findById(id, function(err, user) {
			log.debug('passport.deserializeUser, called');
			done(err, user);
			});
		});


	/* ***************************************
	 *  LOCAL SIGNUP Strategy
	 *************************************** */
	passport.use('localSignup', new passportLocal(
		{
		// override username to be email
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback:	true		// We need the extra user data for the org and user.
		},

		function(req, email, password, done) {
			log.debug('passport.signup, called.');
			log.debug('passport.signup, req: ' + req + ', email: ' + email + ', done: ' + JSON.stringify(done));

			// check to see if an organisation is specified
			if (typeof req.body.organisation !== 'undefined')
				{
				log.info('passport.signup, organisation provided: ' + req.body.organisation);
				// First Check the organisation does not already exist
				models.Organisation.findByName(req.body.organisation, function(err, org) {

					// If there is an error return it
					if (err) {
						log.error('passport.signup, error finding org, err: ' + JSON.stringify(err));
						return done(err);
						}

					// We got an org so return an error
					if (org) {
						log.info('passport.signup, fail organisation exists: ' + org.name);
						return done(null, false, {message: 'The organisation you want to create already exists, contact an administrator to join.'});  // NLS
					} else {
						// Create the organisation
						new models.Organisation.create(req.body.organisation, function(err, newOrg) {

							// If there is an error return it
							if (err) {
								log.error('passport.signup, error creating org, err: ' + JSON.stringify(err));
								return done(err);
								}

							log.info('passport.signup, org created id: ' + newOrg.id);

							// Check user does not exist
							models.User.findByEmail(email, function(err, user) {

								// If there is an error return it
								if (err) {
									log.error('passport.signup, error finding user, err: ' + JSON.stringify(err));
									return done(err);
									}

								// If we got a user return an err
								if (user) {
									log.info('passport.signup, fail user exists: ' + user._id);
									return done(null, false, {message: 'This email is already in use, try recovering your password.'});  // NLS
								} else {
									// All is OK let's create the user
									new models.User.create(email, password, req.body.first, req.body.last, newOrg.id, req.body.role, function(err, newUser) {
										// If there is an error return it
										if (err) {
											log.error('passport.signup, error creating user, err: ' + JSON.stringify(err));
											return done(err);
											}

										log.info('passport.signup, success');
										return done(null, newUser);
										});
									}
								});
						});
					}
				});
			} else {
				log.info('passport.signup, orgId: ' + req.body.orgId);

				// Check user does not exist
				models.User.findByEmail(email, function(err, user) {

					// If there is an error return it
					if (err) {
						log.error('passport.signup, error finding user, err: ' + JSON.stringify(err));
						return done(err);
						}

					// If we got a user return an err
					if (user) {
						log.info('passport.signup, fail user exists: ' + user._id);
						return done(null, false, {message: 'This email is already in use, try recovering your password.'});  // NLS
					} else {
						// All is OK let's create the user
						new models.User.create(email, password, req.body.first, req.body.last, req.body.orgId, req.body.role, function(err, newUser) {
							// If there is an error return it
							if (err) {
								log.error('passport.signup, error creating user, err: ' + JSON.stringify(err));
								return done(err);
								}

							log.info('passport.signup, success');
							return done(null, newUser);
							});
						}
					});
				}
			})
		);


	/* ***************************************
	 *  LOCAL LOGIN Strategy
	 *************************************** */
    passport.use('localLogin', new passportLocal(
    	{
    	// override username to be email
        usernameField : 'email',
        passwordField : 'password'
    	},

    	function(email, password, done) { // callback with email and password from our form
    		log.debug('passport.login, called.');
    		// Check the user exists!
    		models.User.findByEmail(email, function(err, user) {
    			// If there is an error return it
    			if (err) {
    				log.error('passport.login, err: ' + JSON.stringify(err));
    				return done(err);
    				}

	            // Ooops no user!
	            if (!user) {
	            	log.info('passport.login, user not found');
	            	return done(null, false, {message: 'Email could not be found or the password incorrect.'});
	            	}

	            // Check the user is active and the password is ok
	            if (user.active) {
		            if (!user.validPassword(password)) {
		            	log.info('passport.login, password incorrect');
		            	return done(null, false, {message: 'Email could not be found or the password incorrect.'});
		            	}
	            } else {
	            	return done(null, false, {message: 'This account has been deactivated.'});
	            	}
	            // The last two return the same message as we don't want help trangressors

	            // all is well, return successful user
	            log.info('passport.login, success');
	            return done(null, user);
    		});

    	})
    );
};

/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
module.exports = function(log, passport, passportLocal, User) {


	/* ***************************************
	 *  Passport login sessions
	 *************************************** */

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		log.debug('passport - serializeUser, called.');
		done(null, user.id);
		});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		log.debug('passport - deserializeUser, called.');
		User.User.findById(id, function(err, user) {
			done(err, user);
			});
		});

	/* ***************************************
	 *  LOCAL LOGIN Strategy
	 *************************************** */
    passport.use('local', new passportLocal(
    	function(username, password, done) {
    		log.debug('passport - local, called.');
    		User.User.findOne({username: username}, function(err, user) {
				if (err) {return done(err);}

				if (user) {
					log.debug('passport - local, user found, checking password.');
					if (user.validatePassword(password)) {
						log.debug('passport - local, password ok, logged in.');
						return done(null, user);
					} else {
						log.debug('passport - local, Password provided was incorrect.');
						var error = {status: 401, message: 'The credentials provided were not correct.'};
						return done(error, false); // NLS
						}
				} else {
					log.debug('passport - local, User for the user name ' + username + ' was not found.');
					var error = {status: 401, message: 'The credentials provided were not correct.'};
					return done(error, false); // NLS
					}
				});
			}
    	));

	};

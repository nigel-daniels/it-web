/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 */
module.exports = function(passport, passportLocal, User) {


	/* ***************************************
	 *  Passport login sessions
	 *************************************** */

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
		});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.User.findById(id, function(err, user) {
			done(err, user);
			});
		});

	/* ***************************************
	 *  LOCAL LOGIN Strategy
	 *************************************** */
    passport.use('local', new passportLocal(
    	function(username, password, done) {
    		console.log('passport - local, called.');
    		User.User.findOne({username: username}, function(err, user) {
				if (err) {return done(err);}

				if (user) {
					if (user.validatePassword(password)) {
						return done(null, user);
					} else {
						console.log('passport - local, Password provided was incorrect.');
						var error = {status: 401, message: 'The credentials provided were not correct.'};
						return done(error, false); // NLS
						}
				} else {
					console.log('passport - local, User for the user name ' + username + ' was not found.');
					var error = {status: 401, message: 'The credentials provided were not correct.'};
					return done(error, false); // NLS
					}
				});
			}
    	));

	};

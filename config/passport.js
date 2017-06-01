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
		User.findById(id, function(err, user) {
			done(err, user);
			});
		});

	/* ***************************************
	 *  LOCAL LOGIN Strategy
	 *************************************** */
    passport.use('local-login', new passportLocal(
    	{passReqToCallback : true},

    	function(req, username, password, done) {
    		console.log('passport - local-login, called.');
    		User.findOne({username: username}, function(err, user) {
				if (err) {return done(err);}

				if (user) {
					if (User.validatePassword(password)) {
						return done(null, user);
					} else {
						console.log('Password provided was incorrect.');
						return done(new Error('The credentials provided were not correct.'), false); // NLS
						}
				} else {
					console.log('User for the user name ' + username + ' was not found.');
					return done(new Error('The credentials provided were not correct.'), false); // NLS
					}
				});
			}
    	));

	};

/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
module.exports = function(log, User, parallel) {

    function getUsers(req, res) {
        log.debug('userHandler - getUsers, called.');
        User.User.find({}, function(err, users) {
            if (err) {
                res.status(500).send('Error finding users, message: ' + err.message);
                return;
                }

            if (users) {
                res.status(200).send(users);
                return;
            } else {
                res.status(404).send('No users found.');
                return;
                }
            });
        }

    function getUser(req, res) {
        log.debug('userHandler - getUser, called.');
        log.debug('userHandler - getUser, id: ' + req.user.id);
        User.User.findById(req.user.id, function(err, user) {
            if (err) {
                res.status(500).send('Error finding user, message: ' + err.message);
                return;
                }

            if (user) {
                res.status(200).send(user);
                return;
            } else {
                res.status(404).send('The user requested was not found.');
                return;
                }
            });
        }

    function getUserById(req, res) {
        log.debug('userHandler - getUserById, called.');
        log.debug('userHandler - getUserById, id: ' + req.params.id);
        User.User.findById(req.params.id, function(err, user) {
            if (err) {
                res.status(500).send('Error finding user, message: ' + err.message);
                return;
                }

            if (user) {
                res.status(200).send(user);
                return;
            } else {
                res.status(404).send('The user requested was not found.');
                return;
                }

            });
        }

	function putUser(req, res) {
        log.debug('userHandler - putUser, called.');
        log.debug('userHandler - putUser, name: ' + req.body.name.first + ' ' + req.body.name.last + ', username: ' + req.body.username + ', email: ' + req.body.email + ', role: ' + req.body.role);
		User.User.findById(req.params.id, function(err, user) {
            if (err) {
                log.error('userHandler - putUser, error finding user: ' + err.message);
                res.status(500).send('Error finding user, message: ' + err.message);
                return;
                }

            if (user) {
				// Validate required input values
                log.debug('userHandler - putUser, checking user values provided.');
				if ((req.body.name.first === 'undefined') || (req.body.name.last === 'undefined')) {
					res.status(400).send('A first and last name are required.'); // NLS
					return;
				} else if (req.body.username === 'undefined') {
					res.status(400).send('A user name is required.'); // NLS
					return;
				} else if (req.body.email === 'undefined') {
					res.status(400).send('An e-mail address is required.'); // NLS
					return;
				} else if (req.body.role === 'undefined') {
					res.status(400).send('A user role is required.'); // NLS
					return;
					}

                // Check the role is valid
				if (!User.validateRole(req.body.role)) {
                    log.error('userHandler - putUser, not a valid user role.');
					res.status(400).send('The user role provided is invalid.'); // NLS
					return;
					}

				// Validate unique input values
                parallel({
                    username: function(done) {
                        log.debug('userHandler - putUser, is the user name changed?');
                        if (req.body.username !== user.username) {
        					User.User.findOne({username: req.body.username}, function(err, user) {
        						if (err) {
                                    log.error('userHandler - putUser, error finding user by username: ' + err.message);
                                    done('Error checking username, message: ' + err.message, null);
        							//res.status(500).send('Error checking username, message: ' + err.message); // NLS
        							//return;
        						} else {
        							if (user) {
                                        log.debug('userHandler - putUser, username is in use.');
                                        done('The selected username is in use.', user);
        								//res.status(400).send('The selected username is in use.'); // NLS
        								//return;
        							} else {
                                        done(null, null);
                                        }
        							}
        						});
        				} else {
                            done(null, null);
                            }
                        },
                    email: function(done) {
                        log.debug('userHandler - putUser, is the email changed?');
                        if (req.body.email !== user.email) {
        					User.User.findOne({email: req.body.email}, function(err, user) {
        						if (err) {
                                    log.error('userHandler - putUser, error finding user by email: ' + err.message);
                                    done('Error checking email, message: ' + err.message, null);
        							//res.status(500).send('Error checking email, message: ' + err.message); // NLS
        							//return;
        						} else {
        							if (user) {
                                        log.debug('userHandler - putUser, email is already in use.');
                                        done('The selected email is in use.', user);
        								//res.status(400).send('The selected e-mail address is in use.'); // NLS
        								//return;
        							} else {
                                        done(null, null);
                                        }
        							}
        						});
                        } else {
                            done(null, null);
                            }
                        }
                    },
                function(err, results) {
                    if (err) {
                        log.error('userHandler - putUser, parallel done, we got an error');
                        for (var i = 0; i < results.length; i++) {
                            if (results[i] !== null) {
                                log.error('userHandler - putUser, parallel done, we got a result so it is a dupe.');
                                res.status(400).send(err.message);
                                return;
                                }
                            }
                        log.error('userHandler - putUser, parallel done, we got no results so it is a db error.');
                        res.status(500).send(err.message); // NLS
                        return;
                        }
                    });

                log.debug('userHandler - putUser, User is name: ' + user.name.first + ' ' + user.name.last + ', username: ' + user.username + ', email: ' + user.email + ', role: ' + user.role);
				// Ok Validation passed let's update the user
                log.debug('userHandler - putUser, updating user values.');
				user.name.first = req.body.name.first;
				user.name.last = req.body.name.last;
				user.username = req.body.username;
				user.email = req.body.email;
				user.organisation = req.body.organisation;
				user.role = req.body.role;

                log.debug('userHandler - putUser, saving the user.');
				user.save(function (err) {
					if (err) {
                        log.error('userHandler - putUser, error saving user updates: ' + err.message);
						res.status(500).send('Error saving the user details, message: ' + err.message);
						return;
					} else {
                        log.debug('userHandler - putUser, done!');
						res.sendStatus(200);
						return;
						}
					});

            } else {
                log.error('userHandler - putUser, requested user was not found.');
                res.status(404).send('The user requested was not found.');
                return;
                }
            });
		}

	function deleteUser(req, res) {
        log.debug('userHandler - deleteUser, called.');
		User.User.findById(req.params.id, function(err, user) {
            if (err) {
                res.status(500).send('Error finding user to delete, message: ' + err.message);
                return;
                }

            if (user) {
                user.remove(function(err) {
					if (err) {
						res.status(500).send('Error deleting user, message: ' + err.message);
		                return;
					} else {
						res.sendStatus(200);
						return;
                        }
                    });
            } else {
                res.status(404).send('The user requested was not found.');
                }
            });
		}

	return 	{
            getUsers:       getUsers,
            getUser:	    getUser,
            getUserById:	getUserById,
            putUser:	    putUser,
            deleteUser:     deleteUser
            };
	};

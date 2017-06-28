/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
module.exports = function(User, parallel) {

    function getUsers(req, res) {
        console.log('userHandler - getUsers, called.');
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
        console.log('userHandler - getUser, called.');
        console.log('userHandler - getUser, id: ' + req.user.id);
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
        console.log('userHandler - getUserById, called.');
        console.log('userHandler - getUserById, id: ' + req.params.id);
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
        console.log('userHandler - putUser, called.');
        console.log('userHandler - putUser, name: ' + req.body.name.first + ' ' + req.body.name.last + ', username: ' + req.body.username + ', email: ' +req.body.email);
		User.User.findById(req.params.id, function(err, user) {
            if (err) {
                console.log('userHandler - putUser, error finding user: ' + err.message);
                res.status(500).send('Error finding user, message: ' + err.message);
                return;
                }

            if (user) {
				// Validate required input values
                console.log('userHandler - putUser, checking user values provided.');
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
                    console.log('userHandler - putUser, not a valid user role.');
					res.status(400).send('The user role provided is invalid.'); // NLS
					return;
					}

				// Validate unique input values
                parallel({
                    username: function(done) {
                        console.log('userHandler - putUser, is the user name changed?');
                        if (req.body.username !== user.username) {
        					User.User.findOne({username: req.body.username}, function(err, user) {
        						if (err) {
                                    console.log('userHandler - putUser, error finding user by username: ' + err.message);
                                    done('Error checking username, message: ' + err.message, null);
        							//res.status(500).send('Error checking username, message: ' + err.message); // NLS
        							//return;
        						} else {
        							if (user) {
                                        console.log('userHandler - putUser, username is in use.');
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
                        console.log('userHandler - putUser, is the email changed?');
                        if (req.body.email !== user.email) {
        					User.User.findOne({email: req.body.email}, function(err, user) {
        						if (err) {
                                    console.log('userHandler - putUser, error finding user by email: ' + err.message);
                                    done('Error checking email, message: ' + err.message, null);
        							//res.status(500).send('Error checking email, message: ' + err.message); // NLS
        							//return;
        						} else {
        							if (user) {
                                        console.log('userHandler - putUser, email is already in use.');
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
                        console.log('userHandler - putUser, parallel done, we got an error');
                        for (var i = 0; i < results.length; i++) {
                            if (results[i] !== null) {
                                console.log('userHandler - putUser, parallel done, we got a result so it is a dupe.');
                                res.status(400).send(err.message);
                                return;
                                }
                            }
                        console.log('userHandler - putUser, parallel done, we got no results so it is a db error.');
                        res.status(500).send(err.message); // NLS
                        return;
                        }
                    });

                console.log('userHandler - putUser, User is name: ' + user.name.first + ' ' + user.name.last + ', username: ' + user.username + ', email: ' + user.email);
				// Ok Validation passed let's update the user
                console.log('userHandler - putUser, updating user values.');
				user.name.first = req.body.name.first;
				user.name.last = req.body.name.last;
				user.username = req.body.username;
				user.email = req.body.email;
				user.organisation = req.body.organisation;
				user.role = req.body.role;

                console.log('userHandler - putUser, saving the user.');
				user.save(function (err) {
					if (err) {
                        console.log('userHandler - putUser, error saving user updates: ' + err.message);
						res.status(500).send('Error saving the user details, message: ' + err.message);
						return;
					} else {
                        console.log('userHandler - putUser, done!');
						res.sendStatus(200);
						return;
						}
					});

            } else {
                console.log('userHandler - putUser, requested user was not found.');
                res.status(404).send('The user requested was not found.');
                return;
                }
            });
		}

	function deleteUser(req, res) {
        console.log('userHandler - deleteUser, called.');
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

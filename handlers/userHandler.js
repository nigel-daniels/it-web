
module.exports = function(User) {

    function getUser(req, res) {
        User.findById(req.params.id, function(err, user) {
            if (err) {
                res.status(500).send('Error finding user, message: ' + err.message);
                return;
            } else {
                if (user) {
                    res.status(200).send(user);
                } else {
                    //console.log('GET /assets/' + req.params[0] + ' not found');
                    res.status(404).send('The user requested was not found.');
                    }
                }
            });
        }

	function putUser(req, res) {
		User.findById(req.params.id, function(err, user) {
            if (err) {
                res.status(500).send('Error finding user, message: ' + err.message);
                return;
            } else {
                if (user) {
					// Validate required input values
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

					// Validate unique input values
					if (req.body.username !== user.username) {
						User.findOne(req.body.username, function(err, user) {
							if (err) {
								res.status(500).send('Error checking username, message: ' + err.message); // NLS
								return;
							} else {
								if (user) {
									res.status(400).send('The selected username is in use.'); // NLS
									return;
									}
								}
							});
						}

					if (req.body.email !== user.email) {
						User.findOne(req.body.email, function(err, user) {
							if (err) {
								res.status(500).send('Error checking email, message: ' + err.message); // NLS
								return;
							} else {
								if (user) {
									res.status(400).send('The selected e-mail address is in use.'); // NLS
									return;
									}
								}
							});
						}

					// Check the role is valid
					if (!User.validateRole(req.body.role)) {
						res.status(400).send('The user role provided is invalid.'); // NLS
						return;
						}

					// Ok Validation passed let's update the user
					user.name.first = req.body.name.first;
					user.name.last = req.body.name.last;
					user.username = req.body.username;
					user.email = req.body.email;
					user.organisation = req.body.organisation;
					user.role = req.body.role;

					user.save(function (err) {
						if (err) {
							res.status(500).send('Error saving the user details, message: ' + err.message);
							return;
						} else {
							res.sendStatus(200);
							return;
							}
						});

                } else {
                    res.status(404).send('The user requested was not found.');
                    }
                }
            });
		}

	function deleteUser(req, res) {
		User.findById(req.params.id, function(err, user) {
            if (err) {
                res.status(500).send('Error finding user to delete, message: ' + err.message);
                return;
            } else {
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
                }
            });
		}

	return 	{
            getUser:	getUser,
            putUser:	putUser,
            deleteUser:	deleteUser
            };
	};

module.exports = function(User) {

    function signup(req, res) {
        console.log('authenticationHandler - signup, called.');
        // Check we do have a user name and password
        console.log('req body: ' + JSON.stringify(req.body));
        if (!req.body.username) {
            res.status(400).send('The user name is required.');
            return;
            }

         if (!req.body.password) {
            res.status(400).send('The password is required.');
            return;
            }

        // Check the user does not already exist
        console.log('authenticationHandler - signup, checking for user ' +  req.body.username + ' existance.');
        User.User.findOne({username: req.body.username}, function(err, user) {
            if (err) {
                res.status(500).send('Error finding user, message: ' + err.message);
                return;
                }

            if (user) {
                console.log('authenticationHandler - signup, user name already exists.');
                res.status(400).send('The user name ' + req.body.username + ' is in use.');
                return;
            } else {
                console.log('authenticationHandler - signup, user name is free.');
                // Ok now let's validate the required fields are here
                if ((!req.body.first) || (!req.body.last)) {
                    res.status(400).send('A first and last name are required.');
                    return;
                } else if (req.body.email === 'undefined') {
                    res.status(400).send('An e-mail address is required.');
                    return;
                    }

                // Now check the email is unique
                User.User.findOne({email: req.body.email}, function(err, user) {
                    if (err) {
                        res.status(500).send('Error validating user email, message: ' + err.message);
                        return;
                        }

                    if (user) {
                        res.status(400).send('An account exists with this email address.');
                        return;
                    } else {
                        // Let's set the user account as a regular user... Unless it is account 1
                        User.User.count({}, function(err, count) {
                            if (err) {
                                res.status(500).send('Error checking user count, message: ' + err.message);
                                return;
                                }

                            var role = count === 0 ? User.Role.ADMIN : User.Role.USER;

                            console.log('authenticationHandler - signup, user data is valid, creating user.');
                            // Ok Validation passed let's create the user
                            var user = new User.User({
                                            name: 			{
                                                            first: req.body.first,
                                                            last: req.body.last
                                                            },
                                            username:		req.body.username,
                                            password:		User.generateHash(req.body.password),
                                            email:			req.body.email,
                                            organisation: 	req.body.organisation,
                                            role:			role
                                            });

                            // Ok let's persist the user
                            console.log('authenticationHandler - signup, saving user.');
                            user.save(function(err) {
                                if (err) {
                                    res.status(500).send('Error saving user, message: ' + err.message);
                                    return;
                                } else {
                                    console.log('authenticationHandler - signup, user saved.');
                                    res.sendStatus(200);
                                    }
                                });
                            });
                        }
                    });
                }
            });
        }

    function login(req, res) {
        console.log('authenticationHandler - login, called.');
        res.sendStatus(200);
        }

    function authenticate(req, res) {
        console.log('authenticationHandler - authenticate, called.');
        if (req.isAuthenticated()) {
            console.log('authenticationHandler - authenticate, ok.');

            res.sendStatus(200);
        } else {
            console.log('authenticationHandler - authenticate, not ok.');
            res.sendStatus(401);
            }
        }

    function forgotPassword(req, res) {}

    function changePassword(req, res) {}

    function logout(req, res) {
        console.log('authenticationHandler - authenticate, called.');
		req.session.destroy();
		req.logout();
		res.redirect('/#login');
        }

    function isAuthenticated(req, res, next) {
            console.log('authenticationHandler - isAuthenticated, called.');
            if (req.isAuthenticated()) {return next();}
            res.redirect('/');
            };

    return {
        signup:             signup,
        login:              login,
        authenticate:       authenticate,
        forgotPassword:     forgotPassword,
        changePassword:     changePassword,
        logout:             logout,
        isAuthenticated:    isAuthenticated
        }
    };

/**
 * Copyright (c) 2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
module.exports = function(log, User, nodemailer, mailConfig) {

    function signup(req, res) {
        log.debug('authenticationHandler - signup, called.');
        // Check we do have a user name and password
        log.debug('req body: ' + JSON.stringify(req.body));
        if (!req.body.username) {
            res.status(400).send('The user name is required.');
            return;
            }

         if (!req.body.password) {
            res.status(400).send('The password is required.');
            return;
            }

        // Check the user does not already exist
        log.debug('authenticationHandler - signup, checking for user ' +  req.body.username + ' existance.');
        User.User.findOne({username: req.body.username}, function(err, user) {
            if (err) {
                res.status(500).send('Error finding user, message: ' + err.message);
                return;
                }

            if (user) {
                log.error('authenticationHandler - signup, user name already exists.');
                res.status(400).send('The user name ' + req.body.username + ' is in use.');
                return;
            } else {
                log.debug('authenticationHandler - signup, user name is free.');
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

                            log.debug('authenticationHandler - signup, user data is valid, creating user.');
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
                            log.debug('authenticationHandler - signup, saving user.');
                            user.save(function(err) {
                                if (err) {
                                    res.status(500).send('Error saving user, message: ' + err.message);
                                    return;
                                } else {
                                    log.debug('authenticationHandler - signup, user saved.');
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
        log.debug('authenticationHandler - login, called.');
        res.sendStatus(200);
        }

    function authenticate(req, res) {
        log.debug('authenticationHandler - authenticate, called.');
        if (req.isAuthenticated()) {
            log.debug('authenticationHandler - authenticate, ok.');

            res.sendStatus(200);
        } else {
            log.debug('authenticationHandler - authenticate, not ok.');
            res.sendStatus(401);
            }
        }

    function forgotPassword(req, res) {
        log.debug('authenticationHandler - forgotPassword, called.');
        var resetPasswordUrl = 'https://' + req.headers.host + '/reset';

        log.debug('authenticationHandler - forgotPassword, finding user.');
        User.User.findOne({username: req.body.username}, function(err, user) {
            if (err) {
                log.error('authenticationHandler - forgotPassword, finding user err: ' + err.message);
                res.status(500).send({message: 'Error finding user, message: ' + err.message});
                return;
                }

            if (user) {
                log.debug('authenticationHandler - forgotPassword, found user.');
                resetPasswordUrl += '/?id=' + user._id;

                log.debug('authenticationHandler - forgotPassword, creating smtpTransport.');
                var smtpTransport = nodemailer.createTransport(mailConfig);

                var mailOpts =  {
                                from:		'no.reply@initiatethinking.com',
                                to:			user.email,
                                subject:	'Initiate Thinking Demo App - Password Request',
                                text:		'Please use this link to reset your password: ' + resetPasswordUrl
                                };

                log.debug('authenticationHandler - forgotPassword, sending email.');
                smtpTransport.sendMail(mailOpts, function(err, info) {
                    if (err) {
                        res.status(500).send({message: 'Error sending e-mail: ' + err.message}); // NLS
                        return;
                        }

                    log.debug('authenticationHandler - forgotPassword, email sent ok.');
                    res.sendStatus(200);
                    return;
                    });
            } else {
                log.error('authenticationHandler - forgotPassword, user ' + req.body.username + ' not found');
                res.status(404).send({message: 'That user could not be found.'});
                return;
                }
            });
        }

    function getResetPage(req, res) {
        log.debug('authenticationHandler - getResetPage, called');
		log.debug('authenticationHandler - getResetPage, id: ' + req.query.id);
        res.redirect('/#reset/' + req.query.id);
        }

    function resetPassword(req, res) {
        log.debug('authenticationHandler - resetPassword, called.');
        User.User.findById(req.body.id, function(err, user) {
            if (err) {
                res.status(500).send('Error finding user, message: ' + err.message);
                return;
            } else {
                if (user) {
                    if (req.body.password) {
                        User.updatePassword(user._id, req.body.password, function(err) {
                            if (err) {
                                res.status(500).send('Error updating password, message: ' + err.message);
                                return;
                                }

                            res.sendStatus(200);
                            return;
                            });
                    } else {
                        res.status(400).send('No password provided.');
                        return;
                        }
                } else {
                    res.status(404).send('The user requested was not found.');
                    return;
                    }
                }
            });
        }

    function logout(req, res) {
        log.debug('authenticationHandler - logout, called.');
		req.session.destroy();
		req.logout();
		res.redirect('/#login');
        }

    function isAuthenticated(req, res, next) {
        log.debug('authenticationHandler - isAuthenticated, called.');
        if (req.isAuthenticated()) {
            log.debug('authenticationHandler - isAuthenticated, ok.');
            return next();
            }

        log.debug('authenticationHandler - isAuthenticated, not ok.');
        res.redirect('/');
        }

    return {
        signup:             signup,
        login:              login,
        authenticate:       authenticate,
        forgotPassword:     forgotPassword,
        getResetPage:       getResetPage,
        resetPassword:      resetPassword,
        logout:             logout,
        isAuthenticated:    isAuthenticated
        };
    };

/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
module.exports = function(log, mongoose, bcrypt) {
	var SALT_ROUNDS = 10;

	var Role = 	{
				USER:	0,
             	ADMIN:	1
             	};

	// Create the Mongoose Schema
	var UserSchema = new mongoose.Schema({
            name: 			{
                        	first:	{type: String},
                        	last:	{type: String}
                        	},
            username:   	{type: String, unique: true, required: true},
            password:		{type: String, required: true},
			email:			{type: String, unique: true, required: true},
            organisation:	{type: String},
			role:			{type: Number, default: Role.USER}
			});

	UserSchema.methods.validatePassword = function(password, callback) {
		log.debug('UserSchema - validatePassword, called.');
		return bcrypt.compareSync(password, this.password);
		};

	// Set up the model
	var User = mongoose.model('User', UserSchema);

	var validateRole =	function(value) {
							log.debug('User - validateRole, called.');
							return (value == Role.USER || value == Role.ADMIN);
							};

	var generateHash = 	function(password) {
							log.debug('User - generateHash, called.');
							return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS), null);
							};

	var updatePassword = function(id, newPassword, callback) {
							log.debug('User - updatePassword, called');
							User.update({_id: id}, {password: this.generateHash(newPassword)}, callback);
							};

	return 	{
			User: 			User,
			Role:			Role,

			validateRole:	validateRole,
			generateHash:	generateHash,
			updatePassword:	updatePassword
			};
	};

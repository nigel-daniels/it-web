/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 */
// Copy in your particulars and rename this to mail.js
module.exports = {
  host: 		'example.com',
  port: 		465,
  secure:		true,
  auth: 		{
	  			user: 'no.reply@example.com',
			    pass: 'myPassword'
			  	},
  ignoreTLS: 	true,
  tls: 			{rejectUnauthorized: false},
  debug: 		false
};

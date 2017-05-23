/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 */
module.exports = {
	//port:		443,					// Application ssl port number
	//devPort:	1443,					// Application ssl port number for dev work
	port:			80,					// Application port number
	devPort:		3000,				// Application port number for dev work
	log:			'combined',			// Level used by morgan
	logVerbose:		false,				// Verbose used by file-stream-rotator
	logFreq:		'daily',			// Frequency used by file-stream-rotator
	sessionKey:		'd9jk£4jas$lddh',	// Key used by session
	urlEncodeMax:	'1Mb',				// Limit on form submissions
	jsonMax:		'1Mb',				// Limit on JSON submissions
	shutdownTimout:	61					// Seconds to allow for the connection pool to close
};

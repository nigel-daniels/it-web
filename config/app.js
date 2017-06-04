/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 */
module.exports = {
	port:			443,				// Application ssl port number
	devPort:		3000,				// Application port number
	log:			'combined',			// Level used by morgan
	logVerbose:		false,				// Verbose used by file-stream-rotator
	logFreq:		'daily',			// Frequency used by file-stream-rotator
	urlEncodeMax:	'1Mb',				// Limit on form submissions
	jsonMax:		'1Mb',				// Limit on JSON submissions
	shutdownTimout:	60,					// Seconds to allow for the connection pool to close
	defaultEnv:		'development'		// This is the default env to use unless one was set
};

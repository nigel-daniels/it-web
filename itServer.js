/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 */

// express and middleware dependencies.
var express 		= require('express');
var jsxEngine		= require('express-react-views').createEngine();
var path 			= require('path');
var fs				= require('fs');

var https			= require('https');
var session			= require('express-session');
var request			= require('request-json');
var bodyParser 		= require('body-parser');
var cookieParser 	= require('cookie-parser');
var favicon 		= require('serve-favicon');

// Persistence dependanices
var logger			= require('morgan');
var mongoose 		= require('mongoose');

// login dependanices
var passport 		= require('passport');
var passportLocal 	= require('passport-local').Strategy;
var bcrypt			= require('bcrypt-nodejs');

// Email dependancies
var nodemailer		= require('nodemailer');


// Load configuration files
var config = {
	app:	require(__dirname + '/config/app'),
	db:		require(__dirname + '/config/db'),
	mail:	require(__dirname + '/config/mail')
	};

// Set the environment setting we are using
var env = !process.env.NODE_ENV ? config.app.defaultEnv : process.env.NODE_ENV;
var dbURI = !process.env.MONGO_URL ? config.db.mongourl : process.env.MONGO_URL;

// Set the application and the variables it uses
var app 			= express();			// This app
var port 			= config.app.devPort;	// The default port for the app
var shutdown		= false;				// Flag to see if we are shutting down
var startup			= true;

// Intercept any connections while we are starting up
app.use(function (req, res, next) {
	if (!startup) return next();

	res.setHeader('Connection', 'close');
	res.status(503).send('Service is in the process of starting.');
	});

// Set the environment specific variables
if(env === 'production') {
	// If we are running in production mode then use the log directory
	var logDir = path.join(__dirname, 'log');
	if(!fs.existsSync(logDir)) {fs.mkdirSync(logDir);}

	var appLogStream = fsRotator.getStream({
		filename:	path.join(logDir, 'it-%DATE%.log'),
		frequency:	config.app.logFreq,
		verbose:	config.app.logVerbose
		});

	app.use(logger(config.app.log, {stream: appLogStream}));

	// Set the prot to the dev port
	port = config.app.port;
	}

// MONGO DB Setup
// connect to the db


//log.info('MongoDB URI: ' + dbURI);
mongoose.connect(dbURI);/*, function onMongooseError(err) {
	if (err) {
		console.log('Error connecting to MongoDB ' + JSON.stringify(err));
		throw err;
		}
	});*/


// Now configure the application
app.use(favicon(__dirname + '/images/favicon.ico'));
app.use(cookieParser());			// Read cookies (needed for auth)
app.use(bodyParser.urlencoded({		// Needed for html forms
	limit: config.app.urlEncodeMax, extended: false
	}));
app.use(bodyParser.json({			// Stop over stuffing of JSON
	limit: config.app.jsonMax
	}));


//Load the app specific data models
var models = {
	User: 			require(__dirname + '/models/User')(mongoose, bcrypt, nodemailer, config),
	//Asset: 						require(__dirname + '/models/Asset')(client, mongoose),
	//KeywordGroups:				require(__dirname + '/models/KeywordGroups')(oracledb, config),
	//GroupKeywordsInAGroup:		require(__dirname + '/models/GroupKeywordsInAGroup')(oracledb, config),
	};


// Load the app specific business logic
var handlers = {
	userHandler:			require(__dirname + '/handlers/userHandler')(models.User),
	authenticationHandler:	require(__dirname + '/handlers/authenticationHandler')(models.User)
	};


// Now load the passport config (it needs the user data model
config.passport = require(__dirname + '/config/passport')(passport, passportLocal, models.User);

// configure the stuff for passport auth
app.use(session({
	secret:				config.app.sessionKey,
	resave:				true,		// TODO Does the passport store implement touch? if not and there is a short expire set to true
	saveUninitialized:	false		// Set to false to comply with cookie laws
	}));
app.use(passport.initialize());
app.use(passport.session());


// Load the routes we are going to use
require(__dirname + '/routes/authentication')(app, handlers, passport);
require(__dirname + '/routes/users')(app, handlers);

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// Capture requests to shotdown and do it cleanly
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Check if we are shutting down if we are respond nicely
app.use(function (req, res, next) {
	if (!shutdown) return next();

	res.setHeader('Connection', 'close');
	res.status(503).send('Service is in the process of closing.');
	});

// Log all of the requests
if (env === 'development') {
	app.get('*', function(req, res, next) {
		console.log('itServer - get, req.url :' + req.url);
		next();
		});
	app.post('*', function(req, res, next) {
		console.log('itServer - post, req.url :' + req.url);
		next();
		});
	app.put('*', function(req, res, next) {
		console.log('itServer - put, req.url :' + req.url);
		next();
		});
	app.delete('*', function(req, res, next) {
		console.log('itServer - del, req.url :' + req.url);
		next();
		});
	}

// Now define the starting API
app.get('/', function(req, res) {
	console.log('itServer - / called, serving index.')
	res.render('index.jsx'); // removed {layout: false} parameter
	});


// Now set up for https
var privateKey	= fs.readFileSync(__dirname + '/config/it-test-key.pem');
var certificate = fs.readFileSync(__dirname + '/config/it-test-crt.crt');


// Finally start the server
https.createServer({key: privateKey, cert: certificate}, app).listen(port, function(){
	startup = false;
	console.log('IT Demo App, listening on port ' + port);
	});


// On a shutdown request clean up nicely
function cleanup () {
	shutdown = true;

	server.close( function () {
	    console.log('itServer - cleanup : shutting down.');
		mongoose.disconnect();
		process.exit();
		});

	setTimeout(function () {
		console.error("itServer - cleanup : timed out, forcing shut down.");
		process.exit(1);
		}, config.app.shutdownTimout * 1000);
	}

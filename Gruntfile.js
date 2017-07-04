/**
 * Copyright 2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
module.exports = function(grunt) {

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-auto-install');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express-server');

	// Project configuration.
	grunt.initConfig({

		pkg: 		grunt.file.readJSON('package.json'),

		appPath:	'public',

		jsxPath:	'jsx',

		buildPath:	'build',

		distPath:	'dist/<%= pkg.name %>_<%= pkg.version %>',

		clean:		{
					build:	['<%= jsxPath %>', '<%= buildPath %>'],
					dist:	['<%= distPath %>'],
					all:	['<%= jsxPath %>', '<%= buildPath %>', '<%= distPath %>']
					},

		babel:		{
					buildApp: 	{
								files: 	[{
										expand: true,
										cwd: '<%= appPath %>/js/',
										src: 'views/**/*.jsx',
										dest: '<%= jsxPath %>',
										ext: '.js'
										}]
								}
					},

		copy:		{
					buildServ:	{
								files:	[
										{expand: true, cwd: './', src: ['package.json'], dest: '<%= distPath %>/'},
										{expand: true, cwd: './', src: ['itServer.js'], dest: '<%= distPath %>/'},
										//{expand: true, cwd: './', src: ['node_modules/requirejs/**'], dest: '<%= distPath %>/'},
										{expand: true, cwd: './', src: ['images/*.ico'], dest: '<%= distPath %>/'},
										{expand: true, cwd: './', src: ['config/*.js'], dest: '<%= distPath %>/'},
										{expand: true, cwd: './', src: ['handlers/*.js'], dest: '<%= distPath %>/'},
										{expand: true, cwd: './', src: ['models/*.js'], dest: '<%= distPath %>/'},
										{expand: true, cwd: './', src: ['routes/*.js'], dest: '<%= distPath %>/'},
										{expand: true, cwd: './', src: ['views/**/*.jsx'], dest: '<%= distPath %>/'}
										]
								},
					buildApp:	{
								options:{
										process: function (content, srcpath) {
											if (!srcpath.startsWith('public/js/node_modules') && srcpath.endsWith('.js')) {
    											return content.replace(/jsx!/g, '');
											} else {
												return content;
												}
  											}
										},
								files:	[
										{expand: true, cwd: '<%= jsxPath %>/views/', src: ['**'], dest: '<%= buildPath %>/<%= appPath %>/js/views/'},
										{expand: true, cwd: '<%= appPath %>/js/', src: ['*.js'], dest: '<%= buildPath %>/<%= appPath %>/js/'},
										{expand: true, cwd: '<%= appPath %>/js/node_modules/', src: ['**'], dest: '<%= buildPath %>/<%= appPath %>/js/node_modules/'},
										{expand: true, cwd: '<%= appPath %>/js/views/', src: ['**/*.js'], dest: '<%= buildPath %>/<%= appPath %>/js/views/'},
										{expand: true, cwd: '<%= appPath %>/js/models/', src: ['**/*.js'], dest: '<%= buildPath %>/<%= appPath %>/js/models/'},
										{expand: true, cwd: '<%= appPath %>/css/', src: ['*'], dest: '<%= buildPath %>/<%= appPath %>/css/'}
								      	]
								},
					copyFonts:	{
								files: [{expand: true, cwd: '<%= appPath %>/js/node_modules/font-awesome/fonts/', src: ['*.*'], dest: '<%= distPath %>/public/js/node_modules/font-awesome/fonts/'}]
								}
					},

		imagemin:	{
					buildApp: 	{
								files: [{expand: true, cwd: '<%= appPath %>/media/', src: ['**/*.png'], dest: '<%= buildPath %>/<%= appPath %>/media/' }]
								}
					},

		requirejs:	{
					buildApp:	{
								options: 	{
											appDir:		'<%= buildPath %>/<%= appPath %>',
											baseUrl:	'js',
											dir:		'<%= distPath %>/<%= appPath %>/',
											mainConfigFile: 'public/js/itApp.js',
											modules:	[{
														name: 		'itApp',
														include:	['require']
														}],
											optimize:	'none',//'uglify2',
											optimizeCss:	'standard',
											preserveLicenseComments: false,
											inlineText: 	true,
											removeCombined:	true
											}
								}
					},

		auto_install: 	{
			    		buildServ: {
			      					options: 	{
			        							cwd: '<%= distPath %>',
												stdout: false,
			        							stderr: true,
			        							failOnError: false,
			        							npm: '--production',
			        							bower: false
			      								}
			    					}
			  			}
		});


	// Default task(s).
	grunt.registerTask('buildApp', ['babel:buildApp', 'copy:buildApp', 'imagemin:buildApp', 'requirejs:buildApp', 'copy:copyFonts']);
	grunt.registerTask('buildServ', ['copy:buildServ', 'auto_install:buildServ']);

	grunt.registerTask('default', ['clean:all', 'buildServ', 'buildApp', 'clean:build']);
	};

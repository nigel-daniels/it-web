/**
* Copyright 2017  Initiate Thinking
* Author: Nigel Daniels
*/
require.config({

    paths: {
        require:            'bower_components/requirejs/require',
        lodash:             'bower_components/lodash/dist/lodash',
        jquery:             'bower_components/jquery/dist/jquery',
        bootstrap:          'bower_components/bootstrap/dist/js/bootstrap',
        backbone:           'bower_components/backbone/backbone',
        ie10workaround:     'bower_components/ie10-viewport-bug-workaround/dist/ie10-viewport-bug-workaround',
        react:              'bower_components/react/react-with-addons',
        reactDom:           'bower_components/react/react-dom',
        reactBootstrap:     'bower_components/react-bootstrap/react-bootstrap',
        babel:              'bower_components/requirejs-react-jsx/babel-5.8.34.min',
        jsx:                'bower_components/requirejs-react-jsx/jsx',
        text:               'bower_components/requirejs-text/text',

        app:                'app',
        media:              '../media',

        itView:             'itView'
        },

    map: {
        '*':    {
                'underscore':	'lodash'
                }
        },

    shim: {
        backbone:       {
                        deps:		['underscore', 'jquery'],
                        exports:    'Backbone'
                        },
        ie10workaround:	{
                        deps: 		['bootstrap'],
                        exports:	'ie10workaround'
                        },
        react:          {
                        exports:    'React'
                        },
        reactBootstrap: {
                        deps:       ['react']
                        },
        bootstrap:      {
                        deps: 		['jquery'],
                        exports:	'bootstrap'
                        },
        jsx:            {
                        deps:       ['babel', 'text']
                        },
        itInit:         {
                        deps: 	['bootstrap', 'ie10workaround', 'backbone',
                                'react', 'reactDom', 'jsx']
                        }
        },

    config: {
        babel:  {
                sourceMaps:     'inline',
                fileExtension:  '.jsx'
                }
            }

    });

require(['./itInit'], function(itInit) {
    console.log('itApp function, calling itInit.initialize.');
    itInit.initialize();
    });

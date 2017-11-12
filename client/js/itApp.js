/**
* Copyright 2017  Initiate Thinking
* Author: Nigel Daniels
* MIT Licensed
*/
require.config({

    paths: {
        require:            'node_modules/requirejs/require',
        lodash:             'node_modules/lodash/lodash',
        jquery:             'node_modules/jquery/dist/jquery',
        bootstrap:          'node_modules/bootstrap/dist/js/bootstrap',
        backbone:           'node_modules/backbone/backbone',
        ie10workaround:     'node_modules/ie10-viewport-bug-workaround.js/ie10-viewport-bug-workaround',
        react:              'node_modules/react/dist/react-with-addons',
        reactDom:           'node_modules/react-dom/dist/react-dom',
        babel:              'node_modules/requirejs-react-jsx/babel-5.8.34.min',
        jsx:                'node_modules/requirejs-react-jsx/jsx',
        text:               'node_modules/requirejs-text/text',
        notify:             'node_modules/bootstrap-notify/bootstrap-notify',
        validator:          'node_modules/bootstrap-validator/dist/validator',
        modal:              'node_modules/backbone-bootstrap-widgets/src/backbone-modal',

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
        bootstrap:      {
                        deps: 		['jquery'],
                        exports:	'bootstrap'
                        },
        jsx:            {
                        deps:       ['babel', 'text']
                        },
        notify:         {
                        deps:       ['jquery']
                        },
        validator:      {
                        deps:       ['jquery', 'bootstrap']
                        },
        modal:          {
                        deps:       ['backbone', 'bootstrap'],
                        exports:    'Backbone.ModalView'
                        },
        itInit:         {
                        deps: 	['bootstrap', 'ie10workaround', 'backbone',
                                'react', 'reactDom', 'jsx', 'notify',
                                'validator', 'modal']
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

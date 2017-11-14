/**
 * Copyright 2015 Initiate Thinking Limited
 * Author: Nigel Daniels
 * MIT Licensed
 */
var React = require('react');

class IndexLayout extends React.Component{
    render() {
        return (
            <html lang="en">
                <head>
                    <meta charset="utf-8"/>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>

                    <title>Initiate Thinking Base App</title>
                    <link href="/css/itApp.css" rel="stylesheet"/>
                </head>

                <body>
                    <div id="main">
                        {this.props.children}
                    </div>

                    <script id="main-script" type="text/javascript" src="/js/node_modules/requirejs/require.js" data-main="js/itApp" data-env={this.props.env}></script>

                </body>
            </html>
            );
        }
    }

module.exports = IndexLayout;

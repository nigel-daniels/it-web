/**
 * Copyright  2017 Asterion Inc.
 * Author: Nigel Daniels
 */
define(['react', 'reactDom'], function(React, ReactDOM) {
    class MenuView extends React.Component {

        render() {
			return (
				<nav className="navbar navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="https://www.initiatethinking.com/">
                      	        <img alt="Initiate Thinking Logo" src="media/images/LogoSReflect.png" height="30"/>
                            </a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li><a href="#action1">Action 1</a></li>
                                <li><a href="#action2">Action 2</a></li>
                                <li><a href="#action3">Action 3</a></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                                        <span className="caret"></span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#profile">Profile</a></li>
                                        <li role="separator" className="divider"></li>
                                        <li><a href="#admin">Administer</a></li>
                                        <li role="separator" className="divider"></li>
                                        <li><a href="logout">Logout</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
				);
            }
        }

	return MenuView;
    });

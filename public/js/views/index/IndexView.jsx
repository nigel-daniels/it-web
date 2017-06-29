/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
define(['react', 'reactDom', 'itView', 'jsx!views/base/MenuView'],

	function(React, ReactDOM, itView, MenuView) {

		var IndexView = itView.extend({

            el:				$('#main'),

			initialize:		function(options) {
								this.user = options.user;
								this.listenTo(this.user, 'update sort sync', this.render);
								},

            render:         function() {
								console.log('IndexView - render, user: ' + JSON.stringify(this.user));
                                ReactDOM.render(<Index user={this.user.toJSON()}/>, this.el);
                                }
			});


		class Index extends React.Component{
		    render() {
		        return (
					<div>
						<MenuView user={this.props.user}/>
						<div className="content">
							<div id="index-img">
								<img alt="Initiate Thinking Logo" src="media/images/LogoLong.png" height="50%" width="50%"/>
							</div>
						</div>
					</div>
		        	);
				}
			};

	return IndexView;
	});

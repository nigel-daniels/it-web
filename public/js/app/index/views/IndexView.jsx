/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
define(['react', 'reactDom', 'itView', 'jsx!app/base/views/MenuView'],

	function(React, ReactDOM, itView, MenuView) {

		var indexView = itView.extend({

            el:				$('#main'),

            render:         function() {
                                ReactDOM.render(<Index/>, this.el);

                                }
			});


		class Index extends React.Component{
		    render() {
		        return (
					<div>
						<MenuView/>
						<div className="content">
							<div id="index-img">
								<img alt="Initiate Thinking Logo" src="media/images/LogoLong.png" height="50%" width="50%"/>
							</div>
						</div>
					</div>
		        	);
				}
			};

	return indexView;
	});

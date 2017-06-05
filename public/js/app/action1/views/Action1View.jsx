/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
define(['react', 'reactDom', 'itView', 'jsx!app/base/views/MenuView', 'app/action1/models/Action1Model'],

	function(React, ReactDOM, itView, MenuView, Action1Model) {

		var action1View = itView.extend({

            el:				$('#main'),

			initialize:		function() {
								this.model = new Action1Model();
								},

            render:         function() {
                                ReactDOM.render(<Action1 actionModel={this.model.toJSON()}/>, this.el);
                                }
			});


		class Action1 extends React.Component{
		    render() {
				var heading = this.props.actionModel.heading;
				var content = this.props.actionModel.content;

		        return (
					<div>
						<MenuView/>
						<div className='content'>
							<h1 className="page-header">{heading}</h1>
							<div className="lead">{content}</div>
						</div>
					</div>
		        	);
				}
			};

	return action1View;
	});

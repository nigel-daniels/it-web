/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 */
define(['react', 'reactDom', 'itView', 'jsx!app/base/views/MenuView', 'app/action2/models/Action2Model'],

	function(React, ReactDOM, itView, MenuView, Action2Model) {

		var action2View = itView.extend({

            el:				$('#main'),

			initialize:		function() {
								this.model = new Action2Model();
								},

            render:         function() {
                                ReactDOM.render(<Action2 actionModel={this.model.toJSON()}/>, this.el);
                                }
			});


		class Action2 extends React.Component{
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

	return action2View;
	});

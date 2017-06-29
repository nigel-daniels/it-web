/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
define(['react', 'reactDom', 'itView', 'jsx!views/base/MenuView', 'models/Action2Model'],

	function(React, ReactDOM, itView, MenuView, Action2Model) {

		var action2View = itView.extend({

            el:				$('#main'),

			initialize:		function(options) {
								this.model = new Action2Model();
								this.user = options.user;
								this.listenTo(this.user, 'update sort sync', this.render);
								},

            render:         function() {
                                ReactDOM.render(<Action2  user={this.user.toJSON()} actionModel={this.model.toJSON()}/>, this.el);
                                }
			});


		class Action2 extends React.Component{
		    render() {
				var heading = this.props.actionModel.heading;
				var content = this.props.actionModel.content;

		        return (
					<div>
						<MenuView user={this.props.user}/>
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

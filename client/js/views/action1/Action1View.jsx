/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
define(['react', 'reactDom', 'itView', 'jsx!views/base/MenuView', 'models/Action1Model'],

	function(React, ReactDOM, itView, MenuView, Action1Model) {

		var action1View = itView.extend({

            el:				$('#main'),

			initialize:		function(options) {
								this.model = new Action1Model();
								this.user = options.user;
								this.listenTo(this.user, 'update sort sync', this.render);
								},

            render:         function() {
                                ReactDOM.render(<Action1 user={this.user.toJSON()} actionModel={this.model.toJSON()}/>, this.el);
                                }
			});


		class Action1 extends React.Component{
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

	return action1View;
	});

/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
define(['react', 'reactDom', 'itView', 'jsx!views/base/MenuView', 'models/Action3Model'],

	function(React, ReactDOM, itView, MenuView, Action3Model) {

		var action3View = itView.extend({

            el:				$('#main'),

			initialize:		function(options) {
								this.model = new Action3Model();
								this.user = options.user;
								this.listenTo(this.user, 'update sort sync', this.render);
								},

            render:         function() {
                                ReactDOM.render(<Action3  user={this.user.toJSON()} actionModel={this.model.toJSON()}/>, this.el);
                                }
			});


		class Action3 extends React.Component{
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

	return action3View;
	});

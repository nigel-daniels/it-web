/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 * MIT Licensed
 */
define(['react', 'reactDom', 'itView', 'jsx!views/base/MenuView', 'models/AdminModel'],

	function(React, ReactDOM, itView, MenuView, AdminModel) {

		var adminView = itView.extend({

            el:				$('#main'),

			initialize:		function(options) {
								this.model = new AdminModel();
								this.user = options.user;
								this.listenTo(this.user, 'update sort sync', this.render);
								},

            render:         function() {
                                ReactDOM.render(<Admin user={this.user.toJSON()} adminModel={this.model.toJSON()}/>, this.el);
                                }
			});


		class Admin extends React.Component{
		    render() {
				var heading = this.props.adminModel.heading;
				var content = this.props.adminModel.content;

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

	return adminView;
	});

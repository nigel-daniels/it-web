/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 */
define(['react', 'reactDom', 'itView', 'jsx!app/base/views/MenuView', 'app/admin/models/AdminModel'],

	function(React, ReactDOM, itView, MenuView, AdminModel) {

		var adminView = itView.extend({

            el:				$('#main'),

			initialize:		function() {
								this.model = new AdminModel();
								},

            render:         function() {
                                ReactDOM.render(<Admin adminModel={this.model.toJSON()}/>, this.el);
                                }
			});


		class Admin extends React.Component{
		    render() {
				var heading = this.props.adminModel.heading;
				var content = this.props.adminModel.content;

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

	return adminView;
	});

/**
 * Copyright  2017 Initiate Thinking
 * Author: Nigel Daniels
 */
define(['react', 'reactDom', 'itView', 'jsx!app/base/views/MenuView', 'app/profile/models/ProfileModel'],

	function(React, ReactDOM, itView, MenuView, ProfileModel) {

		var profileView = itView.extend({

            el:				$('#main'),

			initialize:		function() {
								this.model = new ProfileModel();
								},

            render:         function() {
                                ReactDOM.render(<Profile profileModel={this.model.toJSON()}/>, this.el);
                                }
			});


		class Profile extends React.Component{
		    render() {
				var heading = this.props.profileModel.heading;
				var content = this.props.profileModel.content;

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

	return profileView;
	});

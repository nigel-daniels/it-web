define(['react', 'reactDom'], function(React, ReactDOM) {
    class UserTable extends React.Component {

        render() {
            var that = this;


            var userRows = this.props.users.map(function (user) {
                var role = user.role == 0 ? 'User' : 'Administrator';

                return(
                    <tr key={user._id}>
                        <td>{user.name.first}</td>
                        <td>{user.name.last}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.organisation}</td>
                        <td>{role}</td>
                        <td>
                            <div className="btn-group btn-group-sm" role="group" aria-label="User controls">
                                <button type="button" className="btn btn-default" data-toggle="modal" data-target="#editUser">
                                    <span className="glyphicon glyphicon-pencil" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Edit user"></span>
                                </button>
                                <button type="button" className="btn btn-default" data-toggle="modal" data-target="#deleteUser">
                                    <span className="glyphicon glyphicon-trash" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Delete user"></span>
                                </button>
                            </div>
                        </td>
                    </tr>
                    );
                });

            return(
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Organisation</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userRows}
                    </tbody>
                </table>
                );
            }
        }

	return UserTable;
    });

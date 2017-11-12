define(['react', 'reactDom'], function(React, ReactDOM) {
    class UserTable extends React.Component {

        userRecord(userId) {
            return userId === this.props.user._id;
            }

        render() {
            var _this = this;

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
                        <td id={user._id}>
                            <div className="btn-group btn-group-sm" role="group" aria-label="User controls">
                                <button type="button" className="btn btn-default editUser" data-toggle="modal" data-target="#editUser" disabled={_this.userRecord(user._id)}>
                                    <span className="glyphicon glyphicon-pencil" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Edit user"></span>
                                </button>
                                <button type="button" className="btn btn-default deleteUser" data-toggle="modal" data-target="#deleteUser" disabled={_this.userRecord(user._id)}>
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

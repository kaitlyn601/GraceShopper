import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../store/allUser';

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.loadAllUsers();
  }

  render() {
    const { users } = this.props;
    return (
      <div className='admin-portal-all-users'>
        <h2>ADMIN PORTAL</h2>

        {this.props.users.length < 1 ? (
          'There are currently no users'
        ) : (
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>
                      <Link className='username' to={`/users/${user.id}`}>
                        {user.username}
                      </Link>
                    </td>
                    <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.users,
    isAdmin: state.auth.isAdmin,
    // added an attribute called 'isAdmin' to our User model. type is BOOL.
    // props.isAdmin conditionally renders AddForm and Delete button
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadAllUsers: () => dispatch(getUsers()),
  };
};

export default connect(mapState, mapDispatch)(AllUsers);

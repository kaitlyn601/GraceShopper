import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../store/allUser";

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.loadAllUsers();
  }

  render() {
    const { users } = this.props;
    return (
      <div id="admin-portal-all-users">
        <br></br>
        <h1>ADMIN PORTAL</h1>
        <br></br>
        <br></br>
        <h1>All Users</h1>
        <br></br>
        <br></br>
        {this.props.users.length < 1 ? (
          "There are currently no users"
        ) : (
          <table>
            <tbody>
              <tr>
                <th>
                  <h1>Username </h1>
                </th>
                <th>
                  <h1>Type</h1>
                </th>
              </tr>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>
                      <Link to={`/users/${user.id}`}>
                        <h2>{user.username}</h2>
                      </Link>
                    </td>
                    <td>
                      <h2>{user.isAdmin ? "Admin" : "User"}</h2>
                    </td>
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

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
      <div>
        {this.props.users.length < 1
          ? "There are currently no users"
          : users.map((user) => {
              return (
                <div key={user.id}>
                  <Link to={`/products/${user.id}`}>
                    <h3>Username {user.username}</h3>
                    <h3>isAdmin{user.isAdmin}</h3>
                  </Link>
                </div>
              );
            })}
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

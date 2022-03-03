import React from "react";
import { connect } from "react-redux";
import { getUser } from "../store/user";

class SingleUser extends React.Component {
  componentDidMount() {
    this.props.loadSingleUser(this.props.match.params.id);
  }
  render() {
    const { user } = this.props;
    if (!user.id) return <div>Loading</div>;
    return (
      <div>
        <h3>Username {user.username}</h3>
        <h3>User Type: {user.isAdmin ? "Admin" : "User"}</h3>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleUser: (id) => dispatch(getUser(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleUser);

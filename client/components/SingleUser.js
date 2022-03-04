import React from "react";
import { connect } from "react-redux";
import { getUser } from "../store/user";

class SingleUser extends React.Component {
  componentDidMount() {
    this.props.loadSingleUser(this.props.match.params.id);
  }
  render() {
    const { user } = this.props;
    const { orders } = user;
    let fulfilledOrders = [];
    if (orders) {
      fulfilledOrders = orders.filter((order) => order.fulfilled);
    }
    console.log("fulfilled", fulfilledOrders);
    console.log("props", this.props.user);
    if (!user.id) return <div>Loading</div>;
    return (
      <div>
        <h3>Username {user.username}</h3>
        <h3>User Type: {user.isAdmin ? "Admin" : "User"}</h3>
        <h3>Past Order:</h3>
        {fulfilledOrders.length < 1
          ? "There are currently no orders"
          : fulfilledOrders.map((order) => {
              return (
                <div key={order.id}>
                  <div>
                    <h3>Order Id: {order.id}</h3>
                    {order.orderitems.map((orderItem) => {
                      return (
                        <div key={orderItem.id}>
                          <h3>Order Item ID: {orderItem.id}</h3>
                          <h3>Quantity: {orderItem.quantity}</h3>
                          <h3>Price: {orderItem.price}</h3>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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

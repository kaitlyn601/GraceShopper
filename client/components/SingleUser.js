import React from "react";
import { connect } from "react-redux";
import { getUser } from "../store/user";
import { Link } from "react-router-dom";

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
      <div id="admin-portal-one-user">
        <br></br>
        <h1>ADMIN PORTAL</h1>
        <br></br>
        <br></br>
        <h1>User: {user.username}</h1>
        <br></br>
        <h2>Type: {user.isAdmin ? "Admin" : "User"}</h2>
        <br></br>
        <h2>Past Orders:</h2>
        <br></br>
        <br></br>
        {fulfilledOrders.length < 1
          ? "There are currently no orders"
          : fulfilledOrders.map((order) => {
              return (
                <div key={order.id}>
                  <div>
                    <h3>Order Id: {order.id}</h3>
                    <h3>Date: {order.createdAt.slice(0, 10)}</h3>
                    <br></br>
                    <table>
                      <tbody>
                        <tr>
                          <th>Product Name</th>
                          <th>Order Item ID</th>
                          <th>Quantity</th>
                          <th>Price</th>
                        </tr>

                        {order.orderitems.map((orderItem) => {
                          return (
                            <tr key={orderItem.id}>
                              <td>
                                <Link to={`/products/${orderItem.productId}`}>
                                  {orderItem.name}
                                </Link>
                              </td>

                              <td>{orderItem.id}</td>
                              <td>{orderItem.quantity}</td>
                              <td>{orderItem.price}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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

import React from 'react';
import { connect } from 'react-redux';
import { getCart } from '../store/cart';

class Cart extends React.Component {
  constructor() {
    super();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId != this.props.userId)
      this.props.getCart(this.props.userId);
  }
  render() {
    let renderedDiv;
    const { cart, userId } = this.props;
    if (userId) {
      renderedDiv = (
        <div>
          {cart.map((cartItem, index) => {
            return (
              <div key={cartItem.id}>
                <h3>ITEM {index}</h3>
                <ul>Product Id: {cartItem.productId}</ul>
                <ul>Quantity: {cartItem.quantity}</ul>
                <ul>Price: {cartItem.price}</ul>
                <button>Delete Item</button>
              </div>
            );
          })}
        </div>
      );
    } else {
      renderedDiv = <div>User is not Logged in!</div>;
    }
    return renderedDiv;
  }
}

const mapState = (state) => {
  return {
    userId: state.auth.id,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCart: (id) => dispatch(getCart(id)),
  };
};

export default connect(mapState, mapDispatch)(Cart);

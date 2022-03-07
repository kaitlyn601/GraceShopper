import React from 'react';
import { connect } from 'react-redux';
import { getCart, deleteFromCart } from '../store/cart';

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
    console.log(cart);
    if (userId) {
      if (cart.length) {
        renderedDiv = (
          <div>
            {cart.map((cartItem) => {
              return (
                <div key={cartItem.id}>
                  <h3>{cartItem.name}</h3>
                  <ul>Product Id: {cartItem.productId}</ul>
                  <ul>Quantity: {cartItem.quantity}</ul>
                  <ul>Price: {cartItem.price}</ul>
                  <button
                    onClick={() => {
                      this.props.deleteFromCart(userId, cartItem.id);
                    }}
                  >
                    Delete Item
                  </button>
                </div>
              );
            })}
          </div>
        );
      } else renderedDiv = <div>Cart is Empty!</div>;
    } else {
      // window.localStorage.removeItem("cart");
      let guestCart = window.localStorage.getItem('cart');
      if (guestCart) {
        const guestCartArray = JSON.parse(guestCart);

        renderedDiv = <div>User is not Logged in!</div>;
      } else {
        renderedDiv = <div>cart is empty</div>;
      }
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
    deleteFromCart: (userId, itemId) =>
      dispatch(deleteFromCart(userId, itemId)),
  };
};

export default connect(mapState, mapDispatch)(Cart);

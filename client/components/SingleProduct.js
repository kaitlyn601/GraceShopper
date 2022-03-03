import React from "react";
import { connect } from "react-redux";
import { getProduct } from "../store/product";
import EditProduct from "./EditProduct";
// added on branch feature/add-to-cart-button :
import { getCart } from "../store/cart";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
    this.IncrementItem = this.IncrementItem.bind(this);
    this.DecrementItem = this.DecrementItem.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }
  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.id);
  }

  handleAddToCart() {
    const { product } = this.props;
    const { cart } = this.props;
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      // USE CART ON STATE
      window.localStorage.removeItem("cart");
      console.log(cart);
    } else {
      // USE LOCAL STORAGE
      let orderItemObj = {
        price: product.price,
        quantity: this.state.quantity,
        productId: product.id,
        // orderId:  No orderId until user account (and a cart) are created in DB
        // id:  an id property will be created by Sequelize automatically, when order-item is instantiated in DB via "OrderItem.create()"
      };
      let guestCartArray;

      let guestCart = window.localStorage.getItem("cart");
      if (guestCart) {
        console.log("we do have a cart", guestCart);
        guestCartArray = JSON.parse(guestCart);
      } else {
        guestCartArray = [];
      }
      guestCartArray.push(orderItemObj);
      let stringifiedCartArray = JSON.stringify(guestCartArray);
      window.localStorage.setItem("cart", stringifiedCartArray);
    }
  }
  // if user is logged in (isLoggedIn), then the add-to-cart handler
  // will add the items to the cart on state (an array)
  // if user is NOT logged in, instead handler will add items to local storage
  // this entails:

  // IF USER IS LOGGED IN  (isLoggedIn), then the add-to-cart handler will:
  // build up a similar object (same shape)
  // except its property .orderId will be this.props.state.cart.id
  // and instead of adding this orderItemObject to an array that gets stringified and stored in localStorage,
  // we'll use a THUNK to create instance of OrderItem in DB, using this object, and also update Redux store
  IncrementItem() {
    this.setState({ quantity: this.state.quantity + 1 });
  }
  DecrementItem() {
    if (this.state.quantity > 1)
      this.setState({ quantity: this.state.quantity - 1 });
  }

  render() {
    const { product } = this.props;
    if (!product.id) return <div>Loading</div>;
    return (
      <div className="single-page-container">
        <div className="top-container">
          <div className="img-container">
            <img src={product.imageURL} />
          </div>
          <div className="info-container">
            <h2>{product.name}</h2>
            <h2>{product.price}</h2>
            <div>
              <label>Quantity</label>
              <button onClick={this.DecrementItem}>-</button>
              {/* <input value={this.state.quantity} /> */}
              <span> {this.state.quantity} </span>
              <button onClick={this.IncrementItem}>+</button>
            </div>

            <button type="button" onClick={this.handleAddToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="description-container">
          <div>
            <h3>DESCRIPTION</h3>
          </div>
          <div>
            <p>{product.description}</p>
          </div>
        </div>
        {this.props.isAdmin ? (
          <EditProduct currentProduct={this.props.product} />
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product,
    isAdmin: state.auth.isAdmin,
    // added on branch feature/add-to-cart-button :
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleProduct: (id) => dispatch(getProduct(id)),
    // added on branch feature/add-to-cart-button :
    getCart: (id) => dispatch(getCart(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);

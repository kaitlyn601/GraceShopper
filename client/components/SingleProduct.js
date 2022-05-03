import React from 'react';
import { connect } from 'react-redux';
import { getProduct } from '../store/product';
import EditProduct from './EditProduct';
// added on branch feature/add-to-cart-button :
import { getCart, addToCart } from '../store/cart';
import toast, { Toaster } from 'react-hot-toast';

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

  // CONVERTING GUEST TO USER -- ACOUNT CREATED AFTER SHOPPING W/ LOCAL STORAGE
  // let currlocal = window.localStorage.getItem("cart")
  // if(isLoggedIn && currlocal){
  // transfer contents of local storage TO this.state.cart
  // for each item in that array (from local storage) instantiate the order-items
  // hit the route to create cart for the current user
  // POST users/:id/cart
  //
  // for each item in array  - assign orderId property to the cart id just created

  // promise.all([guestCartArray])

  // }

  handleAddToCart() {
    const { product, cart, isLoggedIn, addToCart, userId } = this.props;
    if (isLoggedIn) {
      // USE CART ON STATE
      window.localStorage.removeItem('cart');
      let cartItem = {
        name: product.name,
        price: product.price,
        quantity: this.state.quantity,
        productId: product.id,
        imageURL: product.imageURL,
      };
      addToCart(userId, cartItem);
    } else {
      // USE LOCAL STORAGE
      let orderItemObj = {
        name: product.name,
        price: product.price,
        quantity: this.state.quantity,
        productId: product.id,
        image: product.imageURL,
        // orderId:  No orderId until user account (and a cart) are created in DB
        // id:  an id property will be created by Sequelize automatically, when order-item is instantiated in DB via "OrderItem.create()"
      };
      let guestCartArray;

      let guestCart = window.localStorage.getItem('cart');
      toast.success('Added to cart successfully!');
      if (guestCart) {
        console.log('we do have a cart', guestCart);
        guestCartArray = JSON.parse(guestCart);
      } else {
        guestCartArray = [];
      }
      // IF the array already contains an object with that same productId
      // THEN instead, increment the quantity of THAT object
      // ELSE, push the orderItemObj to the array

      let existingItem = guestCartArray.filter(
        (itemObj) => itemObj.productId === product.id,
      )[0];
      if (existingItem) existingItem.quantity += this.state.quantity;
      else guestCartArray.push(orderItemObj);
      //
      let stringifiedCartArray = JSON.stringify(guestCartArray);
      window.localStorage.setItem('cart', stringifiedCartArray);
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
      <div className='single-page-container'>
        <div className='img-container'>
          <img src={product.imageURL} />
        </div>
        <div className='info-container'>
          <h2 className='product-name-single'>{product.name}</h2>
          <h2 className='product-price-single'>${product.price / 100}</h2>
          <p className='description'>{product.description}</p>
          <div className='quantity-container'>
            <label>QUANTITY</label>
            <div className='quantity-btn'>
              <button className='decre' onClick={this.DecrementItem}>
                -
              </button>
              {/* <input value={this.state.quantity} /> */}
              <h5 className='quantity-num'> {this.state.quantity} </h5>
              <button className='incre' onClick={this.IncrementItem}>
                +
              </button>
            </div>
          </div>

          <button
            className='addtobag-btn2'
            type='button'
            onClick={this.handleAddToCart}
          >
            ADD TO BAG
          </button>
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
    addToCart: (id, cartItem) => dispatch(addToCart(id, cartItem)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);

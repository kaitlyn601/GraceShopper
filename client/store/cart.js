import axios from 'axios';
// ACTION TYPE
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';

// ACTION CREATORS
export const _getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};
export const _addToCart = (cartItem) => {
  return {
    type: ADD_TO_CART,
    cartItem,
  };
};

// THUNK CREATORS
export const getCart = (id) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.get(`/api/users/${id}/cart`);
      dispatch(_getCart(cart));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToCart = (id, cartItem) => {
  return async (dispatch) => {
    try {
      const { data: newCartItem } = await axios.post(
        `/api/users/${id}/cart`,
        cartItem
      );
      dispatch(_addToCart(newCartItem));
    } catch (error) {
      console.log(error);
    }
  };
};

// REDUCER
const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_TO_CART:
      return [...state, action.cartItem];
    default:
      return state;
  }
};

export default cartReducer;

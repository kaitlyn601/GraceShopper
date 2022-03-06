import axios from 'axios';
// ACTION CONSTANTS
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_FROM_CART = 'DELETE_FROM_CART';
const EDIT_CART_ITEM = 'EDIT_CART_ITEM';

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

export const _deleteFromCart = (cartItem) => {
  return {
    type: DELETE_FROM_CART,
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

export const deleteFromCart = (userId, itemId) => {
  return async (dispatch) => {
    try {
      const { data: cartItem } = await axios.delete(
        `/api/users/${userId}/cart/${itemId}`
      );
      dispatch(_deleteFromCart(cartItem));
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
    case DELETE_FROM_CART:
      return state.filter((cartItem) => cartItem.id !== action.cartItem.id);
    default:
      return state;
  }
};

export default cartReducer;

import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

// ACTION CONSTANTS
const TOKEN = 'token';
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

export const _editCartItem = (cartItem) => {
  return {
    type: EDIT_CART_ITEM,
    cartItem,
  };
};

// THUNK CREATORS
export const getCart = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: cart } = await axios.get(`/api/users/${id}/cart`, {
        headers: {
          // send it back in req, as header with key
          authorization: token, // of authorization
        }, //to use in routes
      });
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
        cartItem,
      );
      dispatch(_addToCart(newCartItem));
      toast.success('Added to cart successfully!');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
};

export const deleteFromCart = (userId, itemId) => {
  return async (dispatch) => {
    try {
      const { data: cartItem } = await axios.delete(
        `/api/users/${userId}/cart/${itemId}`,
      );
      dispatch(_deleteFromCart(cartItem));
      toast.success('Deleted from cart');
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateCart = (userId) => {
  return async () => {
    try {
      await axios.put(`/api/users/${userId}/cart`);
    } catch (error) {
      console.log(error);
    }
  };
};
export const editCartItem = (userId, cartItem) => {
  return async (dispatch) => {
    try {
      const { data: updatedCartItem } = await axios.put(
        `/api/users/${userId}/cart/${cartItem.id}`,
        cartItem,
      );
      dispatch(_editCartItem(updatedCartItem));
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
    case EDIT_CART_ITEM:
      return state.map((cartItem) =>
        cartItem.id === action.cartItem.id ? action.cartItem : cartItem,
      );
    default:
      return state;
  }
};

export default cartReducer;

import axios from 'axios';
// ACTION TYPE
const GET_CART = 'GET_CART';

// ACTION CREATORS
export const _getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
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

// REDUCER
const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
};

export default cartReducer;

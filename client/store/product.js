import axios from "axios";
// ACTION TYPE
const GET_PRODUCT = "GET_PRODUCT";

// ACTION CREATORS
export const _getProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product,
  };
};
// THUNK CREATORS
export const getProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(`/api/products/${id}`);
      dispatch(_getProduct(product));
    } catch (err) {
      console.log(err);
    }
  };
};

// REDUCER
const productReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    default:
      return state;
  }
};

export default productReducer;

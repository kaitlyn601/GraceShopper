import axios from 'axios';

//---------ACTION CONSTANT
const GET_PRODUCTS = 'GET_PRODUCTS';

//---------ACTION CREATORS
const _getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

//---------THUNK
export const getProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get('/api/products');
      dispatch(_getProducts(products));
    } catch (error) {
      console.log(error);
    }
  };
};

//---------REDUCER
const initialState = [];
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};

export default productsReducer;

import axios from "axios";

//---------ACTION CONSTANT
const GET_PRODUCTS = "GET_PRODUCTS";
const DELETED_PRODUCT = "DELETED_PRODUCT";

//---------ACTION CREATORS
const _getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

const _deletedProduct = (product) => {
  return {
    type: DELETED_PRODUCT,
    product,
  };
};

//---------THUNK
export const getProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get("/api/products");
      dispatch(_getProducts(products));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/products/${productId}`);
      dispatch(_deletedProduct(data));
    } catch (error) {
      console.log("error deleting product from the DB", error);
    }
  };
};

//---------REDUCER
const initialState = [];
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case DELETED_PRODUCT: {
      const updatedProducts = state.filter(
        (product) => product.id !== action.product.id
      );
      return updatedProducts;
    }
    default:
      return state;
  }
};

export default productsReducer;

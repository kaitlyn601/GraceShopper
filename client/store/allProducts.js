import axios from 'axios';
import { getProduct } from './product';
import toast, { Toaster } from 'react-hot-toast';
//---------ACTION CONSTANT
const GET_PRODUCTS = 'GET_PRODUCTS';
const EDIT_PRODUCT = 'EDIT_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';
const DELETED_PRODUCT = 'DELETED_PRODUCT';
const TOKEN = 'token';

//---------ACTION CREATORS
const _getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

const _addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

const _editProduct = (product) => ({
  type: EDIT_PRODUCT,
  product,
});
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
      const { data: products } = await axios.get('/api/products');
      dispatch(_getProducts(products));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addProductThunk = (product) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const { data: created } = await axios.post('/api/products', product, {
      headers: {
        // send it back in req, as header with key
        authorization: token, // of authorization
      }, //to use in routes
    });
    dispatch(_addProduct(created));
    toast.success('Item successfully Added!');
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const editProductThunk = (product) => async (dispatch) => {
  try {
    const { data: edit } = await axios.put(
      `/api/products/${product.id}`,
      product,
    );
    dispatch(_editProduct(edit));
    dispatch(getProduct(product.id));
    toast.success('Item successfully Updated!');
  } catch (error) {
    toast.error(error.message);
  }
};
export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/products/${productId}`);
      dispatch(_deletedProduct(data));
      toast.success('Item successfully deleted');
    } catch (error) {
      console.log('error deleting product from the DB', error);
    }
  };
};

//---------REDUCER
const initialState = [];
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.product];
    case EDIT_PRODUCT:
      return state.map((product) => {
        if (product.id === action.product.id) {
          return action.product;
        } else {
          return product;
        }
      });
    case DELETED_PRODUCT: {
      const updatedProducts = state.filter(
        (product) => product.id !== action.product.id,
      );
      return updatedProducts;
    }
    default:
      return state;
  }
};

export default productsReducer;

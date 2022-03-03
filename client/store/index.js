import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import productsReducer from "./allProducts";
import productReducer from "./product";
import cartReducer from "./cart";
import usersReducer from "./allUser";
import userReducer from "./user";

const reducer = combineReducers({
  auth,
  products: productsReducer,
  product: productReducer,
  cart: cartReducer,
  users: usersReducer,
  user: userReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";

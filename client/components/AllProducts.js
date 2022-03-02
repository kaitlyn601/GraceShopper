import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../store/allProducts";
import AddProduct from "./AddProduct";

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.loadAllProducts();
  }

  render() {
    if (!this.props.products.length) return <div>Loading</div>;

    const { products } = this.props;

    return (
      // Once we have created SingleProduct view component :
      // convert each product's <div> into a <link> to front-end Route
      // for SingleView of that product
      // example: <Link to='/product/:id' >{product.name}< /Link>
      // <Route path='/product/:id' component={SingleProduct} />

      <div>
        {/* if user type is Admin, then also render a Delete button for each product : */}
        {/* {isAdmin ? <button>Delete</button> : <div></div>} */}
        {products.map((product) => {
          return (
            <div key={product.id}>
              <h3>
                {product.name} Only Costs {product.price} !
              </h3>
              <img src={product.imageURL} />
            </div>
          );
        })}
        {/* if user type is Admin, then also render AddProductForm Component : */}
        {this.props.isAdmin ? <AddProduct /> : <div></div>}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    // isAdmin: state.auth.isAdmin,
    // need to add an attribute called 'isAdmin' to our User model. type must be BOOL. then we can use props.isAdmin to conditionally render AddForm and Delete button
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadAllProducts: () => dispatch(getProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);

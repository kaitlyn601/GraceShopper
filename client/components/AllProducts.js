import React from "react";
import { connect } from "react-redux";
import AddProduct from "./AddProduct";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../store/allProducts";

class AllProducts extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.props.loadAllProducts();
  }

  async handleDelete(id) {
    await this.props.deleteProduct(id);
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
        {products.map((product) => {
          return (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                {product.name} Price $ {product.price / 100}
                <img src={product.imageURL} />
              </Link>

              {this.props.isAdmin ? (
                <button
                  type="button"
                  onClick={() => this.handleDelete(product.id)}
                >
                  Delete
                </button>
              ) : (
                <div></div>
              )}
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
    isAdmin: state.auth.isAdmin,
    // added an attribute called 'isAdmin' to our User model. type is BOOL.
    // props.isAdmin conditionally renders AddForm and Delete button
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadAllProducts: () => dispatch(getProducts()),
    deleteProduct: (id) => dispatch(deleteProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);

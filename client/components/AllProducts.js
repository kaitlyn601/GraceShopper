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
      <div className="products">
        <div className="product-header">
          <img
            className="header-img"
            src="https://m.media-amazon.com/images/S/abs-image-upload-na/1/AmazonStores/ATVPDKIKX0DER/a172a51d6db4f3bbfae74a87c7ab0efb.w3542.h1447._CR0%2C458%2C3542%2C708_SX1500_.jpg"
          />
          <h3 className="header-text">Gourmet Chocolate</h3>
          <p className="text">
            Chocolate lovers around the world who have a strong sweet tooth can
            agree that if you're looking for a healthy, satisfying, and
            irresistible candy, then indulging in a few pieces of cacao nibs,
            dark chocolate chips, or a dark chocolate bar is the way to go
            instead of traditional milk chocolate. Unlike milk chocolate or semi
            sweet chocolate, you don't have to feel guilty for treating
            yourself. Dark chocolate contains less refined sugar and milk fat so
            the natural health benefits from the organic cacao bean and cocoa
            powder are even greater.
          </p>
        </div>
        <div className="filter-box">
          <h4>Chocolate Type</h4>
          <ul>
            <li>Milk Chocolate</li>
            <li>Dark Chocolate</li>
            <li>Exotic Chocolate</li>
          </ul>
          <div className="sort">
            <label htmlFor="sort">Sort By: </label>
            <select
              className="sort"
              aria-label="Default select example"
              name="AlphabeticalOrder"
              /*  onChange={(e) => setSort(e.target.value)}
            value={sort} */
            >
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="priceLowToHigh">Price Low - High</option>
              <option value="priceHighToLow">Price High - Low</option>
            </select>
          </div>
        </div>
        <div className="products-container">
          <div className="grid-container">
            {/* if user type is Admin, then also render a Delete button for each product : */}
            {products.map((product) => {
              return (
                <div className="product-container" key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <img className="product-img" src={product.imageURL} />
                    <h4 className="product-name">{product.name}</h4>
                    <p className="price"> $ {product.price / 100}</p>
                  </Link>
                  <button
                    type="button"
                    onClick={this.handleAddToCart}
                    className="addtobag-btn"
                  >
                    Add to bag
                  </button>

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
        </div>
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

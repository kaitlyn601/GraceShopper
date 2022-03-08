import React from 'react';
import { connect } from 'react-redux';
import AddProduct from './AddProduct';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../store/allProducts';

class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: 'all',
      sort: 'none',
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.loadAllProducts();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async handleDelete(id) {
    await this.props.deleteProduct(id);
    this.props.loadAllProducts();
  }

  render() {
    if (!this.props.products.length) return <div>Loading</div>;
    let { products } = this.props;

    //---Sort Products
    switch (this.state.sort) {
      case 'priceDescending':
        products = products.sort((p1, p2) => {
          return p2.price - p1.price;
        });
        break;
      case 'priceAscending':
        products = products.sort((p1, p2) => {
          return p1.price - p2.price;
        });
        break;
      case 'alpha':
        products = products.sort((p1, p2) => {
          return p1.name.localeCompare(p2.name);
        });
        break;
      case 'alphaReverse':
        products = products.sort((p1, p2) => {
          return p2.name.localeCompare(p1.name);
        });
        break;
      case 'none':
      default:
        products = this.props.products;
    }

    //---Filter Products
    switch (this.state.filter) {
      case 'milk':
        products = products.filter((product) => product.type === 'milk');
        break;
      case 'dark':
        products = products.filter((product) => product.type === 'dark');
        break;
      case 'exotic':
        products = products.filter((product) => product.type === 'exotic');
        break;
      case 'assorted':
        products = products.filter((product) => product.type === 'assorted');
        break;
      case 'all':
      default:
        products = this.props.products;
    }

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
        <div className="products-container">
          <div className="filter-box">
            <h4>Chocolate Type</h4>
            <label htmlFor="filter">Filter By: </label>
            <select
              name="filter"
              value={this.state.filter}
              onChange={(e) => this.handleChange(e)}
            >
              <option value="all">All</option>
              <option value="milk">Milk Chocolate</option>
              <option value="dark">Dark Chocolate</option>
              <option value="exotic">Exotic Chocolate</option>
              <option value="assorted">Assorted Chocolate</option>
            </select>
            <div className="sort">
              <label htmlFor="sort">Sort By: </label>
              <select
                className="sort"
                aria-label="Default select example"
                name="sort"
                onChange={(e) => this.handleChange(e)}
              >
                <option value="none">None</option>
                <option value="alpha">A-Z</option>
                <option value="alphaReverse">Z-A</option>
                <option value="priceAscending">Price (Low - High)</option>
                <option value="priceDescending">Price (High - Low)</option>
              </select>
            </div>
          </div>
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
                  <button className="addtobag-btn">Add to bag</button>

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

import React from "react";
import { connect } from "react-redux";
import { getProduct } from "../store/product";
import EditProduct from "./EditProduct";

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.id);
  }
  render() {
    const { product } = this.props;
    if (!product.id) return <div>Loading</div>;
    return (
      <div className="single-page-container">
        <div className="top-container">
          <div className="img-container">
            <img src={product.imageURL} />
          </div>
          <div className="info-container">
            <h2>{product.name}</h2>
            <h2>{product.price}</h2>
            <div>
              <label>Quantity</label>
              <button>-</button>
              <input type="number" min="0"></input>
              <button>+</button>
            </div>

            <button>ADD TO CART</button>
          </div>
        </div>
        <div className="description-container">
          <div>
            <h3>DESCRIPTION</h3>
          </div>
          <div>
            <p>{product.description}</p>
          </div>
        </div>
        {this.props.isAdmin ? (
          <EditProduct currentProduct={this.props.product} />
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleProduct: (id) => dispatch(getProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);

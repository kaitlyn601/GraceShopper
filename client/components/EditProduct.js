import React from "react";
import { connect } from "react-redux";
import { editProductThunk } from "../store/allProducts";

export class EditProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.currentProduct;
  }

  componentDidUpdate() {
    if (this.state.id !== this.props.currentProduct.id) {
      this.setState({ ...this.props.currentProduct });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.editProduct(this.state);
  }

  render() {
    const { currentProduct: product } = this.props;
    return (
      <div>
        <h1>Edit This Product "{product.name}":</h1>
        <form id="edit-product-form" onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="name"> Name: </label>
          <input
            name="name"
            value={this.state.name}
            onChange={(e) => this.handleChange(e)}
          />
          <label htmlFor="type"> Product Type: </label>
          <input
            type="text"
            name="type"
            onChange={(e) => this.handleChange(e)}
            value={this.state.type}
          />
          <label htmlFor="price"> Price: </label>
          <input
            type="text"
            name="price"
            onChange={(e) => this.handleChange(e)}
            value={this.state.price}
          />
          <label htmlFor="name"> Quantity: </label>
          <input
            type="text"
            name="quantity"
            onChange={(e) => this.handleChange(e)}
            value={this.state.quantity}
          />
          <label htmlFor="name"> Description: </label>
          <input
            type="text"
            name="description"
            onChange={(e) => this.handleChange(e)}
            value={this.state.description}
          />
          <label htmlFor="name"> imageURL: </label>
          <input
            type="text"
            name="imageURL"
            onChange={(e) => this.handleChange(e)}
            value={this.state.imageURL}
          />
          <input type="submit" value="Edit Product" />
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    editProduct: (product) => dispatch(editProductThunk(product)),
  };
};

export default connect(null, mapDispatch)(EditProject);

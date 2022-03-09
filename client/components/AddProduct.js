import React from "react";
import { addProductThunk } from "../store/allProducts";
import { connect } from "react-redux";

class AddProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      type: "milk",
      price: 0.0,
      quantity: 1,
      description: "",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Smoke-Salt-new-packaging_300x300.jpg?v=1578593451",
    };
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.addProduct({ ...this.state });
  }
  render() {
    return (
      <div>
        <h1>Add New Product Form: </h1>
        <form id="addproduct-form" onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="name"> Product Name: </label>
          <input
            type="text"
            name="name"
            onChange={(e) => this.handleChange(e)}
            value={this.state.name}
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
          <input type="submit" value="Add Product" />
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  addProduct: (addProduct) => dispatch(addProductThunk(addProduct)),
});

export default connect(null, mapDispatch)(AddProduct);

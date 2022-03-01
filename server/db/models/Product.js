const Sequelize = require("sequelize");
const { Module } = require("webpack");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  type: {
    type: Sequelize.ENUM("milk, white, dark, assorted"),
  },
  price: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0.0,
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.TEXT,
  },
  imageURL: {
    type: Sequelize.STRING,
  },
});

module.exports = Product;

const Sequelize = require('sequelize');
const { Module } = require('webpack');
const db = require('../db');

const OrderItem = db.define('orderitem', {
  name: {
    type: Sequelize.STRING,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  imageURL: {
    type: Sequelize.STRING,
  },
});

module.exports = OrderItem;

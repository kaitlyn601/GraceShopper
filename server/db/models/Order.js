const Sequelize = require('sequelize');
const { Module } = require('webpack');
const db = require('../db');

const Order = db.define('order', {
  fulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Order;

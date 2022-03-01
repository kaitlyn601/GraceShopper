//this is the access point for all things database related!
const Product = require("./models/Product");
const User = require("./models/User");

const db = require("./db");

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Product,
  },
};

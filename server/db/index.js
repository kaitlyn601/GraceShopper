//this is the access point for all things database related!
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');

const db = require('./db');

//associations could go here!
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderItem,
  },
};

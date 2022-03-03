const orderItemRouter = require("express").Router();
const {
  models: { OrderItem },
} = require("../db");
module.exports = orderItemRouter;

// DONT FORGET TO MOUNT THIS ROUTER ON MAIN EXPRESS PIPELINE
// for all incoming routes matching /api/orderitems

// POST /api/orderitems -> to make a new order item
orderItemRouter.post("/", async (req, res, next) => {
  try {
    let orderItem = await OrderItem.create(req.body);
    res.send(orderItem);
  } catch (error) {
    next(error);
  }
});

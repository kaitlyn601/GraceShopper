const router = require("express").Router();
const {
  models: { User, Order, OrderItem },
} = require("../db");
const Product = require("../db/models/Product");
const { isAdmin, requireToken } = require("./gatekeeper");
module.exports = router;

// GET /api/users
router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username", "isAdmin"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
// GET /api/users/:id
router.get("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Order, include: { model: OrderItem } }],
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id/orders
router.get("/:id/orders", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: OrderItem }],
      where: {
        userId: req.params.id,
      },
    });
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id/cart
router.get("/:id/cart", requireToken, async (req, res, next) => {
  try {
    const currentOrder = await Order.findOne({
      include: [{ model: OrderItem, include: [{ model: Product }] }],
      where: {
        userId: req.params.id,
        fulfilled: false,
      },
    });
    if (currentOrder) res.send(currentOrder.orderitems);
    else res.send([]);
  } catch (error) {
    next(error);
  }
});

// POST /api/users/:id/cart
router.post("/:id/cart", async (req, res, next) => {
  try {
    const currentOrder = await Order.findOrCreate({
      include: [{ model: OrderItem }],
      where: {
        userId: req.params.id,
        fulfilled: false,
      },
    });
    req.body.orderId = currentOrder[0].id;
    const cartItem = await OrderItem.findOne({
      where: { orderId: req.body.orderId, productId: req.body.productId },
    });
    if (cartItem) {
      req.body.quantity += cartItem.quantity;
      res.send(await cartItem.update(req.body));
    } else {
      const newItem = await OrderItem.create(req.body);
      res.send(newItem);
    }
  } catch (error) {
    next(error);
  }
});
// PUT /api/users/:id/cart
router.put("/:id/cart", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.id,
        fulfilled: false,
      },
    });
    res.send(await order.update({ fulfilled: true }));
  } catch (error) {
    next(error);
  }
});

//PUT /api/users/:id/cart/:itemId
router.put("/:id/cart/:itemId", async (req, res, next) => {
  try {
    const cartItem = await OrderItem.findByPk(req.params.itemId);
    res.send(await cartItem.update(req.body));
  } catch (error) {
    next(error);
  }
});

//DELETE /api/users/:id/cart/:itemId
router.delete("/:id/cart/:itemId", async (req, res, next) => {
  try {
    const cartItem = await OrderItem.findByPk(req.params.itemId);
    await cartItem.destroy();
    res.send(cartItem);
  } catch (error) {
    next(error);
  }
});

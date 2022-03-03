const router = require('express').Router();
const {
  models: { User, Order, OrderItem },
} = require('../db');
module.exports = router;

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
// GET /api/users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Order, include: { model: OrderItem } }],
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id/cart
router.get('/:id/cart', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Order, include: { model: OrderItem } }],
    });
    const currentOrder = user.orders.filter((order) => !order.fulfilled);
    res.send(currentOrder[0].orderitems);
  } catch (error) {
    next(error);
  }
});

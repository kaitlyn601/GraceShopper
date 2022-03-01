const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

// GET /api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
// GET /api/users/:id
router.get("/:id", async (req, res, next) => {
  try {
    let userId = req.params.id;
    const user = await User.findByPk(userId);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

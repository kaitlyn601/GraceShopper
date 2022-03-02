const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

// GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({});
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res, next) => {
  try {
    let productId = req.params.id;
    const project = await Product.findByPk(productId);
    res.send(project);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/products/:id
router.delete("/:id", async (req, res, next) => {
  try {
    let productId = req.params.id;
    const deletedProduct = await Product.destroy({ where: { id: productId } });
    res.send(deletedProduct);
  } catch (error) {
    next(error);
  }
});

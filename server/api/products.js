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

// POST /api/products -> to make new product
router.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

//PUT /api/products/:id -> edit exsisting product
router.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.sendStatus(404);
    }
    res.send(await product.update(req.body));
  } catch (error) {
    next(error);
  }
});

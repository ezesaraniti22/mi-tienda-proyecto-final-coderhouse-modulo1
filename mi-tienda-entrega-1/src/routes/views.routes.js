const express = require("express");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

const router = express.Router();

router.get("/products", async (req, res) => {
  const { page = 1 } = req.query;
  const result = await Product.paginate({}, { page, limit: 10, lean: true });

  res.render("products", {
    products: result.docs,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    totalPages: result.totalPages,
    page: result.page
  });
});

router.get("/products/:pid", async (req, res) => {
  const product = await Product.findById(req.params.pid).lean();
  if (!product) return res.status(404).send("Producto no encontrado");
  res.render("product", { product });
});

router.get("/carts/:cid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid).populate("products.product").lean();
  if (!cart) return res.status(404).send("Carrito no encontrado");
  res.render("cart", { products: cart.products });
});

router.get("/realtimeproducts", async (req, res) => {
    res.render("realtimeProducts");
  });
  

module.exports = router;

const express = require("express");
const CartManager = require("../managers/cartManager");

const router = express.Router();
const cartManager = new CartManager();

router.post("/", (req, res) => res.json(cartManager.createCart()));

router.get("/:cid", (req, res) => {
  const cart = cartManager.getCartById(parseInt(req.params.cid));
  cart ? res.json(cart) : res.status(404).json({ error: "Carrito no encontrado" });
});

router.post("/:cid/product/:pid", (req, res) => {
  const updatedCart = cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
  updatedCart ? res.json(updatedCart) : res.status(404).json({ error: "Error al agregar producto" });
});

module.exports = router;

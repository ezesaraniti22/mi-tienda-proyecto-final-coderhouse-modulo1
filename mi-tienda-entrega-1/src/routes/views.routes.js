const express = require("express");
const ProductManager = require("../managers/productManager");

const router = express.Router();
const productManager = new ProductManager();

// Página Home con la lista de productos
router.get("/", (req, res) => {
  const products = productManager.getProducts();
  res.render("home", { title: "Lista de Productos", products });
});

// Página de productos en tiempo real
router.get("/realtimeproducts", (req, res) => {
  const products = productManager.getProducts();
  res.render("realTimeProducts", { title: "Productos en Tiempo Real", products });
});

module.exports = router;

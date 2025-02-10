const express = require("express");
const ProductManager = require("../managers/productManager");

const router = express.Router();
const productManager = new ProductManager();

// Obtener todos los productos
router.get("/", (req, res) => {
  res.json(productManager.getProducts());
});

// Obtener un producto por ID
router.get("/:pid", (req, res) => {
  const product = productManager.getProductById(parseInt(req.params.pid));
  product ? res.json(product) : res.status(404).json({ error: "Producto no encontrado" });
});

// Agregar un nuevo producto
router.post("/", (req, res) => {
  const newProduct = productManager.addProduct(req.body);
  res.status(201).json(newProduct);
});

// Actualizar un producto
router.put("/:pid", (req, res) => {
  const updatedProduct = productManager.updateProduct(parseInt(req.params.pid), req.body);
  updatedProduct ? res.json(updatedProduct) : res.status(404).json({ error: "Producto no encontrado" });
});

// Eliminar un producto
router.delete("/:pid", (req, res) => {
  const deletedProduct = productManager.deleteProduct(parseInt(req.params.pid));
  deletedProduct ? res.json("Producto eliminado correctamente") : res.status(404).json({ error: "Producto no encontrado" });
});

module.exports = router;

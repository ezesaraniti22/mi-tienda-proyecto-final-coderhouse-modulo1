const express = require("express");
const productRoutes = require("./src/routes/products.routes");
const cartRoutes = require("./src/routes/carts.routes");

const app = express();
const PORT = 8080;

// Middleware para permitir JSON en las peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

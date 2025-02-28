const express = require("express");
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");
const productRoutes = require("./src/routes/products.routes");
const cartRoutes = require("./src/routes/carts.routes");
const viewsRoutes = require("./src/routes/views.routes");
const ProductManager = require("./src/managers/productManager");
const path = require("path");

const app = express();
const PORT = 8080;

// Configurar Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.static(path.join(__dirname, "src/public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/", viewsRoutes);

// Iniciar el servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

const io = new Server(server);
const productManager = new ProductManager();

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  // Enviar lista de productos al cliente cuando se conecta
  socket.emit("updateProducts", productManager.getProducts());

  // Escuchar evento de agregar producto
  socket.on("addProduct", (productData) => {
    const newProduct = productManager.addProduct(productData);
    io.emit("updateProducts", productManager.getProducts());
  });

  // Escuchar evento de eliminar producto
  socket.on("deleteProduct", (productId) => {
    productManager.deleteProduct(productId);
    io.emit("updateProducts", productManager.getProducts());
  });
});

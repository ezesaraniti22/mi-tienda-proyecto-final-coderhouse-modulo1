const fs = require("fs");
const path = "./src/data/products.json";

class ProductManager {
  constructor() {
    this.path = path;
    this.products = this.loadProducts();
  }

  // Carga los productos desde el archivo JSON
  loadProducts() {
    try {
      if (!fs.existsSync(this.path)) {
        fs.writeFileSync(this.path, JSON.stringify([], null, 2));
      }
      const data = fs.readFileSync(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      return [];
    }
  }

  // Guarda los productos en el archivo JSON
  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
  }

  // Obtiene todos los productos
  getProducts() {
    return this.products;
  }

  // Obtiene un producto por ID
  getProductById(id) {
    return this.products.find((p) => p.id === id);
  }

  // Agrega un nuevo producto
  addProduct({ title, description, code, price, status, stock, category, thumbnails }) {
    const id = this.products.length ? this.products[this.products.length - 1].id + 1 : 1;
    const newProduct = { id, title, description, code, price, status, stock, category, thumbnails };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  // Actualiza un producto por ID
  updateProduct(id, updatedFields) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    this.products[index] = { ...this.products[index], ...updatedFields, id };
    this.saveProducts();
    return this.products[index];
  }

  // Elimina un producto por ID
  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    const deletedProduct = this.products.splice(index, 1);
    this.saveProducts();
    return deletedProduct;
  }
}

module.exports = ProductManager;

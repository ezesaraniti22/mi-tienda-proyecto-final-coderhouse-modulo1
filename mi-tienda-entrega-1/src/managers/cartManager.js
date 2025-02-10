const fs = require("fs");
const path = "./src/data/carts.json";

class CartManager {
  constructor() {
    this.path = path;
    this.carts = this.loadCarts();
  }

  loadCarts() {
    try {
      if (!fs.existsSync(this.path)) {
        fs.writeFileSync(this.path, JSON.stringify([], null, 2));
      }
      return JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } catch (error) {
      console.error("Error al cargar carritos:", error);
      return [];
    }
  }

  saveCarts() {
    fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
  }

  createCart() {
    const id = this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1;
    const newCart = { id, products: [] };
    this.carts.push(newCart);
    console.log("Nuevo carrito creado:", newCart);
    this.saveCarts();
    return newCart;
  }

  getCartById(id) {
    return this.carts.find((cart) => cart.id === id);
  }

  addProductToCart(cartId, productId) {
    const cart = this.getCartById(cartId);
    if (!cart) return null;

    const product = cart.products.find((p) => p.product === productId);
    if (product) {
      product.quantity++;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    this.saveCarts();
    return cart;
  }
}

module.exports = CartManager;

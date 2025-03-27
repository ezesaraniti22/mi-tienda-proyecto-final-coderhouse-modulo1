const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al ID de un producto
        ref: "Product", // Nombre del modelo referenciado
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
}, {
  timestamps: true // Guarda fecha de creación y actualización
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;

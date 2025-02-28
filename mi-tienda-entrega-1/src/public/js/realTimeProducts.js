const socket = io();

// Escuchar actualizaciones de productos
socket.on("updateProducts", (products) => {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.id = `product-${product.id}`;
    li.innerHTML = `${product.title} - $${product.price} 
                    <button onclick="deleteProduct(${product.id})">Eliminar</button>`;
    productList.appendChild(li);
  });
});

// Enviar nuevo producto al servidor
document.getElementById("productForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const price = parseFloat(document.getElementById("price").value);
  socket.emit("addProduct", { title, price });
  e.target.reset();
});

// Enviar solicitud para eliminar un producto
function deleteProduct(id) {
  socket.emit("deleteProduct", id);
}

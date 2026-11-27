const products = [
  {
    id: 1,
    name: "Combo Express Eustaquio",
    desc: "Plato principal del día + bebida personal + entrega rápida.",
    price: 18.50
  },
  {
    id: 2,
    name: "Pack Familiar Delivery",
    desc: "Porción reforzada para compartir con salsas y guarnición.",
    price: 42.00
  },
  {
    id: 3,
    name: "Snack de Tarde",
    desc: "Ideal para media tarde con entrega puntual a tu puerta.",
    price: 12.00
  },
  {
    id: 4,
    name: "Bebida Refrescante 1L",
    desc: "Bien helada para acompañar cualquiera de tus pedidos.",
    price: 7.50
  }
];

const cart = [];

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const statusMsg = document.getElementById("statusMsg");

function formatPEN(amount) {
  return `S/ ${amount.toFixed(2)}`;
}

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (item) => `
      <article class="card">
        <div>
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
        </div>
        <div class="price-row">
          <span class="price">${formatPEN(item.price)}</span>
          <button class="btn-add" type="button" onclick="addToCart(${item.id})">Agregar</button>
        </div>
      </article>
    `
    )
    .join("");
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  statusMsg.textContent = "";
  renderCart();
}

function removeFromCart(id) {
  const index = cart.findIndex((item) => item.id === id);
  if (index === -1) return;

  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
  } else {
    cart.splice(index, 1);
  }

  renderCart();
}

function renderCart() {
  const totalUnits = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  cartCount.textContent = totalUnits;
  cartTotal.textContent = formatPEN(totalPrice);

  if (cart.length === 0) {
    cartItems.innerHTML = `<li class="empty">Tu carrito está vacío. Agrega un producto.</li>`;
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
      <li class="cart-item">
        <span>${item.qty}x ${item.name} (${formatPEN(item.price * item.qty)})</span>
        <button class="remove-btn" type="button" title="Quitar" onclick="removeFromCart(${item.id})">✕</button>
      </li>
    `
    )
    .join("");
}

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    statusMsg.textContent = "Primero agrega al menos un producto al carrito.";
    return;
  }

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  statusMsg.textContent = `Pedido registrado por ${formatPEN(totalPrice)}. ¡Listo para despacho!`;
});

renderProducts();
renderCart();
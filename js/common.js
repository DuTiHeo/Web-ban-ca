const AQUALIFE_CART_KEY = "aqualife_cart_v1";
let productsCache = null;

function getCart() {
  try {
    const raw = localStorage.getItem(AQUALIFE_CART_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(AQUALIFE_CART_KEY, JSON.stringify(cart));
  updateCartBadges();
}

function cartCount() {
  const cart = getCart();
  return Object.values(cart).reduce((sum, qty) => sum + Number(qty || 0), 0);
}

function updateCartBadges() {
  const count = cartCount();
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(count);
  });
}

function addToCart(productId, quantity = 1) {
  const qty = Number(quantity || 1);
  if (!productId || Number.isNaN(qty) || qty <= 0) return;
  const cart = getCart();
  cart[productId] = Number(cart[productId] || 0) + qty;
  saveCart(cart);
}

function removeFromCart(productId) {
  const cart = getCart();
  delete cart[productId];
  saveCart(cart);
}

async function loadProducts() {
  if (productsCache) return productsCache;
  const response = await fetch("../json/products.json");
  if (!response.ok) {
    throw new Error("Khong the tai du lieu san pham");
  }
  productsCache = await response.json();
  return productsCache;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function findProductById(products, id) {
  return (products || []).find((item) => item.id === id) || null;
}

window.Aqualife = {
  getCart,
  saveCart,
  addToCart,
  removeFromCart,
  loadProducts,
  formatCurrency,
  findProductById,
  updateCartBadges,
};

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadges();
});

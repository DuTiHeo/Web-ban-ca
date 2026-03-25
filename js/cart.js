function renderCart(products) {
  const listEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const emptyEl = document.getElementById("cart-empty");

  if (!listEl || !totalEl || !emptyEl) return;

  const cart = Aqualife.getCart();
  const entries = Object.entries(cart).filter(([, qty]) => Number(qty) > 0);

  if (!entries.length) {
    listEl.innerHTML = "";
    emptyEl.classList.remove("hidden");
    totalEl.textContent = Aqualife.formatCurrency(0);
    return;
  }

  emptyEl.classList.add("hidden");

  let total = 0;

  listEl.innerHTML = entries
    .map(([id, qty]) => {
      const product = Aqualife.findProductById(products, id);
      if (!product) return "";
      const subtotal = product.price * Number(qty);
      total += subtotal;

      return `
        <article class="card cart-item" data-id="${id}">
          <div class="cart-item__thumb">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div>
            <h3>${product.name}</h3>
            <p class="muted">${product.category}</p>
            <p class="price">${Aqualife.formatCurrency(product.price)} x ${qty}</p>
          </div>
          <div class="cart-item__actions">
            <button class="btn btn-ghost" data-action="minus">-</button>
            <button class="btn btn-ghost" data-action="plus">+</button>
            <button class="btn btn-danger" data-action="remove">Xoa</button>
          </div>
        </article>
      `;
    })
    .join("");

  totalEl.textContent = Aqualife.formatCurrency(total);

  listEl.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const itemEl = button.closest("[data-id]");
      const id = itemEl?.dataset.id;
      if (!id) return;

      const cartState = Aqualife.getCart();
      const current = Number(cartState[id] || 0);
      const action = button.dataset.action;

      if (action === "plus") {
        cartState[id] = current + 1;
      } else if (action === "minus") {
        cartState[id] = Math.max(0, current - 1);
        if (cartState[id] === 0) delete cartState[id];
      } else if (action === "remove") {
        delete cartState[id];
      }

      Aqualife.saveCart(cartState);
      renderCart(products);
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const products = await Aqualife.loadProducts();
    renderCart(products);

    const clearBtn = document.getElementById("clear-cart");
    const checkoutBtn = document.getElementById("checkout");

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        Aqualife.saveCart({});
        renderCart(products);
      });
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        const count = Object.keys(Aqualife.getCart()).length;
        alert(count ? "Da tiep nhan don hang (demo)." : "Gio hang dang rong.");
      });
    }
  } catch (error) {
    const listEl = document.getElementById("cart-items");
    if (listEl) listEl.innerHTML = `<div class="empty">${error.message}</div>`;
  }
});

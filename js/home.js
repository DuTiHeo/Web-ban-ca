document.addEventListener("DOMContentLoaded", async () => {
  const listEl = document.getElementById("featured-products");
  if (!listEl) return;

  try {
    const products = await Aqualife.loadProducts();
    const featured = products.slice(0, 4);

    listEl.innerHTML = featured
      .map(
        (item) => `
          <article class="card product-card">
            <a class="product-thumb" href="product-detail.html?id=${item.id}">
              <img src="${item.image}" alt="${item.name}" />
            </a>
            <div>
              <h3><a href="product-detail.html?id=${item.id}">${item.name}</a></h3>
              <p class="muted">${item.shortDescription}</p>
            </div>
            <div class="product-meta">
              <span class="price">${Aqualife.formatCurrency(item.price)}</span>
              <button class="btn btn-primary" data-add="${item.id}">Them gio</button>
            </div>
          </article>
        `,
      )
      .join("");

    listEl.querySelectorAll("button[data-add]").forEach((button) => {
      button.addEventListener("click", () => {
        Aqualife.addToCart(button.dataset.add, 1);
      });
    });
  } catch (error) {
    listEl.innerHTML = `<div class="empty">Khong tai duoc du lieu: ${error.message}</div>`;
  }
});

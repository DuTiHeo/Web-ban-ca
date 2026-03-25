document.addEventListener("DOMContentLoaded", async () => {
  const listEl = document.getElementById("product-grid");
  const searchEl = document.getElementById("search-input");
  const categoryEl = document.getElementById("category-filter");

  if (!listEl || !searchEl || !categoryEl) return;

  try {
    const products = await Aqualife.loadProducts();

    const categories = ["tat-ca", ...new Set(products.map((p) => p.category))];
    categoryEl.innerHTML = categories
      .map((cat) => `<option value="${cat}">${cat === "tat-ca" ? "Tat ca danh muc" : cat}</option>`)
      .join("");

    const render = () => {
      const keyword = searchEl.value.trim().toLowerCase();
      const category = categoryEl.value;

      const filtered = products.filter((item) => {
        const matchKeyword =
          item.name.toLowerCase().includes(keyword) ||
          item.shortDescription.toLowerCase().includes(keyword);
        const matchCategory = category === "tat-ca" || item.category === category;
        return matchKeyword && matchCategory;
      });

      if (!filtered.length) {
        listEl.innerHTML = '<div class="empty">Khong co san pham phu hop.</div>';
        return;
      }

      listEl.innerHTML = filtered
        .map(
          (item) => `
            <article class="card product-card">
              <a class="product-thumb" href="product-detail.html?id=${item.id}">
                <img src="${item.image}" alt="${item.name}" />
              </a>
              <div>
                <h3><a href="product-detail.html?id=${item.id}">${item.name}</a></h3>
                <p class="muted">${item.shortDescription}</p>
                <p class="muted">Danh muc: ${item.category}</p>
              </div>
              <div class="product-meta">
                <span class="price">${Aqualife.formatCurrency(item.price)}</span>
                <div>
                  <a class="btn btn-ghost" href="product-detail.html?id=${item.id}">Chi tiet</a>
                  <button class="btn btn-primary" data-add="${item.id}">Them</button>
                </div>
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
    };

    searchEl.addEventListener("input", render);
    categoryEl.addEventListener("change", render);
    render();
  } catch (error) {
    listEl.innerHTML = `<div class="empty">Khong tai duoc du lieu: ${error.message}</div>`;
  }
});

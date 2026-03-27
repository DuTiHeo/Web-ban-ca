document.addEventListener("DOMContentLoaded", async () => {
  const imageEl = document.getElementById("detail-image");
  const nameEl = document.getElementById("detail-name");
  const priceEl = document.getElementById("detail-price");
  const categoryEl = document.getElementById("detail-category");
  const speciesEl = document.getElementById("detail-species");
  const waterTypeEl = document.getElementById("detail-water-type");
  const descEl = document.getElementById("detail-description");
  const stockEl = document.getElementById("detail-stock");
  const quantityEl = document.getElementById("detail-quantity");
  const addBtn = document.getElementById("detail-add");
  const relatedEl = document.getElementById("related-products");

  if (!imageEl || !nameEl || !priceEl || !descEl || !quantityEl || !addBtn || !relatedEl) return;

  try {
    const products = await Aqualife.loadProducts();
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || products[0]?.id;
    const product = Aqualife.findProductById(products, id) || products[0];

    if (!product) {
      nameEl.textContent = "Khong tim thay san pham";
      return;
    }

    imageEl.src = product.image;
    imageEl.alt = product.name;
    nameEl.textContent = product.name;
    priceEl.textContent = Aqualife.formatCurrency(product.price);
    categoryEl.textContent = product.category;
    speciesEl.textContent = product.species || "Chưa có thông tin";
    waterTypeEl.textContent = product.waterType || "Chưa có thông tin";
    descEl.textContent = product.description;
    stockEl.textContent = String(product.stock);

    addBtn.addEventListener("click", () => {
      const qty = Math.max(1, Number(quantityEl.value || 1));
      Aqualife.addToCart(product.id, qty);
      quantityEl.value = "1";
    });

    const related = products.filter((item) => item.id !== product.id).slice(0, 3);
    relatedEl.innerHTML = related
      .map(
        (item) => `
          <article class="card product-card">
            <a class="product-thumb" href="product-detail.html?id=${item.id}">
              <img src="${item.image}" alt="${item.name}" />
            </a>
            <h4><a href="product-detail.html?id=${item.id}">${item.name}</a></h4>
            <p class="price">${Aqualife.formatCurrency(item.price)}</p>
          </article>
        `,
      )
      .join("");
  } catch (error) {
    nameEl.textContent = `Co loi: ${error.message}`;
  }
});

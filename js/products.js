let allProducts = [];
let filteredProducts = [];
let currentSort = "new";
let selectedSpecies = "all";
let selectedEnvironment = "all";
let currentPage = 1;
let perPage = 9;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    allProducts = await Aqualife.loadProducts();
    
    // Setup filters
    setupSpeciesFilter();
    setupEnvironmentFilter();
    setupSearch();
    setupSort();
    
    filterAndRender();
  } catch (error) {
    console.error("Lỗi tải sản phẩm:", error);
    document.getElementById("product-list").innerHTML = '<div style="text-align:center;color:#999;">Không thể tải sản phẩm</div>';
  }
});

function setupSpeciesFilter() {
  const speciesFilters = document.querySelectorAll("#speciesFilter li");
  speciesFilters.forEach(element => {
    element.addEventListener("click", () => {
      speciesFilters.forEach(el => el.classList.remove("active"));
      element.classList.add("active");
      selectedSpecies = element.getAttribute("data-species");
      currentPage = 1;
      filterAndRender();
    });
  });
}

function setupEnvironmentFilter() {
  const envFilters = document.querySelectorAll("#environmentFilter li");
  envFilters.forEach(element => {
    element.addEventListener("click", () => {
      envFilters.forEach(el => el.classList.remove("active"));
      element.classList.add("active");
      selectedEnvironment = element.getAttribute("data-env");
      currentPage = 1;
      filterAndRender();
    });
  });
}

function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      currentPage = 1;
      filterAndRender();
    });
  }
}

function setupSort() {
  const sortSelect = document.getElementById("sort");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      filterAndRender();
    });
  }
}

function filterAndRender() {
  const searchKeyword = document.getElementById("searchInput")?.value.trim().toLowerCase() || "";
  
  // Lọc sản phẩm
  filteredProducts = allProducts.filter(product => {
    const matchSpecies = selectedSpecies === "all" || product.species === selectedSpecies;
    const matchEnvironment = selectedEnvironment === "all" || product.waterType === selectedEnvironment;
    const matchSearch = product.name.toLowerCase().includes(searchKeyword) || 
                       product.shortDescription.toLowerCase().includes(searchKeyword);
    return matchSpecies && matchEnvironment && matchSearch;
  });

  // Sắp xếp
  sortProducts();
  
  // Cập nhật số lượng
  const countEl = document.getElementById("count");
  if (countEl) {
    countEl.textContent = `${filteredProducts.length} sản phẩm`;
  }
  
  // Render
  render();
  renderPagination();
}

function sortProducts() {
  if (currentSort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (currentSort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else {
    // Sắp xếp theo "new" (thứ tự ban đầu)
    filteredProducts.sort((a, b) => allProducts.indexOf(a) - allProducts.indexOf(b));
  }
}

function render() {
  const start = (currentPage - 1) * perPage;
  const show = filteredProducts.slice(start, start + perPage);
  
  const listEl = document.getElementById("product-list");
  if (!listEl) return;

  if (show.length === 0) {
    listEl.innerHTML = '<div style="text-align:center;color:#999;grid-column:1/-1;">Không có sản phẩm phù hợp</div>';
    return;
  }

  listEl.innerHTML = show
    .map((item) => `
      <div class="product-card">
        <a href="product-detail.html?id=${item.id}" class="product-image">
          <img src="${item.image}" alt="${item.name}" />
        </a>
        <div class="product-info">
          <h3><a href="product-detail.html?id=${item.id}">${item.name}</a></h3>
          <p class="species">${item.species}</p>
          <p class="environment">${item.waterType}</p>
          <p class="description">${item.shortDescription}</p>
          <div class="product-footer">
            <span class="price">${Aqualife.formatCurrency(item.price)}</span>
            <button class="btn-add" onclick="Aqualife.addToCart('${item.id}', 1)">Thêm vào giỏ</button>
          </div>
        </div>
      </div>
    `)
    .join("");
}

function renderPagination() {
  const total = Math.ceil(filteredProducts.length / perPage);
  const paginationEl = document.getElementById("pagination");
  
  if (!paginationEl || total <= 1) return;
  
  let html = "";
  for (let i = 1; i <= total; i++) {
    html += `<button onclick="goPage(${i})" class="${i === currentPage ? 'active' : ''}">${i}</button>`;
  }
  
  paginationEl.innerHTML = html;
}

function goPage(p) {
  currentPage = p;
  render();
  renderPagination();
  
  // Scroll to top
  document.querySelector(".main")?.scrollIntoView({ behavior: "smooth" });
}


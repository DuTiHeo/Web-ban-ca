document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const result = document.getElementById("contact-result");

  if (!form || !result) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = String(form.elements.namedItem("name")?.value || "").trim();
    const email = String(form.elements.namedItem("email")?.value || "").trim();
    const message = String(form.elements.namedItem("message")?.value || "").trim();

    if (!name || !email || !message) {
      result.className = "alert alert-error";
      result.textContent = "Vui long dien day du thong tin.";
      result.classList.remove("hidden");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      result.className = "alert alert-error";
      result.textContent = "Email khong hop le.";
      result.classList.remove("hidden");
      return;
    }

    result.className = "alert alert-success";
    result.textContent = "Da gui lien he thanh cong. Chung toi se phan hoi som.";
    result.classList.remove("hidden");
    form.reset();
  });
});

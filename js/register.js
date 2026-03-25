document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");
  const result = document.getElementById("register-result");
  if (!form || !result) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = String(form.elements.namedItem("name")?.value || "").trim();
    const email = String(form.elements.namedItem("email")?.value || "").trim();
    const password = String(form.elements.namedItem("password")?.value || "");
    const confirm = String(form.elements.namedItem("confirm")?.value || "");

    if (!name || !email || !password || !confirm) {
      result.className = "alert alert-error";
      result.textContent = "Vui long dien day du thong tin.";
      result.classList.remove("hidden");
      return;
    }

    if (password.length < 6) {
      result.className = "alert alert-error";
      result.textContent = "Mat khau can toi thieu 6 ky tu.";
      result.classList.remove("hidden");
      return;
    }

    if (password !== confirm) {
      result.className = "alert alert-error";
      result.textContent = "Xac nhan mat khau khong khop.";
      result.classList.remove("hidden");
      return;
    }

    result.className = "alert alert-success";
    result.textContent = "Dang ky thanh cong. Ban co the dang nhap ngay.";
    result.classList.remove("hidden");
    form.reset();
  });
});

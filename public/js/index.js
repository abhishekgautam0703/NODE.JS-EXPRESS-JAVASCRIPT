// Dashboard logic

document.addEventListener("DOMContentLoaded", () => {
  const purchaseBtn = document.getElementById("purchaseBtn");
  const salesBtn = document.getElementById("salesBtn");
  const stockBtn = document.getElementById("stockBtn");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const statusText = document.getElementById("statusText");
  const Create=document.getElementById("Create");

  // Check login status from localStorage
  const token = sessionStorage.getItem("token");
  console.log("hit");
  if (token) {
    enableDashboard();
    createaccount();
  } else {
    disableDashboard();
  }

  // --- Functions ---
  function enableDashboard() {
    [purchaseBtn, salesBtn, stockBtn,Create].forEach(btn => btn.disabled = false);
    loginBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    statusText.textContent = "✅ You are logged in. All modules are accessible.";
  }

  function disableDashboard() {
    [purchaseBtn, salesBtn, stockBtn,Create].forEach(btn => btn.disabled = true);
    loginBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
    statusText.textContent = "🔒 Please login to access system features.";
  }
function createaccount(){

}


  // --- Button actions ---
  loginBtn.addEventListener("click", () => {
    window.location.href = "/login";
  });
const signupBtn = document.getElementById("Create");
signupBtn.addEventListener("click", () => {
  window.location.href = '/signup';
});
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("token");
    disableDashboard();
  });

  purchaseBtn.addEventListener("click", () => {
    window.location.href = "/purchase";
  });

  salesBtn.addEventListener("click", () => {
    window.location.href = "/sales";
  });

  stockBtn.addEventListener("click", () => {
    window.location.href = "/stock";
  });
});

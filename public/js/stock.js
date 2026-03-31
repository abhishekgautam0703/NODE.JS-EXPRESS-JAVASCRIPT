async function loadStock() {
  const res = await fetch("/api/stock");
  const data = await res.json();

  const body = document.getElementById("stockBody");
  body.innerHTML = "";
  data.forEach(row => {
    body.innerHTML += `<tr><td>${row.item_name}</td><td>${row.quantity}</td></tr>`;
  });
}

window.onload = loadStock;

purchaseBtn.addEventListener("click", () => {
    window.location.href = "/PurchaseData";
  });

  salesBtn.addEventListener("click", () => {
    window.location.href = "/SaleData";
  });

  stockBtn.addEventListener("click", () => {
    window.location.href = "/Inventory";
  });

async function addSale() {
  const Sale = {
    date: document.getElementById("P_date").value,
    Type: document.getElementById("S_type").value,
    company: document.getElementById("P_CName").value,
    invoice_no: document.getElementById("P_Invoice").value,
    invoice_amount: document.getElementById("P_InvoiceValue").value,
    quantity: document.getElementById("P_Quantity").value
  };
  const rows = document.querySelectorAll("#Item_Body tr");
  const items = [];

  rows.forEach(row => {

    items.push({
      item: row.querySelector('[name="item[]"]').value,
      brand: row.querySelector('[name="brand[]"]').value,
      qty: row.querySelector('[name="qty[]"]').value,
      price: row.querySelector('[name="price[]"]').value,
      serial: row.querySelector('[name="serial[]"]').value,
      description: row.querySelector('[name="description[]"]').value
    });

  });


const res = await fetch("/api/sales", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ Sale, items })
});
  const data = await res.json();
  document.getElementById("msg").innerText = data.message;
   document.querySelector("form").reset();
    document.getElementById("Item_Body").innerHTML = "";
}


 function addrows() {
  const tbody = document.getElementById("Item_Body");
  const row = `
    <tr>
      <td><input type="text" name="item[]" placeholder="Item Name "required></td>
      <td>
      <input type="text" name="brand[]" placeholder="Enter brand" >
      </td>
      <td><input type="number" name="qty[]" min="1" placeholder="Enter Quantity"></td>
      <td><input type="text" name="price[]" id="numeric-input" inputmode="numeric" pattern="[0-9]*" placeholder="Enter Unit Price"></td>
       <td><input type="text" name="serial[]" placeholder="Enter Serial Number" required></td>
      <td><input type="text" name="description[]" placeholder="Item Description" ></td>
      <td><button type="button" onclick="removeRow(this)">❌</button></td>
    </tr>`;
  tbody.insertAdjacentHTML("beforeend", row);
}
function removeRow(button) {
  const row = button.closest("tr"); 
  row.remove();                     
}

async function Searchbyinvoice(){

    const invoice = document.getElementById("pd_invoice").value;
    console.log(invoice);

    const res = await fetch("/api/purchase/search",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({ invoice })
    });

    const data = await res.json();

    console.log(data);

    const tbody = document.getElementById("purchasedata");

    tbody.innerHTML = "";  

    data.data.forEach(row => {

        const tr = document.createElement("tr");

        tr.innerHTML =  `
        <td>${row.Type}</td>
        <td>${row.Company_Name}</td>
        <td>${row.Invoice_No}</td>
        <td>${row.Invoice_Date}</td>
        <td>${row.Total_Quantity}</td>
        <td>${row.Invoice_Amount}</td>
        <td>${row.Item_Name}</td>
        <td>${row.Brand_Name}</td>
        <td>${row.Serail_No}</td>
        <td>${row.Unit_Price}</td>
        <td>${row.Quantity}</td>
        <td>${row.Description}</td>

        <td>
            <button onclick="editRow(this)">Edit</button>
        </td>
    `;

        tbody.appendChild(tr);

    });

}

async function Searchbydate() {
    const from=document.getElementById("pd_From").value;
    const to=document.getElementById("pd_To").value;

    const res=await fetch("/api/purchase/searchbydate",{
        method:"Post",
         headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({from,to})
        
   });

     const data = await res.json();
      console.log(data);

    const tbody = document.getElementById("purchasedata");

    tbody.innerHTML = "";   // purana data clear

    data.data.forEach(row => {

        const tr = document.createElement("tr");

        tr.innerHTML =  `
        <td>${row.date}</td>
        <td>${row.Company_Name}</td>
        <td>${row.Invoice_No}</td>
        <td>${row.Invoice_Date}</td>
        <td>${row.Total_Quantity}</td>
        <td>${row.Invoice_Amount}</td>
        <td>${row.Item_Name}</td>
        <td>${row.Brand_Name}</td>
        <td>${row.Serail_No}</td>
        <td>${row.Unit_Price}</td>
        <td>${row.Quantity}</td>
        <td>${row.Description}</td>

        <td>
            <button onclick="editRow(this)">Edit</button>
        </td>
    `;

        tbody.appendChild(tr);

    });

}
    


function editRow(btn){

    const tr = btn.parentElement.parentElement;

    const tds = tr.querySelectorAll("td");

    for(let i=0; i<tds.length-1; i++){

        const value = tds[i].innerText;

        tds[i].innerHTML = `<input value="${value}" style="width:100%">`;

    }

    btn.innerText = "Update";
    btn.onclick = function(){
        updateRow(this);
    }

}
async function updateRow(btn){

    const tr = btn.parentElement.parentElement;
    const inputs = tr.querySelectorAll("input");

    const updatedData = {
        date: inputs[0].value,
        company: inputs[1].value,
        invoice: inputs[2].value,
        invoice_date: inputs[3].value,
        total_qty: inputs[4].value,
        amount: inputs[5].value,
        item: inputs[6].value,
        brand: inputs[7].value,
        serial: inputs[8].value,
        price: inputs[9].value,
        qty: inputs[10].value,
        desc: inputs[11].value
    };

    const res = await fetch("/api/Purchase/update",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(updatedData)
    });

    const data = await res.json();

    if(data.success){

        inputs.forEach(input=>{
            const td = input.parentElement;
            td.innerHTML = input.value;
        });

        btn.innerText="Edit";
        btn.onclick=function(){ editRow(this); };

        alert("Updated successfully");

    }else{
        alert("Update failed");
    }

}
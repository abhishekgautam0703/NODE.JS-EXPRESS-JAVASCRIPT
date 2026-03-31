window.onload=function (){
    loadStockData();
};

async function loadStockData(){
    const res=await fetch("/api/Inventory/load",{
        method:"POST",
        headers:{
            "content-Type":"application/json"
        },
        body:JSON.stringify()
    });
    const data=await res.json();
      console.log(data);

    const tbody = document.getElementById("purchasedata");

    tbody.innerHTML = "";  

    data.data.forEach(row => {

        const tr = document.createElement("tr");

        tr.innerHTML =  `
        <td>${row.ID}</td>
        <td>${row.Item_Name}</td>
        <td>${row.Brand_Name}</td>
        <td>${row.Quantity}</td>
        <td>${row.Unit_Price}</td>
        <td>${row.Description}</td>

        <td>
            <button onclick="editRow(this)">Edit</button>
        </td>
    `;

        tbody.appendChild(tr);

    });

}

async function Searchbyitem(){

    const item = document.getElementById("pd_item").value;

    const res = await fetch("/api/Inventory/search",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({ item })
    });

    const data = await res.json();

    console.log(data);

    const tbody = document.getElementById("purchasedata");

    tbody.innerHTML = "";  

    data.data.forEach(row => {

        const tr = document.createElement("tr");

        tr.innerHTML =  `
        <td>${row.ID}</td>
        <td>${row.Item_Name}</td>
        <td>${row.Brand_Name}</td>
        <td>${row.Quantity}</td>
        <td>${row.Unit_Price}</td>
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
        id:inputs[0].value,
        item: inputs[1].value,
        brand: inputs[2].value,
        qty: inputs[3].value,
        price:inputs[4].value,
        desc: inputs[5].value
    };

    const res = await fetch("/api/Inventory/update",{
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
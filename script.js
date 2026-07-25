function trackOrder() {

    let order = document.getElementById("orderNo").value.trim();
    let result = document.getElementById("result");

    if(order==""){

        result.innerHTML=`
        <div style="background:#fff3cd;border-left:5px solid #ff9800;padding:15px;border-radius:10px;text-align:center;color:#8a6d3b;font-weight:bold;">
        ⚠ براہِ کرم اپنا آرڈر نمبر درست درج کریں۔
        </div>`;

        return;
    }

    result.innerHTML=`
    <div style="text-align:center;padding:20px;font-size:18px;">
    ⏳ Loading...
    </div>`;

    fetch("https://script.google.com/macros/s/AKfycbwAnKhXTJqXLprnoEvaTByiaPiVKolTab1jKZ3niHpYS1wZeoiOE4cTuyEz3mki87CV/exec?order="+encodeURIComponent(order))

    .then(response=>response.json())

    .then(data=>{

        if(!data || data.success===false || data.message==="Order Not Found"){

            result.innerHTML=`
            <div style="background:#ffe5e5;border-left:5px solid red;padding:18px;border-radius:12px;text-align:center;color:red;font-weight:bold;">
            ❌ آرڈر نمبر نہیں ملا، براہِ کرم درست آرڈر نمبر درج کریں۔
            </div>`;

            return;
        }

        let color="#0d6efd";

        if(data.status.toLowerCase().includes("design")) color="#ff9800";
        else if(data.status.toLowerCase().includes("printing")) color="#6f42c1";
        else if(data.status.toLowerCase().includes("ready")) color="#28a745";
        else if(data.status.toLowerCase().includes("deliver")) color="#198754";

        result.innerHTML=`

<div style="
background:#fff;
border-radius:15px;
padding:20px;
margin-top:20px;
box-shadow:0 10px 25px rgba(0,0,0,.12);
border-top:6px solid ${color};
">

<h2 style="
color:${color};
text-align:center;
margin-bottom:20px;
">

📦 Order Details

</h2>

<table style="width:100%;border-collapse:collapse;">

<tr>

<td style="padding:12px;font-weight:bold;">Order No</td>

<td style="padding:12px;">${data.order}</td>

</tr>

<tr style="background:#f7f7f7;">

<td style="padding:12px;font-weight:bold;">Customer</td>

<td style="padding:12px;">${data.customer}</td>

</tr>

<tr>

<td style="padding:12px;font-weight:bold;">Status</td>

<td style="padding:12px;color:${color};font-weight:bold;">

${data.status}

</td>

</tr>

<tr style="background:#f7f7f7;">

<td style="padding:12px;font-weight:bold;">Date</td>

<td style="padding:12px;">${data.date}</td>

</tr>

<tr>

<td style="padding:12px;font-weight:bold;">Remarks</td>

<td style="padding:12px;">${data.remarks}</td>

</tr>

</table>

</div>

`;

    })

    .catch(error=>{

        result.innerHTML=`
        <div style="background:#ffe5e5;padding:18px;border-radius:10px;text-align:center;color:red;font-weight:bold;">
        ❌ Connection Error
        </div>`;

        console.log(error);

    });

}

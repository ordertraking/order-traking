function trackOrder() {

    let order = document.getElementById("orderNo").value.trim();
    let result = document.getElementById("result");

    if (order === "") {
        result.innerHTML = `
        <div style="
            background:#fff3f0;
            border:2px solid #ff5a00;
            border-radius:12px;
            padding:20px;
            text-align:center;
            color:#d32f2f;
            font-family:'Noto Nastaliq Urdu', serif;
            font-size:22px;
            line-height:2;">
            براہِ کرم اپنا آرڈر نمبر درج کریں۔
        </div>`;
        return;
    }

    result.innerHTML = `
    <div style="
        text-align:center;
        padding:20px;
        color:#ff5a00;
        font-weight:bold;
        font-size:18px;">
        ⏳ Loading...
    </div>`;

    fetch("https://script.google.com/macros/s/AKfycbwAnKhXTJqXLprnoEvaTByiaPiVKolTab1jKZ3niHpYS1wZeoiOE4cTuyEz3mki87CV/exec?order=" + encodeURIComponent(order))

    .then(response => response.json())

    .then(data => {

        if (!data || data.success === false || data.message === "Order Not Found") {

            result.innerHTML = `
            <div style="
                background:#fff3f0;
                border:2px solid #ff5a00;
                border-radius:12px;
                padding:20px;
                text-align:center;
                color:#d32f2f;
                font-family:'Noto Nastaliq Urdu', serif;
                font-size:22px;
                line-height:2;">
                <strong>براہِ کرم اپنا آرڈر نمبر درست درج کریں۔</strong><br>
                <span style="font-size:18px;color:#555;">
                    درست آرڈر نمبر کا انتخاب کریں۔
                </span>
            </div>`;
            return;
        }

        let status = (data.status || "").toLowerCase();

        let statusColor = "#ff5a00";
        let statusIcon = "📦";

        if(status.includes("received")){
            statusColor="#2196f3";
            statusIcon="📥";
        }
        else if(status.includes("design")){
            statusColor="#ff9800";
            statusIcon="🎨";
        }
        else if(status.includes("printing")){
            statusColor="#000";
            statusIcon="🖨️";
        }
        else if(status.includes("ready")){
            statusColor="#28a745";
            statusIcon="✅";
        }
        else if(status.includes("delivered")){
            statusColor="#198754";
            statusIcon="🚚";
        }

        let orderDate = data.date;

        if(orderDate){
            let d = new Date(orderDate);
            if(!isNaN(d)){
                orderDate = d.toLocaleDateString("en-GB");
            }
        }

        result.innerHTML = `

        <div style="
            background:#fff;
            border-top:5px solid ${statusColor};
            border-left:5px solid #000;
            border-radius:15px;
            padding:20px;
            box-shadow:0 8px 20px rgba(0,0,0,.12);
            margin-top:20px;">

            <h3 style="
                text-align:center;
                color:${statusColor};
                margin-bottom:20px;">
                ${statusIcon} Order Details
            </h3>

            <table style="width:100%;border-collapse:collapse;">

                <tr>
                    <td style="padding:10px;font-weight:bold;">📦 Order No</td>
                    <td style="padding:10px;">${data.order}</td>
                </tr>

                <tr style="background:#f8f8f8;">
                    <td style="padding:10px;font-weight:bold;">👤 Customer</td>
                    <td style="padding:10px;">${data.customer}</td>
                </tr>

                <tr>
                    <td style="padding:10px;font-weight:bold;">📌 Status</td>
                    <td style="padding:10px;color:${statusColor};font-weight:bold;">
                        ${data.status}
                    </td>
                </tr>

                <tr style="background:#f8f8f8;">
                    <td style="padding:10px;font-weight:bold;">📅 Date</td>
                    <td style="padding:10px;">${orderDate}</td>
                </tr>

                <tr>
                    <td style="padding:10px;font-weight:bold;">📝 Remarks</td>
                    <td style="padding:10px;">${data.remarks}</td>
                </tr>

            </table>

        </div>`;

    })

    .catch(error => {

        result.innerHTML = `
        <div style="
            background:#fff3f0;
            border:2px solid red;
            border-radius:12px;
            padding:20px;
            text-align:center;
            color:red;
            font-weight:bold;">
            ❌ Connection Error
        </div>`;

        console.log(error);

    });

}

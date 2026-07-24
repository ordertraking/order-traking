function trackOrder() {

    let order = document.getElementById("orderNo").value.trim();
    let result = document.getElementById("result");

    if (order === "") {
        result.innerHTML = `
        <div style="background:#ffe5e5;padding:15px;border-radius:10px;color:#d60000;text-align:center;font-weight:bold;">
            ⚠ Please Enter Order Number
        </div>`;
        return;
    }

    result.innerHTML = `
    <div style="text-align:center;padding:15px;">
        ⏳ Loading...
    </div>`;

    fetch("https://script.google.com/macros/s/AKfycbwAnKhXTJqXLprnoEvaTByiaPiVKolTab1jKZ3niHpYS1wZeoiOE4cTuyEz3mki87CV/exec?order=" + encodeURIComponent(order))

    .then(response => response.json())

    .then(data => {

        if (!data || data.success === false || data.message === "Order Not Found") {

            result.innerHTML = `
            <div style="background:#ffe5e5;border-left:5px solid red;padding:15px;border-radius:10px;color:red;font-weight:bold;text-align:center;">
                ❌ Order Not Found
            </div>`;
            return;
        }

        let statusColor = "#0d6efd";
        let statusIcon = "📦";

        switch(data.status.toLowerCase()){

            case "received":
                statusColor="#0d6efd";
                statusIcon="📥";
                break;

            case "design":
            case "design in progress":
                statusColor="#ff9800";
                statusIcon="🎨";
                break;

            case "printing":
                statusColor="#6f42c1";
                statusIcon="🖨️";
                break;

            case "ready":
                statusColor="#198754";
                statusIcon="✅";
                break;

            case "delivered":
                statusColor="#28a745";
                statusIcon="🚚";
                break;

            default:
                statusColor="#0d6efd";
                statusIcon="📦";
        }

        result.innerHTML = `
        <div style="
            background:#ffffff;
            border-radius:15px;
            padding:20px;
            box-shadow:0 6px 15px rgba(0,0,0,.12);
            border-top:6px solid ${statusColor};
            font-family:Arial,sans-serif;
        ">

            <h3 style="
                text-align:center;
                color:${statusColor};
                margin-bottom:18px;
            ">
                ${statusIcon} Order Details
            </h3>

            <table style="width:100%;border-collapse:collapse;">

                <tr>
                    <td style="padding:10px;font-weight:bold;">Order No</td>
                    <td style="padding:10px;">${data.order}</td>
                </tr>

                <tr style="background:#f8f9fa;">
                    <td style="padding:10px;font-weight:bold;">Customer</td>
                    <td style="padding:10px;">${data.customer}</td>
                </tr>

                <tr>
                    <td style="padding:10px;font-weight:bold;">Status</td>
                    <td style="padding:10px;color:${statusColor};font-weight:bold;">
                        ${data.status}
                    </td>
                </tr>

                <tr style="background:#f8f9fa;">
                    <td style="padding:10px;font-weight:bold;">Date</td>
                    <td style="padding:10px;">${data.date}</td>
                </tr>

                <tr>
                    <td style="padding:10px;font-weight:bold;">Remarks</td>
                    <td style="padding:10px;">${data.remarks}</td>
                </tr>

            </table>

        </div>`;
    })

    .catch(error => {

        result.innerHTML = `
        <div style="background:#ffe5e5;padding:15px;border-radius:10px;color:red;text-align:center;font-weight:bold;">
            ❌ Connection Error
        </div>`;

        console.log(error);

    });

}

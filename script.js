function trackOrder() {

    let order = document.getElementById("orderNo").value.trim();
    let result = document.getElementById("result");

    if (order === "") {
        result.innerHTML = `
        <div style="
            background:#fff3f0;
            border-left:5px solid #ff5a00;
            padding:15px;
            border-radius:10px;
            color:#ff5a00;
            text-align:center;
            font-weight:bold;">
            ⚠ Please Enter Order Number
        </div>`;
        return;
    }

    result.innerHTML = `
    <div style="
        text-align:center;
        padding:15px;
        color:#ff5a00;
        font-weight:bold;">
        ⏳ Loading...
    </div>`;

    fetch("https://script.google.com/macros/s/AKfycbwAnKhXTJqXLprnoEvaTByiaPiVKolTab1jKZ3niHpYS1wZeoiOE4cTuyEz3mki87CV/exec?order=" + encodeURIComponent(order))

    .then(response => response.json())

    .then(data => {

        if (!data || data.success === false || data.message === "Order Not Found") {

            result.innerHTML = `
            <div style="
                background:#fff3f0;
                border-left:5px solid red;
                padding:15px;
                border-radius:10px;
                color:red;
                text-align:center;
                font-weight:bold;">
                ❌ Order Not Found
            </div>`;
            return;
        }

        let statusColor = "#ff5a00";
        let statusIcon = "📦";

        switch ((data.status || "").toLowerCase()) {

            case "received":
                statusColor = "#ff5a00";
                statusIcon = "📥";
                break;

            case "design":
            case "design in progress":
                statusColor = "#ff7a00";
                statusIcon = "🎨";
                break;

            case "printing":
                statusColor = "#000000";
                statusIcon = "🖨️";
                break;

            case "ready":
                statusColor = "#28a745";
                statusIcon = "✅";
                break;

            case "delivered":
                statusColor = "#198754";
                statusIcon = "🚚";
                break;

            default:
                statusColor = "#ff5a00";
                statusIcon = "📦";
        }

        result.innerHTML = `
        <div style="
            background:#ffffff;
            border-top:5px solid #ff5a00;
            border-left:5px solid #000;
            border-radius:15px;
            padding:20px;
            margin-top:20px;
            box-shadow:0 8px 20px rgba(0,0,0,.12);
            font-family:Arial,sans-serif;
        ">

            <h3 style="
                text-align:center;
                color:#ff5a00;
                margin-bottom:20px;
                font-size:22px;">
                ${statusIcon} Order Details
            </h3>

            <table style="width:100%;border-collapse:collapse;font-size:15px;">

                <tr>
                    <td style="padding:12px;font-weight:bold;color:#444;">📦 Order No</td>
                    <td style="padding:12px;">${data.order}</td>
                </tr>

                <tr style="background:#f8f8f8;">
                    <td style="padding:12px;font-weight:bold;color:#444;">👤 Customer</td>
                    <td style="padding:12px;">${data.customer}</td>
                </tr>

                <tr>
                    <td style="padding:12px;font-weight:bold;color:#444;">📌 Status</td>
                    <td style="padding:12px;color:${statusColor};font-weight:bold;">
                        ${data.status}
                    </td>
                </tr>

                <tr style="background:#f8f8f8;">
                    <td style="padding:12px;font-weight:bold;color:#444;">📅 Date</td>
                    <td style="padding:12px;">${data.date}</td>
                </tr>

                <tr>
                    <td style="padding:12px;font-weight:bold;color:#444;">📝 Remarks</td>
                    <td style="padding:12px;">${data.remarks}</td>
                </tr>

            </table>

        </div>`;
    })

    .catch(error => {

        result.innerHTML = `
        <div style="
            background:#fff3f0;
            border-left:5px solid red;
            padding:15px;
            border-radius:10px;
            color:red;
            text-align:center;
            font-weight:bold;">
            ❌ Connection Error
        </div>`;

        console.log(error);

    });

}

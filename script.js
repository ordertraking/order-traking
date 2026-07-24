function trackOrder() {

    let order = document.getElementById("orderNo").value.trim();

    if (order === "") {
        document.getElementById("result").innerHTML =
        "<p style='color:red;font-weight:bold;'>⚠ Please enter Order Number.</p>";
        return;
    }

    document.getElementById("result").innerHTML =
    "<p style='text-align:center;'>⏳ Loading...</p>";

    fetch("https://script.google.com/macros/s/AKfycbwAnKhXTJqXLprnoEvaTByiaPiVKolTab1jKZ3niHpYS1wZeoiOE4cTuyEz3mki87CV/exec?order=" + encodeURIComponent(order))

    .then(response => response.json())

    .then(data => {

        if (data.success === false || data.message === "Order Not Found") {

            document.getElementById("result").innerHTML =
            "<p style='color:red;font-weight:bold;text-align:center;'>❌ Order Not Found</p>";

        } else {

            let statusColor = "#007bff";

            if (data.status.toLowerCase().includes("design")) statusColor = "#ff9800";
            else if (data.status.toLowerCase().includes("printing")) statusColor = "#673ab7";
            else if (data.status.toLowerCase().includes("ready")) statusColor = "#28a745";
            else if (data.status.toLowerCase().includes("delivered")) statusColor = "#198754";

            document.getElementById("result").innerHTML = `
            <div style="
                background:#ffffff;
                border:1px solid #ddd;
                border-left:6px solid ${statusColor};
                border-radius:12px;
                padding:18px;
                margin-top:15px;
                box-shadow:0 4px 12px rgba(0,0,0,.10);
                line-height:1.8;
                font-size:16px;
            ">

                <p><strong>📦 Order No:</strong> ${data.order}</p>

                <p><strong>👤 Customer:</strong> ${data.customer}</p>

                <p><strong>📌 Status:</strong>
                <span style="color:${statusColor};font-weight:bold;">
                ${data.status}
                </span></p>

                <p><strong>📅 Date:</strong> ${data.date}</p>

                <p><strong>📝 Remarks:</strong> ${data.remarks}</p>

            </div>
            `;
        }

    })

    .catch(error => {

        document.getElementById("result").innerHTML =
        "<p style='color:red;font-weight:bold;'>❌ Connection Error</p>";

        console.log(error);

    });

}

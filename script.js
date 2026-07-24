function trackOrder() {

  let order = document.getElementById("orderNo").value.trim();

  if (order === "") {
    document.getElementById("result").innerHTML =
      "<div style='color:red;text-align:center;'>Please enter Order Number.</div>";
    return;
  }

  document.getElementById("result").innerHTML =
    "<div style='text-align:center;'>⏳ Searching...</div>";

  fetch("https://script.google.com/macros/s/AKfycbwAnKhXTJqXLprnoEvaTByiaPiVKolTab1jKZ3niHpYS1wZeoiOE4cTuyEz3mki87CV/exec?order=" + encodeURIComponent(order))
    .then(response => response.json())
    .then(data => {

      if (data.success === false || data.message === "Order Not Found") {

        document.getElementById("result").innerHTML =
          "<div style='background:#ffebee;padding:15px;border-radius:10px;color:#d32f2f;text-align:center;'>❌ Order Not Found</div>";

        return;
      }

      let statusColor = "#2196F3";

      if (data.status == "Pending")
        statusColor = "#ff9800";

      if (data.status == "Completed")
        statusColor = "#4CAF50";

      if (data.status == "Delivered")
        statusColor = "#009688";

      document.getElementById("result").innerHTML = `
        <div style="margin-top:20px;background:#f8f9fa;padding:18px;border-radius:15px;box-shadow:0 5px 15px rgba(0,0,0,.1);">

          <h3 style="color:#0d47a1;margin-bottom:15px;">📦 Order Details</h3>

          <p><b>Order #</b> ${data.order}</p>

          <p><b>Customer</b> ${data.customer}</p>

          <p>
            <b>Status</b>
            <span style="
              background:${statusColor};
              color:#fff;
              padding:5px 12px;
              border-radius:20px;
              font-size:14px;
            ">
              ${data.status}
            </span>
          </p>

          <p><b>Date</b> ${data.date}</p>

          <p><b>Remarks</b><br>${data.remarks}</p>

        </div>
      `;

    })
    .catch(() => {
      document.getElementById("result").innerHTML =
        "<div style='background:#ffebee;padding:15px;border-radius:10px;color:#d32f2f;text-align:center;'>⚠️ Connection Error</div>";
    });
}

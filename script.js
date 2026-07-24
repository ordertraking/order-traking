function trackOrder() {

    let order = document.getElementById("orderNo").value.trim();

    if (order === "") {
        document.getElementById("result").innerHTML =
            "<p style='color:red;'>Please enter Order Number.</p>";
        return;
    }

    document.getElementById("result").innerHTML = "<p>Loading...</p>";

    fetch("https://script.google.com/macros/s/AKfycbwAnKhXTJqXLprnoEvaTByiaPiVKolTab1jKZ3niHpYS1wZeoiOE4cTuyEz3mki87CV/exec?order=" + encodeURIComponent(order))

    .then(response => response.json())

    .then(data => {

        if (data.success === false || data.message === "Order Not Found") {

            document.getElementById("result").innerHTML =
                "<p style='color:red;'>Order Not Found</p>";

        } else {

            document.getElementById("result").innerHTML = `
                <div style="background:#f5f5f5;padding:15px;border-radius:10px;">
                    <p><b>Order:</b> ${data.order}</p>
                    <p><b>Customer:</b> ${data.customer}</p>
                    <p><b>Status:</b> ${data.status}</p>
                    <p><b>Date:</b> ${data.date}</p>
                    <p><b>Remarks:</b> ${data.remarks}</p>
                </div>
            `;
        }

    })

    .catch(error => {

        document.getElementById("result").innerHTML =
            "<p style='color:red;'>Connection Error</p>";

        console.log(error);

    });

}

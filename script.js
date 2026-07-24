document.getElementById("result").innerHTML = `
<div class="result-card">

    <div class="card-header">
        <h3>📦 Order Details</h3>
        <span class="status processing">${data.status}</span>
    </div>

    <div class="info-row">
        <span>Order No</span>
        <strong>${data.order}</strong>
    </div>

    <div class="info-row">
        <span>Customer</span>
        <strong>${data.customer}</strong>
    </div>

    <div class="info-row">
        <span>Date</span>
        <strong>${data.date}</strong>
    </div>

    <div class="info-row">
        <span>Remarks</span>
        <strong>${data.remarks}</strong>
    </div>

</div>
`;

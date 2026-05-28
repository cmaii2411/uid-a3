const order = JSON.parse(localStorage.getItem('lastOrder'));

if (order) {
    const name = order.customer.firstName || 'there';

    document.getElementById('thankyou-heading').textContent = `Thank you, ${name}!`;

    document.getElementById('thankyou-order').textContent =
        `Order ${order.id} · ${order.date}`;

    if (order.customer.email) {
        document.getElementById('thankyou-email').textContent =
            `A confirmation will be sent to ${order.customer.email}`;
    }

    const summaryEl = document.getElementById('thankyou-summary');
    summaryEl.innerHTML = order.items.map(item => `
        <div class="ty-item">
            <span class="ty-item-name">${item.name} <span class="ty-item-size">· ${item.size}</span></span>
            <span class="ty-item-price">$${(item.price * item.qty).toLocaleString()}.00</span>
        </div>
    `).join('') + `
        <div class="ty-total">
            <span>Total</span>
            <span>$${order.total.toLocaleString()}.00 AUD</span>
        </div>
    `;
}

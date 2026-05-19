function renderCartPage() {
    const cart = getCart();
    const itemsEl = document.getElementById('cart-page-items');
    const qtyEl   = document.getElementById('cart-page-qty');
    const totalEl = document.getElementById('cart-page-total');

    const totalQty   = cart.reduce((t, c) => t + c.qty, 0);
    const totalPrice = cart.reduce((t, c) => t + c.price * c.qty, 0);

    if (qtyEl)   qtyEl.textContent   = `(${totalQty} item${totalQty !== 1 ? 's' : ''})`;
    if (totalEl) totalEl.textContent = `$${totalPrice.toLocaleString()}.00 AUD`;

    if (!itemsEl) return;

    if (cart.length === 0) {
        itemsEl.innerHTML = '<p class="cart-empty" style="padding:2rem 0;">Your cart is empty.</p>';
        return;
    }

    itemsEl.innerHTML = cart.map(item => `
        <div class="cart-page-item" data-id="${item.id}" data-size="${item.size}">
            <img src="${basePath}assets/images/${item.img}" alt="${item.name}">
            <div class="cart-page-item-info">
                <p class="cart-page-item-name">${item.name}</p>
                <p class="cart-page-item-size">
                    Size: ${item.size}
                    <span class="cart-page-change-size">Change size</span>
                </p>
            </div>
            <p class="cart-page-item-price">$${item.price.toLocaleString()}.00</p>
            <div class="cart-qty-control">
                <button class="cart-qty-btn minus">−</button>
                <span class="cart-qty-num">${item.qty}</span>
                <button class="cart-qty-btn plus">+</button>
            </div>
            <button class="cart-item-delete">
                <img src="${basePath}assets/icons/fi-rs-trash.svg" alt="remove">
            </button>
        </div>
    `).join('');

    itemsEl.querySelectorAll('.cart-page-item').forEach(row => {
        const id   = row.dataset.id;
        const size = row.dataset.size;
        row.querySelector('.minus').addEventListener('click', () => { updateCartQty(id, size, -1); renderCartPage(); });
        row.querySelector('.plus').addEventListener('click',  () => { updateCartQty(id, size, +1); renderCartPage(); });
        row.querySelector('.cart-item-delete').addEventListener('click', () => { removeFromCart(id, size); renderCartPage(); });
    });
}

renderCartPage();

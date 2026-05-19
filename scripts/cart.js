function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function addToCart(item) {
    const cart = getCart();
    const existing = cart.find(c => c.id === item.id && c.size === item.size);
    if (existing) {
        existing.qty += item.qty;
    } else {
        cart.push(item);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    openCart();
}

function removeFromCart(id,size) {
    const cart = getCart();
    const newCart = cart.filter(c => !(c.id === id && c.size === size));
    localStorage.setItem('cart', JSON.stringify(newCart));
    updateCartBadge();
}

function updateCartBadge() {
    const counter = document.querySelector(".cart-counter");
    const cart = getCart();
    const total = cart.reduce((t, c) => t + c.qty, 0);
    if (counter) {
        counter.textContent = total || '';
        counter.classList.toggle('active', total >= 1);
        counter.classList.remove('pop');
    }
}

function updateCartQty(id, size, delta) {
    const cart = getCart();
    const item = cart.find(c => c.id === id && c.size === size);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            removeFromCart(id, size);
            return;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function openCart() {
    const panel = document.getElementById('cart-panel');
    if (panel) panel.classList.add('open');
    renderCartDrawer();
}

function closeCart() {
    const panel = document.getElementById('cart-panel');
    if (panel) panel.classList.remove('open');
}

function renderCartDrawer() {
    const cart = getCart();
    const itemsEl = document.getElementById('cart-items');
    const qtyEl = document.getElementById('cart-qty');
    const totalEl = document.getElementById('cart-total');
    if (!itemsEl) return;

    const totalQty = cart.reduce((t, c) => t + c.qty, 0);
    const totalPrice = cart.reduce((t, c) => t + c.price * c.qty, 0);
    if (qtyEl) qtyEl.textContent = `(${totalQty} item)`;
    if (totalEl) totalEl.textContent = `$${totalPrice.toLocaleString()}.00 AUD`;

    if (cart.length === 0) {
        itemsEl.innerHTML = '<h3 class="cart-empty">Your cart is empty.</h3>';
        return;
    }

    itemsEl.innerHTML = cart.map(item => `
        <div class="cart-item-card" data-id="${item.id}" data-size="${item.size}">
            <img src="${basePath}assets/images/${item.img}" alt="${item.name}">
            <div class="cart-item-info">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-size">Size: ${item.size} <span class="change-size">Change size</span></p>
                <div class="cart-item-price-row">
                    <span class="cart-item-price">$${item.price.toLocaleString()}.00</span>
                    <span class="cart-item-subtotal">Subtotal: $${(item.price * item.qty).toLocaleString()}.00</span>
                </div>
                <div class="cart-item-controls">
                    <div class="cart-qty-control">
                        <button class="cart-qty-btn minus">−</button>
                        <span class="cart-qty-num">${item.qty}</span>
                        <button class="cart-qty-btn plus">+</button>
                    </div>
                    <button class="cart-item-delete">
                        <img src="${basePath}assets/icons/fi-rs-trash.svg" alt="remove">
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    itemsEl.querySelectorAll('.cart-item-card').forEach(card => {
        const id = card.dataset.id;
        const size = card.dataset.size;
        card.querySelector('.minus').addEventListener('click', () => { updateCartQty(id, size, -1); renderCartDrawer(); });
        card.querySelector('.plus').addEventListener('click', () => { updateCartQty(id, size, +1); renderCartDrawer(); });
        card.querySelector('.cart-item-delete').addEventListener('click', () => { removeFromCart(id, size); renderCartDrawer(); });
    });
}
let currentStep = 1;

const stepIcons = {
    1: { off: 'bag.svg',    on: 'red-bag.svg'    },
    2: { off: 'user.svg',   on: 'red-user.svg'   },
    3: { off: 'credit.svg', on: 'red-credit.svg' },
};

function updateProgress() {
    document.querySelectorAll('.checkout-step').forEach(el => {
        const step = parseInt(el.dataset.step);
        const active = step === currentStep;
        el.classList.toggle('active', active);
        el.querySelector('.step-icon').src =
            `${basePath}assets/icons/${active ? stepIcons[step].on : stepIcons[step].off}`;
    });
}

function renderOrderSummary() {
    const cart = getCart();
    const totalQty   = cart.reduce((t, c) => t + c.qty, 0);
    const totalPrice = cart.reduce((t, c) => t + c.price * c.qty, 0);
    document.getElementById('summary-item-count').textContent =
        `${totalQty} item${totalQty !== 1 ? 's' : ''}`;
    document.getElementById('summary-item-total').textContent =
        `$${totalPrice.toLocaleString()}.00`;
    document.getElementById('summary-total').textContent =
        `$${totalPrice.toLocaleString()}.00`;
}

function goToStep(n) {
    currentStep = n;
    updateProgress();
    [renderStep1, renderStep2, renderStep3][n - 1]();
}

/* ── Step 1: Order ── */
function renderStep1() {
    const cart  = getCart();
    const panel = document.getElementById('checkout-panel');

    if (cart.length === 0) {
        panel.innerHTML = '<p class="cart-empty" style="padding:2rem 0;">Your cart is empty.</p>';
        return;
    }

    panel.innerHTML = `
        <div class="cart-page-items" id="checkout-items">
            ${cart.map(item => `
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
            `).join('')}
        </div>
        <button class="btn-continue" id="btn-continue">CONTINUE</button>
    `;

    panel.querySelectorAll('.cart-page-item').forEach(row => {
        const { id, size } = row.dataset;
        row.querySelector('.minus').addEventListener('click', () => {
            updateCartQty(id, size, -1); renderStep1(); renderOrderSummary();
        });
        row.querySelector('.plus').addEventListener('click', () => {
            updateCartQty(id, size, +1); renderStep1(); renderOrderSummary();
        });
        row.querySelector('.cart-item-delete').addEventListener('click', () => {
            removeFromCart(id, size); renderStep1(); renderOrderSummary();
        });
    });

    panel.querySelector('#btn-continue').addEventListener('click', () => goToStep(2));
}

/* ── Step 2: Details ── */
function renderStep2() {
    const panel = document.getElementById('checkout-panel');
    panel.innerHTML = `
        <div class="form-section">
            <p class="form-section-title">Contact</p>
            <div class="form-grid">
                <input class="checkout-input" type="email" placeholder="Email">
                <input class="checkout-input" type="tel"   placeholder="Phone">
            </div>
        </div>
        <div class="form-section">
            <p class="form-section-title">Delivery</p>
            <div class="form-grid full">
                <select class="checkout-select">
                    <option>Australia</option>
                    <option>New Zealand</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                </select>
            </div>
            <div class="form-grid">
                <input class="checkout-input" placeholder="Address">
                <input class="checkout-input" placeholder="Suburb">
            </div>
            <div class="form-grid">
                <input class="checkout-input" placeholder="Postcode">
                <select class="checkout-select">
                    <option value="">State / Territory</option>
                    <option>Victoria</option>
                    <option>New South Wales</option>
                    <option>Queensland</option>
                    <option>Western Australia</option>
                    <option>South Australia</option>
                    <option>Tasmania</option>
                    <option>ACT</option>
                    <option>Northern Territory</option>
                </select>
            </div>
            <div class="form-grid full">
                <input class="checkout-input" placeholder="Apartment, suite, etc. (optional)">
            </div>
            <div class="form-grid">
                <input class="checkout-input" placeholder="First name">
                <input class="checkout-input" placeholder="Last name">
            </div>
        </div>
        <button class="btn-continue" id="btn-continue">CONTINUE</button>
    `;

    panel.querySelector('#btn-continue').addEventListener('click', () => goToStep(3));
}

/* ── Step 3: Payment ── */
function renderStep3() {
    const panel = document.getElementById('checkout-panel');
    panel.innerHTML = `
        <div class="payment-wrap">
            <p class="express-label">Express Checkout</p>
            <button class="btn-apple-pay">
                <img src="${basePath}assets/icons/apple.svg" alt="Apple">
                Pay
            </button>
            <div class="or-divider">Or</div>
            <p class="payment-title">Payment Details</p>
            <div class="payment-fields">
                <input class="checkout-input" placeholder="Name on Card">
                <input class="checkout-input" placeholder="Card Number" inputmode="numeric">
                <div class="payment-row">
                    <input class="checkout-input" placeholder="CVV"        inputmode="numeric">
                    <input class="checkout-input" placeholder="Expiration" inputmode="numeric">
                </div>
                <button class="btn-pay-now">PAY NOW</button>
            </div>
        </div>
    `;
}

/* ── Init ── */
updateProgress();
renderOrderSummary();
renderStep1();

/* ===== NAV BAR ====== */

const navHTML = `
<nav>
    <div class="header">
        <div class="logo">
            <img src="${basePath}assets/images/logo 1.png" alt="logo">
        </div>
        <div class="cart-and-searchbar">
            <img id="cart" src="${basePath}assets/icons/fi-rr-shopping-bag.svg" alt="cart">
            <div class="cart-counter"></div>
            <div class="search-wrapper">
                <input type="text" id="search" name="search" placeholder="Search Cat Climbing Wall">
                <img src="${basePath}assets/icons/fi-rr-search-pink.svg" class="search-icon" alt="search">
            </div>
        </div>
    </div>
    <div class="categories">
        <h2>CAT WALLS</h2>
        <h2>STAIRCASE</h2>
        <h2>RAISED FEEDER</h2>
        <h2>CURVYNEST</h2>
        <h2>TAIL TEASER</h2>
        <h2>SCRATCH BOARD</h2>
        <h2>ABOUT US</h2>
    </div>
</nav>
`;

document.getElementById('nav-placeholder').innerHTML = navHTML;
document.getElementById('cart').addEventListener('click', openCart);

/* SEARCH — navigate to productlist with ?q= on Enter or icon click */
const searchInput = document.getElementById('search');
const searchIcon  = document.querySelector('.search-icon');

function doSearch() {
    const q = searchInput.value.trim();
    if (!q) return;
    window.location.href = `${basePath}pages/productlist.html?q=${encodeURIComponent(q)}`;
}

searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); } );
searchIcon.addEventListener('click', doSearch);

const footerHTML = `
<footer>
        <div class="left-footer">
            <img src="${basePath}assets/images/logo 1.png">
            <div class="footer-contact">
                <img src="${basePath}assets/images/fb.svg">
                <img src="${basePath}assets/images/ig.svg">
            </div>
        </div>

        <div class="right-footer">
            <h3>Join our community</h3>
            <input type="text" name="email" id="email" placeholder="Your Email">
            <button class="btn-primary">Submit</button>
        </div>
</footer>
    `
document.getElementById('footer-placeholder').innerHTML = footerHTML;

const cartPanel = document.getElementById('cart-panel');

const panelHTML = `
    <div id="cart-drawer">
        <div class="cart-header">
            <div class="cart-title">
                <span class="cart-heading">Cart</span>
                <span id="cart-qty"></span>
            </div>
            <button id="cart-close"><img src="${basePath}assets/icons/fi-rr-cross.svg" alt="close"></button>
        </div>

        <div id="cart-items"></div>

        <div class="cart-upsell">
            <img src="${basePath}assets/images/feeder.png" alt="feeder">
            <div class="cart-upsell-info">
                <p class="cart-upsell-label">Buy It With</p>
                <p class="cart-upsell-name">Anti-Ant Cat Raised Feeder</p>
                <p class="cart-upsell-price">$100.00</p>
            </div>
            <button class="btn-quick-add">QUICK ADD</button>
        </div>

        <div class="cart-footer">
            <a href="${basePath}pages/cart.html" class="cart-view-full">View Full Cart</a>
            <div class="cart-coupon">
                <p class="cart-coupon-label">Coupon</p>
                <div class="cart-coupon-row">
                    <input type="text" placeholder="Add Discount Code">
                    <button class="btn-apply">APPLY</button>
                </div>
            </div>
            <button class="btn-checkout">
                <span>CHECKOUT</span>
                <span id="cart-total"></span>
            </button>
        </div>
    </div>
`;

if (cartPanel) {
    cartPanel.innerHTML = panelHTML;
    cartPanel.addEventListener('click', closeCart);
    document.getElementById('cart-close').addEventListener('click', closeCart);
    document.getElementById('cart-drawer').addEventListener('click', e => e.stopPropagation());
}

updateCartBadge();
/* ===== NAV BAR ====== */

const navHTML = `
<nav>
    <div class="header">
        <div class="nav-left">
            <button id="hamburger" class="hamburger">
                <img src="${basePath}assets/icons/fi-rr-menu-burger.svg" alt="menu">
            </button>
            <div class="logo">
                <a href="${basePath}index.html"><img src="${basePath}assets/images/logo 1.png" alt="logo"></a>
            </div>
        </div>
        <div class="search-wrapper">
            <input type="text" id="search" name="search" placeholder="Search Cat Climbing Wall">
            <img src="${basePath}assets/icons/fi-rr-search-pink.svg" class="search-icon" alt="search">
        </div>
        <div class="cart-wrapper">
            <button class="mobile-search-btn" id="mobile-search-btn">
                <img src="${basePath}assets/icons/fi-rr-search.svg" alt="search">
            </button>
            <img id="cart" src="${basePath}assets/icons/fi-rr-shopping-bag.svg" alt="cart">
            <div class="cart-counter"></div>
        </div>
    </div>
    <div class="categories">
        <a href="${basePath}pages/productlist.html"><h2>CAT WALLS</h2></a>
        <h2>STAIRCASE</h2>
        <h2>RAISED FEEDER</h2>
        <h2>CURVYNEST</h2>
        <h2>TAIL TEASER</h2>
        <h2>SCRATCH BOARD</h2>
        <h2>ABOUT US</h2>
    </div>
</nav>
`;

const drawerHTML = `
<div id="mobile-drawer">
    <button id="drawer-close">
        <img src="${basePath}assets/icons/fi-rr-cross.svg" alt="close">
    </button>
    <div class="drawer-links">
        <a href="${basePath}pages/productlist.html" class="drawer-link">Cat Walls</a>
        <a href="#" class="drawer-link">Scratch Board</a>
        <a href="#" class="drawer-link">Cat Staircase</a>
        <a href="#" class="drawer-link">Curvynest</a>
        <a href="#" class="drawer-link">Cat Tail Teaser</a>
        <a href="#" class="drawer-link">Cat Raised Feeder</a>
        <a href="#" class="drawer-link">Specials</a>
        <a href="#" class="drawer-link">About Us</a>
    </div>
</div>
<div id="drawer-overlay"></div>
`;

document.body.insertAdjacentHTML('afterbegin', drawerHTML);

function openDrawer() {
    document.getElementById('mobile-drawer').classList.add('open');
    document.getElementById('drawer-overlay').classList.add('open');
}

function closeDrawer() {
    document.getElementById('mobile-drawer').classList.remove('open');
    document.getElementById('drawer-overlay').classList.remove('open');
}

document.getElementById('drawer-close').addEventListener('click', closeDrawer);
document.getElementById('drawer-overlay').addEventListener('click', closeDrawer);

const navPlaceholder = document.getElementById('nav-placeholder');
if (navPlaceholder) {
    navPlaceholder.innerHTML = navHTML;

    document.getElementById('hamburger').addEventListener('click', openDrawer);

    document.getElementById('mobile-search-btn').addEventListener('click', () => {
        document.querySelector('nav').classList.toggle('search-open');
    });

    const categories = document.querySelector('.categories');

    function updateNavPlaceholderHeight() {
        navPlaceholder.style.height = navPlaceholder.querySelector('nav').offsetHeight + 'px';
    }
    updateNavPlaceholderHeight();

    window.addEventListener('scroll', () => {
        categories.classList.toggle('hidden', window.scrollY > 10);
    });

    categories.addEventListener('transitionend', updateNavPlaceholderHeight);
}

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
            <a href="${basePath}pages/checkout.html" class="btn-checkout">
                <span>CHECKOUT</span>
                <span id="cart-total"></span>
            </a>
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

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('.scroll-reveal');
if (revealEls.length) {
    const observer = new IntersectionObserver(
        entries => entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        }),
        { threshold: 0.15 }
    );
    revealEls.forEach(el => observer.observe(el));
}
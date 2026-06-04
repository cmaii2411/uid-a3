/* ===== DATA ===== */

const products = [
    { name: 'Modular Cat Climbing Wall - Orange', img: 'orange.png', color: 'orange', price: '$1,900.00', rating: 5.0, reviews: 3 },
    { name: 'Modular Cat Climbing Wall - Blue',   img: 'blue.png',   color: 'blue',   price: '$1,900.00', rating: 5.0, reviews: 3 },
    { name: 'Modular Cat Climbing Wall - Beige',  img: 'beige.png',  color: 'beige',  price: '$1,900.00', rating: 5.0, reviews: 3 },
    { name: 'Modular Cat Climbing Wall - Pink',   img: 'pink.png',   color: 'pink',   price: '$1,900.00', rating: 5.0, reviews: 3 },
];

/* ===== READ URL PARAMS ===== */

const params  = new URLSearchParams(window.location.search);
const searchQ = params.get('q');

/* ===== PAGE HEADER ===== */

const pageHeader = document.getElementById('page-header');

if (searchQ) {
    pageHeader.innerHTML = `
        <div class="search-header">
            Results for “<span>${searchQ}</span>”
            <img class="deco-paw-1" src="${basePath}assets/images/pink-paw.png">
            <img class="deco-paw-2" src="${basePath}assets/images/pink-paw.png">
            <img class="deco-paw-3" src="${basePath}assets/images/pink-paw.png">
        </div>
    `;
} else {
    pageHeader.innerHTML = `
        <div class="collection-header">
            <div class="collection-header-text">
                <p class="breadcrumb"><a href="${basePath}index.html">Home</a> › Cat Walls</p>
                <h1 class="anim-load-up" >Cat Walls</h1>
                <div class="collection-header-underline" ></div>
                <p class="collection-description">Modular cat climbing wall offers customizable accessories to maximize feline enrichment and space efficiency in small living areas.</p>
            </div>

            <div class="collection-image">
                <img src="${basePath}assets/images/header-deco.png">
                <img src="${basePath}assets/images/header-deco2.png">
            </div>
        </div>
    `;
}

/* ===== FILTER PRODUCTS BY SEARCH ===== */

let filtered = products;

if (searchQ) {
    const term = searchQ.toLowerCase();
    filtered = products.filter(p => p.name.toLowerCase().includes(term));
}

/* ===== RENDER GRID ===== */

const grid = document.getElementById('product-grid');

if (grid) {
    grid.innerHTML = filtered.length === 0
        ? `<p style="color:#443932;">No products found.</p>`
        : filtered.map(c => `
            <div class="product-card" data-color="${c.color}">
                <img src="${basePath}assets/images/${c.img}" alt="${c.name}">
                <div class="product-swatches">
                    <img class="swatch active" src="${basePath}assets/images/${c.img}" alt="">
                    <img class="swatch" src="${basePath}assets/images/swatch.png" alt="">
                </div>
                <p class="product-card-name">${c.name}</p>
                <div class="product-card-rating">
                    <img src="${basePath}assets/images/rating.svg" alt="rating">
                    <span>${c.rating.toFixed(1)} (${c.reviews})</span>
                </div>
                <p class="product-card-price">${c.price}</p>
                <a class="btn-view-product" href="${basePath}pages/product.html?id=${c.color}">VIEW PRODUCT</a>
            </div>
        `).join('');

    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            window.location.href = `${basePath}pages/product.html?id=${card.dataset.color}`;
        });
    });
}
/* ===== COLOR FILTER ===== */

const colorCheckboxes = document.querySelectorAll('#color-filters input[type="checkbox"]');

function applyColorFilter() {
    const selected = [...colorCheckboxes]
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    document.querySelectorAll('.product-card').forEach(card => {
        const match = selected.length === 0 || selected.includes(card.dataset.color);
        card.hidden = !match;
    });
}

colorCheckboxes.forEach(cb => cb.addEventListener('change', applyColorFilter));

document.querySelectorAll('.filter-clear').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.filter-group').querySelectorAll('input[type="checkbox"]')
            .forEach(cb => { cb.checked = false; });
        applyColorFilter();
    });
});

/* ===== MOBILE FILTER DRAWER ===== */

const filterToggle = document.getElementById('filter-toggle');
const filterPanel  = document.querySelector('.filter-panel');
const filterOverlay = document.getElementById('filter-overlay');

function openFilter() {
    filterPanel.classList.add('open');
    filterOverlay.classList.add('open');
}

function closeFilter() {
    filterPanel.classList.remove('open');
    filterOverlay.classList.remove('open');
}

if (filterToggle) filterToggle.addEventListener('click', openFilter);
if (filterOverlay) filterOverlay.addEventListener('click', closeFilter);

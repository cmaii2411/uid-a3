/* ===== DATA ===== */

const products = [
    { id: 'orange', name: 'Modular Cat Climbing Wall - Orange', price: 1900, rating: 5.0, reviews: 3, images: ['orange.png', 'catwall-co.png'] },
    { id: 'blue',   name: 'Modular Cat Climbing Wall - Blue',   price: 1900, rating: 5.0, reviews: 3, images: ['blue.png',   'catwall-co.png'] },
    { id: 'beige',  name: 'Modular Cat Climbing Wall - Beige',  price: 1900, rating: 5.0, reviews: 3, images: ['beige.png',  'catwall-co.png'] },
    { id: 'pink',   name: 'Modular Cat Climbing Wall - Pink',   price: 1900, rating: 5.0, reviews: 3, images: ['pink.png',   'catwall-co.png'] },
];

const sizes = ['100 CM', '150 CM', '180 CM', '210 CM', '240 CM', '270 CM'];
const unavailable = ['270 CM'];

/* ===== RESOLVE PRODUCT ===== */

const params = new URLSearchParams(window.location.search);
const productId = params.get('id') || 'orange';
const product = products.find(p => p.id === productId) || products[0];

let selectedSize = null;
let qty = 1;

/* ===== BREADCRUMB ===== */

document.getElementById('directory').innerHTML =
    `<a href="${basePath}index.html">Home</a> › <a href="${basePath}pages/productlist.html">Cat Walls</a> › ${product.id[0].toUpperCase() + product.id.slice(1)}`;

/* ===== IMAGE GALLERY ===== */

const galleryEl = document.getElementById('product-image');

galleryEl.innerHTML = `
    <div class="main-img-wrapper">
        <img id="main-img" src="${basePath}assets/images/${product.images[0]}" alt="${product.name}">
        <span class="img-counter">1/${product.images.length}</span>
    </div>
    <div class="thumb-gallery">
        ${product.images.map((img, i) => `
            <button class="thumb-btn ${i === 0 ? 'active' : ''}" data-index="${i}">
                <img src="${basePath}assets/images/${img}" alt="">
            </button>
        `).join('')}
    </div>
`;

const mainImg = document.getElementById('main-img');
const imgCounter = galleryEl.querySelector('.img-counter');

galleryEl.querySelectorAll('.thumb-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.index);
        mainImg.src = `${basePath}assets/images/${product.images[i]}`;
        imgCounter.textContent = `${i + 1}/${product.images.length}`;
        galleryEl.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

/* ===== PRODUCT DETAIL ===== */

const detailEl = document.getElementById('product-detail');

detailEl.innerHTML = `
    <div class="product-rating-row">
        <img src="${basePath}assets/images/rating.svg" alt="rating">
        <span>${product.rating.toFixed(1)} (${product.reviews})</span>
    </div>
    <h1 class="product-name">${product.name}</h1>
    <p class="product-price">$${product.price.toLocaleString()}.00</p>
    <hr class="product-divider">
    <p class="product-label">SELECT SIZE</p>
    <div class="size-options">
        ${sizes.map(s => `
            <button class="size-btn ${unavailable.includes(s) ? 'unavailable' : ''}"
                    data-size="${s}"
                    ${unavailable.includes(s) ? 'disabled' : ''}>
                ${s}
            </button>
        `).join('')}
    </div>
    <p class="product-label">QUANTITY</p>
`;

detailEl.querySelectorAll('.size-btn:not(.unavailable)').forEach(btn => {
    btn.addEventListener('click', () => {
        detailEl.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedSize = btn.dataset.size;
    });
});

/* ===== QUANTITY ===== */

document.getElementById('qty-minus').addEventListener('click', () => {
    if (qty > 1) {
        qty--;
        document.getElementById('qty-display').textContent = qty;
    }
});

document.getElementById('qty-plus').addEventListener('click', () => {
    qty++;
    document.getElementById('qty-display').textContent = qty;
});

/* ===== ADD TO CART ===== */

const addToCartBtn = document.querySelector('.product-right-panel > .btn-primary');

addToCartBtn.addEventListener('click', () => {
    if (!selectedSize) {
        alert('Please select a size');
        return;
    }
    addToCart({
        id: product.id,
        name: product.name,
        img: product.images[0],
        price: product.price,
        size: selectedSize,
        qty,
    });
    addToCartBtn.textContent = 'ADDED!';
    setTimeout(() => { addToCartBtn.textContent = 'ADD TO CART'; }, 1500);
});

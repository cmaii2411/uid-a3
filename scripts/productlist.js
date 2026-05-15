const products = [
    { name: 'Modular Cat Climbing Wall - Orange', img: 'orange.png', color: 'orange', price: '$1,900.00', rating: 5.0, reviews: 3 },
    { name: 'Modular Cat Climbing Wall - Blue',   img: 'blue.png',   color: 'blue',   price: '$1,900.00', rating: 5.0, reviews: 3 },
    { name: 'Modular Cat Climbing Wall - Beige',  img: 'beige.png',  color: 'beige',  price: '$1,900.00', rating: 5.0, reviews: 3 },
    { name: 'Modular Cat Climbing Wall - Pink',   img: 'pink.png',   color: 'pink',   price: '$1,900.00', rating: 5.0, reviews: 3 },
]

const grid = document.getElementById('product-grid');

if (grid) {
    grid.innerHTML = products.map(c => `
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
            <a class="btn-view-product" href="${basePath}pages/product.html">VIEW PRODUCT</a>
        </div>
    `).join('')
}

/
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
}

function removeFromCart(id,size) {
    const cart = getCart();
    const newCart = cart.filter(c => !(c.id === id && c.size === size));
    localStorage.setItem('cart', JSON.stringify(newCart));
    updateCartBadge();
}

function updateCartBadge() {
    const counter = document.getElementById('cart-counter');
    const cart = getCart();
    const total = cart.reduce((t, c) => {
        return t + c.qty;
    }, 0)
    if (counter) counter.textContent = total;
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
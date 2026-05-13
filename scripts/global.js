/* ===== NAV BAR ====== */

const navHTML = `
<nav>
    <div class="header">
        <div class="logo">
            <img src="${basePath}assets/images/logo 1.png" alt="logo">
        </div>
        <div class="cart-and-searchbar">
            <img id="cart" src="${basePath}assets/icons/fi-rr-shopping-bag.svg" alt="cart">
            <div class="search-wrapper">
                <input type="text" id="search" name="search" placeholder="Search Cat Wall">
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

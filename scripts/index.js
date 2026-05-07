/* BANNER ANIMATION */

const track = document.querySelector('.banner-track');
if (track) {
    const original = track.innerHTML;
    while (track.scrollWidth < window.innerWidth * 2) {
        track.innerHTML += original;
    }
}

/* COLLECTIONS HTML RENDER */

const collections = [
    { name: 'Cat Walls', img: 'catwall-co.png' },
    { name: 'Scratching Board', img: 'scratcher-co.png' },
    { name: 'Cat Staircase', img: 'stair-co.png' },
    { name: 'Curvynest', img: 'curve-co.png' },
    { name: 'Anti-Ant Raised Cat Feeder', img: 'feeder-co.png' },
    { name: 'Cat Tail Teaser', img: 'teaser.png' },
];

const grid = document.querySelector('.collections');
if (grid) {
    grid.innerHTML = collections.map(c => `
        <div class="collection-card">
            <img src="assets/images/${c.img}" alt="${c.name}">
            <h3>${c.name}</h3>
        </div>
    `).join('');
}

/* CAROUSEL */

const carouselSlides = [
    { name: 'Cat Wall',      img: 'catwall.png' },
    { name: 'Cat Feeder',    img: 'feeder.png' },
    { name: 'Cat Staircase', img: 'stair-co.png' },
];

const carouselTrack = document.getElementById('carousel-track');
const carouselDots  = document.getElementById('carousel-dots');

if (carouselTrack) {
    let current = 0;

    carouselTrack.innerHTML = carouselSlides.map((s, i) => `
        <div class="carousel-slide ${i === 0 ? 'active' : ''}">
            <img src="assets/images/${s.img}" alt="${s.name}">
            <div class="slide-label">${s.name}</div>
        </div>
    `).join('');

    carouselDots.innerHTML = carouselSlides.map((_, i) => `
        <span class="dot ${i === 0 ? 'active' : ''}"></span>
    `).join('');

    function goTo(index) {
        const offset = carouselTrack.parentElement.offsetWidth / 2
                     - slideWidth / 2
                     - index * slideWidth;

        carouselTrack.style.transform = `translateX(${offset}px)`;
       
        current = index;
    }

    goTo(0);
    setInterval(() => goTo((current + 1) % carouselSlides.length), 3500);
}

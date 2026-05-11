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
    { name: 'Cat Wall',      img: 'catwall-slider.png' },
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
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    const dots   = carouselDots.querySelectorAll('.dot');
    const n      = slides.length;

    slides.forEach((s, i) => {
        const wasClass = s.classList.contains('prev') ? 'prev'
                       : s.classList.contains('next') ? 'next' : 'active';
        const newClass = i === index               ? 'active'
                       : i === (index - 1 + n) % n ? 'prev' : 'next';

        if ((wasClass === 'prev' && newClass === 'next') ||
            (wasClass === 'next' && newClass === 'prev')) {
            s.style.transition = 'none';
            s.classList.remove('active', 'prev', 'next');
            s.classList.add(newClass);
            s.getBoundingClientRect();
            s.style.transition = '';
        } else {
            s.classList.remove('active', 'prev', 'next');
            s.classList.add(newClass);
        }
    });

    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    current = index;
    }
    setInterval(() => goTo((current + 1) % carouselSlides.length), 3500);
}

/* REVIEW */
const VISIBLE = 4;
const TOTAL   = 10;
const reviewContainer = document.getElementById('review-autoslide');

if (reviewContainer) {
    const cardHTML = `
        <div class="review-card">
            <div class="review-card-inner">
                <div class="review-header">
                    <img class="review-avatar" src="${basePath}assets/images/review.png" alt="Customer">
                    <div>
                        <p class="review-name">Happy Customer</p>
                        <img class="review-rating" src="${basePath}assets/images/rating.svg" alt="5 stars">
                    </div>
                </div>
                <p class="review-text">"My cat loves it!"</p>
            </div>
        </div>`;

    // Clone first and last VISIBLE cards at each end for the seamless wrap
    const cards = Array(TOTAL).fill(cardHTML);
    const extended = [
        ...cards.slice(-VISIBLE),
        ...cards,
        ...cards.slice(0, VISIBLE),
    ];

    const viewport = document.createElement('div');
    viewport.className = 'review-viewport';

    const track = document.createElement('div');
    track.className = 'review-track';
    track.innerHTML = extended.join('');

    viewport.appendChild(track);
    reviewContainer.appendChild(viewport);

    const dotsEl = document.createElement('div');
    dotsEl.className = 'review-dots';
    dotsEl.innerHTML = cards.map((_, i) =>
        `<span class="review-dot${i === 0 ? ' active' : ''}"></span>`
    ).join('');
    reviewContainer.appendChild(dotsEl);

    let trackPos = VISIBLE;
    let moving   = false;

    function cardWidth() { return viewport.offsetWidth / VISIBLE; }

    function setPos(pos, animate) {
        track.style.transition = animate ? 'transform 0.6s ease' : 'none';
        track.style.transform  = `translateX(${-pos * cardWidth()}px)`;
        trackPos = pos;
    }

    function updateDots() {
        const idx = (trackPos - VISIBLE + TOTAL) % TOTAL;
        dotsEl.querySelectorAll('.review-dot').forEach((d, i) =>
            d.classList.toggle('active', i === idx)
        );
    }

    setPos(VISIBLE, false);

    track.addEventListener('transitionend', () => {
        moving = false;
        if (trackPos >= VISIBLE + TOTAL) setPos(VISIBLE, false);
        if (trackPos < VISIBLE)          setPos(VISIBLE + TOTAL - 1, false);
    });

    setInterval(() => {
        if (moving) return;
        moving = true;
        setPos(trackPos + 1, true);
        updateDots();
    }, 3000);

    window.addEventListener('resize', () => setPos(trackPos, false));
}
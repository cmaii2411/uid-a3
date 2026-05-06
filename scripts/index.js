/* BANNER ANIMATION */
const track = document.querySelector('.banner-track');
if (track) {
    const original = track.innerHTML;
    while (track.scrollWidth < window.innerWidth * 2) {
        track.innerHTML += original;
    }
}

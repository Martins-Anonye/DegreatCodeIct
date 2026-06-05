// Simple hero image slideshow for DGC_Online_Class_Tutorial/index.html
// Place this file in assets/js/hero-slideshow.js

document.addEventListener('DOMContentLoaded', function () {
    const images = [
        'images/superflyer.png',
        'images/logo.jpg'
    ];
    let current = 0;
    const heroImg = document.getElementById('hero-slideshow-img');
    if (!heroImg) return;
    setInterval(() => {
        current = (current + 1) % images.length;
        heroImg.src = images[current];
    }, 3500);
});

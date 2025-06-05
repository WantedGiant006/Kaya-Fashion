const track = document.querySelector('.carousel-track');
const carousel = document.querySelector('.carousel'); // NEW
const images = document.querySelectorAll('.carousel-img');
const dots = document.querySelectorAll('.dot');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');

let index = 0;
const total = images.length;

function updateCarousel() {
  // Dynamically set the width of the carousel track to fit all images
  track.style.width = `${100 * total}vw`;

  // Move carousel track to the correct position
  track.style.transform = `translateX(-${index * 100}vw)`;

  // Update active dot
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

function goNext() {
  index = (index + 1) % total;
  updateCarousel();
}

function goPrev() {
  index = (index - 1 + total) % total;
  updateCarousel();
}

rightArrow.addEventListener('click', goNext);
leftArrow.addEventListener('click', goPrev);

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    updateCarousel();
  });
});

// === Auto-play every 3.5 seconds ===
let autoPlay = setInterval(goNext, 3500);

// === Touch Swipe Support ===
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener("touchstart", function (e) {
  touchStartX = e.changedTouches[0].screenX;
  clearInterval(autoPlay); // Stop auto-play on interaction
}, false);

carousel.addEventListener("touchend", function (e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, false);

function handleSwipe() {
  const swipeThreshold = 30;
  const distance = touchEndX - touchStartX;

  console.log("Swipe distance:", distance);

  if (Math.abs(distance) > swipeThreshold) {
    if (distance < 0) {
      console.log("Swipe Left");
      goNext();
    } else {
      console.log("Swipe Right");
      goPrev();
    }
  }
}

// === Initialize carousel ===
updateCarousel();

// === Scroll to top button ===
window.addEventListener('scroll', () => {
  const toTopBtn = document.getElementById('toTop');
  toTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
});

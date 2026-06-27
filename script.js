// ── GALLERY ──
const track = document.getElementById('gTrack');
const slides = track.querySelectorAll('.g-slide');
const counter = document.getElementById('gCounter');
const dotsContainer = document.getElementById('gDots');
const total = slides.length;
let cur = 0;

// Gera os dots
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'g-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

function goTo(i) {
  cur = (i + total) % total;
  track.style.transform = `translateX(-${cur * 100}%)`;
  counter.textContent = `${cur + 1} / ${total}`;
  dotsContainer.querySelectorAll('.g-dot').forEach((d, idx) => {
    d.classList.toggle('active', idx === cur);
  });
}

document.getElementById('gPrev').addEventListener('click', () => goTo(cur - 1));
document.getElementById('gNext').addEventListener('click', () => goTo(cur + 1));

// Swipe touch
let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) goTo(diff > 0 ? cur + 1 : cur - 1);
});

// Auto-play
setInterval(() => goTo(cur + 1), 5000);

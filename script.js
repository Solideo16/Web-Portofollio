const canvas = document.getElementById("dragonCanvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
let angle = 0;

function drawLeaf(x, y, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  const gradient = ctx.createRadialGradient(0, -6, 0, 0, -6, 12);
  gradient.addColorStop(0, "cyan");
  gradient.addColorStop(1, "red");
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(4, -6, 0, -12);
  ctx.quadraticCurveTo(-4, -6, 0, 0);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 90;
  const leafCount = 100;
  for (let i = 0; i < leafCount; i++) {
    const offset = i * 0.2;
    const dynamicRadius = radius + Math.sin(angle + i * 0.5) * 10;
    const x = centerX + dynamicRadius * Math.cos(angle + offset);
    const y = centerY + dynamicRadius * Math.sin(angle + offset);
    const rotation = angle + offset;
    drawLeaf(x, y, rotation);
  }
  angle += 0.02;
  requestAnimationFrame(animate);
}
animate();

const carousel = document.getElementById('carousel');
let startX, currentX, isDragging = false;
let rotAngle = -18;
const itemCount = 10;
const rotationStep = 360 / itemCount;

const rotateCarousel = () => {
  carousel.style.transform = `translateZ(-650px) rotateY(${rotAngle}deg)`;
};

carousel.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
});
window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  currentX = e.clientX;
});
window.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  let diff = currentX - startX;
  if (Math.abs(diff) > 50) {
    rotAngle += (diff < 0 ? -rotationStep : rotationStep);
    rotateCarousel();
  }
});
carousel.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
});
carousel.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
});
carousel.addEventListener('touchend', () => {
  isDragging = false;
  let diff = currentX - startX;
  if (Math.abs(diff) > 50) {
    rotAngle += (diff < 0 ? -rotationStep : rotationStep);
    rotateCarousel();
  }
});
rotateCarousel();

document.getElementById('kontakForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = this;
  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      form.reset();
      document.getElementById('successMessage').style.display = 'block';
    } else {
      alert("Gagal mengirim pesan. Silakan coba lagi.");
    }
  }).catch(error => {
    alert("Terjadi kesalahan.");
  });
});

function createFallingLeaf() {
  const leaf = document.createElement('div');
  leaf.classList.add('leaf');
  leaf.style.left = Math.random() * window.innerWidth + 'px';
  leaf.style.animationDuration = 3 + Math.random() * 2 + 's';
  leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
  document.body.appendChild(leaf);
  setTimeout(() => leaf.remove(), 6000);
}

window.addEventListener('scroll', () => {
  for (let i = 0; i < 4; i++) {
    createFallingLeaf();
  }
});

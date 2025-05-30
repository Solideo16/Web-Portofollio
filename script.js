// =====================
// Form Submit Handler
// =====================
document.getElementById('kontakForm').addEventListener('submit', function (e) {
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
      setTimeout(() => {
        document.getElementById('successMessage').style.display = 'none';
      }, 5000); // Sembunyikan pesan sukses setelah 5 detik
    } else {
      alert("Gagal mengirim pesan. Silakan coba lagi.");
    }
  }).catch(() => {
    alert("Terjadi kesalahan.");
  });
});

// ==========================
// Animasi Melingkari Foto
// ==========================
const dragonCanvas = document.getElementById("dragonCanvas");
const dragonCtx = dragonCanvas.getContext("2d");

function resizeDragonCanvas() {
  const container = dragonCanvas.parentElement;
  dragonCanvas.width = container.clientWidth;
  dragonCanvas.height = container.clientHeight;
}
resizeDragonCanvas();
window.addEventListener("resize", resizeDragonCanvas);

let angle = 0;

function drawLeaf(x, y, rotation) {
  dragonCtx.save();
  dragonCtx.translate(x, y);
  dragonCtx.rotate(rotation);

  const gradient = dragonCtx.createRadialGradient(0, -6, 0, 0, -6, 12);
  gradient.addColorStop(0, "cyan");
  gradient.addColorStop(1, "red");

  dragonCtx.beginPath();
  dragonCtx.moveTo(0, 0);
  dragonCtx.quadraticCurveTo(4, -6, 0, -12);
  dragonCtx.quadraticCurveTo(-4, -6, 0, 0);
  dragonCtx.fillStyle = gradient;
  dragonCtx.fill();
  dragonCtx.restore();
}

function animateLeaves() {
  dragonCtx.clearRect(0, 0, dragonCanvas.width, dragonCanvas.height);

  const centerX = dragonCanvas.width / 2;
  const centerY = dragonCanvas.height / 2;
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
  requestAnimationFrame(animateLeaves);
}
animateLeaves();

// ============================
// Glowing Text (LunoVA) Effect
// ============================
const glowingTextCanvas = document.getElementById("glowingTextCanvas");
const glowingCtx = glowingTextCanvas.getContext("2d");

function resizeGlowingCanvas() {
  glowingTextCanvas.width = window.innerWidth;
  glowingTextCanvas.height = 150;
}
resizeGlowingCanvas();
window.addEventListener("resize", resizeGlowingCanvas);

let glowingStartTime = null;
const gradientWidth = 200;
const duration = 2000;
const text = "LunoVA";

function drawGlowingText(timestamp) {
  if (!glowingStartTime) glowingStartTime = timestamp;
  const elapsed = timestamp - glowingStartTime;
  const progress = (elapsed % duration) / duration;

  const shiftLeft = progress * (glowingTextCanvas.width + gradientWidth * 2) - gradientWidth;
  const shiftRight = glowingTextCanvas.width - shiftLeft - gradientWidth;

  glowingCtx.clearRect(0, 0, glowingTextCanvas.width, glowingTextCanvas.height);

  const centerX = glowingTextCanvas.width / 2;
  const centerY = glowingTextCanvas.height / 2;

  // Ukuran font setara h1 (2rem = 32px jika 1rem = 16px)
  glowingCtx.font = "bold 32px sans-serif";
  glowingCtx.textAlign = "center";
  glowingCtx.textBaseline = "middle";

  // Shadow dasar
  glowingCtx.lineWidth = 4;
  glowingCtx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
  glowingCtx.strokeText(text, centerX, centerY);

  // Gradient kiri
  const gradientLeft = glowingCtx.createLinearGradient(
    shiftLeft, 0,
    shiftLeft + gradientWidth, 0
  );
  gradientLeft.addColorStop(0, 'transparent');
  gradientLeft.addColorStop(0.5, 'cyan');
  gradientLeft.addColorStop(1, 'transparent');

  // Gradient kanan
  const gradientRight = glowingCtx.createLinearGradient(
    shiftRight, 0,
    shiftRight + gradientWidth, 0
  );
  gradientRight.addColorStop(0, 'transparent');
  gradientRight.addColorStop(0.5, 'cyan');
  gradientRight.addColorStop(1, 'transparent');

  glowingCtx.lineWidth = 6;
  glowingCtx.strokeStyle = gradientLeft;
  glowingCtx.strokeText(text, centerX, centerY);

  glowingCtx.strokeStyle = gradientRight;
  glowingCtx.strokeText(text, centerX, centerY);

  requestAnimationFrame(drawGlowingText);
}
requestAnimationFrame(drawGlowingText);


// Event listener untuk form pengiriman kontak
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

// Animasi melingkari foto
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

// Efek teks bercahaya (LunoVA)
const glowingTextCanvas = document.getElementById("glowingTextCanvas");
const glowingCtx = glowingTextCanvas.getContext("2d");
let glowingStartTime = null;
const gradientWidth = 200;
const duration = 2000; // Durasi 2 detik
const text = "LunoVA";

// Resize canvas untuk teks bercahaya
function resizeGlowingCanvas() {
  glowingTextCanvas.width = window.innerWidth;
  glowingTextCanvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeGlowingCanvas);
resizeGlowingCanvas();

function drawGlowingText(timestamp) {
  if (!glowingStartTime) glowingStartTime = timestamp;
  const elapsed = timestamp - glowingStartTime;
  const progress = (elapsed % duration) / duration;
  const shiftLeft = progress * (glowingTextCanvas.width + gradientWidth * 2) - gradientWidth;
  const shiftRight = glowingTextCanvas.width - shiftLeft - gradientWidth;

  glowingCtx.clearRect(0, 0, glowingTextCanvas.width, glowingTextCanvas.height);
  const centerX = glowingTextCanvas.width / 2;
  const centerY = glowingTextCanvas.height / 2;

  ctx.font = "bold 2rem sans-serif";  // Menyesuaikan ukuran font dengan h1
  glowingCtx.textAlign = "center";
  glowingCtx.textBaseline = "middle";

  glowingCtx.lineWidth = 4;
  glowingCtx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
  glowingCtx.strokeText(text, centerX, centerY);

  const gradientLeft = glowingCtx.createLinearGradient(shiftLeft, 0, shiftLeft + gradientWidth, 0);
  gradientLeft.addColorStop(0, 'transparent');
  gradientLeft.addColorStop(0.5, 'rgba(0, 255, 255, 1)');
  gradientLeft.addColorStop(1, 'transparent');

  const gradientRight = glowingCtx.createLinearGradient(shiftRight, 0, shiftRight + gradientWidth, 0);
  gradientRight.addColorStop(0, 'transparent');
  gradientRight.addColorStop(0.5, 'rgba(0, 255, 255, 1)');
  gradientRight.addColorStop(1, 'transparent');

  glowingCtx.lineWidth = 6;
  glowingCtx.strokeStyle = gradientLeft;
  glowingCtx.strokeText(text, centerX, centerY);
  glowingCtx.strokeStyle = gradientRight;
  glowingCtx.strokeText(text, centerX, centerY);

  requestAnimationFrame(drawGlowingText);
}

requestAnimationFrame(drawGlowingText);


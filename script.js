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


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

let currentPage = 0;
const totalPages = 3;

function updatePages() {
  for (let i = 1; i <= totalPages; i++) {
    const page = document.getElementById(`page${i}`);
    if (i <= currentPage) {
      page.classList.add("curved", "rotated");
      page.style.zIndex = i;
    } else {
      page.classList.remove("curved", "rotated");
      page.style.zIndex = totalPages - i + 1;
    }
  }
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    updatePages();
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    updatePages();
  }
}

// Inisialisasi saat halaman dibuka
updatePages();
const images = [
  "https://imgur.com/dUyphW6.jpg",
  "https://imgur.com/kfdpRZm.jpg"
];
let currentIndex = 0;

function showImage(index) {
  const img = document.getElementById("laptopImage");
  img.src = images[index];
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("kontakForm");
  const message = document.getElementById("successMessage");

  form.addEventListener("submit", () => {
    setTimeout(() => {
      message.style.display = "block";
    }, 1000);
  });

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });
});

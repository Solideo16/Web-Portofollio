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
// ======= KODE EXISTING (Form Kontak & Flipbook) =======

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
updatePages();


// ======= TAMBAHKAN DI SINI: INTERACTIVE LAPTOP & VIRTUAL KEYBOARD =======

// Gambar & navigasi
const images = [
  'https://i.imgur.com/YM3I7Gr.png',
  'https://i.imgur.com/Ut5rzOF.png'
];
let currentIndex = 0;
const imgEl = document.getElementById('laptopImage');
document.getElementById('nextBtn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  fadeToImage(currentIndex);
});
document.getElementById('prevBtn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  fadeToImage(currentIndex);
});
function fadeToImage(idx) {
  imgEl.style.opacity = 0;
  setTimeout(() => {
    imgEl.src = images[idx];
    imgEl.style.opacity = 1;
  }, 300);
}

// Virtual keyboard input & Delete/DelWord
const msgBox = document.getElementById('messageBox');
function onKeyClick(k) {
  if (k === 'Back') msgBox.value = msgBox.value.slice(0, -1);
  else if (k === 'Space') msgBox.value += ' ';
  else if (k === 'Enter') msgBox.value += '\n';
  else if (k === 'Del') msgBox.value = '';
  else if (k === 'DelWord') msgBox.value = msgBox.value.replace(/\s*\S+$/,'');
  else msgBox.value += k;
}
document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('click', () => onKeyClick(key.textContent));
});

// Kirim email via mailto
const sendBtn = document.getElementById('sendBtn');
sendBtn.addEventListener('click', () => {
  const subject = encodeURIComponent('Feedback Desain Laptop Interaktif');
  const body = encodeURIComponent(msgBox.value);
  window.location.href = `mailto:solideo123456@gmail.com?subject=${subject}&body=${body}`;
});

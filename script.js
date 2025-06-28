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
<!-- script.js -->
const images = [
  'https://i.imgur.com/YM3I7Gr.png',
  'https://i.imgur.com/Ut5rzOF.png'
];
let currentIndex = 0;
const imgEl = document.getElementById('laptopImage');
const msgBox = document.getElementById('messageBox');
const sendBtn = document.getElementById('sendBtn');

function showImage(idx) {
  imgEl.style.opacity = 0;
  setTimeout(() => {
    imgEl.src = images[idx];
    imgEl.style.opacity = 1;
  }, 300);
}

document.getElementById('nextBtn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
});

document.getElementById('prevBtn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

// Virtual keyboard input
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

// Send message via email
sendBtn.addEventListener('click', () => {
  const subject = encodeURIComponent('Feedback Desain Laptop Interaktif');
  const body = encodeURIComponent(msgBox.value);
  window.location.href = `mailto:solideo123456@gmail.com?subject=${subject}&body=${body}`;
});

/* Interactive Laptop & Virtual Keyboard Styles */
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
}

.laptop {
  border: 4px solid cyan;
  border-radius: 12px;
  box-shadow: 0 0 30px cyan;
}

.screen {
  background: #111;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
}

.screen img {
  max-width: 700px;
  max-height: 400px;
  object-fit: contain;
  border: 2px solid #0ff;
  border-radius: 6px;
  transition: opacity 0.4s;
}

.controls {
  margin: 10px;
}

.controls button {
  background: cyan;
  color: #000;
  border: none;
  padding: 6px 12px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

textarea#messageBox {
  width: 90%;
  height: 80px;
  margin: 10px 0;
  background: #000;
  color: cyan;
  border: 1px solid cyan;
  border-radius: 4px;
  padding: 5px;
  resize: none;
}

#sendBtn {
  background: cyan;
  color: #000;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.keyboard {
  background: #111;
  border: 3px solid cyan;
  border-radius: 10px;
  box-shadow: 0 0 20px cyan;
  padding: 10px;
}

.keyboard-row {
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-bottom: 5px;
}

.key {
  background: #222;
  color: cyan;
  padding: 10px;
  border: 1px solid cyan;
  border-radius: 4px;
  min-width: 40px;
  text-align: center;
  user-select: none;
  cursor: pointer;
  transition: background 0.2s;
}

.key:active {
  background: cyan;
  color: #000;
}

.key.wide { flex: 1 1 80px; }
.key.space { flex: 1 1 300px; }
let currentPage = 0;
const pages = document.querySelectorAll('.page');

function updatePages() {
  pages.forEach((page, index) => {
    if (index < currentPage) {
      page.classList.add('flipped');
    } else {
      page.classList.remove('flipped');
    }
  });
}

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    updatePages();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentPage < pages.length) {
    currentPage++;
    updatePages();
  }
});

updatePages();

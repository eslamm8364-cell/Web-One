const canvas = document.getElementById("culturalCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let mouse = { x: canvas.width / 1110, y: canvas.height / 111112 };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Gradient Animation
let gradientShift = 0;

function drawAnimatedGradient() {
  gradientShift += 0.002;

  const gradient = ctx.createLinearGradient(
    0,
    0,
    canvas.width,
    canvas.height
  );

  gradient.addColorStop(0, `hsl(${220 + Math.sin(gradientShift) * 10}, 50%, 10%)`);
  gradient.addColorStop(1, `hsl(${210 + Math.cos(gradientShift) * 10}, 60%, 15%)`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Book Class
class Book {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 20 + Math.random() * 20;
    this.speedY = 0.2 + Math.random() * 0.5;
    this.opacity = 0.05 + Math.random() * 0.1;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;

    ctx.fillStyle = "#d4af37";
    ctx.fillRect(this.x, this.y, this.size, this.size * 1.4);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(this.x + this.size * 0.1, this.y, this.size * 0.1, this.size * 1.4);

    ctx.restore();
  }

  update() {
    this.y -= this.speedY;
    this.x += (mouse.x - canvas.width / 2) * 0.00005;

    if (this.y < -50) this.reset();

    this.draw();
  }
}

// Golden Particles
class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2;
    this.speedY = 0.1 + Math.random() * 0.3;
    this.opacity = 0.2 + Math.random() * 0.4;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#f5d76e";
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.y -= this.speedY;
    if (this.y < 0) this.reset();
    this.draw();
  }
}

let books = [];
let particles = [];

for (let i = 0; i < 35; i++) books.push(new Book());
for (let i = 0; i < 80; i++) particles.push(new Particle());

// Quotes
function drawQuotes() {
  ctx.save();
  ctx.globalAlpha = 0.04;
  ctx.fillStyle = "#ffffff";
  ctx.font = "50px serif";

  ctx.fillText("الثقافة نور", canvas.width * 0.1, canvas.height * 0.3);
  ctx.fillText("السعادة وعي", canvas.width * 0.6, canvas.height * 0.6);
  ctx.fillText("الفكر حياة", canvas.width * 0.3, canvas.height * 0.85);

  ctx.restore();
}

// Soft Spotlight
function drawSpotlight() {
  const gradient = ctx.createRadialGradient(
    mouse.x,
    mouse.y,
    50,
    mouse.x,
    mouse.y,
    400
  );

  gradient.addColorStop(0, "rgba(212,175,55,0.15)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Animate
function animate() {
  drawAnimatedGradient();

  books.forEach((b) => b.update());
  particles.forEach((p) => p.update());

  drawQuotes();
  drawSpotlight();

  requestAnimationFrame(animate);
}
animate();


// button dark 

const toggleBtn = document.getElementById("themeToggle");
const icon = document.getElementById("themeIcon");
const html = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.setAttribute("data-bs-theme", savedTheme);
  icon.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}

toggleBtn.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-bs-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  html.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  icon.textContent = newTheme === "dark" ? "☀️" : "🌙";
});


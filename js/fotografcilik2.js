const canvas = document.getElementById("neon-trail");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const maxParticles = 100;

// Yeni renk paleti
const colors = [
  "rgba(255, 0, 0, 1)",    // Kırmızı
  "rgba(0, 255, 0, 1)",    // Yeşil
  "rgba(0, 0, 255, 1)",    // Mavi
  "rgba(255, 255, 0, 1)",  // Sarı
  "rgba(255, 0, 255, 1)",  // Mor
  "rgba(0, 255, 255, 1)",  // Turkuaz
];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1; // Küçük partikül boyutu
    this.color = colors[Math.floor(Math.random() * colors.length)]; // Rastgele renk
    this.opacity = 1;
    this.life = 50; // Daha kısa yaşam süresi
    this.velocityX = Math.random() * 2 - 1; // Daha yavaş hareket
    this.velocityY = Math.random() * 2 - 1;
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.life--;
    this.opacity -= 0.02;
    if (this.size > 0.2) this.size -= 0.05;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color.replace("1", this.opacity); // Şeffaflık eklendi
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.fill();
  }
}

function createParticles(x, y) {
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI * 2) / 6 * i; // Altıgen desen
    const offsetX = Math.cos(angle) * 10; // Küçük mesafe
    const offsetY = Math.sin(angle) * 10;
    particles.push(new Particle(x + offsetX, y + offsetY));
  }
}

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    if (particles[i].life <= 0) {
      particles.splice(i, 1);
    } else {
      particles[i].update();
      particles[i].draw();
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}

window.addEventListener("mousemove", (event) => {
  createParticles(event.clientX, event.clientY);
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

animate();

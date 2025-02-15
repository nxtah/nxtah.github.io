document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("page-transition-overlay");
  const aboutSection = document.querySelector(".about");

  // Trigger page transition animation
  function triggerPageTransition() {
    // Show the overlay (expand from left)
    overlay.classList.add("active");

    // Hide the overlay after a delay (shrink to right)
    setTimeout(() => {
      overlay.classList.remove("active");
      overlay.classList.add("exit");

      // Show the about section after the overlay is gone
      setTimeout(() => {
        aboutSection.classList.add("visible");
      }, 400); // Match this delay with the overlay exit animation duration
    }, 800); // Match this delay with the overlay active animation duration
  }

  // Initialize the page transition
  triggerPageTransition();

  // Canvas setup for interactive background
  const canvas = document.getElementById("interactive-bg");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 0.5 + 0.1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 30 + 1;
    }

    draw() {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update(mouse) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        this.x -= forceDirectionX * 4;
        this.y -= forceDirectionY * 4;
      } else {
        if (this.x !== this.baseX) {
          this.x += (this.baseX - this.x) * 0.1;
        }
        if (this.y !== this.baseY) {
          this.y += (this.baseY - this.y) * 0.1;
        }
      }
    }
  }

  const particlesArray = [];

  function init() {
    const rows = 30;
    const cols = 90;
    const spacingX = canvas.width / cols;
    const spacingY = canvas.height / rows;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const posX = x * spacingX + spacingX / 2;
        const posY = y * spacingY + spacingY / 2;
        particlesArray.push(new Particle(posX, posY));
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach((particle) => {
      particle.draw();
      particle.update(mouse);
    });

    requestAnimationFrame(animate);
  }

  const mouse = { x: null, y: null };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray.length = 0;
    init();
  });

  init();
  animate();
});
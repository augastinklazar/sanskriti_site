/**
 * Performance-Optimized Kalam (Reed Quill) Ink Cursor
 * Self-suspending animation loop: pauses automatically when mouse is idle
 */
export function initCustomCursor() {
  const canvas = document.getElementById('cursor-canvas');
  if (!canvas) return;

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const pointer = {
    x: width / 2,
    y: height / 2,
    targetX: width / 2,
    targetY: height / 2,
    radius: 4,
    isHovered: false,
    hoverScale: 1,
  };

  const droplets = [];
  const maxDroplets = 12;
  let isRunning = false;
  let idleTimer = null;

  class InkDroplet {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.2 + 0.4;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.radius = Math.random() * 2 + 1;
      this.life = 1;
      this.decay = 0.04;
      this.color = Math.random() > 0.4 ? 'rgba(30, 46, 72,' : 'rgba(172, 59, 40,';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.95;
      this.vy *= 0.95;
      this.life -= this.decay;
    }

    draw(context) {
      context.beginPath();
      context.arc(this.x, this.y, this.radius * this.life, 0, Math.PI * 2);
      context.fillStyle = `${this.color} ${this.life * 0.6})`;
      context.fill();
    }
  }

  function startLoop() {
    if (!isRunning) {
      isRunning = true;
      requestAnimationFrame(render);
    }
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      // Pause loop after 400ms of inactivity if target reached and droplets gone
      if (Math.abs(pointer.x - pointer.targetX) < 0.5 && droplets.length === 0) {
        isRunning = false;
      }
    }, 400);
  }

  window.addEventListener('mousemove', (e) => {
    pointer.targetX = e.clientX;
    pointer.targetY = e.clientY;

    if (Math.random() < 0.25 && droplets.length < maxDroplets) {
      droplets.push(new InkDroplet(e.clientX, e.clientY));
    }
    startLoop();
  }, { passive: true });

  const magnetics = document.querySelectorAll('[data-magnetic], button, a, .deckle-card');
  magnetics.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      pointer.isHovered = true;
      startLoop();
    }, { passive: true });
    el.addEventListener('mouseleave', () => {
      pointer.isHovered = false;
      startLoop();
    }, { passive: true });
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    startLoop();
  }, { passive: true });

  function render() {
    if (!isRunning) return;

    ctx.clearRect(0, 0, width, height);

    const ease = 0.25;
    pointer.x += (pointer.targetX - pointer.x) * ease;
    pointer.y += (pointer.targetY - pointer.y) * ease;

    const targetScale = pointer.isHovered ? 2 : 1;
    pointer.hoverScale += (targetScale - pointer.hoverScale) * 0.2;

    for (let i = droplets.length - 1; i >= 0; i--) {
      const drop = droplets[i];
      drop.update();
      drop.draw(ctx);
      if (drop.life <= 0) {
        droplets.splice(i, 1);
      }
    }

    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, 12 * pointer.hoverScale, 0, Math.PI * 2);
    ctx.strokeStyle = pointer.isHovered ? 'rgba(172, 59, 40, 0.5)' : 'rgba(30, 46, 72, 0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, pointer.radius * (pointer.isHovered ? 1.3 : 1), 0, Math.PI * 2);
    ctx.fillStyle = pointer.isHovered ? '#AC3B28' : '#1E2E48';
    ctx.fill();

    // Check if still moving or have active droplets
    const isMoving = Math.abs(pointer.x - pointer.targetX) > 0.5 || Math.abs(pointer.y - pointer.targetY) > 0.5;
    if (isMoving || droplets.length > 0) {
      requestAnimationFrame(render);
    } else {
      isRunning = false;
    }
  }

  startLoop();
}

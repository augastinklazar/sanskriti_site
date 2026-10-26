/**
 * Interactive Reed Quill (Kalam) & Natural Ink Droplet Cursor
 * Optimized 60 FPS canvas cursor with fluid ink splatters and magnetic attraction
 */
export function initCustomCursor() {
  const canvas = document.getElementById('cursor-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const pointer = {
    x: width / 2,
    y: height / 2,
    targetX: width / 2,
    targetY: height / 2,
    radius: 4.5,
    isHovered: false,
    hoverScale: 1,
  };

  const droplets = [];
  const maxDroplets = 24;

  class InkDroplet {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.5 + 0.5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.radius = Math.random() * 2.5 + 1;
      this.life = 1;
      this.decay = Math.random() * 0.04 + 0.02;
      // Alternate between deep indigo and madder red ink
      this.color = Math.random() > 0.4 ? 'rgba(30, 46, 72,' : 'rgba(172, 59, 40,';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.96;
      this.vy *= 0.96;
      this.life -= this.decay;
    }

    draw(context) {
      context.beginPath();
      context.arc(this.x, this.y, this.radius * this.life, 0, Math.PI * 2);
      context.fillStyle = `${this.color} ${this.life * 0.65})`;
      context.fill();
    }
  }

  window.addEventListener('mousemove', (e) => {
    pointer.targetX = e.clientX;
    pointer.targetY = e.clientY;

    if (Math.random() < 0.35 && droplets.length < maxDroplets) {
      droplets.push(new InkDroplet(e.clientX, e.clientY));
    }
  });

  // Magnetic attraction to interactive elements
  const magnetics = document.querySelectorAll('[data-magnetic], button, a, .deckle-card');
  magnetics.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      pointer.isHovered = true;
    });
    el.addEventListener('mouseleave', () => {
      pointer.isHovered = false;
    });
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth cursor interpolation
    const ease = 0.22;
    pointer.x += (pointer.targetX - pointer.x) * ease;
    pointer.y += (pointer.targetY - pointer.y) * ease;

    const targetScale = pointer.isHovered ? 2.2 : 1;
    pointer.hoverScale += (targetScale - pointer.hoverScale) * 0.18;

    // Render ink droplets trail
    for (let i = droplets.length - 1; i >= 0; i--) {
      const drop = droplets[i];
      drop.update();
      drop.draw(ctx);
      if (drop.life <= 0) {
        droplets.splice(i, 1);
      }
    }

    // Outer calligraphic ink ring
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, 14 * pointer.hoverScale, 0, Math.PI * 2);
    ctx.strokeStyle = pointer.isHovered ? 'rgba(172, 59, 40, 0.55)' : 'rgba(30, 46, 72, 0.3)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Central nib dot
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, pointer.radius * (pointer.isHovered ? 1.4 : 1), 0, Math.PI * 2);
    ctx.fillStyle = pointer.isHovered ? '#AC3B28' : '#1E2E48';
    ctx.fill();

    requestAnimationFrame(render);
  }

  render();
}

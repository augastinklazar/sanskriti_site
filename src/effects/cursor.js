/**
 * Diya Flame Ember Cursor with Particle Trailing & Magnetic Snapping
 * Palette: Royal Crimson (#6F1D1B), Sand Gold (#BB9457), Cinnamon (#99582A), and Cream (#FFE6A7)
 */
export function initCustomCursor() {
  const canvas = document.getElementById('cursor-canvas');
  if (!canvas) return;

  if (window.matchMedia('(pointer: coarse)').matches || 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: width / 2, y: height / 2, prevX: width / 2, prevY: height / 2, vx: 0, vy: 0 };
  const cursor = { x: width / 2, y: height / 2 };
  let isHoveringInteractive = false;
  let hoveredElementRect = null;
  let isPointerDown = false;

  const particles = [];
  const maxParticles = 65;

  class Ember {
    constructor(x, y, speedMult = 1, isBurst = false) {
      this.x = x + (Math.random() - 0.5) * 6;
      this.y = y + (Math.random() - 0.5) * 6;
      const angle = isBurst ? Math.random() * Math.PI * 2 : -Math.PI / 2 + (Math.random() - 0.5) * 0.8;
      const speed = isBurst ? (Math.random() * 3 + 1.5) : (Math.random() * 1.5 + 0.5) * speedMult;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - (isBurst ? 0 : 0.8);
      this.size = Math.random() * 2.5 + 1.2;
      this.life = 1;
      this.decay = Math.random() * 0.02 + 0.015;
      
      // Exact reference palette
      const hues = [
        { r: 255, g: 230, b: 167 }, // #FFE6A7 (Cream)
        { r: 187, g: 148, b: 87 },  // #BB9457 (Sand Gold)
        { r: 153, g: 88, b: 42 },   // #99582A (Cinnamon)
        { r: 111, g: 29, b: 27 }    // #6F1D1B (Royal Crimson)
      ];
      this.color = hues[Math.floor(Math.random() * hues.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy -= 0.02;
      this.vx += (Math.random() - 0.5) * 0.1;
      this.size *= 0.98;
      this.life -= this.decay;
    }

    draw(ctx) {
      if (this.life <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life);
      ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(0.5, this.size), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  window.addEventListener('mousemove', (e) => {
    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.vx = mouse.x - mouse.prevX;
    mouse.vy = mouse.y - mouse.prevY;

    const target = e.target.closest('a, button, [role="button"], input, select, .interactive-card, [data-magnetic]');
    if (target) {
      isHoveringInteractive = true;
      hoveredElementRect = target.getBoundingClientRect();
    } else {
      isHoveringInteractive = false;
      hoveredElementRect = null;
    }

    const speed = Math.hypot(mouse.vx, mouse.vy);
    if (speed > 2 && particles.length < maxParticles) {
      particles.push(new Ember(cursor.x, cursor.y, Math.min(speed * 0.1, 2)));
    }
  });

  window.addEventListener('mousedown', () => {
    isPointerDown = true;
    for (let i = 0; i < 18; i++) {
      particles.push(new Ember(cursor.x, cursor.y, 1, true));
    }
  });

  window.addEventListener('mouseup', () => {
    isPointerDown = false;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    let targetX = mouse.x;
    let targetY = mouse.y;

    if (isHoveringInteractive && hoveredElementRect) {
      const centerX = hoveredElementRect.left + hoveredElementRect.width / 2;
      const centerY = hoveredElementRect.top + hoveredElementRect.height / 2;
      targetX = mouse.x + (centerX - mouse.x) * 0.35;
      targetY = mouse.y + (centerY - mouse.y) * 0.35;
    }

    cursor.x += (targetX - cursor.x) * 0.22;
    cursor.y += (targetY - cursor.y) * 0.22;

    if (Math.random() < 0.25 && particles.length < maxParticles) {
      particles.push(new Ember(cursor.x, cursor.y, 0.5));
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);
      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }

    ctx.save();
    ctx.translate(cursor.x, cursor.y);

    const flameScale = isHoveringInteractive ? 1.4 : isPointerDown ? 0.8 : 1.0;
    const sway = Math.sin(Date.now() * 0.008) * 1.5 - (mouse.vx * 0.05);

    // Outer glow aura
    const gradientOuter = ctx.createRadialGradient(0, 0, 1, 0, 0, 22 * flameScale);
    gradientOuter.addColorStop(0, 'rgba(153, 88, 42, 0.45)');
    gradientOuter.addColorStop(0.5, 'rgba(111, 29, 27, 0.25)');
    gradientOuter.addColorStop(1, 'rgba(111, 29, 27, 0)');
    ctx.fillStyle = gradientOuter;
    ctx.beginPath();
    ctx.arc(0, 0, 22 * flameScale, 0, Math.PI * 2);
    ctx.fill();

    // Diya Flame geometry
    ctx.beginPath();
    ctx.moveTo(0 + sway, -14 * flameScale);
    ctx.bezierCurveTo(
      6 * flameScale + sway * 0.5, -6 * flameScale,
      8 * flameScale, 6 * flameScale,
      0, 8 * flameScale
    );
    ctx.bezierCurveTo(
      -8 * flameScale, 6 * flameScale,
      -6 * flameScale + sway * 0.5, -6 * flameScale,
      0 + sway, -14 * flameScale
    );
    ctx.closePath();

    const flameGradient = ctx.createLinearGradient(0, -14 * flameScale, 0, 8 * flameScale);
    flameGradient.addColorStop(0, '#FFE6A7'); // Cream tip
    flameGradient.addColorStop(0.35, '#BB9457'); // Sand gold
    flameGradient.addColorStop(0.7, '#99582A'); // Cinnamon amber
    flameGradient.addColorStop(1, '#6F1D1B'); // Crimson base

    ctx.fillStyle = flameGradient;
    ctx.shadowColor = '#99582A';
    ctx.shadowBlur = 12 * flameScale;
    ctx.fill();

    // Inner bright cream-white wick seed
    ctx.beginPath();
    ctx.arc(0, 2 * flameScale, 2.2 * flameScale, 0, Math.PI * 2);
    ctx.fillStyle = '#FFF5D6';
    ctx.shadowColor = '#FFE6A7';
    ctx.shadowBlur = 8;
    ctx.fill();

    if (isHoveringInteractive) {
      ctx.beginPath();
      ctx.arc(0, 0, 26, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(187, 148, 87, 0.6)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
    }

    ctx.restore();

    requestAnimationFrame(animate);
  }

  animate();
}

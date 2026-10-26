/**
 * 2.5D Hero Papercraft Diorama & High-Performance p5.brush Canvas
 * Renders authentic p5.brush painterly artwork once and drives 2.5D parallax via GPU CSS transforms
 */
import p5 from 'p5';
import * as brush from 'p5.brush';

export function initHeroDiorama() {
  const container = document.getElementById('hero-canvas-container');
  const dioramaWrapper = document.getElementById('hero-diorama-wrapper');
  if (!container) return;

  let p5Instance = null;

  try {
    const sketch = (p) => {
      let width = container.clientWidth || window.innerWidth;
      let height = container.clientHeight || window.innerHeight;

      function renderArtwork() {
        p.background('#FAF6EE'); // Warm Khadi cotton rag paper

        // 1. Radiant Sun & Hatching Rays
        p.push();
        p.translate(0, -height * 0.16);

        brush.set('HB', '#D97706', 0.9);
        brush.noFill();
        brush.hatch(15, 45);
        brush.circle(0, 0, Math.min(width, height) * 0.3);

        brush.fill('#F59E0B', 90);
        brush.set('rotring', '#AC3B28', 1.2);
        brush.circle(0, 0, Math.min(width, height) * 0.14);
        p.pop();

        // 2. Himalayan Mountain Ridges (Layer 1 - Deep Indigo Wash)
        p.push();
        p.translate(0, height * 0.12);

        brush.fill('#385278', 55);
        brush.set('HB', '#1E2E48', 0.8);
        const peakWidth = width * 1.5;
        brush.polygon([
          [-peakWidth * 0.5, height * 0.35],
          [-peakWidth * 0.35, -height * 0.14],
          [-peakWidth * 0.15, -height * 0.05],
          [0, -height * 0.22],
          [peakWidth * 0.2, -height * 0.08],
          [peakWidth * 0.38, -height * 0.24],
          [peakWidth * 0.5, height * 0.35],
        ]);

        // Mid-distance terraced hills in terracotta ochre
        brush.fill('#D4A373', 70);
        brush.set('rotring', '#9A4526', 1);
        brush.polygon([
          [-peakWidth * 0.5, height * 0.4],
          [-peakWidth * 0.3, 0],
          [-peakWidth * 0.05, height * 0.12],
          [peakWidth * 0.15, -height * 0.04],
          [peakWidth * 0.35, height * 0.06],
          [peakWidth * 0.5, height * 0.4],
        ]);
        p.pop();

        // 3. Sacred Lotus & Water Ripples
        p.push();
        p.translate(0, height * 0.22);

        // Concentric ripples
        brush.set('rotring', '#1E2E48', 0.7);
        brush.noFill();
        brush.circle(0, 30, 150);
        brush.circle(0, 30, 230);

        // 8 Lotus Petals
        const petalCount = 8;
        const lotusRadius = 70;
        for (let i = 0; i < petalCount; i++) {
          const angle = (p.TWO_PI / petalCount) * i;
          p.push();
          p.rotate(angle);
          p.translate(0, -lotusRadius);

          brush.fill('#AC3B28', 110);
          brush.set('rotring', '#7E2616', 1.2);
          brush.polygon([
            [0, -42],
            [16, -10],
            [0, 18],
            [-16, -10],
          ]);

          brush.set('HB', '#D97706', 0.8);
          brush.line(0, -32, 0, 12);
          p.pop();
        }

        // Golden Bindu Core
        brush.fill('#D97706', 160);
        brush.set('rotring', '#292524', 1.4);
        brush.circle(0, 0, 24);
        brush.fill('#FFFDF9', 240);
        brush.circle(0, 0, 10);
        p.pop();
      }

      p.setup = () => {
        brush.instance(p);
        const canvas = p.createCanvas(width, height, p.WEBGL);
        canvas.parent(container);
        p.noLoop(); // Render once - zero idle CPU/GPU burn!
        brush.scaleBrushes(1.2);
        renderArtwork();
      };

      p.windowResized = () => {
        width = container.clientWidth || window.innerWidth;
        height = container.clientHeight || window.innerHeight;
        p.resizeCanvas(width, height);
        renderArtwork();
      };
    };

    p5Instance = new p5(sketch);
  } catch (err) {
    console.warn('p5.brush setup:', err);
  }

  // 2.5D GPU-Accelerated Parallax on Mouse Move
  if (dioramaWrapper) {
    let rafId = null;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const backLayer = dioramaWrapper.querySelector('[data-depth="back"]');
    const midLayer = dioramaWrapper.querySelector('[data-depth="mid"]');
    const frontLayer = dioramaWrapper.querySelector('[data-depth="front"]');

    function updateParallax() {
      currentTiltX += (targetTiltX - currentTiltX) * 0.15;
      currentTiltY += (targetTiltY - currentTiltY) * 0.15;

      dioramaWrapper.style.transform = `perspective(1000px) rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;

      if (backLayer) backLayer.style.transform = `translate3d(${(-currentTiltY * 1.2).toFixed(1)}px, ${(-currentTiltX * 1.2).toFixed(1)}px, -30px)`;
      if (midLayer) midLayer.style.transform = `translate3d(${(currentTiltY * 1).toFixed(1)}px, ${(currentTiltX * 1).toFixed(1)}px, 15px)`;
      if (frontLayer) frontLayer.style.transform = `translate3d(${(currentTiltY * 2).toFixed(1)}px, ${(currentTiltX * 2).toFixed(1)}px, 40px)`;

      if (Math.abs(targetTiltX - currentTiltX) > 0.05 || Math.abs(targetTiltY - currentTiltY) > 0.05) {
        rafId = requestAnimationFrame(updateParallax);
      } else {
        rafId = null;
      }
    }

    const handleMouseMove = (e) => {
      const rect = dioramaWrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      targetTiltX = -y * 10;
      targetTiltY = x * 12;

      if (!rafId) {
        rafId = requestAnimationFrame(updateParallax);
      }
    };

    const handleMouseLeave = () => {
      targetTiltX = 0;
      targetTiltY = 0;
      if (!rafId) rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    dioramaWrapper.addEventListener('mouseleave', handleMouseLeave, { passive: true });
  }

  return {
    destroy: () => {
      if (p5Instance) p5Instance.remove();
    }
  };
}

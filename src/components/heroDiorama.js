/**
 * 2.5D Hero Papercraft Diorama & p5.brush Living Canvas
 * Blends p5.brush watercolor washes and hatched sketches with 2.5D mouse parallax
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
      let time = 0;
      let mouseTargetX = 0;
      let mouseTargetY = 0;
      let currentMouseX = 0;
      let currentMouseY = 0;

      p.setup = () => {
        brush.instance(p);
        const canvas = p.createCanvas(width, height, p.WEBGL);
        canvas.parent(container);
        p.frameRate(60);
        brush.scaleBrushes(1.2);
      };

      p.windowResized = () => {
        width = container.clientWidth || window.innerWidth;
        height = container.clientHeight || window.innerHeight;
        p.resizeCanvas(width, height);
      };

      p.draw = () => {
        time += 0.015;

        // Smooth mouse following
        mouseTargetX = (p.mouseX - width / 2) * 0.4;
        mouseTargetY = (p.mouseY - height / 2) * 0.4;
        currentMouseX += (mouseTargetX - currentMouseX) * 0.05;
        currentMouseY += (mouseTargetY - currentMouseY) * 0.05;

        p.background('#FAF6EE'); // Warm Khadi cotton paper base

        // 1. Background Watercolor Sun & Atmospheric Wash
        p.push();
        p.translate(currentMouseX * 0.2, -height * 0.15 + currentMouseY * 0.2);

        // Radiating sun rays with soft hatching
        brush.set('HB', '#D97706', 0.8);
        brush.noFill();
        brush.hatch(14, 45 + Math.sin(time * 0.5) * 5);
        brush.circle(0, 0, Math.min(width, height) * 0.28);

        // Radiant Sun Core
        brush.fill('#F59E0B', 85);
        brush.set('rotring', '#AC3B28', 1.2);
        brush.circle(0, 0, Math.min(width, height) * 0.14);
        p.pop();

        // 2. Layered Himalayan Mountain Ridges (Layer 1 - Deep Parallax)
        p.push();
        p.translate(currentMouseX * 0.4, height * 0.15 + currentMouseY * 0.4);

        // Distant high peaks in indigo wash
        brush.fill('#385278', 60);
        brush.set('HB', '#1E2E48', 0.9);
        const peakWidth = width * 1.4;
        const ptsBack = [
          [-peakWidth * 0.5, height * 0.3],
          [-peakWidth * 0.35, -height * 0.15],
          [-peakWidth * 0.15, -height * 0.05],
          [0, -height * 0.22],
          [peakWidth * 0.2, -height * 0.08],
          [peakWidth * 0.38, -height * 0.26],
          [peakWidth * 0.5, height * 0.3],
        ];
        brush.polygon(ptsBack);

        // Mid-distance terraced hills in terracotta ochre
        brush.fill('#D4A373', 75);
        brush.set('rotring', '#9A4526', 1.1);
        const ptsMid = [
          [-peakWidth * 0.5, height * 0.35],
          [-peakWidth * 0.3, 0],
          [-peakWidth * 0.05, height * 0.1],
          [peakWidth * 0.15, -height * 0.05],
          [peakWidth * 0.35, height * 0.05],
          [peakWidth * 0.5, height * 0.35],
        ];
        brush.polygon(ptsMid);
        p.pop();

        // 3. Sacred Lotus / River Ripples (Layer 2 - Midground Parallax)
        p.push();
        p.translate(currentMouseX * 0.8, height * 0.2 + currentMouseY * 0.8);

        // Concentric river ripples with brush splines
        const rippleScale = Math.sin(time) * 4;
        brush.set('rotring', '#1E2E48', 0.9);
        brush.noFill();
        brush.circle(0, 40, (140 + rippleScale));
        brush.circle(0, 40, (220 - rippleScale));

        // Procedural Sacred Lotus Petals
        const petalCount = 8;
        const lotusRadius = 75;
        p.push();
        p.rotate(Math.sin(time * 0.4) * 0.05);

        for (let i = 0; i < petalCount; i++) {
          const angle = (p.TWO_PI / petalCount) * i + Math.sin(time * 0.8) * 0.02;
          p.push();
          p.rotate(angle);
          p.translate(0, -lotusRadius);

          // Outer petal in vermilion wash
          brush.fill('#AC3B28', 110);
          brush.set('rotring', '#7E2616', 1.3);
          brush.polygon([
            [0, -45],
            [18, -10],
            [0, 20],
            [-18, -10],
          ]);

          // Inner gold vein
          brush.set('HB', '#D97706', 0.8);
          brush.line(0, -35, 0, 15);

          p.pop();
        }

        // Golden Bindu Core
        brush.fill('#D97706', 160);
        brush.set('rotring', '#292524', 1.5);
        brush.circle(0, 0, 24);
        brush.fill('#FFFDF9', 240);
        brush.circle(0, 0, 10);
        p.pop();

        p.pop();

        // 4. Floating Marigold Petals (Foreground Dust)
        p.push();
        p.translate(currentMouseX * 1.2, currentMouseY * 1.2);
        for (let k = 0; k < 12; k++) {
          const px = Math.sin(time * 0.6 + k * 1.5) * (width * 0.45);
          const py = Math.cos(time * 0.4 + k * 2.1) * (height * 0.35);
          brush.fill('#F59E0B', 140);
          brush.set('HB', '#D97706', 0.7);
          brush.circle(px, py, 6 + (k % 3) * 2);
        }
        p.pop();
      };
    };

    p5Instance = new p5(sketch);
  } catch (err) {
    console.warn('p5.brush fallback initialized:', err);
  }

  // 2.5D Mouse Parallax Tilt for DOM elements inside the hero section
  if (dioramaWrapper) {
    const handleMouseMove = (e) => {
      const rect = dioramaWrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const tiltX = -y * 12; // degrees
      const tiltY = x * 14;

      dioramaWrapper.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

      // Depth shift for inner layers
      const backLayer = dioramaWrapper.querySelector('[data-depth="back"]');
      const midLayer = dioramaWrapper.querySelector('[data-depth="mid"]');
      const frontLayer = dioramaWrapper.querySelector('[data-depth="front"]');

      if (backLayer) backLayer.style.transform = `translate3d(${x * -15}px, ${y * -15}px, -40px)`;
      if (midLayer) midLayer.style.transform = `translate3d(${x * 12}px, ${y * 12}px, 20px)`;
      if (frontLayer) frontLayer.style.transform = `translate3d(${x * 25}px, ${y * 25}px, 50px)`;
    };

    const handleMouseLeave = () => {
      dioramaWrapper.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
      dioramaWrapper.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
    };

    const handleMouseEnter = () => {
      dioramaWrapper.style.transition = 'none';
    };

    window.addEventListener('mousemove', handleMouseMove);
    dioramaWrapper.addEventListener('mouseleave', handleMouseLeave);
    dioramaWrapper.addEventListener('mouseenter', handleMouseEnter);
  }

  return {
    destroy: () => {
      if (p5Instance) p5Instance.remove();
    }
  };
}

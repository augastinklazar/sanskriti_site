import anime from 'animejs';

/**
 * Procedural Sacred Geometry & Kolam/Rangoli Generator
 * Animated via Anime.js stroke-dashoffset with multiple classical symmetries
 */
export function initKolamMatrix() {
  const container = document.getElementById('kolam-svg-container');
  if (!container) return;

  const symmetryBtns = document.querySelectorAll('[data-kolam-symmetry]');
  const ringsSlider = document.getElementById('kolam-rings-slider');
  const ringsValueDisplay = document.getElementById('kolam-rings-value');
  const colorBtns = document.querySelectorAll('[data-kolam-color]');
  const regenerateBtn = document.getElementById('kolam-regenerate-btn');
  const exportBtn = document.getElementById('kolam-export-btn');
  const speedSlider = document.getElementById('kolam-speed-slider');

  let currentSymmetry = '8-fold';
  let ringsCount = 5;
  let currentColor = '#D4AF37';
  let animDuration = 2400;
  let currentAnimeInstance = null;

  function polarToCartesian(centerX, centerY, radius, angleInRadians) {
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  }

  function generateKolamSVG() {
    const size = 600;
    const center = size / 2;
    const paths = [];
    const seed = Math.random();

    if (currentSymmetry === 'sri-yantra') {
      const bInner = size * 0.43;
      
      paths.push({
        d: `M ${center - bInner},${center} A ${bInner},${bInner} 0 1,0 ${center + bInner},${center} A ${bInner},${bInner} 0 1,0 ${center - bInner},${center}`,
        type: 'boundary',
        width: 1.5
      });
      paths.push({
        d: `M ${center - bInner + 10},${center} A ${bInner - 10},${bInner - 10} 0 1,0 ${center + bInner - 10},${center} A ${bInner - 10},${bInner - 10} 0 1,0 ${center - bInner + 10},${center}`,
        type: 'boundary',
        width: 1
      });

      const r16 = size * 0.38;
      const r16Base = size * 0.32;
      for (let i = 0; i < 16; i++) {
        const a1 = (i / 16) * Math.PI * 2;
        const a2 = ((i + 1) / 16) * Math.PI * 2;
        const aMid = (a1 + a2) / 2;
        const p1 = polarToCartesian(center, center, r16Base, a1);
        const p2 = polarToCartesian(center, center, r16Base, a2);
        const pTip = polarToCartesian(center, center, r16, aMid);
        paths.push({
          d: `M ${p1.x},${p1.y} Q ${pTip.x},${pTip.y} ${p2.x},${p2.y}`,
          type: 'petal',
          width: 1.2
        });
      }

      const r8 = size * 0.31;
      const r8Base = size * 0.25;
      for (let i = 0; i < 8; i++) {
        const a1 = (i / 8) * Math.PI * 2;
        const a2 = ((i + 1) / 8) * Math.PI * 2;
        const aMid = (a1 + a2) / 2;
        const p1 = polarToCartesian(center, center, r8Base, a1);
        const p2 = polarToCartesian(center, center, r8Base, a2);
        const pTip = polarToCartesian(center, center, r8, aMid);
        paths.push({
          d: `M ${p1.x},${p1.y} Q ${pTip.x},${pTip.y} ${p2.x},${p2.y}`,
          type: 'petal',
          width: 1.4
        });
      }

      const shivaTriangles = [
        { yBase: center + 110, yApex: center - 120, halfWidth: 120 },
        { yBase: center + 75, yApex: center - 90, halfWidth: 95 },
        { yBase: center + 45, yApex: center - 70, halfWidth: 70 },
        { yBase: center + 20, yApex: center - 45, halfWidth: 45 }
      ];

      const shaktiTriangles = [
        { yBase: center - 110, yApex: center + 125, halfWidth: 120 },
        { yBase: center - 85, yApex: center + 95, halfWidth: 100 },
        { yBase: center - 60, yApex: center + 70, halfWidth: 80 },
        { yBase: center - 35, yApex: center + 48, halfWidth: 55 },
        { yBase: center - 12, yApex: center + 28, halfWidth: 32 }
      ];

      shivaTriangles.forEach(t => {
        paths.push({
          d: `M ${center},${t.yApex} L ${center + t.halfWidth},${t.yBase} L ${center - t.halfWidth},${t.yBase} Z`,
          type: 'triangle',
          width: 1.5
        });
      });

      shaktiTriangles.forEach(t => {
        paths.push({
          d: `M ${center},${t.yApex} L ${center + t.halfWidth},${t.yBase} L ${center - t.halfWidth},${t.yBase} Z`,
          type: 'triangle',
          width: 1.5
        });
      });

      paths.push({
        d: `M ${center - 5},${center} A 5,5 0 1,0 ${center + 5},${center} A 5,5 0 1,0 ${center - 5},${center}`,
        type: 'bindu',
        width: 3
      });

    } else if (currentSymmetry === 'sikku-knot') {
      const gridCount = 7;
      const spacing = 38;
      const startX = center - ((gridCount - 1) * spacing) / 2;
      const startY = center - ((gridCount - 1) * spacing) / 2;

      for (let r = 0; r < gridCount; r++) {
        for (let c = 0; c < gridCount; c++) {
          const px = startX + c * spacing;
          const py = startY + r * spacing;
          paths.push({
            d: `M ${px - 2},${py} A 2,2 0 1,0 ${px + 2},${py} A 2,2 0 1,0 ${px - 2},${py}`,
            type: 'dot',
            width: 3
          });
        }
      }

      const symmetryOrder = 4;
      for (let fold = 0; fold < symmetryOrder; fold++) {
        const baseAngle = (fold / symmetryOrder) * Math.PI * 2;
        let dStr = '';

        for (let ring = 1; ring <= ringsCount; ring++) {
          const rBase = ring * 28;
          const points = [];
          const numNodes = 6;
          for (let n = 0; n <= numNodes; n++) {
            const a = baseAngle + (n / numNodes) * (Math.PI / 2);
            const curR = rBase + Math.sin(n * Math.PI * 1.5 + seed * 5) * 16;
            points.push(polarToCartesian(center, center, curR, a));
          }

          dStr = `M ${points[0].x},${points[0].y}`;
          for (let p = 1; p < points.length; p++) {
            const prev = points[p - 1];
            const curr = points[p];
            const midX = (prev.x + curr.x) / 2 + Math.cos(baseAngle) * 10;
            const midY = (prev.y + curr.y) / 2 + Math.sin(baseAngle) * 10;
            dStr += ` Q ${midX},${midY} ${curr.x},${curr.y}`;
          }
          paths.push({ d: dStr, type: 'knot', width: 1.8 });
        }
      }

    } else {
      let folds = 8;
      if (currentSymmetry === '4-fold') folds = 4;
      if (currentSymmetry === '12-fold') folds = 12;

      for (let ring = 1; ring <= ringsCount; ring++) {
        const r = (ring / (ringsCount + 1)) * (size * 0.44);
        paths.push({
          d: `M ${center - r},${center} A ${r},${r} 0 1,0 ${center + r},${center} A ${r},${r} 0 1,0 ${center - r},${center}`,
          type: 'ring',
          width: ring === ringsCount ? 1.5 : 0.8
        });

        for (let f = 0; f < folds; f++) {
          const a1 = (f / folds) * Math.PI * 2;
          const a2 = ((f + 1) / folds) * Math.PI * 2;
          const aMid = (a1 + a2) / 2;

          const p1 = polarToCartesian(center, center, r * 0.78, a1);
          const p2 = polarToCartesian(center, center, r * 0.78, a2);
          const pApex = polarToCartesian(center, center, r * 1.02, aMid);
          
          const ctrl1 = polarToCartesian(center, center, r * 0.95, a1 + 0.1);
          const ctrl2 = polarToCartesian(center, center, r * 0.95, a2 - 0.1);

          paths.push({
            d: `M ${p1.x},${p1.y} C ${ctrl1.x},${ctrl1.y} ${pApex.x},${pApex.y} ${pApex.x},${pApex.y} C ${pApex.x},${pApex.y} ${ctrl2.x},${ctrl2.y} ${p2.x},${p2.y}`,
            type: 'petal',
            width: 1.3
          });

          if (ring % 2 === 0) {
            const pInner = polarToCartesian(center, center, r * 0.45, aMid);
            paths.push({
              d: `M ${pApex.x},${pApex.y} L ${pInner.x},${pInner.y}`,
              type: 'spoke',
              width: 0.9
            });
          }
        }
      }

      paths.push({
        d: `M ${center - 6},${center} A 6,6 0 1,0 ${center + 6},${center} A 6,6 0 1,0 ${center - 6},${center}`,
        type: 'bindu',
        width: 3
      });
    }

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    svg.setAttribute('class', 'w-full h-full max-w-[560px] max-h-[560px] mx-auto filter drop-shadow-[0_0_20px_rgba(212,175,55,0.25)]');
    svg.setAttribute('id', 'kolam-svg-element');

    paths.forEach((p) => {
      const pathEl = document.createElementNS(svgNS, 'path');
      pathEl.setAttribute('d', p.d);
      pathEl.setAttribute('fill', 'none');
      pathEl.setAttribute('stroke', currentColor);
      pathEl.setAttribute('stroke-width', p.width);
      pathEl.setAttribute('stroke-linecap', 'round');
      pathEl.setAttribute('stroke-linejoin', 'round');
      pathEl.setAttribute('class', 'kolam-path');
      svg.appendChild(pathEl);
    });

    container.innerHTML = '';
    container.appendChild(svg);

    const pathElements = container.querySelectorAll('.kolam-path');
    
    pathElements.forEach(el => {
      const len = el.getTotalLength ? el.getTotalLength() : 400;
      el.style.strokeDasharray = len;
      el.style.strokeDashoffset = len;
    });

    if (currentAnimeInstance) {
      currentAnimeInstance.pause();
    }

    currentAnimeInstance = anime({
      targets: pathElements,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutCubic',
      duration: animDuration,
      delay: (el, i) => i * 18,
      autoplay: true
    });
  }

  symmetryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      symmetryBtns.forEach(b => {
        b.classList.remove('bg-vedic-gold', 'text-vedic-midnight', 'border-vedic-gold');
        b.classList.add('border-vedic-gold/30', 'text-vedic-sandstone');
      });
      btn.classList.add('bg-vedic-gold', 'text-vedic-midnight', 'border-vedic-gold');
      btn.classList.remove('border-vedic-gold/30', 'text-vedic-sandstone');

      currentSymmetry = btn.dataset.kolamSymmetry;
      generateKolamSVG();
    });
  });

  if (ringsSlider) {
    ringsSlider.addEventListener('input', (e) => {
      ringsCount = parseInt(e.target.value, 10);
      if (ringsValueDisplay) ringsValueDisplay.textContent = ringsCount;
      generateKolamSVG();
    });
  }

  if (speedSlider) {
    speedSlider.addEventListener('input', (e) => {
      animDuration = parseInt(e.target.value, 10);
    });
  }

  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorBtns.forEach(b => b.classList.remove('ring-2', 'ring-white'));
      btn.classList.add('ring-2', 'ring-white');
      currentColor = btn.dataset.kolamColor;
      const pathEls = container.querySelectorAll('.kolam-path');
      pathEls.forEach(p => p.setAttribute('stroke', currentColor));
    });
  });

  if (regenerateBtn) {
    regenerateBtn.addEventListener('click', () => {
      generateKolamSVG();
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const svgEl = document.getElementById('kolam-svg-element');
      if (!svgEl) return;
      const serializer = new XMLSerializer();
      const source = serializer.serializeToString(svgEl);
      const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sanskriti-kolam-${currentSymmetry}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  generateKolamSVG();
}

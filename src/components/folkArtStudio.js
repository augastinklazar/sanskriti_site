/**
 * Event-Driven Khadi Folk Art Studio using p5.brush
 * Renders only on user stroke/stamp action (noLoop) for maximum efficiency
 */
import p5 from 'p5';
import * as brush from 'p5.brush';

export function initFolkArtStudio() {
  const container = document.getElementById('folk-art-canvas-container');
  if (!container) return;

  let activeColor = '#AC3B28';
  let activeBrush = 'rotring';
  let activeWeight = 2;
  let activeStamp = null;

  let p5Instance = null;

  const sketch = (p) => {
    let width = container.clientWidth || 700;
    let height = 480;

    p.setup = () => {
      brush.instance(p);
      const canvas = p.createCanvas(width, height, p.WEBGL);
      canvas.parent(container);
      p.background('#FAF6EE');
      p.noLoop(); // Event-driven drawing only!
      brush.scaleBrushes(1.2);
    };

    p.windowResized = () => {
      width = container.clientWidth || 700;
      p.resizeCanvas(width, height);
      p.background('#FAF6EE');
    };

    function drawStamp(x, y, stampType) {
      p.push();
      p.translate(x, y);

      if (stampType === 'warli') {
        brush.fill(activeColor, 180);
        brush.set(activeBrush, activeColor, activeWeight);
        brush.polygon([
          [-14, -28],
          [14, -28],
          [0, -8],
        ]);
        brush.polygon([
          [0, -8],
          [-14, 12],
          [14, 12],
        ]);
        brush.circle(0, -36, 12);
        brush.line(-14, -28, -26, -14);
        brush.line(14, -28, 26, -14);
        brush.line(-10, 12, -18, 30);
        brush.line(10, 12, 18, 30);
      } else if (stampType === 'lotus') {
        brush.fill(activeColor, 140);
        brush.set('rotring', activeColor, 1.5);
        brush.circle(0, 0, 16);
        for (let i = 0; i < 6; i++) {
          p.push();
          p.rotate((p.TWO_PI / 6) * i);
          brush.polygon([
            [0, -10],
            [12, -30],
            [0, -42],
            [-12, -30],
          ]);
          p.pop();
        }
      } else if (stampType === 'paisley') {
        brush.fill(activeColor, 130);
        brush.set('rotring', activeColor, 1.8);
        brush.polygon([
          [0, 25],
          [20, 15],
          [24, -10],
          [12, -28],
          [-5, -35],
          [-16, -20],
          [-22, 5],
          [-10, 22],
        ]);
        brush.circle(0, -5, 10);
      } else if (stampType === 'kolam') {
        brush.noFill();
        brush.set('rotring', activeColor, 2);
        brush.circle(-18, -18, 24);
        brush.circle(18, -18, 24);
        brush.circle(18, 18, 24);
        brush.circle(-18, 18, 24);
        brush.fill('#FAF6EE', 255);
        brush.circle(0, 0, 14);
      }

      p.pop();
    }

    p.mousePressed = () => {
      if (p.mouseX >= 0 && p.mouseX <= width && p.mouseY >= 0 && p.mouseY <= height) {
        const webglX = p.mouseX - width / 2;
        const webglY = p.mouseY - height / 2;

        if (activeStamp) {
          drawStamp(webglX, webglY, activeStamp);
        } else {
          brush.set(activeBrush, activeColor, activeWeight);
          if (activeBrush === 'wash') {
            brush.fill(activeColor, 40);
            brush.noStroke();
            brush.circle(webglX, webglY, 32);
          } else if (activeBrush === 'hatch') {
            brush.noFill();
            brush.hatch(6, 45);
            brush.circle(webglX, webglY, 28);
          } else {
            brush.circle(webglX, webglY, activeWeight * 1.5);
          }
        }
      }
    };

    p.mouseDragged = () => {
      if (!activeStamp && p.mouseX >= 0 && p.mouseX <= width && p.mouseY >= 0 && p.mouseY <= height) {
        const webglX = p.mouseX - width / 2;
        const webglY = p.mouseY - height / 2;
        const prevWebglX = p.pmouseX - width / 2;
        const prevWebglY = p.pmouseY - height / 2;

        brush.set(activeBrush, activeColor, activeWeight);
        if (activeBrush === 'wash') {
          brush.fill(activeColor, 25);
          brush.noStroke();
          brush.circle(webglX, webglY, 28);
        } else if (activeBrush === 'hatch') {
          brush.noFill();
          brush.hatch(6, 45);
          brush.circle(webglX, webglY, 24);
        } else {
          brush.line(prevWebglX, prevWebglY, webglX, webglY);
        }
      }
    };
  };

  try {
    p5Instance = new p5(sketch);
  } catch (e) {
    console.warn('p5 folk studio:', e);
  }

  // Hook UI Controls
  const colorBtns = document.querySelectorAll('[data-studio-color]');
  colorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeColor = btn.getAttribute('data-studio-color');
      colorBtns.forEach(b => b.classList.remove('ring-2', 'ring-offset-2', 'ring-[#292524]'));
      btn.classList.add('ring-2', 'ring-offset-2', 'ring-[#292524]');
    });
  });

  const brushBtns = document.querySelectorAll('[data-studio-brush]');
  brushBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeBrush = btn.getAttribute('data-studio-brush');
      activeStamp = null;
      brushBtns.forEach(b => b.classList.remove('bg-[#1E2E48]', 'text-white'));
      btn.classList.add('bg-[#1E2E48]', 'text-white');
      document.querySelectorAll('[data-studio-stamp]').forEach(s => s.classList.remove('bg-[#AC3B28]', 'text-white'));
    });
  });

  const stampBtns = document.querySelectorAll('[data-studio-stamp]');
  stampBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeStamp = btn.getAttribute('data-studio-stamp');
      stampBtns.forEach(s => s.classList.remove('bg-[#AC3B28]', 'text-white'));
      btn.classList.add('bg-[#AC3B28]', 'text-white');
      brushBtns.forEach(b => b.classList.remove('bg-[#1E2E48]', 'text-white'));
    });
  });

  const clearBtn = document.getElementById('studio-clear-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (p5Instance) {
        p5Instance.background('#FAF6EE');
      }
    });
  }

  const downloadBtn = document.getElementById('studio-download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      if (p5Instance) {
        p5Instance.saveCanvas('sanskriti-folk-art', 'png');
      }
    });
  }

  return {
    destroy: () => {
      if (p5Instance) p5Instance.remove();
    }
  };
}

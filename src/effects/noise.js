/**
 * Handmade Khadi / Cotton Rag Paper Texture Overlay
 * Generates organic fiber flecks and delicate paper tooth on a 2D canvas
 */
export function initNoiseOverlay() {
  const canvas = document.getElementById('noise-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Generate static paper grain offscreen for 60 FPS performance
  const offscreen = document.createElement('canvas');
  offscreen.width = 512;
  offscreen.height = 512;
  const offCtx = offscreen.getContext('2d');

  const imgData = offCtx.createImageData(512, 512);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    // Warm fiber grain
    const noise = (Math.random() - 0.5) * 22;
    const base = 245 + noise;
    data[i] = Math.min(255, Math.max(220, base - 6));     // R (warm)
    data[i + 1] = Math.min(255, Math.max(215, base - 10)); // G (golden paper)
    data[i + 2] = Math.min(255, Math.max(205, base - 18)); // B (khadi cream)
    data[i + 3] = Math.random() < 0.08 ? 55 : 25;           // Occasional dark pulp fiber
  }
  offCtx.putImageData(imgData, 0, 0);

  // Draw natural pulp fiber streaks
  offCtx.strokeStyle = 'rgba(120, 95, 70, 0.15)';
  offCtx.lineWidth = 1;
  for (let j = 0; j < 35; j++) {
    const sx = Math.random() * 512;
    const sy = Math.random() * 512;
    offCtx.beginPath();
    offCtx.moveTo(sx, sy);
    offCtx.bezierCurveTo(
      sx + (Math.random() - 0.5) * 15,
      sy + (Math.random() - 0.5) * 15,
      sx + (Math.random() - 0.5) * 25,
      sy + (Math.random() - 0.5) * 25,
      sx + (Math.random() - 0.5) * 35,
      sy + (Math.random() - 0.5) * 35
    );
    offCtx.stroke();
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    const pattern = ctx.createPattern(offscreen, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, width, height);
  }

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    render();
  });

  render();
}

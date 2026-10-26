/**
 * Lightweight Static Handmade Paper Texture
 * Generates once on offscreen canvas and tiles pattern without continuous GPU redraw
 */
export function initNoiseOverlay() {
  const canvas = document.getElementById('noise-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Generate 256x256 seamless paper grain pattern once
  const offscreen = document.createElement('canvas');
  offscreen.width = 256;
  offscreen.height = 256;
  const offCtx = offscreen.getContext('2d');

  const imgData = offCtx.createImageData(256, 256);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 16;
    const base = 240 + noise;
    data[i] = base - 6;     // R
    data[i + 1] = base - 10; // G
    data[i + 2] = base - 18; // B
    data[i + 3] = Math.random() < 0.05 ? 50 : 20; // Subtle fiber flecks
  }
  offCtx.putImageData(imgData, 0, 0);

  function render() {
    ctx.clearRect(0, 0, width, height);
    const pattern = ctx.createPattern(offscreen, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, width, height);
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      render();
    }, 150);
  });

  render();
}

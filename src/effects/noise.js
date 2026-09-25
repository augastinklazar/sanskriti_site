/**
 * Procedural Parchment & Silk Grain Canvas Overlay
 * Creates an organic atmospheric grain texture throttled to preserve 60 FPS
 */
export function initNoiseOverlay() {
  const canvas = document.getElementById('noise-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let width = 0;
  let height = 0;
  let animationFrameId = null;
  let lastFrameTime = 0;
  const fpsInterval = 1000 / 24;

  const patternSize = 256;
  const patterns = [];

  for (let p = 0; p < 4; p++) {
    const pCanvas = document.createElement('canvas');
    pCanvas.width = patternSize;
    pCanvas.height = patternSize;
    const pCtx = pCanvas.getContext('2d');
    const imgData = pCtx.createImageData(patternSize, patternSize);
    const data32 = new Uint32Array(imgData.data.buffer);
    const len = data32.length;

    for (let i = 0; i < len; i++) {
      const val = (Math.random() * 255) | 0;
      const alpha = (Math.random() * 45) | 0;
      data32[i] = (alpha << 24) | ((val * 0.85 | 0) << 16) | ((val * 0.95 | 0) << 8) | val;
    }
    pCtx.putImageData(imgData, 0, 0);
    patterns.push(ctx.createPattern(pCanvas, 'repeat'));
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  let patternIndex = 0;

  function render(time) {
    animationFrameId = requestAnimationFrame(render);
    const elapsed = time - lastFrameTime;

    if (elapsed > fpsInterval) {
      lastFrameTime = time - (elapsed % fpsInterval);
      patternIndex = (patternIndex + 1) % patterns.length;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = patterns[patternIndex];
      ctx.fillRect(0, 0, width, height);
    }
  }

  render(0);

  return () => {
    window.removeEventListener('resize', resize);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  };
}

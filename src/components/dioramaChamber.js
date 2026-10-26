/**
 * 2.5D Interactive Layered Papercraft Diorama Chamber
 * Real-time 3D perspective pop-up book physics with layer explosion inspection
 */

export function initDioramaChamber() {
  const box = document.getElementById('diorama-3d-box');
  const explodeBtn = document.getElementById('diorama-explode-btn');
  const regionNorthBtn = document.getElementById('diorama-region-north');
  const regionSouthBtn = document.getElementById('diorama-region-south');
  if (!box) return;

  let isExploded = false;
  let activeRegion = 'north'; // 'north' or 'south'

  const layers = [
    { el: box.querySelector('[data-layer="1"]'), baseZ: 0, explodedZ: -120 },
    { el: box.querySelector('[data-layer="2"]'), baseZ: 30, explodedZ: -20 },
    { el: box.querySelector('[data-layer="3"]'), baseZ: 65, explodedZ: 80 },
    { el: box.querySelector('[data-layer="4"]'), baseZ: 100, explodedZ: 180 }
  ];

  function updateLayerDepths() {
    layers.forEach(l => {
      if (!l.el) return;
      const targetZ = isExploded ? l.explodedZ : l.baseZ;
      l.el.style.transform = `translateZ(${targetZ}px)`;
    });
  }

  // Mouse Parallax & 3D Tilt
  let mouseX = 0;
  let mouseY = 0;

  function onMouseMove(e) {
    const rect = box.getBoundingClientRect();
    if (rect.width === 0) return;

    mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    mouseY = (e.clientY - rect.top) / rect.height - 0.5;

    const tiltX = -mouseY * (isExploded ? 24 : 14);
    const tiltY = mouseX * (isExploded ? 30 : 18);

    box.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  }

  function onMouseLeave() {
    box.style.transform = isExploded 
      ? `perspective(1200px) rotateX(15deg) rotateY(-20deg)` 
      : `perspective(1200px) rotateX(0deg) rotateY(0deg)`;
    box.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
  }

  function onMouseEnter() {
    box.style.transition = 'none';
  }

  window.addEventListener('mousemove', onMouseMove);
  box.addEventListener('mouseleave', onMouseLeave);
  box.addEventListener('mouseenter', onMouseEnter);

  // Toggle Exploded Layers
  if (explodeBtn) {
    explodeBtn.addEventListener('click', () => {
      isExploded = !isExploded;
      explodeBtn.textContent = isExploded ? 'Flatten Diorama' : 'Explode 2.5D Layers';
      explodeBtn.className = isExploded
        ? 'px-4 py-2 rounded-xl text-xs font-semibold bg-[#AC3B28] text-white shadow-paper-md transition-all'
        : 'px-4 py-2 rounded-xl text-xs font-semibold bg-[#1E2E48] text-white shadow-paper-md transition-all';
      updateLayerDepths();
      onMouseLeave();
    });
  }

  // Switch Regions
  function setRegion(region) {
    activeRegion = region;
    const northContent = box.querySelectorAll('.diorama-north-content');
    const southContent = box.querySelectorAll('.diorama-south-content');

    if (region === 'north') {
      northContent.forEach(el => el.classList.remove('hidden'));
      southContent.forEach(el => el.classList.add('hidden'));
      if (regionNorthBtn) regionNorthBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1E2E48] text-white';
      if (regionSouthBtn) regionSouthBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-medium text-[#292524] hover:bg-[#EADBCA]';
    } else {
      northContent.forEach(el => el.classList.add('hidden'));
      southContent.forEach(el => el.classList.remove('hidden'));
      if (regionSouthBtn) regionSouthBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1E2E48] text-white';
      if (regionNorthBtn) regionNorthBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-medium text-[#292524] hover:bg-[#EADBCA]';
    }
  }

  if (regionNorthBtn) regionNorthBtn.addEventListener('click', () => setRegion('north'));
  if (regionSouthBtn) regionSouthBtn.addEventListener('click', () => setRegion('south'));

  updateLayerDepths();
}

import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 4: Architecture & Stepwells ("The Baoli: The Depth of Time")
 * Procedural 3D Stepwell utilizing the authentic reference palette:
 * Sandstone Cinnamon (#99582A), Espresso (#432818), Sand Gold (#BB9457), and Cream (#FFE6A7).
 */
export function initBaoliStepwell() {
  const container = document.getElementById('baoli-canvas-container');
  const section = document.getElementById('stepwell-section');
  if (!container || !section) return;

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x140A06, 0.036);

  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
  camera.position.set(0, 14, 18);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0x5c3722, 0.55);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xFFE6A7, 2.2);
  sunLight.position.set(8, 25, 10);
  scene.add(sunLight);

  const waterGlowLight = new THREE.PointLight(0xBB9457, 2.2, 18, 1.4);
  waterGlowLight.position.set(0, -9.5, 0);
  scene.add(waterGlowLight);

  // Palette Materials
  const sandstoneMat = new THREE.MeshStandardMaterial({
    color: 0x99582A, // Rich Cinnamon Terracotta
    roughness: 0.82,
    metalness: 0.15,
  });

  const darkSandstoneMat = new THREE.MeshStandardMaterial({
    color: 0x432818, // Roasted Espresso Umber
    roughness: 0.9,
    metalness: 0.1,
  });

  const goldTrimMat = new THREE.MeshStandardMaterial({
    color: 0xBB9457, // Sand Gold
    roughness: 0.3,
    metalness: 0.85,
    emissive: 0x3d2711,
    emissiveIntensity: 0.3
  });

  const baoliGroup = new THREE.Group();
  scene.add(baoliGroup);

  // 1. Procedural Cascading Pyramidal Steps
  const tiersCount = 7;
  const tierHeight = 2.6;
  const stepGeo = new THREE.BoxGeometry(0.8, 0.3, 0.8);

  for (let t = 0; t < tiersCount; t++) {
    const yLevel = 6 - t * tierHeight;
    const tierSize = 14 - t * 1.5;

    const facades = [
      { axis: 'x', dir: 1, rot: 0 },
      { axis: 'x', dir: -1, rot: Math.PI },
      { axis: 'z', dir: -1, rot: Math.PI / 2 }
    ];

    facades.forEach(facade => {
      for (let s = -3; s <= 3; s++) {
        const setCenter = (s / 3.5) * (tierSize * 0.4);
        for (let r = 0; r < 5; r++) {
          const stepY = yLevel - r * 0.35;
          const stepOffset = r * 0.45;
          
          const stepLeft = new THREE.Mesh(stepGeo, sandstoneMat);
          const stepRight = new THREE.Mesh(stepGeo, sandstoneMat);

          if (facade.axis === 'x') {
            const posX = setCenter - stepOffset * 0.7;
            const posZ = (tierSize * 0.5 - stepOffset) * facade.dir;
            stepLeft.position.set(posX, stepY, posZ);
            stepRight.position.set(setCenter + stepOffset * 0.7, stepY, posZ);
          } else {
            const posZ = setCenter - stepOffset * 0.7;
            const posX = (tierSize * 0.5 - stepOffset) * facade.dir;
            stepLeft.position.set(posX, stepY, posZ);
            stepRight.position.set(posX, stepY, setCenter + stepOffset * 0.7);
          }

          baoliGroup.add(stepLeft);
          baoliGroup.add(stepRight);
        }
      }
    });

    const galleryFloorGeo = new THREE.BoxGeometry(tierSize * 1.2, 0.4, 2.2);
    const galleryFloor = new THREE.Mesh(galleryFloorGeo, darkSandstoneMat);
    galleryFloor.position.set(0, yLevel, tierSize * 0.55);
    baoliGroup.add(galleryFloor);
  }

  // 2. Instanced Carved Sandstone Pillars
  const pillarGeo = new THREE.CylinderGeometry(0.22, 0.28, 2.8, 12);
  const pillarCapGeo = new THREE.BoxGeometry(0.7, 0.2, 0.7);
  const pillarCount = 48;
  const instancedPillars = new THREE.InstancedMesh(pillarGeo, sandstoneMat, pillarCount);
  const instancedCaps = new THREE.InstancedMesh(pillarCapGeo, goldTrimMat, pillarCount);

  const dummy = new THREE.Object3D();
  let pIdx = 0;

  for (let lvl = 0; lvl < 4; lvl++) {
    const yPillar = 4.5 - lvl * 3.4;
    const zPillar = 7.5 - lvl * 1.0;
    const countPerRow = 8;
    for (let c = 0; c < countPerRow; c++) {
      if (pIdx < pillarCount) {
        const xPillar = (c - countPerRow / 2 + 0.5) * 1.5;
        dummy.position.set(xPillar, yPillar, zPillar);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        instancedPillars.setMatrixAt(pIdx, dummy.matrix);

        dummy.position.set(xPillar, yPillar + 1.4, zPillar);
        dummy.updateMatrix();
        instancedCaps.setMatrixAt(pIdx, dummy.matrix);

        pIdx++;
      }
    }
  }
  instancedPillars.instanceMatrix.needsUpdate = true;
  instancedCaps.instanceMatrix.needsUpdate = true;
  baoliGroup.add(instancedPillars);
  baoliGroup.add(instancedCaps);

  // 3. Fractal Jharokhas
  for (let j = 0; j < 3; j++) {
    const jharokhaGroup = new THREE.Group();
    const yJ = 3.5 - j * 3.8;
    
    const lintelGeo = new THREE.TorusGeometry(1.4, 0.16, 8, 24, Math.PI);
    const arch = new THREE.Mesh(lintelGeo, goldTrimMat);
    arch.position.set(0, yJ + 1.2, 5.8 - j * 0.9);
    jharokhaGroup.add(arch);

    const balustradeGeo = new THREE.BoxGeometry(3.0, 0.8, 0.3);
    const balustrade = new THREE.Mesh(balustradeGeo, sandstoneMat);
    balustrade.position.set(0, yJ, 6.0 - j * 0.9);
    jharokhaGroup.add(balustrade);

    baoliGroup.add(jharokhaGroup);
  }

  // 4. Subterranean Water Mirror
  const waterGeo = new THREE.PlaneGeometry(12, 12, 32, 32);
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x1A0D08,
    roughness: 0.18,
    metalness: 0.82,
    transparent: true,
    opacity: 0.9,
    emissive: 0x33170D,
    emissiveIntensity: 0.35
  });
  const waterMesh = new THREE.Mesh(waterGeo, waterMat);
  waterMesh.rotation.x = -Math.PI / 2;
  waterMesh.position.y = -10.5;
  baoliGroup.add(waterMesh);

  // Floating Diyas with warm cream-gold glow
  const diyaCount = 14;
  const diyas = [];
  const diyaDishGeo = new THREE.CylinderGeometry(0.2, 0.1, 0.08, 12);
  const diyaMat = new THREE.MeshStandardMaterial({ color: 0x6F1D1B, roughness: 0.6 });
  const flameGeo = new THREE.SphereGeometry(0.065, 8, 8);
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xFFE6A7 });

  for (let d = 0; d < diyaCount; d++) {
    const dGroup = new THREE.Group();
    const dish = new THREE.Mesh(diyaDishGeo, diyaMat);
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.y = 0.08;
    dGroup.add(dish);
    dGroup.add(flame);

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 3.5 + 0.5;
    const dx = Math.cos(angle) * dist;
    const dz = Math.sin(angle) * dist;
    dGroup.position.set(dx, -10.42, dz);

    dGroup.userData = {
      baseX: dx,
      baseZ: dz,
      driftSpeed: Math.random() * 0.5 + 0.3,
      driftRadius: Math.random() * 0.4 + 0.2,
      phase: Math.random() * Math.PI * 2
    };

    baoliGroup.add(dGroup);
    diyas.push(dGroup);
  }

  // 5. Volumetric Sand-Gold Dust Motes
  const moteCount = 600;
  const moteGeo = new THREE.BufferGeometry();
  const motePos = new Float32Array(moteCount * 3);
  for (let i = 0; i < moteCount; i++) {
    motePos[i * 3] = (Math.random() - 0.5) * 16;
    motePos[i * 3 + 1] = Math.random() * 22 - 10;
    motePos[i * 3 + 2] = (Math.random() - 0.5) * 16;
  }
  moteGeo.setAttribute('position', new THREE.BufferAttribute(motePos, 3));
  const moteMat = new THREE.PointsMaterial({
    size: 0.14,
    color: 0xFFE6A7,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending
  });
  const motes = new THREE.Points(moteGeo, moteMat);
  baoliGroup.add(motes);

  // 6. Camera Descent Path & HUD
  const cameraPath = { progress: 0 };
  const hudDepth = document.getElementById('baoli-hud-depth');
  const hudMilestone = document.getElementById('baoli-hud-milestone');
  const hudDesc = document.getElementById('baoli-hud-desc');
  const manualSlider = document.getElementById('baoli-depth-slider');

  const milestones = [
    { p: 0.0, depth: '0m', name: 'Terrace I: The Gathering Mandapa', desc: 'Where desert pilgrims once paused before descending into the sanctuary of living rock.' },
    { p: 0.3, depth: '-8m', name: 'Terrace II: The Acoustic Whispering Galleries', desc: 'Ornate fluted sandstone pillars that naturally amplify sacred Vedic chants across subterranean corridors.' },
    { p: 0.65, depth: '-18m', name: 'Terrace III: Fractal Step Pyramids', desc: 'Over 3,500 narrow mathematical steps engineered to allow access to water at any fluctuating drought level.' },
    { p: 1.0, depth: '-28m', name: 'Terrace IV: The Sacred Water Sanctum', desc: 'Perpetually 5°C cooler than the searing desert above—a subterranean womb (Garbhagriha) of cool stillness and reflection.' }
  ];

  function updateCameraPosition(p) {
    cameraPath.progress = p;

    const startY = 14;
    const endY = -9.2;
    const targetY = startY + (endY - startY) * p;

    const startZ = 18;
    const endZ = 3.5;
    const targetZ = startZ + (endZ - startZ) * Math.pow(p, 0.9);
    const targetX = Math.sin(p * Math.PI) * 1.5;

    camera.position.set(targetX, targetY, targetZ);
    camera.lookAt(0, targetY - 2.5 - (1 - p) * 3, -1);

    let activeMilestone = milestones[0];
    for (let i = milestones.length - 1; i >= 0; i--) {
      if (p >= milestones[i].p - 0.1) {
        activeMilestone = milestones[i];
        break;
      }
    }

    if (hudDepth) hudDepth.textContent = activeMilestone.depth;
    if (hudMilestone) hudMilestone.textContent = activeMilestone.name;
    if (hudDesc) hudDesc.textContent = activeMilestone.desc;
    if (manualSlider && Math.abs(parseFloat(manualSlider.value) - p) > 0.05) {
      manualSlider.value = p;
    }
  }

  const st = ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: '+=250%',
    pin: true,
    scrub: 1.2,
    onUpdate: (self) => {
      updateCameraPosition(self.progress);
    }
  });

  if (manualSlider) {
    manualSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      updateCameraPosition(val);
    });
  }

  function onResize() {
    if (!container) return;
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener('resize', onResize);

  let clock = new THREE.Clock();
  let animationFrameId;

  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    const waterPositions = waterGeo.attributes.position.array;
    for (let i = 0; i < waterPositions.length; i += 3) {
      const u = waterPositions[i];
      const v = waterPositions[i + 1];
      waterPositions[i + 2] = Math.sin(u * 0.8 + time * 1.8) * 0.05 + Math.cos(v * 0.8 + time * 1.5) * 0.04;
    }
    waterGeo.attributes.position.needsUpdate = true;

    diyas.forEach((d) => {
      const u = d.userData;
      const angle = time * u.driftSpeed + u.phase;
      d.position.x = u.baseX + Math.cos(angle) * u.driftRadius;
      d.position.z = u.baseZ + Math.sin(angle) * u.driftRadius;
      d.position.y = -10.42 + Math.sin(time * 2.5 + u.phase) * 0.03;
    });

    const mPos = moteGeo.attributes.position.array;
    for (let i = 1; i < mPos.length; i += 3) {
      mPos[i] += 0.005;
      if (mPos[i] > 14) mPos[i] = -10;
    }
    moteGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  return () => {
    window.removeEventListener('resize', onResize);
    cancelAnimationFrame(animationFrameId);
    if (st) st.kill();
    renderer.dispose();
  };
}

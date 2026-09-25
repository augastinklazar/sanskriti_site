import * as THREE from 'three';

/**
 * Hero Section 3D Parametric Sacred Lotus & Mandala
 * Built with rich Deep Crimson (#6F1D1B), Burnt Cinnamon (#99582A), and Antique Brass (#BB9457)
 * perfectly complementing the high-contrast Cream (#FFE6A7) typography.
 */
export function initHeroScene() {
  const container = document.getElementById('hero-canvas-container');
  if (!container) return;

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x140A06, 0.026);

  const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
  camera.position.set(0, 2.6, 9.6);
  camera.lookAt(0, -0.2, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  container.appendChild(renderer.domElement);

  const masterGroup = new THREE.Group();
  masterGroup.position.set(0, -0.3, 0);
  scene.add(masterGroup);

  // Lighting - Warm Amber, Crimson Aura & Soft Overhead Fill
  const ambientLight = new THREE.AmbientLight(0x5c331f, 0.7);
  scene.add(ambientLight);

  const centralPointLight = new THREE.PointLight(0xFFB85C, 3.2, 22, 1.2);
  centralPointLight.position.set(0, 1.4, 0);
  masterGroup.add(centralPointLight);

  // Deep Crimson & Cinnamon Underglow Light
  const crimsonAuraLight = new THREE.PointLight(0x6F1D1B, 4.5, 16, 1.5);
  crimsonAuraLight.position.set(0, -0.5, 0);
  masterGroup.add(crimsonAuraLight);

  const cinnamonRimLight = new THREE.DirectionalLight(0x99582A, 1.6);
  cinnamonRimLight.position.set(-6, 8, 4);
  scene.add(cinnamonRimLight);

  const brassHighlightLight = new THREE.DirectionalLight(0xBB9457, 1.4);
  brassHighlightLight.position.set(6, 6, -4);
  scene.add(brassHighlightLight);

  // 1. Procedural 3D Lotus Petals
  const petalGroup = new THREE.Group();
  masterGroup.add(petalGroup);

  function createPetalGeometry(length = 2.4, width = 0.9, archHeight = 0.6) {
    const segmentsU = 24;
    const segmentsV = 16;
    const positions = [];
    const normals = [];
    const uvs = [];
    const indices = [];

    for (let i = 0; i <= segmentsU; i++) {
      const u = i / segmentsU;
      for (let j = 0; j <= segmentsV; j++) {
        const v = j / segmentsV;
        const vCentered = v - 0.5;

        const widthProfile = Math.sin(u * Math.PI) * Math.pow(1 - u * 0.2, 1.5);
        const x = vCentered * width * widthProfile * 2;
        const y = Math.sin(u * Math.PI * 0.8) * archHeight - Math.abs(x) * 0.15;
        const z = u * length;

        positions.push(x, y, z);
        normals.push(0, 1, 0);
        uvs.push(u, v);
      }
    }

    for (let i = 0; i < segmentsU; i++) {
      for (let j = 0; j < segmentsV; j++) {
        const a = i * (segmentsV + 1) + j;
        const b = (i + 1) * (segmentsV + 1) + j;
        const c = (i + 1) * (segmentsV + 1) + (j + 1);
        const d = i * (segmentsV + 1) + (j + 1);

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }

  // Complementary Materials from Reference Palette:
  // Outer layer: Deep Royal Crimson (#6F1D1B) with burnt edges
  const crimsonMaterial = new THREE.MeshStandardMaterial({
    color: 0x6F1D1B,
    roughness: 0.38,
    metalness: 0.75,
    emissive: 0x2A0807,
    emissiveIntensity: 0.5,
    side: THREE.DoubleSide
  });

  // Middle layer: Burnt Cinnamon Amber (#99582A)
  const cinnamonMaterial = new THREE.MeshStandardMaterial({
    color: 0x99582A,
    roughness: 0.32,
    metalness: 0.82,
    emissive: 0x3D1E0C,
    emissiveIntensity: 0.45,
    side: THREE.DoubleSide
  });

  // Inner layer: Antique Brass / Sand Gold (#BB9457)
  const brassMaterial = new THREE.MeshStandardMaterial({
    color: 0xBB9457,
    roughness: 0.25,
    metalness: 0.88,
    emissive: 0x473315,
    emissiveIntensity: 0.6,
    side: THREE.DoubleSide
  });

  const layers = [
    { count: 8, radius: 0.65, tilt: 0.45, length: 1.65, width: 0.72, height: 0.55, mat: brassMaterial, speed: 1.0 },
    { count: 16, radius: 1.35, tilt: 0.28, length: 2.3, width: 0.88, height: 0.68, mat: cinnamonMaterial, speed: -0.65 },
    { count: 24, radius: 2.15, tilt: 0.12, length: 2.9, width: 1.05, height: 0.82, mat: crimsonMaterial, speed: 0.45 }
  ];

  const petalLayers = [];

  layers.forEach((layer) => {
    const layerSubgroup = new THREE.Group();
    const petalGeo = createPetalGeometry(layer.length, layer.width, layer.height);

    for (let i = 0; i < layer.count; i++) {
      const angle = (i / layer.count) * Math.PI * 2;
      const mesh = new THREE.Mesh(petalGeo, layer.mat);
      mesh.position.set(Math.cos(angle) * layer.radius, 0, Math.sin(angle) * layer.radius);
      mesh.rotation.y = -angle + Math.PI / 2;
      mesh.rotation.x = layer.tilt;
      mesh.userData = { initialTilt: layer.tilt, baseAngle: angle, meshIdx: i };
      layerSubgroup.add(mesh);
    }
    petalGroup.add(layerSubgroup);
    petalLayers.push(layerSubgroup);
  });

  // 2. Central Bindu & Concentric Filigree Rings
  const coreGroup = new THREE.Group();
  masterGroup.add(coreGroup);

  // Central Bindu: Glowing warm amber-gold core with crimson inner pulse
  const binduGeo = new THREE.SphereGeometry(0.56, 32, 32);
  const binduMat = new THREE.MeshStandardMaterial({
    color: 0xFFE6A7, // Cream highlight core
    roughness: 0.15,
    metalness: 0.85,
    emissive: 0x99582A,
    emissiveIntensity: 1.8,
  });
  const binduMesh = new THREE.Mesh(binduGeo, binduMat);
  coreGroup.add(binduMesh);

  const hitMeshGeo = new THREE.SphereGeometry(1.6, 16, 16);
  const hitMeshMat = new THREE.MeshBasicMaterial({ visible: false });
  const hitMesh = new THREE.Mesh(hitMeshGeo, hitMeshMat);
  hitMesh.name = 'binduCore';
  coreGroup.add(hitMesh);

  // Concentric Rings in Antique Brass and Cinnamon
  const rings = [];
  function createMandalaRing(radius, tube, spokes = 16, colorHex = 0xBB9457) {
    const ringGroup = new THREE.Group();
    const torusGeo = new THREE.TorusGeometry(radius, tube, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: colorHex,
      metalness: 0.9,
      roughness: 0.28,
      emissive: 0x331F0F,
      emissiveIntensity: 0.35
    });
    const torus = new THREE.Mesh(torusGeo, ringMat);
    torus.rotation.x = Math.PI / 2;
    ringGroup.add(torus);

    const spokeGeo = new THREE.CylinderGeometry(tube * 0.7, tube * 0.7, radius * 0.9, 8);
    for (let s = 0; s < spokes; s++) {
      const spMesh = new THREE.Mesh(spokeGeo, ringMat);
      const spAngle = (s / spokes) * Math.PI * 2;
      spMesh.rotation.z = Math.PI / 2;
      spMesh.rotation.y = spAngle;
      spMesh.position.set(Math.cos(spAngle) * radius * 0.5, 0, Math.sin(spAngle) * radius * 0.5);
      ringGroup.add(spMesh);
    }
    return ringGroup;
  }

  const ring1 = createMandalaRing(1.8, 0.025, 12, 0xBB9457);
  const ring2 = createMandalaRing(3.2, 0.03, 24, 0x99582A);
  const ring3 = createMandalaRing(4.5, 0.035, 36, 0x6F1D1B);
  coreGroup.add(ring1);
  coreGroup.add(ring2);
  coreGroup.add(ring3);
  rings.push(ring1, ring2, ring3);

  // 3. Dual-Hue Particle Field (Crimson Embers + Brass Sparks)
  const particleCount = 2200;
  const particleGeo = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);
  const particleScales = new Float32Array(particleCount);
  const particleAngles = new Float32Array(particleCount);
  const particleRadii = new Float32Array(particleCount);
  const particleYVels = new Float32Array(particleCount);

  // Palette colors for particles: Cream, Sand Gold, Cinnamon, Crimson
  const pPalette = [
    new THREE.Color(0xFFE6A7), // Cream
    new THREE.Color(0xBB9457), // Sand Gold
    new THREE.Color(0x99582A), // Cinnamon
    new THREE.Color(0x6F1D1B)  // Crimson
  ];

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 0.8 + Math.pow(Math.random(), 1.5) * 6.5;
    const y = (Math.random() - 0.5) * 4.2;
    
    particlePos[i * 3] = Math.cos(angle) * r;
    particlePos[i * 3 + 1] = y;
    particlePos[i * 3 + 2] = Math.sin(angle) * r;

    const chosenColor = pPalette[Math.floor(Math.random() * pPalette.length)];
    particleColors[i * 3] = chosenColor.r;
    particleColors[i * 3 + 1] = chosenColor.g;
    particleColors[i * 3 + 2] = chosenColor.b;

    particleRadii[i] = r;
    particleAngles[i] = angle;
    particleScales[i] = Math.random() * 0.08 + 0.02;
    particleYVels[i] = (Math.random() * 0.005 + 0.002) * (Math.random() > 0.3 ? 1 : -1);
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

  const pCanvas = document.createElement('canvas');
  pCanvas.width = 32;
  pCanvas.height = 32;
  const pCtx = pCanvas.getContext('2d');
  const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
  pGrad.addColorStop(0, 'rgba(255, 245, 210, 1)');
  pGrad.addColorStop(0.35, 'rgba(220, 160, 80, 0.85)');
  pGrad.addColorStop(0.7, 'rgba(111, 29, 27, 0.4)');
  pGrad.addColorStop(1, 'rgba(111, 29, 27, 0)');
  pCtx.fillStyle = pGrad;
  pCtx.fillRect(0, 0, 32, 32);
  const particleTexture = new THREE.CanvasTexture(pCanvas);

  const particleMat = new THREE.PointsMaterial({
    size: 0.17,
    map: particleTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  masterGroup.add(particleSystem);

  // 4. Parallax & Raycasting
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const raycaster = new THREE.Raycaster();
  const mouseNDC = new THREE.Vector2(-999, -999);
  let isHoveringCore = false;
  let bloomFactor = 0;

  function onMouseMove(e) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouse.targetX = (x / rect.width) * 2 - 1;
    mouse.targetY = -(y / rect.height) * 2 + 1;
    mouseNDC.x = mouse.targetX;
    mouseNDC.y = mouse.targetY;
  }

  window.addEventListener('mousemove', onMouseMove);

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
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    raycaster.setFromCamera(mouseNDC, camera);
    const intersects = raycaster.intersectObject(hitMesh);
    isHoveringCore = intersects.length > 0;

    const targetBloom = isHoveringCore ? 1.0 : 0.0;
    bloomFactor += (targetBloom - bloomFactor) * 0.08;

    masterGroup.rotation.y = time * 0.1 + mouse.x * 0.4;
    masterGroup.rotation.x = 0.32 + mouse.y * -0.2;

    ring1.rotation.y = time * -0.25;
    ring2.rotation.y = time * 0.15;
    ring3.rotation.y = time * -0.08;

    const pulse = 1.0 + Math.sin(time * 3.0) * 0.2 + bloomFactor * 0.8;
    centralPointLight.intensity = 3.2 * pulse;
    crimsonAuraLight.intensity = 4.5 * (1.0 + bloomFactor * 0.6);
    binduMat.emissiveIntensity = 1.6 * pulse;
    binduMesh.scale.setScalar(1.0 + Math.sin(time * 2.5) * 0.05 + bloomFactor * 0.22);

    petalLayers.forEach((layerGroup, lIdx) => {
      layerGroup.rotation.y = time * layers[lIdx].speed * 0.09;
      layerGroup.children.forEach((mesh) => {
        const baseTilt = mesh.userData.initialTilt;
        const breathe = Math.sin(time * 1.5 + lIdx * 0.8) * 0.04;
        mesh.rotation.x = baseTilt + breathe + bloomFactor * 0.18;
      });
    });

    const positions = particleGeo.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      let angle = particleAngles[i];
      const speed = (0.28 / (particleRadii[i] + 0.5)) + bloomFactor * 0.22;
      angle += speed * delta;
      particleAngles[i] = angle;

      let y = positions[i * 3 + 1];
      y += particleYVels[i];
      if (y > 2.5) y = -2.5;
      if (y < -2.5) y = 2.5;
      positions[i * 3 + 1] = y;

      const r = particleRadii[i];
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }
    particleGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  return () => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', onResize);
    cancelAnimationFrame(animationFrameId);
    renderer.dispose();
    if (renderer.domElement.parentElement) {
      renderer.domElement.parentElement.removeChild(renderer.domElement);
    }
  };
}

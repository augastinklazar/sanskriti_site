import * as THREE from 'three';

/**
 * Hero Section 3D Parametric Sacred Lotus & Mandala
 * Built purely with Three.js procedural geometry & shaders
 */
export function initHeroScene() {
  const container = document.getElementById('hero-canvas-container');
  if (!container) return;

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0A0D14, 0.025);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 3.5, 9.5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  container.appendChild(renderer.domElement);

  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  const ambientLight = new THREE.AmbientLight(0xffeedd, 0.6);
  scene.add(ambientLight);

  const centralPointLight = new THREE.PointLight(0xF5D77F, 3.5, 20, 1.2);
  centralPointLight.position.set(0, 1.5, 0);
  masterGroup.add(centralPointLight);

  const coreGlowLight = new THREE.PointLight(0xFF6F3C, 2.5, 12, 1.5);
  coreGlowLight.position.set(0, 0.2, 0);
  masterGroup.add(coreGlowLight);

  const rimLight = new THREE.DirectionalLight(0x00F0FF, 0.8);
  rimLight.position.set(-6, 8, -4);
  scene.add(rimLight);

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

  const goldMaterial = new THREE.MeshStandardMaterial({
    color: 0xD4AF37,
    roughness: 0.28,
    metalness: 0.92,
    emissive: 0x4a360a,
    emissiveIntensity: 0.35,
    side: THREE.DoubleSide
  });

  const innerGoldMaterial = new THREE.MeshStandardMaterial({
    color: 0xF5D77F,
    roughness: 0.22,
    metalness: 0.95,
    emissive: 0x946b14,
    emissiveIntensity: 0.6,
    side: THREE.DoubleSide
  });

  const layers = [
    { count: 8, radius: 0.6, tilt: 0.45, length: 1.6, width: 0.7, height: 0.5, mat: innerGoldMaterial, speed: 1.0 },
    { count: 16, radius: 1.3, tilt: 0.28, length: 2.2, width: 0.85, height: 0.65, mat: goldMaterial, speed: -0.7 },
    { count: 24, radius: 2.1, tilt: 0.12, length: 2.8, width: 1.0, height: 0.8, mat: goldMaterial, speed: 0.5 }
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

  // 2. Sacred Core
  const coreGroup = new THREE.Group();
  masterGroup.add(coreGroup);

  const binduGeo = new THREE.SphereGeometry(0.55, 32, 32);
  const binduMat = new THREE.MeshStandardMaterial({
    color: 0xFFF1C5,
    roughness: 0.1,
    metalness: 0.9,
    emissive: 0xF59E0B,
    emissiveIntensity: 1.5,
  });
  const binduMesh = new THREE.Mesh(binduGeo, binduMat);
  coreGroup.add(binduMesh);

  const hitMeshGeo = new THREE.SphereGeometry(1.6, 16, 16);
  const hitMeshMat = new THREE.MeshBasicMaterial({ visible: false });
  const hitMesh = new THREE.Mesh(hitMeshGeo, hitMeshMat);
  hitMesh.name = 'binduCore';
  coreGroup.add(hitMesh);

  const rings = [];
  function createMandalaRing(radius, tube, spokes = 16) {
    const ringGroup = new THREE.Group();
    const torusGeo = new THREE.TorusGeometry(radius, tube, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      metalness: 0.95,
      roughness: 0.25,
      emissive: 0x826010,
      emissiveIntensity: 0.4
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

  const ring1 = createMandalaRing(1.8, 0.025, 12);
  const ring2 = createMandalaRing(3.2, 0.03, 24);
  const ring3 = createMandalaRing(4.5, 0.035, 36);
  coreGroup.add(ring1);
  coreGroup.add(ring2);
  coreGroup.add(ring3);
  rings.push(ring1, ring2, ring3);

  // 3. Golden Particle Field
  const particleCount = 2200;
  const particleGeo = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);
  const particleScales = new Float32Array(particleCount);
  const particleAngles = new Float32Array(particleCount);
  const particleRadii = new Float32Array(particleCount);
  const particleYVels = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 0.8 + Math.pow(Math.random(), 1.5) * 6.5;
    const y = (Math.random() - 0.5) * 4.0;
    
    particlePos[i * 3] = Math.cos(angle) * r;
    particlePos[i * 3 + 1] = y;
    particlePos[i * 3 + 2] = Math.sin(angle) * r;

    particleRadii[i] = r;
    particleAngles[i] = angle;
    particleScales[i] = Math.random() * 0.08 + 0.02;
    particleYVels[i] = (Math.random() * 0.005 + 0.002) * (Math.random() > 0.3 ? 1 : -1);
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

  const pCanvas = document.createElement('canvas');
  pCanvas.width = 32;
  pCanvas.height = 32;
  const pCtx = pCanvas.getContext('2d');
  const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
  pGrad.addColorStop(0, 'rgba(255, 245, 210, 1)');
  pGrad.addColorStop(0.3, 'rgba(245, 210, 110, 0.8)');
  pGrad.addColorStop(0.7, 'rgba(212, 175, 55, 0.3)');
  pGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
  pCtx.fillStyle = pGrad;
  pCtx.fillRect(0, 0, 32, 32);
  const particleTexture = new THREE.CanvasTexture(pCanvas);

  const particleMat = new THREE.PointsMaterial({
    size: 0.16,
    map: particleTexture,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    color: 0xFFE082
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

    masterGroup.rotation.y = time * 0.12 + mouse.x * 0.45;
    masterGroup.rotation.x = 0.35 + mouse.y * -0.25;

    ring1.rotation.y = time * -0.25;
    ring2.rotation.y = time * 0.15;
    ring3.rotation.y = time * -0.08;

    const pulse = 1.0 + Math.sin(time * 3.0) * 0.2 + bloomFactor * 0.8;
    centralPointLight.intensity = 3.5 * pulse;
    binduMat.emissiveIntensity = 1.2 * pulse;
    binduMesh.scale.setScalar(1.0 + Math.sin(time * 2.5) * 0.05 + bloomFactor * 0.25);

    petalLayers.forEach((layerGroup, lIdx) => {
      layerGroup.rotation.y = time * layers[lIdx].speed * 0.1;
      layerGroup.children.forEach((mesh) => {
        const baseTilt = mesh.userData.initialTilt;
        const breathe = Math.sin(time * 1.5 + lIdx * 0.8) * 0.04;
        mesh.rotation.x = baseTilt + breathe + bloomFactor * 0.18;
      });
    });

    const positions = particleGeo.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      let angle = particleAngles[i];
      const speed = (0.3 / (particleRadii[i] + 0.5)) + bloomFactor * 0.25;
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

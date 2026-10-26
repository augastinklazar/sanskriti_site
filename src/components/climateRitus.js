/**
 * Viewport-Aware Climatology & 6 Ritus Weather Simulator
 * Automatically pauses animation loop when scrolled out of view
 */

export function initClimateRitus() {
  const weatherCanvas = document.getElementById('ritu-weather-canvas');
  const rituNavContainer = document.getElementById('ritu-nav-tabs');
  const rituDetailContainer = document.getElementById('ritu-detail-card');
  const section = document.getElementById('climate-section');
  if (!weatherCanvas || !rituNavContainer || !rituDetailContainer) return;

  const ctx = weatherCanvas.getContext('2d');
  let width = (weatherCanvas.width = weatherCanvas.parentElement.clientWidth || 600);
  let height = (weatherCanvas.height = 360);

  const RITUS_DATA = [
    {
      id: 'vasant',
      name: 'Vasant (Spring)',
      sanskrit: 'वसन्त ऋतु',
      months: 'Chaitra - Vaishakha (Mid-March to Mid-May)',
      dosha: 'Kapha liquefaction; gentle Sun warmth',
      flora: 'Palash (Flame of the Forest), Mango blossoms, Marigold',
      skyColor: '#FFF8E7',
      accentColor: '#D97706',
      weatherType: 'petals',
      description: 'Nature awakens. The southern breeze (Malaya Maruta) carries fragrance. Trees shed old foliage to burst in brilliant crimson Palash and sweet mango blossoms. Classical Raga Hindol and Basant echo across temples.',
      biome: 'Deciduous Central Woodlands & Himalayan Foothills'
    },
    {
      id: 'grishma',
      name: 'Grishma (Summer)',
      sanskrit: 'ग्रीष्म ऋतु',
      months: 'Jyeshtha - Ashadha (Mid-May to Mid-July)',
      dosha: 'Agni peak; Vata accumulation; Pitta rise',
      flora: 'Neem, Amaltas (Golden Shower), Sandalwood',
      skyColor: '#FEF3C7',
      accentColor: '#B45309',
      weatherType: 'heatwave',
      description: 'The blazing sun draws moisture from the earth. Dust devils dance across the golden sands of the Thar. Clay pots of cooling Vetiver (Khus) water and tender coconut water preserve vitality during the scorching Loo winds.',
      biome: 'The Great Thar Desert & Deccan Semi-Arid Plateau'
    },
    {
      id: 'varsha',
      name: 'Varsha (Monsoon)',
      sanskrit: 'वर्षा ऋतु',
      months: 'Shravana - Bhadrapada (Mid-July to Mid-September)',
      dosha: 'Pitta accumulation; Vata aggravation',
      flora: 'Kadamba, Lotus, Water Hyacinth, Jasmine',
      skyColor: '#E0E7FF',
      accentColor: '#1E2E48',
      weatherType: 'rain',
      description: 'The lifeline of the subcontinent. Southwestern maritime clouds crash into the Western Ghats, unleashing torrential rains. Parched clay emits the heavenly petrichor (Mitti Attar). Rivers roar and peacocks dance to Raga Megh Malhar.',
      biome: 'Western Ghats Rainforests & Sunderbans Delta'
    },
    {
      id: 'sharad',
      name: 'Sharad (Autumn)',
      sanskrit: 'शरद् ऋतु',
      months: 'Ashwina - Kartika (Mid-September to Mid-November)',
      dosha: 'Pitta pacification; clear pristine waters',
      flora: 'Night-blooming Parijat (Nyctanthes), White Kasha grass',
      skyColor: '#F0F9FF',
      accentColor: '#0369A1',
      weatherType: 'clear_breeze',
      description: 'The skies clear to translucent indigo. Floodwaters settle into mirror-like lakes adorned with white water lilies. Moonlight is praised for its cooling medicinal amrita on Sharad Purnima. Harvest festivals begin across every state.',
      biome: 'Indo-Gangetic Alluvial Plains & Riverine Deltas'
    },
    {
      id: 'hemant',
      name: 'Hemant (Pre-Winter)',
      sanskrit: 'हेमन्त ऋतु',
      months: 'Margashirsha - Pausha (Mid-November to Mid-January)',
      dosha: 'Digestive fire (Agni) intensifies to maximum',
      flora: 'Mustard yellow fields, Saffron stigmata, Sugarcane',
      skyColor: '#F1F5F9',
      accentColor: '#475569',
      weatherType: 'mist',
      description: 'A crisp, golden chill in the air. The body burns calories faster, demanding nourishing sesame, jaggery, and ghee preparations. Golden mustard fields stretch infinitely under gentle pale sunlight in Punjab and Bengal.',
      biome: 'Northern Fertile Plains & Shivalik Terraces'
    },
    {
      id: 'shishir',
      name: 'Shishir (Winter / Dews)',
      sanskrit: 'शिशिर ऋतु',
      months: 'Magha - Phalguna (Mid-January to Mid-March)',
      dosha: 'Kapha accumulation; cold dry winds',
      flora: 'Himalayan Cedar (Deodar), Rhododendron, Pine',
      skyColor: '#E2E8F0',
      accentColor: '#334155',
      weatherType: 'frost_dew',
      description: 'Heavy morning dews and snowfall in the northern ranges. Quietude settles over Buddhist monasteries in Ladakh. Warming bonfires of Lohri and Makar Sankranti welcome the sun northward transition (Uttarayana).',
      biome: 'Cold Trans-Himalayan Alpine Plateau & Ladakh'
    }
  ];

  let currentRitu = RITUS_DATA[2];
  let particles = [];
  let animId = null;
  let isVisible = false;

  function initParticles(type) {
    particles = [];
    const count = type === 'rain' ? 35 : 18;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 3 + 2,
        length: Math.random() * 14 + 10,
        size: Math.random() * 3 + 2,
        angle: Math.random() * Math.PI * 2,
      });
    }
  }

  function renderTabs() {
    rituNavContainer.innerHTML = '';
    RITUS_DATA.forEach((r) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      const isActive = r.id === currentRitu.id;
      btn.className = `px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center space-x-2 cursor-pointer border ${
        isActive
          ? 'bg-[#1E2E48] text-[#FFFDF9] border-[#1E2E48] shadow-sm'
          : 'bg-[#FFFDF9] text-[#292524] border-[#E2D7C5] hover:border-[#1E2E48]/40 hover:bg-[#F5EFEB]'
      }`;
      btn.innerHTML = `
        <span class="w-2 h-2 rounded-full" style="background-color: ${r.accentColor}"></span>
        <span>${r.name.split(' ')[0]}</span>
      `;
      btn.addEventListener('click', () => {
        currentRitu = r;
        initParticles(r.weatherType);
        renderTabs();
        updateDetails();
      });
      rituNavContainer.appendChild(btn);
    });
  }

  function updateDetails() {
    rituDetailContainer.innerHTML = `
      <div class="deckle-card p-6 bg-[#FAF6EE] border border-[#E2D7C5]">
        <div class="flex items-center justify-between pb-3 border-b border-[#EADBCA]">
          <div>
            <span class="paper-badge">${currentRitu.months}</span>
            <h4 class="font-display font-bold text-2xl text-[#1E2E48] mt-1.5">${currentRitu.name}</h4>
          </div>
          <div class="text-right">
            <span class="font-headline text-xl text-[#AC3B28]">${currentRitu.sanskrit}</span>
            <div class="text-[10px] font-mono text-[#57534E]">${currentRitu.biome}</div>
          </div>
        </div>

        <p class="mt-4 text-xs sm:text-sm text-[#292524] leading-relaxed">
          ${currentRitu.description}
        </p>

        <div class="grid grid-cols-2 gap-3 mt-4 text-xs">
          <div class="p-3 rounded-lg bg-[#F5EFEB] border border-[#E2D7C5]">
            <span class="text-[9px] uppercase font-mono text-[#8E6E38] block font-bold">Ayurvedic Biological Dosha</span>
            <span class="font-semibold text-[#1E2E48]">${currentRitu.dosha}</span>
          </div>
          <div class="p-3 rounded-lg bg-[#F5EFEB] border border-[#E2D7C5]">
            <span class="text-[9px] uppercase font-mono text-[#8E6E38] block font-bold">Signature Botanical Flora</span>
            <span class="font-semibold text-[#2D5A27]">${currentRitu.flora}</span>
          </div>
        </div>
      </div>
    `;
  }

  function animate() {
    if (!isVisible) {
      animId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0, currentRitu.skyColor);
    skyGrad.addColorStop(1, '#FAF6EE');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Distant ridge
    ctx.beginPath();
    ctx.moveTo(0, height * 0.7);
    ctx.bezierCurveTo(width * 0.3, height * 0.6, width * 0.7, height * 0.8, width, height * 0.65);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fillStyle = 'rgba(168, 124, 56, 0.12)';
    ctx.fill();

    // Foreground terrace
    ctx.beginPath();
    ctx.moveTo(0, height * 0.85);
    ctx.bezierCurveTo(width * 0.4, height * 0.75, width * 0.6, height * 0.9, width, height * 0.8);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fillStyle = 'rgba(45, 90, 39, 0.1)';
    ctx.fill();

    if (currentRitu.weatherType === 'rain') {
      ctx.strokeStyle = 'rgba(30, 46, 72, 0.5)';
      ctx.lineWidth = 1.2;
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - 2, p.y + p.length);
        ctx.stroke();

        p.y += p.speed * 2.5;
        p.x -= 0.6;
        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
      });
    } else if (currentRitu.weatherType === 'petals') {
      ctx.fillStyle = 'rgba(172, 59, 40, 0.7)';
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.size, p.size * 0.6, p.angle, 0, Math.PI * 2);
        ctx.fill();

        p.y += p.speed * 0.5;
        p.x += Math.sin(p.angle) * 1.2;
        p.angle += 0.03;
        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
      });
    } else if (currentRitu.weatherType === 'heatwave') {
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.2)';
      ctx.lineWidth = 1.5;
      const t = Date.now() * 0.002;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const baseY = height * 0.65 + i * 18;
        ctx.moveTo(0, baseY);
        for (let x = 0; x < width; x += 30) {
          const waveY = baseY + Math.sin(x * 0.03 + t + i) * 5;
          ctx.lineTo(x, waveY);
        }
        ctx.stroke();
      }
    } else if (currentRitu.weatherType === 'mist') {
      ctx.fillStyle = 'rgba(255, 253, 249, 0.4)';
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();
        p.x += 0.3;
        p.y += 0.15;
        if (p.x > width) p.x = 0;
        if (p.y > height) p.y = 0;
      });
    }

    animId = requestAnimationFrame(animate);
  }

  // IntersectionObserver pauses loop when off-screen
  if (section && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          animId = requestAnimationFrame(animate);
        }
      });
    }, { rootMargin: '100px' });
    observer.observe(section);
  } else {
    isVisible = true;
    animate();
  }

  window.addEventListener('resize', () => {
    width = weatherCanvas.width = weatherCanvas.parentElement.clientWidth || 600;
  }, { passive: true });

  renderTabs();
  updateDetails();
  initParticles(currentRitu.weatherType);

  return {
    destroy: () => {
      if (animId) cancelAnimationFrame(animId);
    }
  };
}

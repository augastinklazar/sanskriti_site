/**
 * Section 5: Living Traditions, Weaves & Ayurveda
 * Includes:
 * 1. Interactive Microscopic Weave Simulation Canvas
 * 2. Textile Cards with Modal Deep Dives
 * 3. Interactive Tridosha Balance Wheel & Ayurvedic Botanical Pharmacopeia
 */

export const textilesData = [
  {
    id: 'banarasi',
    title: 'Banarasi Brocade & Zari',
    region: 'Varanasi, Uttar Pradesh',
    sanskrit: 'काशि-पट्टाम्बर',
    era: 'Vedic & Mughal Renaissance (ca. 600 BCE)',
    material: 'Katan Silk & Real Gold/Silver Zari',
    motifs: ['Kalka (Paisley)', 'Jhallar (Floral Lace)', 'Shikargah (Sacred Hunt)'],
    description: 'Woven along the banks of the sacred Ganga, Banarasi sarees require up to 6 months of arduous manual labor on wooden pit looms. The master weaver interlaces pure spun silver dipped in 24k gold through warp threads, producing a shimmering metallic brocade.',
    weaveType: 'twill'
  },
  {
    id: 'kanjeevaram',
    title: 'Kanjeevaram Temple Silk',
    region: 'Kanchipuram, Tamil Nadu',
    sanskrit: 'कांची-पट्ट',
    era: 'Chola Dynasty & Sage Markandeya Guilds',
    material: 'Mulberry Raw Silk & Stiffened Silver Zari',
    motifs: ['Gopuram (Temple Tower)', 'Mayil (Peacock)', 'Rudraksha Seed'],
    description: 'Renowned for its structural weight and vibrant contrast. Utilizing the ancient Korvai technique, two weavers simultaneously work the edges to lock contrasting border threads into the body with interlocking zigzag seams of supreme structural strength.',
    weaveType: 'korvai'
  },
  {
    id: 'kalamkari',
    title: 'Kalamkari Narrative Heritage',
    region: 'Srikalahasti, Andhra Pradesh',
    sanskrit: 'कलम-कार',
    era: 'Ancient Temple Hangings (ca. 300 BCE)',
    material: 'Handspun Cotton & Sacred Botanical Dyes',
    motifs: ['Tree of Life (Kalpavriksha)', 'Ramayana Epics', 'Lotus Rosettes'],
    description: 'The ancient art of telling mythological narratives using a bamboo reed pen (Kalam) dipped in fermented iron and jaggery. The cloth undergoes 17 distinct purifying washes in flowing river currents, treated with buffalo milk and natural madder roots.',
    weaveType: 'plain'
  },
  {
    id: 'chanderi',
    title: 'Chanderi Gossamer Silk',
    region: 'Madhya Pradesh',
    sanskrit: 'चन्देरी सूक्ष्म-वस्त्र',
    era: 'Vedic Legend (Founded by Shishupala)',
    material: 'Fine Cotton Weft & Silk Warp',
    motifs: ['Ashrafi (Gold Coin)', 'Churi (Bangle)', 'Neem Leaf'],
    description: 'Revered as woven air, Chanderi fabric combines translucent, gossamer cotton threads with pure silk. The fabric captures Bundelkhand architectural geometry with shimmering metallic buttis woven by hand.',
    weaveType: 'satin'
  },
  {
    id: 'pashmina',
    title: 'Pashmina & Kani Weave',
    region: 'Kashmir Valley',
    sanskrit: 'पश्मीना सौकुमार्य',
    era: '15th Century Zayn-ul-Abidin Guilds',
    material: 'Changthangi Mountain Goat Underfleece',
    motifs: ['Badam (Almond Paisley)', 'Chinar Leaf', 'Nightingale'],
    description: 'Harvested from the nomadic Changpa goats at altitudes above 14,000 feet in Ladakh. Kani shawls are woven using wooden spools called "tuji" following a coded singing script (Taleem), creating reversible tapestries of supreme softness.',
    weaveType: 'twill'
  }
];

export const ayurvedaData = {
  doshas: {
    vata: {
      name: 'Vata',
      elements: 'Akasha (Space) + Vayu (Air)',
      symbol: '💨',
      principle: 'Force of Motion & Prana',
      qualities: 'Light, dry, cold, mobile, subtle',
      organs: 'Colon, nervous system, bones, ears',
      imbalanceSymptoms: 'Anxiety, insomnia, joint stiffness, dry skin',
      harmonyDiet: 'Warm, spiced, nourishing soups, ghee, sesame oil, grounding grains'
    },
    pitta: {
      name: 'Pitta',
      elements: 'Tejas (Fire) + Jala (Water)',
      symbol: '🔥',
      principle: 'Force of Transformation & Digestion (Agni)',
      qualities: 'Hot, sharp, light, oily, penetrating',
      organs: 'Stomach, liver, small intestine, eyes, blood',
      imbalanceSymptoms: 'Acid reflux, inflammation, irritability, skin redness',
      harmonyDiet: 'Cooling cucumber, coconut water, sweet fruits, coriander, mint'
    },
    kapha: {
      name: 'Kapha',
      elements: 'Jala (Water) + Prithvi (Earth)',
      symbol: '🌊',
      principle: 'Force of Structure, Lubrication & Ojas',
      qualities: 'Heavy, slow, steady, soft, cool',
      organs: 'Chest, lungs, lymphatic system, joints',
      imbalanceSymptoms: 'Lethargy, congestion, fluid retention, weight gain',
      harmonyDiet: 'Light, warm, pungent spices (ginger, black pepper), steamed greens'
    }
  },
  herbs: [
    {
      name: 'Tulsi (Holy Basil)',
      sanskrit: 'तुलसी',
      botanical: 'Ocimum sanctum',
      rasa: 'Pungent, Bitter',
      virya: 'Warming',
      doshaEffect: 'Pacifies Vata & Kapha',
      spiritual: 'Queen of Herbs & Avatar of Lakshmi',
      benefits: 'Supreme adaptogen, respiratory shield, elevates meditation & sattvic clarity'
    },
    {
      name: 'Ashwagandha',
      sanskrit: 'अश्वगन्धा',
      botanical: 'Withania somnifera',
      rasa: 'Bitter, Sweet, Astringent',
      virya: 'Warming',
      doshaEffect: 'Supreme Vata & Kapha Balancer',
      spiritual: 'Bestows the vitality of a celestial steed',
      benefits: 'Deep adrenal recovery, neuroprotection, enhances physical endurance & sleep quality'
    },
    {
      name: 'Neem',
      sanskrit: 'निम्ब / अरिष्ट',
      botanical: 'Azadirachta indica',
      rasa: 'Bitter, Astringent',
      virya: 'Cooling',
      doshaEffect: 'Pacifies Pitta & Kapha',
      spiritual: 'The Village Dispensary & Purifier',
      benefits: 'Cleanses cellular blood toxins, purifies dermatological matrix, immune enhancer'
    },
    {
      name: 'Brahmi',
      sanskrit: 'ब्राह्मी',
      botanical: 'Bacopa monnieri',
      rasa: 'Bitter, Sweet',
      virya: 'Cooling',
      doshaEffect: 'Balances all three doshas (Tridoshic)',
      spiritual: 'Named after Brahma, Creator of Wisdom',
      benefits: 'Synchronizes left/right brain hemispheres, improves memory retention, calms neural firing'
    },
    {
      name: 'Shatavari',
      sanskrit: 'शतावरी',
      botanical: 'Asparagus racemosus',
      rasa: 'Sweet, Bitter',
      virya: 'Cooling',
      doshaEffect: 'Pacifies Vata & Pitta',
      spiritual: 'Possessor of a Hundred Divine Roots',
      benefits: 'Deep reproductive rejuvenation, cooling hydration, promotes restorative Ojas'
    }
  ]
};

export function initWeavesAndAyurveda() {
  const container = document.getElementById('weaves-ayurveda-section');
  if (!container) return;

  const tabTextiles = document.getElementById('tab-btn-textiles');
  const tabAyurveda = document.getElementById('tab-btn-ayurveda');
  const viewTextiles = document.getElementById('view-textiles');
  const viewAyurveda = document.getElementById('view-ayurveda');

  if (tabTextiles && tabAyurveda) {
    tabTextiles.addEventListener('click', () => {
      tabTextiles.classList.add('bg-vedic-gold', 'text-vedic-midnight');
      tabTextiles.classList.remove('text-vedic-sandstone', 'border-vedic-gold/30');
      tabAyurveda.classList.remove('bg-vedic-gold', 'text-vedic-midnight');
      tabAyurveda.classList.add('text-vedic-sandstone', 'border-vedic-gold/30');
      viewTextiles.classList.remove('hidden');
      viewAyurveda.classList.add('hidden');
    });

    tabAyurveda.addEventListener('click', () => {
      tabAyurveda.classList.add('bg-vedic-gold', 'text-vedic-midnight');
      tabAyurveda.classList.remove('text-vedic-sandstone', 'border-vedic-gold/30');
      tabTextiles.classList.remove('bg-vedic-gold', 'text-vedic-midnight');
      tabTextiles.classList.add('text-vedic-sandstone', 'border-vedic-gold/30');
      viewAyurveda.classList.remove('hidden');
      viewTextiles.classList.add('hidden');
    });
  }

  initMicroWeaveCanvas();

  const textileButtons = document.querySelectorAll('[data-textile-id]');
  textileButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.textileId;
      const data = textilesData.find(t => t.id === id);
      if (!data) return;

      textileButtons.forEach(b => b.classList.remove('border-vedic-gold', 'bg-vedic-gold/15'));
      btn.classList.add('border-vedic-gold', 'bg-vedic-gold/15');

      const titleEl = document.getElementById('textile-detail-title');
      const sanskritEl = document.getElementById('textile-detail-sanskrit');
      const regionEl = document.getElementById('textile-detail-region');
      const eraEl = document.getElementById('textile-detail-era');
      const materialEl = document.getElementById('textile-detail-material');
      const motifsEl = document.getElementById('textile-detail-motifs');
      const descEl = document.getElementById('textile-detail-desc');

      if (titleEl) titleEl.textContent = data.title;
      if (sanskritEl) sanskritEl.textContent = data.sanskrit;
      if (regionEl) regionEl.textContent = data.region;
      if (eraEl) eraEl.textContent = data.era;
      if (materialEl) materialEl.textContent = data.material;
      if (descEl) descEl.textContent = data.description;
      if (motifsEl) {
        motifsEl.innerHTML = data.motifs.map(m => `<span class="px-2.5 py-1 rounded-full text-xs bg-vedic-gold/10 border border-vedic-gold/30 text-vedic-gold">${m}</span>`).join('');
      }

      if (window.setWeavePattern) {
        window.setWeavePattern(data.weaveType);
      }
    });
  });

  initTridoshaEngine();
}

function initMicroWeaveCanvas() {
  const canvas = document.getElementById('micro-weave-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let currentPattern = 'twill';
  let warpColor = '#D4AF37';
  let weftColor = '#C41E3A';

  const warpColorSelect = document.getElementById('weave-warp-color');
  const weftColorSelect = document.getElementById('weave-weft-color');
  const patternSelect = document.getElementById('weave-pattern-select');

  function resize() {
    canvas.width = canvas.clientWidth || 400;
    canvas.height = canvas.clientHeight || 280;
    drawWeave();
  }

  window.addEventListener('resize', resize);

  function drawWeave() {
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const threadSize = 16;
    const cols = Math.ceil(width / threadSize);
    const rows = Math.ceil(height / threadSize);

    function isWarpOnTop(c, r) {
      if (currentPattern === 'plain') {
        return (c + r) % 2 === 0;
      } else if (currentPattern === 'twill') {
        return (c + r) % 3 !== 0;
      } else if (currentPattern === 'satin') {
        return (c * 3 + r) % 5 === 0;
      } else if (currentPattern === 'korvai') {
        if (c < cols / 2) return (c + r) % 2 === 0;
        return (c + r * 2) % 3 === 0;
      }
      return (c + r) % 2 === 0;
    }

    ctx.fillStyle = '#0E1118';
    ctx.fillRect(0, 0, width, height);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * threadSize;
        const y = r * threadSize;
        const warpTop = isWarpOnTop(c, r);

        if (warpTop) {
          drawWeftThread(x, y, threadSize, weftColor);
          drawWarpThread(x, y, threadSize, warpColor);
        } else {
          drawWarpThread(x, y, threadSize, warpColor);
          drawWeftThread(x, y, threadSize, weftColor);
        }
      }
    }
  }

  function drawWarpThread(x, y, size, color) {
    const grad = ctx.createLinearGradient(x, y, x + size, y);
    grad.addColorStop(0, 'rgba(0,0,0,0.5)');
    grad.addColorStop(0.3, color);
    grad.addColorStop(0.5, '#FFFFFF');
    grad.addColorStop(0.7, color);
    grad.addColorStop(1, 'rgba(0,0,0,0.6)');

    ctx.fillStyle = grad;
    ctx.fillRect(x + 1, y, size - 2, size);

    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + size * 0.35, y);
    ctx.lineTo(x + size * 0.35, y + size);
    ctx.stroke();
  }

  function drawWeftThread(x, y, size, color) {
    const grad = ctx.createLinearGradient(x, y, x, y + size);
    grad.addColorStop(0, 'rgba(0,0,0,0.5)');
    grad.addColorStop(0.3, color);
    grad.addColorStop(0.5, '#FFFFFF');
    grad.addColorStop(0.7, color);
    grad.addColorStop(1, 'rgba(0,0,0,0.6)');

    ctx.fillStyle = grad;
    ctx.fillRect(x, y + 1, size, size - 2);

    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y + size * 0.35);
    ctx.lineTo(x + size, y + size * 0.35);
    ctx.stroke();
  }

  window.setWeavePattern = (pattern) => {
    currentPattern = pattern;
    drawWeave();
  };

  if (warpColorSelect) {
    warpColorSelect.addEventListener('change', (e) => {
      warpColor = e.target.value;
      drawWeave();
    });
  }

  if (weftColorSelect) {
    weftColorSelect.addEventListener('change', (e) => {
      weftColor = e.target.value;
      drawWeave();
    });
  }

  if (patternSelect) {
    patternSelect.addEventListener('change', (e) => {
      currentPattern = e.target.value;
      drawWeave();
    });
  }

  setTimeout(resize, 100);
}

function initTridoshaEngine() {
  const vataSlider = document.getElementById('dosha-slider-vata');
  const pittaSlider = document.getElementById('dosha-slider-pitta');
  const kaphaSlider = document.getElementById('dosha-slider-kapha');

  const archetypeTitle = document.getElementById('dosha-archetype-title');
  const archetypeDesc = document.getElementById('dosha-archetype-desc');
  const doshaChartVata = document.getElementById('dosha-chart-vata');
  const doshaChartPitta = document.getElementById('dosha-chart-pitta');
  const doshaChartKapha = document.getElementById('dosha-chart-kapha');

  function updateDoshaProfile() {
    const v = parseInt(vataSlider ? vataSlider.value : 33, 10);
    const p = parseInt(pittaSlider ? pittaSlider.value : 33, 10);
    const k = parseInt(kaphaSlider ? kaphaSlider.value : 34, 10);

    const total = v + p + k || 1;
    const vPct = Math.round((v / total) * 100);
    const pPct = Math.round((p / total) * 100);
    const kPct = Math.round((k / total) * 100);

    if (doshaChartVata) doshaChartVata.style.height = `${vPct}%`;
    if (doshaChartPitta) doshaChartPitta.style.height = `${pPct}%`;
    if (doshaChartKapha) doshaChartKapha.style.height = `${kPct}%`;

    let dominant = '';
    if (vPct > 45) dominant = 'Vata Dominant (Prana & Visionary)';
    else if (pPct > 45) dominant = 'Pitta Dominant (Tejas & Discernment)';
    else if (kPct > 45) dominant = 'Kapha Dominant (Ojas & Grounding Stability)';
    else if (Math.abs(vPct - pPct) < 8 && vPct > 30) dominant = 'Vata-Pitta Dual Constitution';
    else if (Math.abs(pPct - kPct) < 8 && pPct > 30) dominant = 'Pitta-Kapha Dual Constitution';
    else if (Math.abs(vPct - kPct) < 8 && vPct > 30) dominant = 'Vata-Kapha Dual Constitution';
    else dominant = 'Tridoshic (Sama Dosha - Pristine Equilibrium)';

    if (archetypeTitle) archetypeTitle.textContent = dominant;
    if (archetypeDesc) {
      if (dominant.includes('Vata')) {
        archetypeDesc.textContent = 'Enthusiastic, intuitive, and quick. Requires warm spiced foods (cinnamon, ginger), regular meditative sleep rhythms, and grounding sesame oil abhyanga.';
      } else if (dominant.includes('Pitta')) {
        archetypeDesc.textContent = 'Decisive, articulate, and sharp intellect. Thrives on cooling foods (coconut, ghee, sweet fruits), moderate intensity, and tranquil evening walks under moonlight.';
      } else if (dominant.includes('Kapha')) {
        archetypeDesc.textContent = 'Loyal, patient, and possessing robust cellular stamina. Benefits from brisk morning exercise, bitter herbs, light pungent spices, and invigorating dry massage.';
      } else {
        archetypeDesc.textContent = 'A rare constitutional balance of universal forces. Maintains longevity by tuning seasonal rhythms (Ritucharya) and sattvic mindfulness.';
      }
    }
  }

  if (vataSlider) vataSlider.addEventListener('input', updateDoshaProfile);
  if (pittaSlider) pittaSlider.addEventListener('input', updateDoshaProfile);
  if (kaphaSlider) kaphaSlider.addEventListener('input', updateDoshaProfile);

  updateDoshaProfile();
}

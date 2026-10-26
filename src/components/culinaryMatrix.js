/**
 * The Six Rasas of Indian Cuisine & Interactive 2.5D Thali Builder
 * Educational explorer decoding Ayurveda's Shad Rasa, spices chemistry, and regional microbiology
 */

export function initCulinaryMatrix() {
  const container = document.getElementById('thali-canvas-container');
  const radarCanvas = document.getElementById('thali-radar-canvas');
  if (!container || !radarCanvas) return;

  const SPICES_DATA = [
    {
      id: 'saffron',
      name: 'Kashmiri Mongra Saffron',
      sanskrit: 'कुङ्कुम (Kumkuma)',
      region: 'Pampore, Kashmir',
      rasa: 'Madhura & Tikta (Sweet & Bitter)',
      virya: 'Anushna (Balanced Warmth)',
      color: '#E07A18',
      accent: '#F97316',
      profile: { sweet: 8, sour: 0, salty: 0, pungent: 2, bitter: 6, astringent: 3 },
      dosha: 'Tridoshic (Soothes all three doshas)',
      chemistry: 'Crocin (antioxidant carotene) & Safranal (aromatic volatile oil). Hand-harvested from purple Crocus sativus stigmata.',
      heritage: 'Valued above gold for three millennia; infused into Royal Wazwan, aromatic Rogan Josh, and saffron-laced temple Kheer.'
    },
    {
      id: 'pepper',
      name: 'Malabar Tellicherry Black Pepper',
      sanskrit: 'मरिच (Maricha)',
      region: 'Wayanad, Malabar Coast',
      rasa: 'Katu (Pungent)',
      virya: 'Ushna (Fiery Hot)',
      color: '#292524',
      accent: '#44403C',
      profile: { sweet: 0, sour: 0, salty: 0, pungent: 10, bitter: 4, astringent: 2 },
      dosha: 'Decreases Vata & Kapha; Elevates Pitta',
      chemistry: 'Piperine alkaloid triggers thermogenesis and enhances nutrient bioavailability by up to 2,000%.',
      heritage: 'The ancient "Black Gold" that commanded global maritime trade routes connecting Kerala to the Roman Empire and Alexandria.'
    },
    {
      id: 'cardamom',
      name: 'Alleppey Green Cardamom',
      sanskrit: 'एला (Ela)',
      region: 'Cardamom Hills, Western Ghats',
      rasa: 'Madhura & Katu (Sweet & Pungent)',
      virya: 'Sheeta (Cooling Post-Digestive)',
      color: '#477840',
      accent: '#2D5A27',
      profile: { sweet: 7, sour: 1, salty: 0, pungent: 6, bitter: 2, astringent: 4 },
      dosha: 'Harmonizes Tridosha; calms gastric fire',
      chemistry: 'Cineole and terpinyl acetate soothe the enteric nervous system and freshen oral flora.',
      heritage: 'The "Queen of Spices", integral to royal Biryani dum pots, Masala Chai brews, and Ayurvedic respiratory formulas.'
    },
    {
      id: 'kokum',
      name: 'Konkan Sun-Dried Kokum',
      sanskrit: 'वृक्षाम्ल (Vrikshamla)',
      region: 'Ratnagiri, Konkan Coast',
      rasa: 'Amla & Kashaya (Sour & Astringent)',
      virya: 'Sheeta (Intensely Cooling)',
      color: '#7E2616',
      accent: '#AC3B28',
      profile: { sweet: 1, sour: 10, salty: 0, pungent: 1, bitter: 2, astringent: 6 },
      dosha: 'Calms excess Pitta and summer sunstroke',
      chemistry: 'Garcinol and hydroxycitric acid (HCA); natural lipid metabolism regulator and gastric coolant.',
      heritage: 'The soul of coastal Solkadhi — steeped with coconut milk and roasted cumin to temper hot humid coastal heat.'
    },
    {
      id: 'kalanamak',
      name: 'Himalayan Black Salt',
      sanskrit: 'सौवर्चल (Sauvarchala)',
      region: 'Northern Salt Ranges',
      rasa: 'Lavana (Salty & Umami)',
      virya: 'Ushna (Mildly Warming)',
      color: '#6B4226',
      accent: '#8B4513',
      profile: { sweet: 0, sour: 1, salty: 10, pungent: 3, bitter: 1, astringent: 2 },
      dosha: 'Ignites Jatharagni (Digestive Agni)',
      chemistry: 'Volatile iron sulphides and greigite crystals imparting characteristic umami egg-like aroma and electrolytes.',
      heritage: 'Kiln-fired in clay pots with Haritaki fruit seeds for 24 hours; indispensable in Chaat masala and Jaljeera.'
    },
    {
      id: 'amla',
      name: 'Wild Forest Amla (Gooseberry)',
      sanskrit: 'आमलकी (Amalaki)',
      region: 'Central Indian Deciduous Forests',
      rasa: 'Five Rasas (All except Salty!)',
      virya: 'Sheeta (Cooling Rejuvenator)',
      color: '#70973D',
      accent: '#557A2B',
      profile: { sweet: 5, sour: 9, salty: 0, pungent: 4, bitter: 7, astringent: 8 },
      dosha: 'Supreme Rasayana; balances Vata, Pitta, Kapha',
      chemistry: 'Highest botanical density of heat-stable Vitamin C bound with gallic acid and emblicanin tannins.',
      heritage: 'Considered the primordial Ayurvedic fruit; the cornerstone of Chyawanprash, brewed in copper cauldrons since 1000 BCE.'
    }
  ];

  let selectedSpices = ['saffron', 'pepper', 'cardamom'];

  // Radar Canvas Context
  const radarCtx = radarCanvas.getContext('2d');

  function renderThaliPlate() {
    container.innerHTML = '';

    // 2.5D Brass Thali Plate Element
    const thaliPlate = document.createElement('div');
    thaliPlate.className = 'relative w-full aspect-square max-w-[420px] mx-auto rounded-full bg-gradient-to-tr from-[#C49A52] via-[#E6CE93] to-[#A87C38] p-3 shadow-paper-diorama border-4 border-[#8E6E38] flex items-center justify-center transition-transform duration-500';
    thaliPlate.style.transformStyle = 'preserve-3d';

    // Concentric brass engraving rings
    const innerRim = document.createElement('div');
    innerRim.className = 'w-full h-full rounded-full border-2 border-dashed border-[#8E6E38]/40 bg-[#FAF6EE] relative p-4 flex items-center justify-center shadow-inner overflow-hidden';
    
    // Central Basmati rice / Khichdi bowl (Centerpiece)
    const centerBowl = document.createElement('div');
    centerBowl.className = 'w-24 h-24 rounded-full bg-[#FFFDF9] border-2 border-[#BB9457] shadow-paper-sm flex flex-col items-center justify-center p-2 text-center z-10';
    centerBowl.innerHTML = `
      <div class="text-[9px] font-mono tracking-widest text-[#AC3B28] font-bold uppercase">Anna Brahma</div>
      <div class="font-headline text-xs text-[#292524] mt-0.5">अन्नम्</div>
      <div class="text-[8px] text-[#57534E] leading-tight">Basmati / Ghee Core</div>
    `;
    innerRim.appendChild(centerBowl);

    // Katoris (Bowls) placed radially around the rim
    const totalSlots = SPICES_DATA.length;
    SPICES_DATA.forEach((spice, index) => {
      const angle = (index / totalSlots) * (Math.PI * 2) - Math.PI / 2;
      const radius = 125; // px from center
      const katoriX = Math.cos(angle) * radius;
      const katoriY = Math.sin(angle) * radius;

      const isSelected = selectedSpices.includes(spice.id);

      const katori = document.createElement('button');
      katori.type = 'button';
      katori.className = `absolute w-20 h-20 rounded-full border-2 transition-all duration-300 flex flex-col items-center justify-center p-1.5 cursor-pointer shadow-paper-sm ${
        isSelected 
          ? 'scale-105 border-[#AC3B28] bg-[#FFFDF9] ring-2 ring-[#AC3B28]/30 shadow-paper-md' 
          : 'border-[#BB9457]/50 bg-[#F5EFEB]/80 opacity-60 hover:opacity-100 hover:scale-100'
      }`;
      katori.style.left = `calc(50% + ${katoriX}px - 40px)`;
      katori.style.top = `calc(50% + ${katoriY}px - 40px)`;

      katori.innerHTML = `
        <div class="w-4 h-4 rounded-full mb-1 shadow-inner border border-white" style="background-color: ${spice.color}"></div>
        <div class="font-headline text-[10px] text-[#292524] truncate w-full text-center">${spice.name.split(' ')[0]}</div>
        <div class="text-[7.5px] font-mono uppercase text-[#A87C38] tracking-tight">${spice.rasa.split(' ')[0]}</div>
      `;

      katori.addEventListener('click', () => {
        if (selectedSpices.includes(spice.id)) {
          if (selectedSpices.length > 1) {
            selectedSpices = selectedSpices.filter(id => id !== spice.id);
          }
        } else {
          selectedSpices.push(spice.id);
        }
        renderThaliPlate();
        updateDetails();
        renderRadarChart();
      });

      innerRim.appendChild(katori);
    });

    thaliPlate.appendChild(innerRim);
    container.appendChild(thaliPlate);
  }

  function updateDetails() {
    const detailContainer = document.getElementById('thali-details-panel');
    if (!detailContainer) return;

    const activeList = SPICES_DATA.filter(s => selectedSpices.includes(s.id));
    const activeSpice = activeList[activeList.length - 1] || SPICES_DATA[0];

    detailContainer.innerHTML = `
      <div class="deckle-card p-6 bg-[#FAF6EE] border border-[#E2D7C5]">
        <div class="flex items-center justify-between pb-3 border-b border-[#EADBCA]">
          <div>
            <span class="paper-badge">${activeSpice.region}</span>
            <h4 class="font-display font-bold text-xl text-[#1E2E48] mt-1">${activeSpice.name}</h4>
          </div>
          <div class="text-right">
            <span class="font-headline text-lg text-[#AC3B28]">${activeSpice.sanskrit}</span>
            <div class="text-[10px] font-mono text-[#57534E]">${activeSpice.dosha}</div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 mt-4 text-xs">
          <div class="p-2.5 rounded-lg bg-[#F5EFEB] border border-[#E2D7C5]">
            <span class="text-[9px] uppercase font-mono text-[#8E6E38] block font-bold">Primary Rasa (Taste)</span>
            <span class="font-semibold text-[#292524]">${activeSpice.rasa}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-[#F5EFEB] border border-[#E2D7C5]">
            <span class="text-[9px] uppercase font-mono text-[#8E6E38] block font-bold">Virya (Thermal Energy)</span>
            <span class="font-semibold text-[#AC3B28]">${activeSpice.virya}</span>
          </div>
        </div>

        <div class="mt-4 text-xs text-[#44403C] leading-relaxed">
          <p class="font-medium text-[#1E2E48] mb-1">Bio-Molecular Chemistry:</p>
          <p>${activeSpice.chemistry}</p>
        </div>

        <div class="mt-3 text-xs text-[#57534E] italic bg-[#FFFDF9] p-3 rounded-lg border border-[#EADBCA]">
          "${activeSpice.heritage}"
        </div>
      </div>
    `;
  }

  function renderRadarChart() {
    const width = (radarCanvas.width = 280);
    const height = (radarCanvas.height = 280);
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = 100;

    radarCtx.clearRect(0, 0, width, height);

    const rasas = ['Sweet', 'Sour', 'Salty', 'Pungent', 'Bitter', 'Astringent'];
    const totalAxes = rasas.length;

    // Draw background concentric web
    radarCtx.strokeStyle = 'rgba(168, 124, 56, 0.2)';
    radarCtx.lineWidth = 1;
    for (let level = 1; level <= 4; level++) {
      const r = (maxRadius / 4) * level;
      radarCtx.beginPath();
      for (let i = 0; i < totalAxes; i++) {
        const angle = (i / totalAxes) * Math.PI * 2 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        if (i === 0) radarCtx.moveTo(x, y);
        else radarCtx.lineTo(x, y);
      }
      radarCtx.closePath();
      radarCtx.stroke();
    }

    // Draw axis lines and labels
    radarCtx.font = '10px Outfit, sans-serif';
    radarCtx.fillStyle = '#292524';
    radarCtx.textAlign = 'center';
    radarCtx.textBaseline = 'middle';

    for (let i = 0; i < totalAxes; i++) {
      const angle = (i / totalAxes) * Math.PI * 2 - Math.PI / 2;
      const x = centerX + Math.cos(angle) * maxRadius;
      const y = centerY + Math.sin(angle) * maxRadius;

      radarCtx.beginPath();
      radarCtx.moveTo(centerX, centerY);
      radarCtx.lineTo(x, y);
      radarCtx.strokeStyle = 'rgba(168, 124, 56, 0.35)';
      radarCtx.stroke();

      // Axis label
      const labelX = centerX + Math.cos(angle) * (maxRadius + 18);
      const labelY = centerY + Math.sin(angle) * (maxRadius + 18);
      radarCtx.fillText(rasas[i], labelX, labelY);
    }

    // Compute composite profile of selected ingredients
    const composite = { sweet: 0, sour: 0, salty: 0, pungent: 0, bitter: 0, astringent: 0 };
    const activeList = SPICES_DATA.filter(s => selectedSpices.includes(s.id));
    activeList.forEach(s => {
      composite.sweet += s.profile.sweet;
      composite.sour += s.profile.sour;
      composite.salty += s.profile.salty;
      composite.pungent += s.profile.pungent;
      composite.bitter += s.profile.bitter;
      composite.astringent += s.profile.astringent;
    });

    const values = [
      Math.min(10, composite.sweet / (activeList.length || 1)),
      Math.min(10, composite.sour / (activeList.length || 1)),
      Math.min(10, composite.salty / (activeList.length || 1)),
      Math.min(10, composite.pungent / (activeList.length || 1)),
      Math.min(10, composite.bitter / (activeList.length || 1)),
      Math.min(10, composite.astringent / (activeList.length || 1)),
    ];

    // Plot filled polygon
    radarCtx.beginPath();
    for (let i = 0; i < totalAxes; i++) {
      const angle = (i / totalAxes) * Math.PI * 2 - Math.PI / 2;
      const r = (values[i] / 10) * maxRadius;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      if (i === 0) radarCtx.moveTo(x, y);
      else radarCtx.lineTo(x, y);
    }
    radarCtx.closePath();
    radarCtx.fillStyle = 'rgba(172, 59, 40, 0.25)';
    radarCtx.fill();
    radarCtx.strokeStyle = '#AC3B28';
    radarCtx.lineWidth = 2;
    radarCtx.stroke();

    // Data points
    for (let i = 0; i < totalAxes; i++) {
      const angle = (i / totalAxes) * Math.PI * 2 - Math.PI / 2;
      const r = (values[i] / 10) * maxRadius;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      radarCtx.beginPath();
      radarCtx.arc(x, y, 3.5, 0, Math.PI * 2);
      radarCtx.fillStyle = '#D97706';
      radarCtx.fill();
      radarCtx.strokeStyle = '#FFFFFF';
      radarCtx.lineWidth = 1;
      radarCtx.stroke();
    }
  }

  // Initial draw
  renderThaliPlate();
  updateDetails();
  renderRadarChart();
}

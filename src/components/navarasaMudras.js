import anime from 'animejs';

/**
 * Section 3: Classical Arts & The 9 Rasas (Natya Shastra) & Temple Mudras
 * 3D Interactive Carousel with Dynamic Vectorized Hand Gesture Morphing
 */

export const rasasData = [
  {
    id: 'shringara',
    name: 'Shringara',
    sanskrit: 'शृङ्गार',
    translation: 'The Aesthetic of Love & Beauty',
    deity: 'Lord Vishnu',
    colorHex: '#38A169',
    colorName: 'Shyama (Verdant Lotus)',
    bhav: 'Rati (Delight, Amorous Grace)',
    shloka: 'शृङ्गारः शुचिरुज्ज्वलः — Natya Shastra',
    description: 'The monarch of all rasas (Rasaraja). Represents pure aesthetic romance, divine adoration, maternal devotion (Vatsalya), and the sublime beauty of creation.',
    mudra: 'Alapadma',
    mudraSanskrit: 'अलपद्म',
    mudraMeaning: 'Full Blooming Lotus',
    mudraPath: 'M 150,260 C 130,240 100,210 100,160 C 100,120 120,80 140,50 C 145,85 155,100 160,110 C 165,80 185,50 195,35 C 200,75 200,95 195,115 C 210,85 235,55 245,45 C 240,85 230,110 220,130 C 240,110 265,95 280,90 C 265,125 240,150 225,170 C 215,220 180,260 150,260 Z'
  },
  {
    id: 'hasya',
    name: 'Hasya',
    sanskrit: 'हास्य',
    translation: 'Mirth, Joy & Playful Comic Wit',
    deity: 'Pramathas (Shiva’s Ganas)',
    colorHex: '#E2E8F0',
    colorName: 'Sita (Radiant Pearl White)',
    bhav: 'Hasa (Laughter, Amusement)',
    shloka: 'हासो नाम परचेष्टाऽनुकरणादिभिः समुत्पद्यते',
    description: 'Born of comic mimicry, sparkling banter, and innocence. Hasya breaks intellectual rigidity and returns the heart to spontaneous spiritual joy.',
    mudra: 'Hamsasya',
    mudraSanskrit: 'हंसास्य',
    mudraMeaning: 'The Swan Beak',
    mudraPath: 'M 140,260 C 130,230 115,190 125,150 C 135,110 150,90 160,75 C 168,85 168,105 165,120 C 180,95 200,70 215,60 C 215,85 205,110 195,130 C 215,105 235,85 250,80 C 245,110 230,135 210,155 C 190,175 170,220 140,260 Z'
  },
  {
    id: 'karuna',
    name: 'Karuna',
    sanskrit: 'करुण',
    translation: 'Compassion, Empathy & Sacred Pathos',
    deity: 'Yama (The Witness of Truth)',
    colorHex: '#94A3B8',
    colorName: 'Kapota (Dove Grey)',
    bhav: 'Shoka (Grief transmuted into Universal Love)',
    shloka: 'शोकप्रभवः करुणः — Transmuting Sorrow into Grace',
    description: 'The profound recognition of universal suffering. It dissolves the ego and evokes deep, selfless compassion for all sentient beings.',
    mudra: 'Pataka',
    mudraSanskrit: 'पताक',
    mudraMeaning: 'The Sacred Flag / Benediction',
    mudraPath: 'M 140,260 C 135,220 130,170 130,120 C 130,60 145,30 160,25 C 175,20 190,30 190,70 C 195,30 210,25 220,35 C 230,45 230,85 225,120 C 245,125 255,145 250,170 C 240,200 200,240 140,260 Z'
  },
  {
    id: 'raudra',
    name: 'Raudra',
    sanskrit: 'रौद्र',
    translation: 'Fury, Righteous Indignation & Cosmic Fire',
    deity: 'Rudra (The Roaring Storm)',
    colorHex: '#E53E3E',
    colorName: 'Rakta (Blazing Blood Crimson)',
    bhav: 'Krodha (Wrath against Injustice)',
    shloka: 'रौद्रो नाम क्रोधस्थायिभावात्मकः',
    description: 'The blazing indignation unleashed against falsehood, injustice, and darkness. Symbolized by the cosmic dance of destruction (Tandava).',
    mudra: 'Tripataka',
    mudraSanskrit: 'त्रिपताक',
    mudraMeaning: 'The Three-Fold Flame & Thunderbolt',
    mudraPath: 'M 140,260 C 130,220 125,160 130,100 C 135,50 150,25 165,25 C 180,25 185,60 185,100 C 195,45 210,35 220,45 C 230,55 225,95 210,130 C 215,140 230,140 235,150 C 220,175 190,220 140,260 Z'
  },
  {
    id: 'veera',
    name: 'Veera',
    sanskrit: 'वीर',
    translation: 'Valour, Heroism & Noble Chivalry',
    deity: 'Indra (Sovereign of Heavens)',
    colorHex: '#D4AF37',
    colorName: 'Gaura (Luminous Radiant Gold)',
    bhav: 'Utsaha (Boundless Courage & Steadfastness)',
    shloka: 'उत्साहप्रभवो वीरः गम्भीरधैर्यसंयुतः',
    description: 'Heroic resolve, unflinching discipline, and moral bravery. The state of righteous action without fear of consequence.',
    mudra: 'Kartarimukha',
    mudraSanskrit: 'कर्तरीमुख',
    mudraMeaning: 'The Scissors of Discernment',
    mudraPath: 'M 140,260 C 130,225 125,180 120,130 C 115,80 125,40 140,30 C 155,20 165,45 160,95 C 175,70 195,40 210,35 C 225,30 235,55 225,90 C 210,130 190,160 185,180 C 185,210 165,245 140,260 Z'
  },
  {
    id: 'bhayanaka',
    name: 'Bhayanaka',
    sanskrit: 'भयानक',
    translation: 'Cosmic Dread, Awe & Sacred Trepidation',
    deity: 'Kala (Eternal Time)',
    colorHex: '#4A5568',
    colorName: 'Krishna (Midnight Void)',
    bhav: 'Bhaya (Terror before the Unfathomable)',
    shloka: 'भयानको नाम भयस्थायिभावात्मकः',
    description: 'The shiver of the mortal soul standing before the boundless infinity of Mahakala (Eternal Time). It awakens surrender and humility.',
    mudra: 'Ardhapataka',
    mudraSanskrit: 'अर्धपताक',
    mudraMeaning: 'The River Bank / Twilight Threshold',
    mudraPath: 'M 145,260 C 135,225 130,175 130,120 C 130,60 145,30 160,25 C 175,20 185,45 185,90 C 195,50 210,40 220,50 C 225,60 220,100 205,130 C 205,155 190,210 145,260 Z'
  },
  {
    id: 'bibhatsa',
    name: 'Bibhatsa',
    sanskrit: 'बीभत्स',
    translation: 'Aversion, Disgust & Renunciation of Illusion',
    deity: 'Mahakala (The Great Transformer)',
    colorHex: '#2B6CB0',
    colorName: 'Nila (Deep Indigo-Blue)',
    bhav: 'Jugupsa (Dispassion / Vairagya)',
    shloka: 'जुगुप्सास्थायिभावः बीभत्सः',
    description: 'Rejection of the decaying, transient world of senses. In spiritual philosophy, it triggers Vairagya—the radical turn towards the eternal soul.',
    mudra: 'Katakamukha',
    mudraSanskrit: 'कटकामुख',
    mudraMeaning: 'Bracelet Aperture / Stringing the Bow',
    mudraPath: 'M 140,260 C 130,230 120,180 125,140 C 130,105 145,85 160,75 C 170,85 170,110 165,130 C 180,100 205,80 220,75 C 215,105 200,130 185,155 C 180,185 165,225 140,260 Z'
  },
  {
    id: 'adbhuta',
    name: 'Adbhuta',
    sanskrit: 'अद्भुत',
    translation: 'Wonder, Ecstatic Marvel & Cosmic Curiosity',
    deity: 'Brahma (The Cosmic Architect)',
    colorHex: '#ECC94B',
    colorName: 'Pita (Solar Ochre / Saffron)',
    bhav: 'Vismaya (Astonishment before Miracles)',
    shloka: 'विस्मयस्थायिभावोऽद्भुतो रसः',
    description: 'The breathless wonder experienced when witnessing the cosmic order, celestial geometries, and miraculous synchronicities of the universe.',
    mudra: 'Mayura',
    mudraSanskrit: 'मयूर',
    mudraMeaning: 'The Peacock Crest / Celestial Radiance',
    mudraPath: 'M 140,260 C 135,225 125,170 130,120 C 135,70 150,40 165,30 C 180,20 190,50 185,95 C 195,65 215,45 230,40 C 240,50 235,90 220,125 C 215,150 190,210 140,260 Z'
  },
  {
    id: 'shanta',
    name: 'Shanta',
    sanskrit: 'शान्त',
    translation: 'Peace, Transcendental Silence & Equilibrium',
    deity: 'Para Shiva (The Transcendent Stillness)',
    colorHex: '#EDF2F7',
    colorName: 'Shubhra (Luminous Moonstone White)',
    bhav: 'Shama (Quietude / Samadhi)',
    shloka: 'शान्तो रसो मोक्षप्रदः सर्वभावोपशान्तये',
    description: 'The 9th crowning rasa. Complete cessation of mental turbulence (Chitta Vritti Nirodha). Pure, unconditioned peace that reflects the divine self like still water.',
    mudra: 'Suchi',
    mudraSanskrit: 'सूची',
    mudraMeaning: 'The Single Pointed Needle of Truth (Advaita)',
    mudraPath: 'M 140,260 C 135,230 130,180 130,130 C 130,70 140,20 155,15 C 170,10 175,40 175,90 C 180,120 185,150 185,180 C 185,210 170,240 140,260 Z'
  }
];

export function initNavarasaMudras() {
  const container = document.getElementById('navarasa-carousel-container');
  if (!container) return;

  const cardsTrack = document.getElementById('navarasa-cards-track');
  const prevBtn = document.getElementById('navarasa-prev-btn');
  const nextBtn = document.getElementById('navarasa-next-btn');
  const mudraSvgPath = document.getElementById('navarasa-mudra-path');
  const detailTitle = document.getElementById('navarasa-detail-title');
  const detailSanskrit = document.getElementById('navarasa-detail-sanskrit');
  const detailTranslation = document.getElementById('navarasa-detail-trans');
  const detailDeity = document.getElementById('navarasa-detail-deity');
  const detailColor = document.getElementById('navarasa-detail-color');
  const detailShloka = document.getElementById('navarasa-detail-shloka');
  const detailDesc = document.getElementById('navarasa-detail-desc');
  const detailMudraName = document.getElementById('navarasa-mudra-name');
  const detailMudraMeaning = document.getElementById('navarasa-mudra-meaning');
  const indicatorDotsContainer = document.getElementById('navarasa-indicators');

  let activeIndex = 0;
  const total = rasasData.length;

  if (cardsTrack) {
    cardsTrack.innerHTML = '';
    rasasData.forEach((rasa, index) => {
      const card = document.createElement('div');
      card.className = `navarasa-card flex-shrink-0 w-[240px] md:w-[280px] p-6 rounded-2xl vedic-glass transition-all duration-500 cursor-pointer select-none border border-vedic-gold/20 hover:border-vedic-gold/60`;
      card.dataset.index = index;
      card.innerHTML = `
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs uppercase tracking-widest text-vedic-sandstone/60">Rasa 0${index + 1}</span>
          <span class="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm" style="background-color: ${rasa.colorHex}"></span>
        </div>
        <h4 class="font-display text-2xl text-vedic-gold font-bold mb-1">${rasa.name}</h4>
        <p class="font-headline text-lg text-vedic-sandstone mb-2">${rasa.sanskrit}</p>
        <p class="text-xs text-vedic-sandstone/70 line-clamp-2">${rasa.translation}</p>
        <div class="mt-4 pt-3 border-t border-vedic-gold/15 flex items-center justify-between text-xs text-vedic-gold/80">
          <span>${rasa.mudra}</span>
          <span class="text-[10px] tracking-wider uppercase opacity-75">Mudra</span>
        </div>
      `;

      card.addEventListener('click', () => {
        setActiveRasa(index);
      });

      cardsTrack.appendChild(card);
    });
  }

  if (indicatorDotsContainer) {
    indicatorDotsContainer.innerHTML = '';
    rasasData.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-vedic-gold w-6' : 'bg-vedic-sandstone/30'}`;
      dot.setAttribute('aria-label', `Go to Rasa ${idx + 1}`);
      dot.addEventListener('click', () => setActiveRasa(idx));
      indicatorDotsContainer.appendChild(dot);
    });
  }

  function setActiveRasa(index) {
    activeIndex = (index + total) % total;
    const current = rasasData[activeIndex];

    const cards = cardsTrack.querySelectorAll('.navarasa-card');
    cards.forEach((c, idx) => {
      if (idx === activeIndex) {
        c.classList.remove('opacity-40', 'scale-95');
        c.classList.add('opacity-100', 'scale-105', 'border-vedic-gold', 'bg-vedic-gold/10', 'shadow-[0_0_35px_rgba(212,175,55,0.25)]');
      } else {
        c.classList.remove('opacity-100', 'scale-105', 'border-vedic-gold', 'bg-vedic-gold/10', 'shadow-[0_0_35px_rgba(212,175,55,0.25)]');
        c.classList.add('opacity-40', 'scale-95');
      }
    });

    if (cards[activeIndex]) {
      const cardEl = cards[activeIndex];
      const scrollPos = cardEl.offsetLeft - (cardsTrack.clientWidth / 2) + (cardEl.clientWidth / 2);
      cardsTrack.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }

    if (indicatorDotsContainer) {
      const dots = indicatorDotsContainer.children;
      for (let i = 0; i < dots.length; i++) {
        if (i === activeIndex) {
          dots[i].className = 'w-6 h-2.5 rounded-full bg-vedic-gold transition-all duration-300';
        } else {
          dots[i].className = 'w-2.5 h-2.5 rounded-full bg-vedic-sandstone/30 transition-all duration-300';
        }
      }
    }

    if (detailTitle) detailTitle.textContent = current.name;
    if (detailSanskrit) detailSanskrit.textContent = current.sanskrit;
    if (detailTranslation) detailTranslation.textContent = current.translation;
    if (detailDeity) detailDeity.textContent = current.deity;
    if (detailColor) {
      detailColor.textContent = current.colorName;
      detailColor.style.color = current.colorHex;
    }
    if (detailShloka) detailShloka.textContent = `“${current.shloka}”`;
    if (detailDesc) detailDesc.textContent = current.description;
    if (detailMudraName) detailMudraName.textContent = `${current.mudra} (${current.mudraSanskrit})`;
    if (detailMudraMeaning) detailMudraMeaning.textContent = current.mudraMeaning;

    if (mudraSvgPath) {
      anime({
        targets: mudraSvgPath,
        d: current.mudraPath,
        fill: current.colorHex,
        easing: 'easeInOutQuint',
        duration: 900
      });

      anime({
        targets: '#navarasa-mudra-svg',
        scale: [0.94, 1.03, 1],
        easing: 'easeOutElastic(1, .8)',
        duration: 800
      });
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => setActiveRasa(activeIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => setActiveRasa(activeIndex + 1));
  }

  window.addEventListener('keydown', (e) => {
    const section = document.getElementById('classical-arts');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (e.key === 'ArrowLeft') setActiveRasa(activeIndex - 1);
      if (e.key === 'ArrowRight') setActiveRasa(activeIndex + 1);
    }
  });

  setActiveRasa(0);
}


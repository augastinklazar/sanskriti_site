/**
 * Gyan Kosha: Cultural Trivia Modal & Living Vedic Knowledge Engine
 */

export const triviaQuizData = [
  {
    question: "What mathematical property characterizes the complex continuous loop Kolams (Sikku Kolam)?",
    options: [
      "Eulerian circuit paths where every line is traversed without lifting the hand",
      "Fibonacci prime factorization grids",
      "Non-Euclidean hyperbolic curved spaces",
      "Cartesian discrete matrix inversions"
    ],
    answer: 0,
    explanation: "Sikku Kolams follow Eulerian paths in graph theory. Drawn daily using white stone or rice flour, the uninterrupted line loops gracefully around fixed dot lattices (pullis), symbolizing cosmic infinity and protection of the threshold."
  },
  {
    question: "In the architectural design of ancient Indian stepwells (Baolis), what thermodynamic phenomenon kept them cool?",
    options: [
      "Solar radiation absorption through granite boulders",
      "Evaporative subterranean cooling and microclimatic air stratification",
      "Geothermal magma vents pushing cool steam upward",
      "Passive chemical freon reactions within sandstone"
    ],
    answer: 1,
    explanation: "Because water evaporates in shaded, high-depth subterranean chambers with stone thermal mass, temperatures at the lowest tier of a Baoli remain 5°C to 7°C cooler than the blistering summer air above, functioning as an ancient zero-energy air conditioner."
  },
  {
    question: "According to Sage Bharata's Natya Shastra, what is the 'Rasaraja' (supreme king of emotional essences)?",
    options: [
      "Veera (Valour and Heroism)",
      "Shanta (Serenity and Samadhi)",
      "Shringara (Love, Beauty & Divine Adoration)",
      "Adbhuta (Wonder and Astonishment)"
    ],
    answer: 2,
    explanation: "Shringara (शृङ्गार) is crowned the Rasaraja because all other emotional states arise from, reflect, or lead back into the aesthetic of sacred love, divine union, and creative beauty."
  },
  {
    question: "How is real 'Zari' thread traditionally manufactured for Banarasi and Kanjeevaram weaves?",
    options: [
      "Dipping nylon threads in gold-colored acrylic resin",
      "Flattening pure silver alloy wire and electro-gilding it over pure mulberry silk cores",
      "Weaving thin leaves of beaten copper with cotton",
      "Melting brass ingots directly into high-speed spinnerets"
    ],
    answer: 1,
    explanation: "Authentic Zari uses pure silver drawn into micron-thin wire ('Badla'), flattened, tightly wrapped around a core of pure degummed mulberry silk thread, and electro-gilded with 24-karat gold leaf."
  },
  {
    question: "In classical Indian acoustics, which string of the Tanpura is tuned to the dominant fifth (Pancham)?",
    options: [
      "The first string (Pa, ~1.5x tonic frequency)",
      "The second string (Madhya Sa)",
      "The third string (Chorusing unison)",
      "The fourth string (Kharaj deep bass Sa)"
    ],
    answer: 0,
    explanation: "The first string (Pancham) is tuned to the natural 3:2 fifth (Pa), while in ragas that omit Pa (such as Malkauns), it is tuned to the perfect fourth Madhyam (Ma)."
  }
];

export function initGyanKoshaModal() {
  const modal = document.getElementById('gyan-kosha-modal');
  const openBtns = document.querySelectorAll('[data-open-gyan-kosha]');
  const closeBtn = document.getElementById('gyan-kosha-close');
  const backdrop = document.getElementById('gyan-kosha-backdrop');

  if (!modal) return;

  function openModal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    renderQuizQuestion(0);
    renderAstronomicalContext();
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  let currentQuizIdx = 0;
  let score = 0;

  const quizQuestionEl = document.getElementById('quiz-question');
  const quizOptionsEl = document.getElementById('quiz-options');
  const quizFeedbackEl = document.getElementById('quiz-feedback');
  const quizNextBtn = document.getElementById('quiz-next-btn');
  const quizProgressEl = document.getElementById('quiz-progress');

  function renderQuizQuestion(idx) {
    currentQuizIdx = idx;
    const q = triviaQuizData[idx];
    if (!q || !quizQuestionEl || !quizOptionsEl) return;

    if (quizProgressEl) {
      quizProgressEl.textContent = `Question ${idx + 1} of ${triviaQuizData.length}`;
    }

    quizQuestionEl.textContent = q.question;
    quizOptionsEl.innerHTML = '';
    if (quizFeedbackEl) {
      quizFeedbackEl.classList.add('hidden');
      quizFeedbackEl.innerHTML = '';
    }
    if (quizNextBtn) quizNextBtn.classList.add('hidden');

    q.options.forEach((optText, optIdx) => {
      const optBtn = document.createElement('button');
      optBtn.className = 'w-full text-left p-3.5 rounded-xl border border-vedic-gold/25 bg-vedic-midnight/80 hover:border-vedic-gold hover:bg-vedic-gold/10 text-vedic-sandstone text-sm transition-all duration-300';
      optBtn.innerHTML = `<span class="inline-block w-6 h-6 rounded-full border border-vedic-gold/40 text-center text-xs leading-5 text-vedic-gold mr-2 font-mono">${String.fromCharCode(65 + optIdx)}</span> ${optText}`;

      optBtn.addEventListener('click', () => {
        handleOptionSelect(optIdx, q, optBtn);
      });

      quizOptionsEl.appendChild(optBtn);
    });
  }

  function handleOptionSelect(selectedIdx, q, clickedBtn) {
    const allBtns = quizOptionsEl.querySelectorAll('button');
    allBtns.forEach(b => b.disabled = true);

    const isCorrect = selectedIdx === q.answer;
    if (isCorrect) {
      clickedBtn.classList.remove('border-vedic-gold/25', 'bg-vedic-midnight/80');
      clickedBtn.classList.add('border-green-500', 'bg-green-500/20', 'text-green-300');
      score++;
    } else {
      clickedBtn.classList.remove('border-vedic-gold/25', 'bg-vedic-midnight/80');
      clickedBtn.classList.add('border-red-500', 'bg-red-500/20', 'text-red-300');
      if (allBtns[q.answer]) {
        allBtns[q.answer].classList.add('border-green-500', 'bg-green-500/20', 'text-green-300');
      }
    }

    if (quizFeedbackEl) {
      quizFeedbackEl.classList.remove('hidden');
      quizFeedbackEl.innerHTML = `
        <div class="p-4 rounded-xl ${isCorrect ? 'bg-green-950/40 border border-green-500/40' : 'bg-vedic-terracotta/60 border border-vedic-saffron/40'}">
          <p class="font-bold text-sm ${isCorrect ? 'text-green-400' : 'text-vedic-saffron'} mb-1">${isCorrect ? '✓ Praiseworthy Insight!' : '✗ Wisdom of the Sages:'}</p>
          <p class="text-xs text-vedic-sandstone/90 leading-relaxed">${q.explanation}</p>
        </div>
      `;
    }

    if (quizNextBtn) {
      quizNextBtn.classList.remove('hidden');
      if (currentQuizIdx < triviaQuizData.length - 1) {
        quizNextBtn.textContent = 'Next Question →';
      } else {
        quizNextBtn.textContent = `Complete Trial (Score: ${score}/${triviaQuizData.length})`;
      }
    }
  }

  if (quizNextBtn) {
    quizNextBtn.addEventListener('click', () => {
      if (currentQuizIdx < triviaQuizData.length - 1) {
        renderQuizQuestion(currentQuizIdx + 1);
      } else {
        if (quizQuestionEl) quizQuestionEl.textContent = '✨ You Have Traversed the Matrix of Wisdom';
        if (quizOptionsEl) {
          quizOptionsEl.innerHTML = `
            <div class="text-center py-6">
              <div class="text-4xl mb-3">🕉️</div>
              <h4 class="font-display text-xl text-vedic-gold mb-2">Sacred Knowledge Mastery</h4>
              <p class="text-sm text-vedic-sandstone/80 mb-4">You answered ${score} out of ${triviaQuizData.length} philosophical riddles correctly.</p>
              <button id="quiz-restart-btn" class="px-6 py-2.5 rounded-full bg-vedic-gold text-vedic-midnight font-medium text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">Begin Anew</button>
            </div>
          `;
          document.getElementById('quiz-restart-btn')?.addEventListener('click', () => {
            score = 0;
            renderQuizQuestion(0);
          });
        }
        if (quizFeedbackEl) quizFeedbackEl.classList.add('hidden');
        quizNextBtn.classList.add('hidden');
      }
    });
  }

  function renderAstronomicalContext() {
    const astroContainer = document.getElementById('vedic-astro-details');
    if (!astroContainer) return;

    const now = new Date();
    const month = now.getMonth();

    const ritus = [
      { name: 'Shishira (Winter / Cold)', months: [0, 1], sanskrit: 'शिशिर', dosha: 'Kapha Accumulating' },
      { name: 'Vasanta (Spring Awakening)', months: [2, 3], sanskrit: 'वसन्त', dosha: 'Kapha Pacification' },
      { name: 'Grishma (Summer Radiance)', months: [4, 5], sanskrit: 'ग्रीष्म', dosha: 'Pitta Accumulating' },
      { name: 'Varsha (Monsoon Deluge)', months: [6, 7], sanskrit: 'वर्षा', dosha: 'Vata Aggravation' },
      { name: 'Sharad (Autumn Clarity)', months: [8, 9], sanskrit: 'शरद्', dosha: 'Pitta Pacification' },
      { name: 'Hemanta (Early Winter Frost)', months: [10, 11], sanskrit: 'हेमन्त', dosha: 'Agni Igniting' },
    ];

    const currentRitu = ritus.find(r => r.months.includes(month)) || ritus[4];
    const isUttarayana = month >= 1 && month <= 6;

    astroContainer.innerHTML = `
      <div class="grid grid-cols-2 gap-3 text-xs">
        <div class="p-3 rounded-lg bg-vedic-midnight/60 border border-vedic-gold/20">
          <span class="text-vedic-sandstone/50 block text-[10px] uppercase">Ritu (Season)</span>
          <span class="font-headline text-vedic-gold text-base font-bold">${currentRitu.sanskrit}</span>
          <span class="text-vedic-sandstone block">${currentRitu.name}</span>
        </div>
        <div class="p-3 rounded-lg bg-vedic-midnight/60 border border-vedic-gold/20">
          <span class="text-vedic-sandstone/50 block text-[10px] uppercase">Ayana (Solar Course)</span>
          <span class="font-headline text-vedic-gold text-base font-bold">${isUttarayana ? 'उत्तरायण' : 'दक्षिणायन'}</span>
          <span class="text-vedic-sandstone block">${isUttarayana ? 'Uttarayana (Northern Ascension)' : 'Dakshinayana (Southern Descent)'}</span>
        </div>
        <div class="p-3 rounded-lg bg-vedic-midnight/60 border border-vedic-gold/20 col-span-2">
          <span class="text-vedic-sandstone/50 block text-[10px] uppercase">Ayurvedic Seasonal Prana</span>
          <span class="text-vedic-gold font-medium">${currentRitu.dosha}</span>
          <p class="text-[11px] text-vedic-sandstone/70 mt-1">Align with the cosmic rhythm by eating seasonally harvested, spiced sattvic preparations.</p>
        </div>
      </div>
    `;
  }
}


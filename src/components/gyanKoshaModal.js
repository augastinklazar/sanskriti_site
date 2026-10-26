/**
 * Gyan Kosha: Cultural Knowledge Vault & Educational Trivia Engine
 * Light-theme cotton rag styling with deckled card borders and subcontinental wisdom
 */

export const triviaQuizData = [
  {
    topic: 'Food & Ayurveda',
    question: 'In Ayurvedic culinary science, why does a traditional feast or thali always incorporate all "Shad Rasa" (Six Tastes)?',
    options: [
      'To prevent sensory fatigue and ensure holistic biological satiety across all three Doshas',
      'Because ancient kings prohibited eating single-flavor dishes by law',
      'To speed up sugar metabolism artificially',
      'To mask the taste of medicinal herbs with excess rock salt'
    ],
    answer: 0,
    explanation: 'A balanced Indian meal begins with sweet (Madhura) to ignite digestion, moves through sour, salty, and pungent dishes, and finishes with astringent (Kashaya) or bitter (Tikta) notes like betel leaf (Paan). This activates all digestive secretions and prevents cravings.'
  },
  {
    topic: 'Climate & Seasons',
    question: 'How many distinct seasons (Ritus) are recognized in the classical Indian Vedic astronomical calendar?',
    options: [
      'Four seasons following the Gregorian solar solstices',
      'Six seasons (Shad Ritu), each lasting approximately two lunar months',
      'Three seasons (Dry, Monsoonal, and Mountain)',
      'Twelve micro-seasons tied to agricultural paddy cycles'
    ],
    answer: 1,
    explanation: 'The subcontinent recognizes Six Seasons: Vasant (Spring), Grishma (Summer), Varsha (Monsoon), Sharad (Autumn), Hemant (Pre-Winter), and Shishir (Winter). Each corresponds to specific dietary changes (Ritucharya) and classical musical ragas.'
  },
  {
    topic: 'People & Living Traditions',
    question: 'What distinguishes the traditional Patola silk sari of Patan, Gujarat from ordinary printed textiles?',
    options: [
      'It is machine-embroidered using synthetic polyester gold threads',
      'It uses Double-Ikat weaving where both warp and weft threads are individually tie-dyed before weaving',
      'The silk is bleached in ocean saltwater for five months',
      'It is painted exclusively with synthetic aniline colors'
    ],
    answer: 1,
    explanation: 'Patan Patola is one of humanity\'s most complex mathematical weaving feats. Both warp and weft threads are tie-dyed in precise mathematical alignment before they touch the loom. The resulting textile is completely identical on both sides and lasts over 300 years.'
  },
  {
    topic: 'Sacred Architecture',
    question: 'In subterranean stepwell (Baoli) engineering, what thermodynamic phenomenon creates a cool oasis in desert climates?',
    options: [
      'Geothermal cold vents pumping alpine vapor',
      'Evaporative subterranean cooling and microclimatic air stratification',
      'Subsurface granite radiation absorption',
      'Passive chemical reaction between sandstone and groundwater'
    ],
    answer: 1,
    explanation: 'Because water evaporates in deep, shaded subterranean chambers insulated by thick sandstone walls, temperatures at the lowest water level of a stepwell remain 5°C to 8°C cooler than the blistering surface heat above.'
  },
  {
    topic: 'Living Languages',
    question: 'Which ancient script is the historical ancestor of modern Devanagari, Bengali, Tamil, and Southeast Asian scripts?',
    options: [
      'Brahmi Script (3rd Century BCE or earlier)',
      'Phoenician Cuneiform',
      'Hieratic Papyrus script',
      'Sogdian Silk Road alphabet'
    ],
    answer: 0,
    explanation: 'The Brahmi script, found on Emperor Ashoka\'s rock edicts across the subcontinent, gave birth to both Northern Nagari and Southern Grantha script families, as well as Tibetan, Burmese, Thai, and Javanese writing systems.'
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
    renderSeasonalWisdom();
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
      quizProgressEl.textContent = `${q.topic} • Question ${idx + 1} of ${triviaQuizData.length}`;
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
      optBtn.className = 'w-full text-left p-3.5 rounded-xl border border-[#E2D7C5] bg-[#FFFDF9] hover:border-[#1E2E48] hover:bg-[#F5EFEB] text-[#292524] text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-sm';
      optBtn.innerHTML = `<span class="inline-block w-6 h-6 rounded-full border border-[#8E6E38] text-center text-xs leading-5 text-[#8E6E38] mr-2 font-mono font-bold">${String.fromCharCode(65 + optIdx)}</span> ${optText}`;

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
      clickedBtn.classList.remove('border-[#E2D7C5]', 'bg-[#FFFDF9]');
      clickedBtn.classList.add('border-[#2D5A27]', 'bg-[#2D5A27]/10', 'text-[#1F432B]');
      score++;
    } else {
      clickedBtn.classList.remove('border-[#E2D7C5]', 'bg-[#FFFDF9]');
      clickedBtn.classList.add('border-[#AC3B28]', 'bg-[#AC3B28]/10', 'text-[#7E2616]');
      if (allBtns[q.answer]) {
        allBtns[q.answer].classList.add('border-[#2D5A27]', 'bg-[#2D5A27]/10', 'text-[#1F432B]');
      }
    }

    if (quizFeedbackEl) {
      quizFeedbackEl.classList.remove('hidden');
      quizFeedbackEl.innerHTML = `
        <div class="p-4 rounded-xl ${isCorrect ? 'bg-[#2D5A27]/10 border border-[#2D5A27]/30' : 'bg-[#AC3B28]/10 border border-[#AC3B28]/30'}">
          <p class="font-bold text-xs sm:text-sm ${isCorrect ? 'text-[#2D5A27]' : 'text-[#AC3B28]'} mb-1">${isCorrect ? '✓ Praiseworthy Insight!' : '✗ Wisdom of the Sages:'}</p>
          <p class="text-xs text-[#292524] leading-relaxed">${q.explanation}</p>
        </div>
      `;
    }

    if (quizNextBtn) {
      quizNextBtn.classList.remove('hidden');
      if (currentQuizIdx < triviaQuizData.length - 1) {
        quizNextBtn.textContent = 'Next Question →';
        quizNextBtn.onclick = () => renderQuizQuestion(currentQuizIdx + 1);
      } else {
        quizNextBtn.textContent = `Completed (${score}/${triviaQuizData.length}) • Retake`;
        quizNextBtn.onclick = () => {
          score = 0;
          renderQuizQuestion(0);
        };
      }
    }
  }

  function renderSeasonalWisdom() {
    const wisdomEl = document.getElementById('astronomical-display');
    if (!wisdomEl) return;

    const proverbs = [
      { text: "अन्नं वै प्राणाः — Food verily is the vital breath of living beings.", source: "Taittiriya Upanishad" },
      { text: "मातृ देवो भव, पितृ देवो भव — Revere the mother, revere the father, revere the teacher.", source: "Vedic Sikshavalli" },
      { text: "वसुधैव कुटुम्बकम् — The entire living world is one interconnected family.", source: "Maha Upanishad" }
    ];
    const item = proverbs[Math.floor(Math.random() * proverbs.length)];

    wisdomEl.innerHTML = `
      <div class="p-3.5 rounded-xl bg-[#F5EFEB] border border-[#E2D7C5]">
        <div class="text-[9px] font-mono uppercase tracking-wider text-[#AC3B28] font-bold">Subhashita (Timeless Wisdom)</div>
        <div class="font-headline text-xs sm:text-sm text-[#1E2E48] mt-1">${item.text}</div>
        <div class="text-[10px] text-[#57534E] text-right mt-1 italic">— ${item.source}</div>
      </div>
    `;
  }
}

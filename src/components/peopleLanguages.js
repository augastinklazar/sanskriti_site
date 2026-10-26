/**
 * People, Languages & Living Traditions of India
 * Interactive Indian Scripts Calligraphy Workshop & Master Artisan Guilds Explorer
 */

export function initPeopleLanguages() {
  const wordsContainer = document.getElementById('script-words-selector');
  const scriptsDisplay = document.getElementById('script-render-grid');
  const wordMetadata = document.getElementById('script-word-metadata');
  if (!wordsContainer || !scriptsDisplay || !wordMetadata) return;

  const VOCABULARY = [
    {
      id: 'namaste',
      word: 'Namaste',
      meaning: 'I bow to the divine spark within you',
      root: 'Sanskrit "Namas" (Bowing / Reverence) + "Te" (To you)',
      context: 'The universal Vedic gesture of mutual respect, humility, and recognition of universal consciousness.',
      scripts: {
        devanagari: { text: 'नमस्ते', lang: 'Hindi / Sanskrit / Marathi', script: 'Devanagari', origin: 'Direct descendant of 3rd Century BCE Brahmi script.' },
        tamil: { text: 'வணக்கம்', lang: 'Tamil', script: 'Tamil Script', origin: 'Descendant of Tamil-Brahmi; documented in Sangam literature 300 BCE.' },
        bengali: { text: 'নমস্কার', lang: 'Bengali / Assamese', script: 'Eastern Nagari', origin: 'Evolved through Gaudi script in the 11th century CE.' },
        gurmukhi: { text: 'ਨਮਸਤੇ', lang: 'Punjabi', script: 'Gurmukhi', origin: 'Standardized by Guru Angad Dev Ji in the 16th century.' },
        malayalam: { text: 'നമസ്കാരം', lang: 'Malayalam', script: 'Malayalam Script', origin: 'Evolved from the ancient Grantha and Vatteluttu scripts.' },
        telugu: { text: 'నమస్కారము', lang: 'Telugu', script: 'Telugu Script', origin: 'Round Brahmic script perfected for palm-leaf stylus incision.' }
      }
    },
    {
      id: 'shanti',
      word: 'Shanti',
      meaning: 'Peace, tranquility, and cessation of discord',
      root: 'Sanskrit root "Sham" (To be quiet, tranquil, pacified)',
      context: 'Chanted thrice (Om Shanti, Shanti, Shanti) to calm disturbances from nature, society, and the inner self.',
      scripts: {
        devanagari: { text: 'शान्तिः', lang: 'Hindi / Sanskrit', script: 'Devanagari', origin: 'Standard sacred script for Vedic mantras.' },
        tamil: { text: 'சாந்தி', lang: 'Tamil', script: 'Tamil Script', origin: 'Classical Dravidian expression of profound equanimity.' },
        bengali: { text: 'শান্তি', lang: 'Bengali', script: 'Eastern Nagari', origin: 'Echoed in Tagore\'s Gitanjali and Bengal Renaissance.' },
        gurmukhi: { text: 'ਸ਼ਾਂਤੀ', lang: 'Punjabi', script: 'Gurmukhi', origin: 'Revered state of spiritual poise (Sehaj) in Sikh philosophy.' },
        malayalam: { text: 'ശാന്തി', lang: 'Malayalam', script: 'Malayalam Script', origin: 'Chanted in coastal Kerala temple sanctums at dusk.' },
        telugu: { text: 'శాంతి', lang: 'Telugu', script: 'Telugu Script', origin: 'Classical Carnatic devotional literature (Tyagaraja kritis).' }
      }
    },
    {
      id: 'ananda',
      word: 'Ananda',
      meaning: 'Supreme uncaused joy and boundless bliss',
      root: 'Sanskrit prefix "Aa" (Complete) + "Nand" (To rejoice)',
      context: 'The ultimate nature of reality in Vedanta philosophy: Sat-Chit-Ananda (Truth, Consciousness, Bliss).',
      scripts: {
        devanagari: { text: 'आनन्दः', lang: 'Sanskrit / Hindi', script: 'Devanagari', origin: 'Central theme of the Taittiriya Upanishad.' },
        tamil: { text: 'ஆனந்தம்', lang: 'Tamil', script: 'Tamil Script', origin: 'Described as "Perinbam" (Great Bliss) in Shaiva Siddhanta.' },
        bengali: { text: 'আনন্দ', lang: 'Bengali', script: 'Eastern Nagari', origin: 'Celebrated in Bengal Baul mysticism and joy.' },
        gurmukhi: { text: 'ਅਨੰਦ', lang: 'Punjabi', script: 'Gurmukhi', origin: 'The central hymn "Anand Sahib" composed by Guru Amar Das.' },
        malayalam: { text: 'ആനന്ദം', lang: 'Malayalam', script: 'Malayalam Script', origin: 'Celebrated in Kathakali aesthetic expression.' },
        telugu: { text: 'ఆనందము', lang: 'Telugu', script: 'Telugu Script', origin: 'Expressing poetic ecstasy in Telugu Ashtapadis.' }
      }
    },
    {
      id: 'prana',
      word: 'Prana',
      meaning: 'The vital breath and life-force animating the cosmos',
      root: 'Sanskrit "Pra" (Forward / First) + "An" (To breathe, move, live)',
      context: 'Governs all biological respiration, cellular electricity, and energetic flow through the 72,000 nadis.',
      scripts: {
        devanagari: { text: 'प्राणः', lang: 'Sanskrit / Hindi', script: 'Devanagari', origin: 'Foundational doctrine in Yoga Sutras and Ayurveda.' },
        tamil: { text: 'பிராணன்', lang: 'Tamil', script: 'Tamil Script', origin: 'Key concept in Siddha medicine and Varma Kalai.' },
        bengali: { text: 'প্রাণ', lang: 'Bengali', script: 'Eastern Nagari', origin: 'Used ubiquitously in Eastern philosophy and literature.' },
        gurmukhi: { text: 'ਪ੍ਰਾਣ', lang: 'Punjabi', script: 'Gurmukhi', origin: 'The breath of life bestowed by the Divine Creator.' },
        malayalam: { text: 'പ്രാണൻ', lang: 'Malayalam', script: 'Malayalam Script', origin: 'Integral to Kalaripayattu martial movement.' },
        telugu: { text: 'ప్రాణము', lang: 'Telugu', script: 'Telugu Script', origin: 'The animating vitality celebrated in Telugu classicism.' }
      }
    }
  ];

  let selectedWord = VOCABULARY[0];

  function renderSelectors() {
    wordsContainer.innerHTML = '';
    VOCABULARY.forEach((v) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      const isActive = v.id === selectedWord.id;
      btn.className = `px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center space-x-2 cursor-pointer border ${
        isActive
          ? 'bg-[#AC3B28] text-[#FFFDF9] border-[#AC3B28] shadow-paper-md'
          : 'bg-[#FFFDF9] text-[#292524] border-[#E2D7C5] hover:border-[#AC3B28]/40 hover:bg-[#F5EFEB]'
      }`;
      btn.innerHTML = `
        <span class="font-headline">${v.word}</span>
      `;
      btn.addEventListener('click', () => {
        selectedWord = v;
        renderSelectors();
        renderScriptsGrid();
        updateMetadata();
      });
      wordsContainer.appendChild(btn);
    });
  }

  function renderScriptsGrid() {
    scriptsDisplay.innerHTML = '';
    const scriptKeys = Object.keys(selectedWord.scripts);

    scriptKeys.forEach((key) => {
      const item = selectedWord.scripts[key];
      const card = document.createElement('div');
      card.className = 'deckle-card p-5 bg-[#FAF6EE] border border-[#E2D7C5] flex flex-col justify-between hover:-translate-y-1 transition-transform';

      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between pb-2 border-b border-[#EADBCA]">
            <span class="paper-badge text-[9px]">${item.script}</span>
            <span class="text-[10px] font-mono text-[#57534E]">${item.lang}</span>
          </div>

          <!-- Dynamic Calligraphic Inscription Display -->
          <div class="my-4 text-center">
            <span class="font-serif text-3xl sm:text-4xl text-[#1E2E48] tracking-wide select-all font-bold transition-all inline-block hover:scale-110 duration-300">
              ${item.text}
            </span>
          </div>
        </div>

        <div class="pt-3 border-t border-[#EADBCA] text-[10.5px] text-[#57534E] leading-relaxed">
          ${item.origin}
        </div>
      `;

      scriptsDisplay.appendChild(card);
    });
  }

  function updateMetadata() {
    wordMetadata.innerHTML = `
      <div class="p-4 rounded-xl bg-[#FFFDF9] border border-[#E2D7C5] shadow-paper-sm">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#EADBCA]">
          <div>
            <span class="text-[10px] font-mono uppercase text-[#AC3B28] font-bold">Philosophical Etymology</span>
            <h4 class="font-display font-bold text-lg text-[#1E2E48]">${selectedWord.word} : ${selectedWord.meaning}</h4>
          </div>
          <span class="text-xs font-mono text-[#57534E] italic">${selectedWord.root}</span>
        </div>
        <p class="text-xs text-[#292524] mt-2 leading-relaxed">
          ${selectedWord.context}
        </p>
      </div>
    `;
  }

  renderSelectors();
  renderScriptsGrid();
  updateMetadata();
}

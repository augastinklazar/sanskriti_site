import './style.css';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initNoiseOverlay } from './effects/noise.js';
import { initCustomCursor } from './effects/cursor.js';
import { tanpura } from './audio/tanpura.js';

import { initHeroDiorama } from './components/heroDiorama.js';
import { initCulinaryMatrix } from './components/culinaryMatrix.js';
import { initClimateRitus } from './components/climateRitus.js';
import { initPeopleLanguages } from './components/peopleLanguages.js';
import { initDioramaChamber } from './components/dioramaChamber.js';
import { initGyanKoshaModal } from './components/gyanKoshaModal.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lightweight Handmade Paper Texture & Ink Cursor
  initNoiseOverlay();
  initCustomCursor();

  // 2. Lenis Smooth Scroll with GSAP ScrollTrigger Integration
  let lenis = null;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isReducedMotion) {
    lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // 3. Audio Synthesizer Controls (Natural Tanpura Acoustic Drone)
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundStatusText = document.getElementById('sound-status-text');
  const soundBars = document.querySelectorAll('.sound-bar');
  const soundPitchSelect = document.getElementById('sound-pitch-select');

  let audioVisualizerRaf = null;

  function updateAudioVisualizer() {
    if (tanpura.isPlaying) {
      const data = tanpura.getAudioData();
      soundBars.forEach((bar, idx) => {
        const val = data[idx * 3] || 10;
        const heightPct = Math.max(15, Math.min(100, (val / 255) * 100));
        bar.style.height = `${heightPct}%`;
      });
      audioVisualizerRaf = requestAnimationFrame(updateAudioVisualizer);
    } else {
      soundBars.forEach((bar) => {
        bar.style.height = '20%';
      });
      if (audioVisualizerRaf) cancelAnimationFrame(audioVisualizerRaf);
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', async () => {
      const isPlaying = await tanpura.toggle();
      if (soundStatusText) {
        soundStatusText.textContent = isPlaying ? 'Tanpura: ON' : 'Tanpura: OFF';
      }
      if (isPlaying) {
        soundToggleBtn.classList.add('border-[#AC3B28]', 'bg-[#AC3B28]/10');
        updateAudioVisualizer();
      } else {
        soundToggleBtn.classList.remove('border-[#AC3B28]', 'bg-[#AC3B28]/10');
      }
    });
  }

  if (soundPitchSelect) {
    soundPitchSelect.addEventListener('change', (e) => {
      const pitch = parseFloat(e.target.value);
      tanpura.setPitch(pitch);
    });
  }

  // 4. Mobile Drawer Navigation
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('translate-x-full');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeDrawer);
  mobileNavLinks.forEach((link) => link.addEventListener('click', closeDrawer));

  // 5. Initialize Above-the-Fold & Core Interactive Modules
  initHeroDiorama();
  initCulinaryMatrix();
  initClimateRitus();
  initPeopleLanguages();
  initDioramaChamber();
  initGyanKoshaModal();

  // 6. Lazy-load Folk Art Studio when user scrolls near it
  const studioSection = document.getElementById('studio-section');
  if (studioSection && 'IntersectionObserver' in window) {
    let studioLoaded = false;
    const studioObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !studioLoaded) {
          studioLoaded = true;
          import('./components/folkArtStudio.js').then((module) => {
            module.initFolkArtStudio();
          });
          studioObserver.disconnect();
        }
      });
    }, { rootMargin: '300px' });
    studioObserver.observe(studioSection);
  } else {
    import('./components/folkArtStudio.js').then((module) => {
      module.initFolkArtStudio();
    });
  }

  // 7. Lightweight GSAP Scroll Entrance Stagger
  if (!isReducedMotion) {
    gsap.utils.toArray('.deckle-card').forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 92%',
          toggleActions: 'play none none reverse',
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    });
  }
});

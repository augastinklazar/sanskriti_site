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
import { initFolkArtStudio } from './components/folkArtStudio.js';
import { initGyanKoshaModal } from './components/gyanKoshaModal.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Handmade Paper Grain Overlay & Kalam Ink Cursor
  initNoiseOverlay();
  initCustomCursor();

  // 2. Initialize Lenis Smooth Scroll with GSAP ScrollTrigger Integration
  let lenis = null;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isReducedMotion) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
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

  // 4. Mobile Drawer Menu Navigation
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

  // 5. Initialize Core Educational Modules
  initHeroDiorama();
  initCulinaryMatrix();
  initClimateRitus();
  initPeopleLanguages();
  initDioramaChamber();
  initFolkArtStudio();
  initGyanKoshaModal();

  // 6. GSAP Scroll Entrance Stagger for Section Cards
  if (!isReducedMotion) {
    gsap.utils.toArray('.deckle-card').forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    });
  }
});

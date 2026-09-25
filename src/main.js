import './style.css';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createIcons, Sparkles, Music, Volume2, RefreshCw, Download, ChevronRight, ChevronLeft, ArrowDown, X, Info } from 'lucide';

import { initNoiseOverlay } from './effects/noise.js';
import { initCustomCursor } from './effects/cursor.js';
import { tanpura } from './audio/tanpura.js';
import { initHeroScene } from './components/heroScene.js';
import { initKolamMatrix } from './components/kolamMatrix.js';
import { initNavarasaMudras } from './components/navarasaMudras.js';
import { initBaoliStepwell } from './components/baoliStepwell.js';
import { initWeavesAndAyurveda } from './components/weavesAyurveda.js';
import { initGyanKoshaModal } from './components/gyanKoshaModal.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  createIcons({
    icons: {
      Sparkles,
      Music,
      Volume2,
      RefreshCw,
      Download,
      ChevronRight,
      ChevronLeft,
      ArrowDown,
      X,
      Info
    }
  });

  // 1. Initialize Atmospheric Backgrounds & Custom Cursor
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

  // 3. Audio Synthesizer Controls (Tanpura Procedural Drone)
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
      const playing = tanpura.toggle();
      if (playing) {
        if (soundStatusText) soundStatusText.textContent = 'Drone: ON';
        soundToggleBtn.classList.add('border-vedic-gold', 'bg-vedic-gold/20', 'text-vedic-gold');
        updateAudioVisualizer();
      } else {
        if (soundStatusText) soundStatusText.textContent = 'Drone: OFF';
        soundToggleBtn.classList.remove('border-vedic-gold', 'bg-vedic-gold/20', 'text-vedic-gold');
        updateAudioVisualizer();
      }
    });
  }

  if (soundPitchSelect) {
    soundPitchSelect.addEventListener('change', (e) => {
      const hz = parseFloat(e.target.value);
      tanpura.setPitch(hz);
    });
  }

  // 4. Motion Preference Toggle
  const motionToggleBtn = document.getElementById('motion-toggle-btn');
  let reducedMotionActive = isReducedMotion;

  if (motionToggleBtn) {
    motionToggleBtn.addEventListener('click', () => {
      reducedMotionActive = !reducedMotionActive;
      if (reducedMotionActive) {
        document.body.classList.add('reduced-motion');
        motionToggleBtn.textContent = 'Cinematic: Off';
        if (lenis) lenis.destroy();
      } else {
        document.body.classList.remove('reduced-motion');
        motionToggleBtn.textContent = 'Cinematic: On';
        location.reload();
      }
    });
  }

  // 5. Hero GSAP Staggered Typography Reveal
  const heroTitle = document.getElementById('hero-main-title');
  const heroSubtitle = document.getElementById('hero-subtitle');
  const heroShloka = document.getElementById('hero-shloka');
  const heroCtas = document.getElementById('hero-cta-group');

  if (heroTitle) {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      heroShloka,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo(
      heroTitle,
      { opacity: 0, scale: 0.92, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'expo.out' },
      '-=0.8'
    )
    .fromTo(
      heroSubtitle,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
      '-=0.9'
    )
    .fromTo(
      heroCtas,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
      '-=0.7'
    );
  }

  // 6. Initialize Cultural Modules
  initHeroScene();
  initKolamMatrix();
  initNavarasaMudras();
  initBaoliStepwell();
  initWeavesAndAyurveda();
  initGyanKoshaModal();

  // 7. Mobile Navigation Drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('translate-x-full');
    });

    if (mobileDrawerClose) {
      mobileDrawerClose.addEventListener('click', () => {
        mobileDrawer.classList.add('translate-x-full');
      });
    }

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('translate-x-full');
      });
    });
  }

  // Smooth scroll anchor navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        if (lenis) {
          lenis.scrollTo(targetElement, { offset: -60 });
        } else {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});

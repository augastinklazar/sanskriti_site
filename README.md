# Sanskriti: The Living Matrix (संस्कृति)
> **A 3D-Vectorized Vedic Neo-Futurism Showcase Website Exploring Indian Culture, Sacred Geometry, Subterranean Stepwells, and Living Traditions.**

---

## 🌟 Overview & Architectural Philosophy

**Sanskriti: The Living Matrix** is an interactive, multi-dimensional web experience built with **Three.js, GSAP ScrollTrigger, Anime.js, and Lenis**. Designed around the aesthetic philosophy of **Vedic Neo-Futurism**, it bridges ancient Indian mathematics, temple arts, hydrological architecture, and living crafts with modern creative engineering and real-time WebGL shaders.

### 🎨 Visual & Aesthetic Design System
- **Color Palette:**
  - Midnight Indigo (`#0A0D14` / `#06080D`) — The primordial cosmic void (*Shunya*)
  - Burnt Terracotta (`#1F110E`) — Baked earth and sacred brick architecture
  - Raw Sandstone (`#F5EFE6`) — Carved pillars of Rajasthan and Gujarat
  - Burnished Gold (`#D4AF37` / `#F5D77F`) — Alchemical radiance and Zari metal leaf
  - Temple Vermillion & Kumkum (`#C41E3A`) — Sacred shakti fire
  - Celestial Prana Cyan (`#00F0FF`) — Subterranean spring waters and vital breath
- **Typography:**
  - Display: `'Cinzel Decorative'` & `'Rozha One'`
  - Interface & Body: `'Outfit'`
- **Atmospheric Effects:**
  - Full-screen procedural noise canvas creating an organic parchment & silk grain texture (throttled for 60 FPS).
  - Custom interactive Diya-flame ember cursor with a floating spark particle canvas and magnetic snapping to interactive targets.

---

## 🏛️ The 6 Interactive Cultural Modules

### 1. Parampara (The Core / Hero 3D WebGL Canvas)
- **Procedural 3D Sacred Lotus:** Constructed from mathematical parametric surfaces across 3 concentric tiers of petals.
- **Dynamic Breathing & Unfurling:** The lotus petals rhythmically oscillate and bloom outward.
- **Central Golden Bindu & Concentric Mandalic Rings:** Features spinning Sri Yantra and chakra wheel spokes.
- **Swirling Prana Particles:** Over 2,200 golden dust motes swirling in a 3D toroidal vortex.
- **Interactive Mouse Raycasting:** Hovering near the central Bindu excites the aura and accelerates rotational flow.
- **GSAP Staggered Typography Reveal:** Cascading entrance of Sanskrit verses and titles.

### 2. Sacred Geometry & The Kolam Matrix ("Bindu to Mandala")
- **Procedural Vector Engine:** Generates mathematical Kolams, Rangolis, and Yantras with pure SVG `<path>` calculations.
- **Classical Geometric Symmetries:**
  - 4-Fold (Chatur-Kona / Brahma symmetry)
  - 8-Fold (Ashtalakshmi radial harmony)
  - 12-Fold (Surya Mandala solar wheel)
  - Sri Yantra sacred interlocking triangles (9 principal triangles generating 43 secondary triangles and concentric lotuses)
  - Sikku Kolam (Brahma Mudi continuous Eulerian loop paths weaving around dot matrices)
- **Anime.js `stroke-dashoffset`:** Traces out the geometry in real time.
- **Interactive Workbench:** Adjustable concentric complexity slider, tracing speed, Vedic pigment toggles, random seed evolution, and instant **SVG Vector Export**.

### 3. Classical Arts & Mudras (The 9 Rasas & Temple Dance)
- **Natya Shastra 3D Carousel:** Showcases the 9 emotional essences (*Rasas*) codified by Sage Bharata Muni:
  1. *Shringara* (Love & Beauty)
  2. *Hasya* (Mirth & Comic Joy)
  3. *Karuna* (Compassion & Pathos)
  4. *Raudra* (Fury & Righteous Fire)
  5. *Veera* (Heroism & Valour)
  6. *Bhayanaka* (Cosmic Dread & Awe)
  7. *Bibhatsa* (Aversion & Dispassion)
  8. *Adbhuta* (Wonder & Astonishment)
  9. *Shanta* (Transcendental Silence & Peace)
- **Dynamic Mudra Morphing Engine:** Vectorized hand gestures (*Asamyutta Hastas* including *Pataka*, *Tripataka*, *Alapadma*, *Mayura*, *Hamsasya*, *Suchi*) that morph between configurations with Anime.js.

### 4. Architecture & Stepwells (The Depth of Time — The Baoli)
- **Procedural 3D Subterranean Stepwell:** Modeled after architectural wonders like *Chand Baori* and *Rani ki Vav*.
- **ScrollTrigger-Pinned Z-Depth Descent:** The camera travels from the open sky pavilion down to -28m subterranean depth.
- **Architectural Details:**
  - Cascading triangular chevron step pyramids
  - Instanced carved sandstone pillars along multi-story arcades
  - Fractal *Jharokha* balconies and arched lintels
  - Subterranean sacred water mirror with wave undulations, turquoise caustic shimmer, and drifting glowing Diya lamps
  - Volumetric dust motes and light shafts
- **Architectural HUD:** Real-time depth meter, thermodynamic microclimate indicators (-7°C cooling), and milestone descriptions.

### 5. Living Traditions, Weaves & Ayurveda
- **Sacred Textiles (Paramparik Vastra):**
  - Banarasi Zari brocade, Kanjeevaram Korvai silk, Kalamkari narrative art, Chanderi sheer weave, Pashmina cashmere.
  - **Interactive Microscopic Thread Weave Simulator:** Live HTML5 canvas rendering interlocking warp and weft threads with customizable materials (Gold Zari, Crimson Silk, Indigo Cotton) and weave structures (Twill, Plain, Satin, Korvai).
- **Ayurveda (The Science of Life):**
  - **Tridosha Energy Wheel:** Interactive Vata, Pitta, and Kapha sliders dynamically assess constitutional archetypes (Prakriti).
  - **Botanical Pharmacopeia (Dravyaguna):** Detailed profiles of Tulsi, Ashwagandha, Neem, Brahmi, and Shatavari with therapeutic rasas, virya, and spiritual benefits.

### 6. Ambient Soundscape, Gyan Kosha & Accessibility
- **Procedural Web Audio API Tanpura Synthesizer:** Real-time synthesis of the classical 4-string drone cycle (*Pa - Sa - Sa - Kharaj Sa*) with Jivari harmonic overtones, warm low-pass filtering, and stereo acoustic delay. Includes pitch fine-tuning (C#3, D3, D#3, E3) and live frequency visualizer bars in the navigation header.
- **Gyan Kosha Trivia & Wisdom Vault:** Interactive cultural riddle quiz with real-time explanations, philosophical glossary, and live Vedic astronomical calendar calculations (Ritu/Season and Uttarayana/Dakshinayana).
- **Accessibility & Motion Preferences:** Honors `prefers-reduced-motion` with an in-app toggle and fallback modes.

---

## 🛠️ Technical Stack

- **Build Tool:** Vite 5 (ES Modules)
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **3D & Canvas:** Three.js (r170)
- **Animation Orchestration:** GSAP 3.12 (ScrollTrigger) & Anime.js 3.2
- **Smooth Scroll:** Lenis 1.1 (`lenis` & `@studio-freight/lenis`)
- **Audio Engine:** Web Audio API (100% procedural, no external audio files required)

---

## 🚀 Local Development Setup

```bash
# Clone the repository
git clone https://github.com/your-username/sanskriti-the-living-matrix.git
cd sanskriti_site

# Install dependencies
npm install

# Start local development server with hot module replacement
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Automated GitHub Pages Deployment

The repository includes `.github/workflows/deploy.yml` configured for automatic GitHub Pages deployment:
1. Pushing to `main` or `master` triggers the GitHub Actions workflow.
2. The pipeline checks out the repository, installs dependencies, builds the production bundle with `npm run build`, and publishes the `dist/` directory using `actions/deploy-pages@v4`.
3. Relative path resolution (`base: './'`) in `vite.config.js` ensures assets load properly regardless of subpath or custom domain.

/**
 * Procedural Tanpura Drone Synthesizer using Web Audio API
 * Generates the authentic 4-string acoustic cycle of a classical Indian Tanpura:
 * Pa -> Sa -> Sa -> Kharaj Sa with rich Jivari harmonic overtones.
 */

class TanpuraEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.analyser = null;
    this.timerId = null;
    this.currentString = 0;
    this.basePitch = 146.83; // D3 standard classical pitch
    this.volume = 0.28;
    this.listeners = [];
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

    const compressor = this.ctx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-24, this.ctx.currentTime);
    compressor.knee.setValueAtTime(30, this.ctx.currentTime);
    compressor.ratio.setValueAtTime(12, this.ctx.currentTime);
    compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
    compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64;
    this.analyser.smoothingTimeConstant = 0.85;

    const delay = this.ctx.createDelay();
    delay.delayTime.value = 0.18;
    const feedback = this.ctx.createGain();
    feedback.gain.value = 0.35;
    const delayFilter = this.ctx.createBiquadFilter();
    delayFilter.type = 'lowpass';
    delayFilter.frequency.value = 2200;

    delay.connect(delayFilter);
    delayFilter.connect(feedback);
    feedback.connect(delay);

    this.masterGain.connect(compressor);
    compressor.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    this.masterGain.connect(delay);
    delayFilter.connect(this.analyser);
  }

  pluckString(freq, duration = 4.0, pan = 0) {
    if (!this.ctx || this.ctx.state === 'suspended') return;

    const now = this.ctx.currentTime;
    const stringGain = this.ctx.createGain();
    
    stringGain.gain.setValueAtTime(0.0001, now);
    stringGain.gain.exponentialRampToValueAtTime(0.35, now + 0.04);
    stringGain.gain.exponentialRampToValueAtTime(0.08, now + 0.8);
    stringGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    let pannerNode = null;
    if (this.ctx.createStereoPanner) {
      pannerNode = this.ctx.createStereoPanner();
      pannerNode.pan.value = pan;
    }

    const harmonics = [
      { mult: 1, gain: 0.6, type: 'sawtooth' },
      { mult: 2, gain: 0.35, type: 'sine' },
      { mult: 3, gain: 0.25, type: 'triangle' },
      { mult: 4, gain: 0.18, type: 'sine' },
      { mult: 5, gain: 0.12, type: 'sine' },
      { mult: 6, gain: 0.08, type: 'triangle' },
    ];

    harmonics.forEach(({ mult, gain: hGain, type }) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      
      osc.type = type;
      const detuneCents = (Math.random() - 0.5) * 6;
      osc.frequency.setValueAtTime(freq * mult, now);
      osc.detune.setValueAtTime(detuneCents, now);

      const jivariFilter = this.ctx.createBiquadFilter();
      jivariFilter.type = 'lowpass';
      jivariFilter.frequency.setValueAtTime(freq * mult * 3.5, now);
      jivariFilter.frequency.exponentialRampToValueAtTime(freq * 1.8, now + duration * 0.7);

      oscGain.gain.value = hGain;
      osc.connect(jivariFilter);
      jivariFilter.connect(oscGain);
      oscGain.connect(stringGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    });

    if (pannerNode) {
      stringGain.connect(pannerNode);
      pannerNode.connect(this.masterGain);
    } else {
      stringGain.connect(this.masterGain);
    }
  }

  triggerCycle() {
    if (!this.isPlaying) return;

    const base = this.basePitch;
    const strings = [
      { name: 'Pa', freq: base * 1.5, pan: -0.4 },
      { name: 'Sa', freq: base * 2.0, pan: -0.15 },
      { name: 'Sa', freq: base * 2.0 * 1.002, pan: 0.15 },
      { name: 'Kharaj', freq: base * 1.0, pan: 0.35 }
    ];

    const current = strings[this.currentString];
    this.pluckString(current.freq, 4.2, current.pan);

    this.notifySubscribers({
      string: current.name,
      index: this.currentString,
      frequency: current.freq
    });

    this.currentString = (this.currentString + 1) % strings.length;

    this.timerId = setTimeout(() => {
      this.triggerCycle();
    }, 1250);
  }

  async start() {
    this.init();
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    this.isPlaying = true;
    this.currentString = 0;
    this.triggerCycle();
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  setPitch(pitchHz) {
    this.basePitch = pitchHz;
  }

  getAudioData() {
    if (!this.analyser) return new Uint8Array(32);
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notifySubscribers(data) {
    this.listeners.forEach(cb => cb(data));
  }
}

export const tanpura = new TanpuraEngine();


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./*.{js,ts,html}"
  ],
  theme: {
    extend: {
      colors: {
        vedic: {
          crimson: "#6F1D1B",
          crimsonDark: "#4D1211",
          crimsonGlow: "rgba(111, 29, 27, 0.45)",
          sandGold: "#BB9457",
          sandGoldLight: "#D4B07B",
          sandGoldDark: "#8E6E38",
          espresso: "#432818",
          cinnamon: "#99582A",
          cinnamonLight: "#B86F3B",
          cream: "#FFE6A7",
          creamLight: "#FFF4D4",
          creamMuted: "#E6CE93",
          abyss: "#140A06",
          deep: "#1C0F09",
          surface: "#26150D",
          surfaceLight: "#331E14",
          surfaceBorder: "rgba(187, 148, 87, 0.28)"
        }
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', 'serif'],
        headline: ['"Rozha One"', 'serif'],
        sans: ['"Outfit"', 'sans-serif'],
      },
      backgroundImage: {
        'mandala-glow': 'radial-gradient(circle, rgba(187,148,87,0.2) 0%, rgba(111,29,27,0.1) 40%, rgba(20,10,6,0) 75%)',
        'crimson-bloom': 'radial-gradient(circle, rgba(111,29,27,0.35) 0%, rgba(67,40,24,0) 70%)',
        'gold-cream-shimmer': 'linear-gradient(135deg, #FFF4D4 0%, #FFE6A7 40%, #BB9457 70%, #99582A 100%)',
        'vedic-gradient': 'linear-gradient(180deg, #140A06 0%, #26150D 50%, #140A06 100%)',
      },
      animation: {
        'spin-slow': 'spin 40s linear infinite',
        'spin-reverse': 'spin-reverse 48s linear infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 7s ease-in-out infinite',
        'shimmer-wave': 'shimmer-wave 8s ease infinite',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(187,148,87,0.3))' },
          '50%': { opacity: '0.85', filter: 'drop-shadow(0 0 32px rgba(187,148,87,0.65)) drop-shadow(0 0 15px rgba(111,29,27,0.5))' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-3deg)' },
        }
      }
    },
  },
  plugins: [],
};

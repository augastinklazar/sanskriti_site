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
          midnight: "#0A0D14",
          abyss: "#06080D",
          terracotta: "#1F110E",
          terracottaLight: "#3B221B",
          sandstone: "#F5EFE6",
          sandstoneMuted: "#C7BEB2",
          gold: "#D4AF37",
          goldBright: "#F5D77F",
          goldDark: "#94761C",
          saffron: "#FF7722",
          vermillion: "#C41E3A",
          lotus: "#D84374",
          prana: "#00F0FF",
          copper: "#B8673B"
        }
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', 'serif'],
        headline: ['"Rozha One"', 'serif'],
        sans: ['"Outfit"', 'sans-serif'],
      },
      backgroundImage: {
        'mandala-glow': 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(10,13,20,0) 70%)',
        'vedic-gradient': 'linear-gradient(180deg, #0A0D14 0%, #150E0C 50%, #0A0D14 100%)',
        'gold-shimmer': 'linear-gradient(135deg, #F5D77F 0%, #D4AF37 50%, #94761C 100%)',
      },
      animation: {
        'spin-slow': 'spin 35s linear infinite',
        'spin-reverse': 'spin-reverse 45s linear infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(212,175,55,0.3))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.7))' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};

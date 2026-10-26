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
        khadi: {
          paper: "#FAF6EE",         // Warm handmade cotton rag paper
          paperLight: "#FFFDF9",    // Fresh bleached rice paper
          paperDark: "#F1E9DB",     // Aged parchment / palm leaf
          card: "#FBF8F2",          // Card surface
          cardBorder: "#E2D7C5",    // Hand-torn card border
          borderMuted: "#EADBCA",   // Subtle divider
          charcoal: "#292524",      // Drafting lead / ink pen
          charcoalLight: "#57534E", // Soft pencil wash
          indigo: "#1E2E48",        // Deep Lapis Indigo natural dye
          indigoLight: "#385278",   // Washed indigo
          sindoor: "#AC3B28",       // Madder red / Sindoor vermilion
          sindoorLight: "#CA5743",  // Diluted vermilion wash
          turmeric: "#D97706",      // Warm turmeric / Haldi ochre
          turmericLight: "#F59E0B", // Bright marigold yellow
          neem: "#2D5A27",          // Sacred Tulsi / Neem leaf green
          neemLight: "#477840",     // Fresh monsoon sprout
          terracotta: "#9A4526",    // Baked river silt terracotta
          terracottaLight: "#B85C3B",// Red clay pottery
          brass: "#A87C38",         // Temple brass / Bell metal
          brassLight: "#C49A52",    // Burnished brass
        }
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', 'serif'],
        headline: ['"Rozha One"', 'serif'],
        sans: ['"Outfit"', 'sans-serif'],
        serif: ['"Cinzel Decorative"', '"Rozha One"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'paper-grain': 'radial-gradient(circle, rgba(217,119,6,0.06) 0%, rgba(172,59,40,0.03) 50%, rgba(250,246,238,0) 80%)',
        'sindoor-wash': 'radial-gradient(circle, rgba(172,59,40,0.12) 0%, rgba(250,246,238,0) 70%)',
        'indigo-wash': 'radial-gradient(circle, rgba(30,46,72,0.1) 0%, rgba(250,246,238,0) 75%)',
        'turmeric-shimmer': 'linear-gradient(135deg, #FFFDF9 0%, #FAF6EE 50%, #F5EFEB 100%)',
      },
      boxShadow: {
        'paper-sm': '0 2px 6px -1px rgba(50, 40, 30, 0.06), 0 1px 3px -1px rgba(50, 40, 30, 0.04)',
        'paper-md': '0 8px 20px -3px rgba(50, 40, 30, 0.08), 0 3px 8px -2px rgba(50, 40, 30, 0.04)',
        'paper-lg': '0 16px 36px -4px rgba(50, 40, 30, 0.12), 0 6px 16px -3px rgba(50, 40, 30, 0.06)',
        'paper-diorama': '0 25px 50px -12px rgba(45, 30, 15, 0.18), 0 10px 20px -5px rgba(45, 30, 15, 0.10)',
        'paper-inset': 'inset 0 2px 4px 0 rgba(50, 40, 30, 0.06)',
      },
      animation: {
        'spin-slow': 'spin 40s linear infinite',
        'float-gentle': 'float-gentle 5s ease-in-out infinite',
        'float-reverse': 'float-reverse 6s ease-in-out infinite',
        'sway': 'sway 7s ease-in-out infinite',
        'watercolor-pulse': 'watercolor-pulse 6s ease-in-out infinite',
      },
      keyframes: {
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        'sway': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(2.5deg)' },
        },
        'watercolor-pulse': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}

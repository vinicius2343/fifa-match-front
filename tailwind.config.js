/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F2ECDD",
        "cream-dark": "#E8DFC7",
        ink: "#161410",
        gold: "#C99A2E",
        "gold-light": "#E4BC55",
        cta: "#E14A2B",
        "cta-dark": "#B93A21",
        pitch: "#1E5B3C",
        "pitch-dark": "#153F29",
        "pitch-light": "#2C7A4F",
      },
      fontFamily: {
        display: ["'Anton'", "sans-serif"],
        body: ["'Work Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        poster: "6px 6px 0px 0px rgba(22,20,16,1)",
        "poster-sm": "4px 4px 0px 0px rgba(22,20,16,1)",
        "poster-lg": "10px 10px 0px 0px rgba(22,20,16,1)",
        "poster-gold": "6px 6px 0px 0px rgba(201,154,46,1)",
      },
      backgroundImage: {
        "grain": "radial-gradient(rgba(22,20,16,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grain: "4px 4px",
      },
      keyframes: {
        "dice-roll": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "translateY(12px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "dice-roll": "dice-roll 0.6s ease-in-out",
        "pop-in": "pop-in 0.35s ease-out",
      },
    },
  },
  plugins: [],
};

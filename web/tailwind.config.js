/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#7C3AED", dark: "#5b21b6", light: "#a78bfa" },
        secondary: { DEFAULT: "#22D3EE", light: "#67e8f9", dark: "#0891b2" },
        background: { light: "#0B0F19" },
      },

      boxShadow: {
        glow: "0 0 25px rgba(124,58,237,0.35)",
      },

      backdropBlur: {
        xs: "2px",
      },

      animation: {
        fadeIn: "fadeIn 1.5s ease-in-out",
        fadeInSlow: "fadeInSlow 2s ease-in-out",
        "bounce-slow": "bounce-slow 2.5s infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
        paw1: "pawMove1 2s ease-in-out infinite",
        paw2: "pawMove2 2s ease-in-out infinite",
        paw3: "pawMove3 2s ease-in-out infinite",
        "spin-slow": "spin-slow 10s linear infinite",
        pawTrail: "pawTrail 6s linear infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        fadeInSlow: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": {
            opacity: "0.8",
            filter: "drop-shadow(0 0 15px rgba(139,92,246,0.5))",
          },
          "50%": {
            opacity: "1",
            filter: "drop-shadow(0 0 30px rgba(139,92,246,0.8))",
          },
        },
        pawMove1: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px) rotate(-5deg)" },
        },
        pawMove2: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px) rotate(3deg)" },
        },
        pawMove3: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px) rotate(-2deg)" },
        },
        pawTrail: {
          "0%": {
            transform: "translateY(100vh) scale(0.9) rotate(0deg)",
            opacity: "0.1",
          },
          "50%": { opacity: "0.5" },
          "100%": {
            transform: "translateY(-120vh) scale(1.2) rotate(10deg)",
            opacity: "0",
          },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

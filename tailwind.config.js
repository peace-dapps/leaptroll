/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05060d",
        void: "#0a0d1a",
        smoke: "#141828",
        ash: "#1f2538",
        troll: {
          50: "#e8f6ff",
          100: "#c1e7ff",
          200: "#8dd4ff",
          300: "#52baff",
          400: "#1e9fff",
          DEFAULT: "#3aa8f0",
          500: "#3aa8f0",
          600: "#1d7fc7",
          700: "#155f9b",
          deep: "#0e3f6e",
        },
        bone: "#e8e6dd",
        blood: "#d4413f",
        gold: "#e4b53b",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        scrawl: ["var(--font-scrawl)", "cursive"],
      },
      animation: {
        "marquee": "marquee 35s linear infinite",
        "marquee-rev": "marqueeRev 35s linear infinite",
        "float": "float 5s ease-in-out infinite",
        "pulse-troll": "pulseTroll 2s ease-in-out infinite",
        "shake": "shake 0.4s ease-in-out infinite",
        "blink": "blink 1.2s steps(2) infinite",
        "tilt": "tilt 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRev: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(-2deg)" },
          "50%": { transform: "translateY(-18px) rotate(2deg)" },
        },
        pulseTroll: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(58, 168, 240, 0.7)" },
          "50%": { boxShadow: "0 0 0 24px rgba(58, 168, 240, 0)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-2px)" },
          "75%": { transform: "translateX(2px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        tilt: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};

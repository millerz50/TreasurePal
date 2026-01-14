import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}", // ✅ include src if you use it
    "./node_modules/daisyui/dist/**/*.js",
  ],

  safelist: [
    "animate-scaleUp",
    "animate-shimmer",
    "animate-flicker",
    "animate-fadeIn",
    "opacity-0",
    "animate-slideInLeft",
  ],

  theme: {
    extend: {
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGradient: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.6 },
        },
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        scaleUp: {
          "0%": { transform: "scale(0.8)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        flicker: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.4 },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-out forwards",
        scaleUp: "scaleUp 0.6s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        flicker: "flicker 1.5s ease-in-out infinite",
        slideInLeft: "slideInLeft 0.8s ease-out forwards",
      },
    },
  },

  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        treasurepal: {
          primary: "#2563eb", // vivid blue
          accent: "#10b981", // bright green
          highlight: "#f59e0b", // amber highlight
          "base-100": "#ffffff", // white background
          "base-content": "#1f2937", // slate gray text
        },
      },
      "dark",
    ],
  },
};

export default config;

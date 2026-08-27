/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fbf7ed",
          100: "#f5ebd0",
          300: "#e3c983",
          500: "#c9a24d",
          700: "#9a7936",
          900: "#5c4720",
        },
        charcoal: {
          50: "#f4f4f5",
          200: "#d4d4d8",
          500: "#52525b",
          700: "#27272a",
          900: "#0a0a0b",
        },
        ivory: "#faf8f4",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],  // "serif" se badla
        sans: ["var(--font-sans)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      boxShadow: {
        luxe: "0 30px 60px -20px rgba(10, 10, 11, 0.35)",
        card: "0 10px 30px -12px rgba(10, 10, 11, 0.25)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

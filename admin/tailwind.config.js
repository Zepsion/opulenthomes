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
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.2em",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(10, 10, 11, 0.15)",
      },
    },
  },
  plugins: [],
};

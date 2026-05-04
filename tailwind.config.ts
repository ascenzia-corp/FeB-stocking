import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAFAF5",
        ink: "#1A1A1A",
        gold: {
          DEFAULT: "#B8860B",
          dark: "#9A7008",
          light: "#C5952B",
        },
        burgundy: {
          DEFAULT: "#6B1D2A",
          dark: "#52151F",
          light: "#7B2D3B",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

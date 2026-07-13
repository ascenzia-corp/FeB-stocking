import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Refonte design (charte Feiz e Breizh) --------------------
        parchment: {
          DEFAULT: "#F4EDE0",
          light: "#FBF6EC",
          warm: "#EBE0CC",
          deep: "#E0D3B9",
        },
        ink: {
          DEFAULT: "#1A1612",
          soft: "#3D342B",
          mid: "#6B5E4F",
          faint: "#9C8B73",
        },
        bordeaux: {
          DEFAULT: "#6B1F2A",
          deep: "#4F1620",
          soft: "#8B2B38",
          wash: "#F2E1DF",
        },
        gold: {
          DEFAULT: "#A47B3A",
          light: "#C9A05E",
          wash: "#F2E8D2",
          // legacy (écrans non encore refondus)
          dark: "#9A7008",
        },
        sage: {
          DEFAULT: "#5C6B4A",
          wash: "#E2E5D6",
        },
        ok: "#4F6B3F",
        warn: "#A06A1A",
        danger: "#8B2B38",
        // --- Legacy tokens (retirés une fois tous les écrans refondus) -
        cream: "#FAFAF5",
        burgundy: {
          DEFAULT: "#6B1D2A",
          dark: "#52151F",
          light: "#7B2D3B",
        },
      },
      fontFamily: {
        // nouveaux noms (charte)
        display: ["var(--font-cormorant)", "EB Garamond", "Georgia", "serif"],
        ui: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
        // noms hérités, remappés vers les nouvelles polices
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      borderRadius: {
        sm: "3px",
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
      },
      boxShadow: {
        sm: "0 1px 0 rgba(26,22,18,0.04), 0 2px 6px rgba(26,22,18,0.04)",
        md: "0 1px 0 rgba(26,22,18,0.04), 0 8px 24px -8px rgba(26,22,18,0.12)",
        lg: "0 1px 0 rgba(26,22,18,0.04), 0 24px 48px -16px rgba(26,22,18,0.22)",
      },
      backgroundImage: {
        hermine: "url('/brand/hermine.png')",
      },
      letterSpacing: {
        smallcaps: "0.14em",
        label: "0.10em",
        eyebrow: "0.16em",
      },
    },
  },
  plugins: [],
};

export default config;

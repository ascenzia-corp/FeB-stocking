// Extrait à fusionner dans tailwind.config.ts du repo FeB-stocking
// Conservé en .ts pour lisibilité, à intégrer dans la clé `theme.extend`.

import type { Config } from "tailwindcss";

const tokens: Partial<Config["theme"]> = {
  extend: {
    colors: {
      parchment: {
        DEFAULT: "#F4EDE0",
        light:   "#FBF6EC",
        warm:    "#EBE0CC",
        deep:    "#E0D3B9",
      },
      ink: {
        DEFAULT: "#1A1612",
        soft:    "#3D342B",
        mid:     "#6B5E4F",
        faint:   "#9C8B73",
      },
      bordeaux: {
        DEFAULT: "#6B1F2A",
        deep:    "#4F1620",
        soft:    "#8B2B38",
        wash:    "#F2E1DF",
      },
      gold: {
        DEFAULT: "#A47B3A",
        light:   "#C9A05E",
        wash:    "#F2E8D2",
      },
      sage: {
        DEFAULT: "#5C6B4A",
        wash:    "#E2E5D6",
      },
      ok:     "#4F6B3F",
      warn:   "#A06A1A",
      danger: "#8B2B38",
    },
    fontFamily: {
      display: ["var(--font-cormorant)", "EB Garamond", "Georgia", "serif"],
      ui:      ["var(--font-geist)", "system-ui", "sans-serif"],
      mono:    ["var(--font-geist-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
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
      // À utiliser comme `bg-hermine` puis `bg-[size:56px] opacity-[0.04]`
      "hermine": "url('/brand/hermine.png')",
    },
    letterSpacing: {
      smallcaps: "0.14em",
      label:     "0.10em",
      eyebrow:   "0.16em",
    },
  },
};

export default tokens;

/* --------------------------------------------------------------------
   Setup next/font dans app/layout.tsx
   --------------------------------------------------------------------

   import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";

   const display = Cormorant_Garamond({
     subsets: ["latin"],
     weight: ["400", "500", "600", "700"],
     style: ["normal", "italic"],
     variable: "--font-cormorant",
   });

   const ui = Geist({
     subsets: ["latin"],
     weight: ["300", "400", "500", "600", "700"],
     variable: "--font-geist",
   });

   const mono = Geist_Mono({
     subsets: ["latin"],
     weight: ["400", "500"],
     variable: "--font-geist-mono",
   });

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="fr" className={`${display.variable} ${ui.variable} ${mono.variable}`}>
         <body className="font-ui bg-parchment text-ink antialiased tabular-nums">
           {children}
         </body>
       </html>
     );
   }

   -------------------------------------------------------------------- */

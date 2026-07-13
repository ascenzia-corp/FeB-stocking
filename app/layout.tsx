import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Providers } from "@/components/providers";
import "./globals.css";

// Geist n'est pas dans le catalogue next/font/google de Next 14.2 :
// on utilise le paquet `geist` (auto-hébergé, first-party Vercel).
// Variables exposées : --font-geist-sans / --font-geist-mono.
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inventaire Matériel — Feiz e Breizh",
  description:
    "Gestion du matériel du pèlerinage Feiz e Breizh vers Sainte-Anne d'Auray",
  icons: { icon: "/favicon.svg" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F4EDE0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="font-ui bg-parchment text-ink antialiased [font-variant-numeric:tabular-nums]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

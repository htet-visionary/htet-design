import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { DM_Sans, Lora, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./shell.css";
import "./hub.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-reading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-interface",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Visionary",
  description: "Visionary portfolio, products, and design system.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${lora.variable} ${dmSans.variable}`}
    >
      <body className="visionary-root antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

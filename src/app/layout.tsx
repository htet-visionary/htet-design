import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Lora, Playfair_Display } from "next/font/google";
import { VisionaryShell } from "@/components/visionary/VisionaryShell";
import { visionaryMeta } from "@design-system/visionary";
import "./globals.css";
import "./shell.css";

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
  title: {
    default: visionaryMeta.name,
    template: `%s · ${visionaryMeta.name}`,
  },
  description: visionaryMeta.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${lora.variable} ${dmSans.variable}`}
    >
      <body className="visionary-root antialiased">
        <VisionaryShell>{children}</VisionaryShell>
      </body>
    </html>
  );
}

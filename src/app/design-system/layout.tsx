import "../../../design-system/tokens.css";
import { DM_Sans, Lora, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const serif = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
});

export default function DesignSystemLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={`${display.variable} ${serif.variable} ${sans.variable} min-h-dvh overflow-x-clip`}
      style={{
        backgroundColor: "var(--ds-bg-primary)",
        color: "var(--ds-text-primary)",
        fontFamily: "var(--ds-font-serif)",
      }}
    >
      {children}
    </div>
  );
}

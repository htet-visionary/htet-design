import { Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import "../../../../design-system/v2/styles/v2.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
});

export default function LuckyCharmV2Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} lc-v2 min-h-dvh overflow-x-clip`}
    >
      {children}
    </div>
  );
}

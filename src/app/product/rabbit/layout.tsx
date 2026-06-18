import { DM_Sans, Lora, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import "./rabbit.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-lora",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: "Lucky Charm — A Tiny Friend to Bring You Luck Everyday",
  description:
    "Meet Lucky — a tiny white rabbit who brings comfort, kindness, and little moments of luck into everyday life.",
};

export default function RabbitProductLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={`${playfair.variable} ${lora.variable} ${dmSans.variable} rabbit-page`}
    >
      {children}
    </div>
  );
}

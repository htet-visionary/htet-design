import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "../../../../design-system/v0/styles/v0.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Design System v0 — Color Foundations",
  description:
    "Foundational color architecture for a calm, luxurious, and emotionally comforting experience.",
};

export default function DesignSystemV0Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={`${inter.variable} ds-v0`}>{children}</div>
  );
}

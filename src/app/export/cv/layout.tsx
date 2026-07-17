import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "../../cv/cv.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cv",
  display: "swap",
});

export default function CvExportLayout({ children }: { children: ReactNode }) {
  return <div className={`cv-root ${inter.variable}`}>{children}</div>;
}

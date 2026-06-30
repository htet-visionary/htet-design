import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./dream-fund-v2.css";

export const metadata: Metadata = {
  title: "Dream Fund v2 — Prototype",
  description:
    "Stress-free, psychology-based smart financial allocation and dream tracking prototype.",
};

export default function DreamFundV2Layout({ children }: { children: ReactNode }) {
  return <div className="v-dream-fund-v2-page">{children}</div>;
}

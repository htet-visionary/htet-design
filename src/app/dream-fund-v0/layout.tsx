import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DreamFundV0Providers } from "./DreamFundV0Providers";
import "./dream-fund-v0.css";

export const metadata: Metadata = {
  title: "Dream Fund v0 — Create Your First Dream",
  description: "Mobile create-dream flow prototype for Dream Fund.",
};

export default function DreamFundV0Layout({ children }: { children: ReactNode }) {
  return (
    <DreamFundV0Providers>
      <div className="v-dream-fund-v0-page">{children}</div>
    </DreamFundV0Providers>
  );
}

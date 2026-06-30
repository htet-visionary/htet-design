import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DreamFundV1Providers } from "./DreamFundV1Providers";
import "./dream-fund-v1.css";

export const metadata: Metadata = {
  title: "Dream Fund v1",
  description: "Mobile dream-first financial companion prototype.",
};

export default function DreamFundV1Layout({ children }: { children: ReactNode }) {
  return (
    <DreamFundV1Providers>
      <div className="v-dream-fund-v1-page">{children}</div>
    </DreamFundV1Providers>
  );
}

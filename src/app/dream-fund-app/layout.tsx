import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DreamFundAppGate } from "@/components/dream-fund/app/DreamFundAppGate";
import { DreamFundAppShell } from "@/components/dream-fund/app/DreamFundAppShell";
import { DreamFundAppProvider } from "@/lib/dream-fund-app-context";
import "./dream-fund-app.css";

export const metadata: Metadata = {
  title: "Dream Fund",
  description: "Goal-oriented budgeting — fund your dreams, not just track pennies.",
};

export default function DreamFundAppLayout({ children }: { children: ReactNode }) {
  return (
    <DreamFundAppProvider>
      <DreamFundAppGate>
        <DreamFundAppShell>{children}</DreamFundAppShell>
      </DreamFundAppGate>
    </DreamFundAppProvider>
  );
}

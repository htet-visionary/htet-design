"use client";

import type { ReactNode } from "react";
import { DreamFundAppProvider } from "@/lib/dream-fund-app-context";

export function DreamFundV1Providers({ children }: { children: ReactNode }) {
  return <DreamFundAppProvider>{children}</DreamFundAppProvider>;
}

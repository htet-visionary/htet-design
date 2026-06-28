"use client";

import type { ReactNode } from "react";
import { DreamFundAppProvider } from "@/lib/dream-fund-app-context";

export function DreamFundV0Providers({ children }: { children: ReactNode }) {
  return <DreamFundAppProvider>{children}</DreamFundAppProvider>;
}

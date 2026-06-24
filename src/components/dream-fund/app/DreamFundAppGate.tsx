"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { dreamFundAppBase } from "@/lib/dream-fund-app-routes";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";

export function DreamFundAppGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { state, hydrated } = useDreamFundApp();

  useEffect(() => {
    if (!hydrated || !pathname.startsWith(dreamFundAppBase)) {
      return;
    }

    const onboardingPath = `${dreamFundAppBase}/onboarding`;
    const signUpPath = `${dreamFundAppBase}/sign-up`;

    if (!state.hasOnboarded && pathname !== onboardingPath) {
      router.replace(onboardingPath);
      return;
    }

    if (state.hasOnboarded && !state.isSignedUp && pathname !== signUpPath) {
      router.replace(signUpPath);
      return;
    }

    if (
      state.isSignedUp &&
      (pathname === onboardingPath || pathname === signUpPath)
    ) {
      router.replace(dreamFundAppBase);
    }
  }, [hydrated, pathname, router, state.hasOnboarded, state.isSignedUp]);

  if (!hydrated) {
    return <div className="v-dream-fund-app__loading" aria-live="polite" />;
  }

  return children;
}

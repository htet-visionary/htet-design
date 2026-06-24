"use client";

import Link from "next/link";
import { IllustrationPlaceholder } from "@/components/dream-fund/app/IllustrationPlaceholder";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";

export default function DreamFundOnboardingPage() {
  const { completeOnboarding } = useDreamFundApp();

  return (
    <div className="v-dream-fund-app__flow v-dream-fund-app__flow--center">
      <IllustrationPlaceholder variant="hero" label="Onboarding illustration placeholder" />
      <div>
        <h1 className="v-dream-fund-app__flow-title">Funding Dreams, Not Tracking Pennies</h1>
        <p className="v-dream-fund-app__flow-desc">
          A positive-reinforcement budgeting app that helps you save toward what matters.
        </p>
      </div>
      <Link
        href="/dream-fund-app/sign-up"
        className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
        onClick={completeOnboarding}
      >
        <span className="v-cmp-btn__label">Get Started</span>
      </Link>
    </div>
  );
}

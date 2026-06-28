"use client";

import { Shield } from "lucide-react";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import { calcProgress, formatCurrency } from "@/lib/dream-fund-app-utils";

export function V0HomeProtectionSection() {
  const { state } = useDreamFundApp();
  const currency = state.settings.currency;
  const emergency = state.emergencyFund;

  if (emergency.targetAmount <= 0) {
    return null;
  }

  const progress = calcProgress(emergency.savedAmount, emergency.targetAmount);

  return (
    <section className="v-dream-fund-v0__home-protection" aria-label="Emergency Fund">
      <article className="v-dream-fund-v0__home-protection-card">
        <span className="v-dream-fund-v0__home-protection-icon" aria-hidden>
          <Shield strokeWidth={1.75} size={22} />
        </span>

        <div className="v-dream-fund-v0__home-protection-copy">
          <div className="v-dream-fund-v0__home-protection-row">
            <p className="v-dream-fund-v0__home-protection-name">Emergency Fund</p>
            <p className="v-dream-fund-v0__home-protection-percent">{progress}%</p>
          </div>

          <p className="v-dream-fund-v0__home-protection-amounts">
            {formatCurrency(emergency.savedAmount, currency)} /{" "}
            {formatCurrency(emergency.targetAmount, currency)}
          </p>

          <div
            className="v-dream-fund-v0__home-protection-progress"
            role="progressbar"
            aria-valuenow={progress}
          >
            <div
              className="v-dream-fund-v0__home-protection-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="v-dream-fund-v0__home-protection-meta">Flexible target · always protected</p>
        </div>
      </article>
    </section>
  );
}

"use client";

import { Clover, Coins, Gauge, Shield, Wallet } from "lucide-react";
import { useMemo, type ReactNode } from "react";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import {
  dreamFundV1CurrencySymbol,
  formatDreamFundV1Amount,
  type DreamFundV1Currency,
} from "@/lib/dream-fund-v1-capture-data";
import { buildDreamFundV1Insights } from "@/lib/dream-fund-v1-insights";

type V1InsightsScreenProps = {
  currency: DreamFundV1Currency;
};

function formatInsightMoney(amount: number, currency: DreamFundV1Currency): string {
  const formatted = formatDreamFundV1Amount(amount, currency);
  return `${dreamFundV1CurrencySymbol(currency)} ${formatted || "0"}`;
}

type InsightPetalProps = {
  icon: ReactNode;
  label: string;
  value: string;
  position: "tl" | "tr" | "bl" | "br";
};

function InsightPetal({ icon, label, value, position }: InsightPetalProps) {
  return (
    <article
      className={[
        "v-dream-fund-v1__insights-petal",
        `v-dream-fund-v1__insights-petal--${position}`,
      ].join(" ")}
    >
      <span className="v-dream-fund-v1__insights-petal-icon" aria-hidden>
        {icon}
      </span>
      <p className="v-dream-fund-v1__insights-petal-label">{label}</p>
      <p className="v-dream-fund-v1__insights-petal-value">{value}</p>
    </article>
  );
}

export function V1InsightsScreen({ currency }: V1InsightsScreenProps) {
  const { availableToSpend, state } = useDreamFundApp();

  const insights = useMemo(
    () => buildDreamFundV1Insights(state.goals, state.emergencyFund),
    [state.goals, state.emergencyFund],
  );

  return (
    <div className="v-dream-fund-v1__insights">
      <div className="v-dream-fund-v1__insights-clover">
        <div className="v-dream-fund-v1__insights-grid">
          <InsightPetal
            position="tl"
            icon={<Wallet strokeWidth={1.75} size={22} />}
            label="Total Saved"
            value={formatInsightMoney(insights.totalSaved, currency)}
          />
          <InsightPetal
            position="tr"
            icon={<Gauge strokeWidth={1.75} size={22} />}
            label="Overall Progress"
            value={`${insights.overallProgress}%`}
          />
          <InsightPetal
            position="bl"
            icon={<Shield strokeWidth={1.75} size={22} />}
            label="Total Emergency"
            value={formatInsightMoney(insights.totalEmergency, currency)}
          />
          <InsightPetal
            position="br"
            icon={<Coins strokeWidth={1.75} size={22} />}
            label="Overall Spending"
            value={formatInsightMoney(availableToSpend, currency)}
          />
        </div>

        <div className="v-dream-fund-v1__insights-core" aria-hidden>
          <Clover strokeWidth={2.25} size={20} />
        </div>
      </div>
    </div>
  );
}

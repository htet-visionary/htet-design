"use client";

import { Clover, Coins, Gauge, Target, Wallet } from "lucide-react";
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
  meta: string;
  position: "tl" | "tr" | "bl" | "br";
};

function InsightPetal({ icon, label, value, meta, position }: InsightPetalProps) {
  return (
    <article
      className={[
        "v-dream-fund-v1__insights-petal",
        `v-dream-fund-v1__insights-petal--${position}`,
      ].join(" ")}
    >
      <div className="v-dream-fund-v1__insights-petal-icon-wrap">{icon}</div>
      <div className="v-dream-fund-v1__insights-petal-body">
        <p className="v-dream-fund-v1__insights-petal-label">{label}</p>
        <p className="v-dream-fund-v1__insights-petal-value">{value}</p>
        <p className="v-dream-fund-v1__insights-petal-meta">{meta}</p>
      </div>
    </article>
  );
}

export function V1InsightsScreen({ currency }: V1InsightsScreenProps) {
  const { availableToSpend, state } = useDreamFundApp();

  const insights = useMemo(
    () => buildDreamFundV1Insights(state.goals, state.emergencyFund, state.transactions),
    [state.goals, state.emergencyFund, state.transactions],
  );

  return (
    <div className="v-dream-fund-v1__insights">
      <div className="v-dream-fund-v1__insights-clover">
        <div className="v-dream-fund-v1__insights-grid">
          <InsightPetal
            position="tl"
            icon={<Coins strokeWidth={1.75} size={22} />}
            label="Total added"
            value={formatInsightMoney(insights.totalAdded, currency)}
            meta="top-up amount"
          />
          <InsightPetal
            position="tr"
            icon={<Target strokeWidth={1.75} size={22} />}
            label="Overall progress"
            value={`${insights.overallProgress}%`}
            meta="across all dreams"
          />
          <InsightPetal
            position="bl"
            icon={<Gauge strokeWidth={1.75} size={22} />}
            label="Overall spending"
            value={formatInsightMoney(availableToSpend, currency)}
            meta="guilt-free safe"
          />
          <InsightPetal
            position="br"
            icon={<Wallet strokeWidth={1.75} size={22} />}
            label="Total Emergency"
            value={formatInsightMoney(insights.totalEmergency, currency)}
            meta="saved"
          />
        </div>

        <div className="v-dream-fund-v1__insights-core" aria-hidden>
          <Clover strokeWidth={2.25} size={20} />
        </div>
      </div>
    </div>
  );
}

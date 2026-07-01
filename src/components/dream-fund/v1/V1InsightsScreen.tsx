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
  return `${dreamFundV1CurrencySymbol(currency)} ${formatDreamFundV1Amount(amount, currency)}`;
}

type InsightPetalProps = {
  icon: ReactNode;
  label: string;
  value: string;
  meta?: string;
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
      <span className="v-dream-fund-v1__insights-petal-icon" aria-hidden>
        {icon}
      </span>
      <p className="v-dream-fund-v1__insights-petal-label">{label}</p>
      <p className="v-dream-fund-v1__insights-petal-value">{value}</p>
      {meta ? <p className="v-dream-fund-v1__insights-petal-meta">{meta}</p> : null}
    </article>
  );
}

export function V1InsightsScreen({ currency }: V1InsightsScreenProps) {
  const { state } = useDreamFundApp();

  const insights = useMemo(
    () => buildDreamFundV1Insights(state.goals, state.transactions),
    [state.goals, state.transactions],
  );

  return (
    <div className="v-dream-fund-v1__insights">
      <div className="v-dream-fund-v1__insights-clover">
        <div className="v-dream-fund-v1__insights-grid">
          <InsightPetal
            position="tl"
            icon={<Coins strokeWidth={1.75} size={22} />}
            label="Income added"
            value={formatInsightMoney(insights.incomeAdded, currency)}
          />
          <InsightPetal
            position="tr"
            icon={<Target strokeWidth={1.75} size={22} />}
            label="Dream achievement"
            value={`${insights.dreamsAchieved}`}
            meta={
              insights.totalGoals > 0
                ? `${insights.achievementRate}% of ${insights.totalGoals} dreams`
                : "No dreams yet"
            }
          />
          <InsightPetal
            position="bl"
            icon={<Gauge strokeWidth={1.75} size={22} />}
            label="Timeline"
            value={insights.timelineLabel}
            meta="Nearest active dream"
          />
          <InsightPetal
            position="br"
            icon={<Wallet strokeWidth={1.75} size={22} />}
            label="Total saved"
            value={formatInsightMoney(insights.totalSaved, currency)}
            meta="Across all dreams"
          />
        </div>

        <div className="v-dream-fund-v1__insights-core" aria-hidden>
          <Clover strokeWidth={2.25} size={20} />
        </div>
      </div>
    </div>
  );
}

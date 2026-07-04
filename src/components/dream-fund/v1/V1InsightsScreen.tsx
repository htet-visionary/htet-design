"use client";

import { ChevronDown, Clover, Coins, Gauge, Target, Wallet } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import {
  dreamFundV1CurrencySymbol,
  formatDreamFundV1Amount,
  type DreamFundV1Currency,
} from "@/lib/dream-fund-v1-capture-data";
import {
  buildDreamFundV1Insights,
  buildMonthlySavingsChart,
  formatCompactAmount,
  INSIGHTS_CHART_YEARS,
  type InsightsChartYear,
  type MonthlySavingsChartPoint,
} from "@/lib/dream-fund-v1-insights";

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

type SavingsComboChartProps = {
  points: MonthlySavingsChartPoint[];
  ariaLabel: string;
};

function SavingsComboChart({ points, ariaLabel }: SavingsComboChartProps) {
  const maxAmount = Math.max(...points.map((point) => point.amount), 1);

  return (
    <div
      className="v-dream-fund-v1__insights-combo-chart"
      role="img"
      aria-label={ariaLabel}
    >
      <div className="v-dream-fund-v1__insights-chart">
        {points.map((point) => {
          const height = Math.max((point.amount / maxAmount) * 100, point.amount > 0 ? 8 : 0);

          return (
            <div key={point.label} className="v-dream-fund-v1__insights-chart-column">
              <div className="v-dream-fund-v1__insights-chart-bar-wrap">
                <div className="v-dream-fund-v1__insights-chart-bar-stack">
                  <span
                    className="v-dream-fund-v1__insights-chart-percent"
                    style={{ bottom: `calc(${height}% + 0.125rem)` }}
                  >
                    {point.growthRate}%
                  </span>
                  <div
                    className="v-dream-fund-v1__insights-chart-bar"
                    style={{ height: `${height}%` }}
                  />
                </div>
              </div>
              <span className="v-dream-fund-v1__insights-chart-value">
                {formatCompactAmount(point.amount)}
              </span>
              <span className="v-dream-fund-v1__insights-chart-label">{point.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function V1InsightsScreen({ currency }: V1InsightsScreenProps) {
  const { availableToSpend, state } = useDreamFundApp();
  const [chartYear, setChartYear] = useState<InsightsChartYear>(2026);

  const insights = useMemo(
    () => buildDreamFundV1Insights(state.goals, state.emergencyFund, state.transactions),
    [state.goals, state.emergencyFund, state.transactions],
  );

  const monthlySavingsChart = useMemo(
    () => buildMonthlySavingsChart(chartYear, state.goals, state.emergencyFund),
    [chartYear, state.goals, state.emergencyFund],
  );

  const chartSummary = monthlySavingsChart
    .map((point) => `${point.label} ${formatCompactAmount(point.amount)} (${point.growthRate}%)`)
    .join(", ");

  return (
    <div className="v-dream-fund-v1__insights">
      <section
        className="v-dream-fund-v1__insights-timeline"
        aria-labelledby="v1-insights-timeline-title"
      >
        <div className="v-dream-fund-v1__insights-timeline-head">
          <h2 id="v1-insights-timeline-title" className="v-dream-fund-v1__insights-timeline-title">
            Savings Growth Overview
          </h2>

          <div className="v-dream-fund-v1__insights-year-filter">
            <label className="v-dream-fund-v1__insights-year-filter-label" htmlFor="insights-year">
              Year
            </label>
            <div className="v-dream-fund-v1__select-wrap v-dream-fund-v1__insights-year-select-wrap">
              <select
                id="insights-year"
                className="v-dream-fund-v1__field-input v-dream-fund-v1__field-select v-dream-fund-v1__insights-year-select"
                value={chartYear}
                onChange={(event) => setChartYear(Number(event.target.value) as InsightsChartYear)}
              >
                {INSIGHTS_CHART_YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="v-dream-fund-v1__select-chevron"
                strokeWidth={2}
                size={16}
                aria-hidden
              />
            </div>
          </div>
        </div>

        <SavingsComboChart
          points={monthlySavingsChart}
          ariaLabel={`Total savings by month for ${chartYear}: ${chartSummary}`}
        />
      </section>

      <div className="v-dream-fund-v1__insights-clover">
        <div className="v-dream-fund-v1__insights-grid">
          <InsightPetal
            position="tl"
            icon={<Coins strokeWidth={1.75} size={22} />}
            label="Total Added"
            value={formatInsightMoney(insights.totalAdded, currency)}
            meta="top-up amount"
          />
          <InsightPetal
            position="tr"
            icon={<Target strokeWidth={1.75} size={22} />}
            label="Active Dreams"
            value={`${insights.totalDreams - insights.completedDreams}`}
            meta={`${insights.completedDreams}/${insights.totalDreams}` + " completed"}
          />
          <InsightPetal
            position="bl"
            icon={<Gauge strokeWidth={1.75} size={22} />}
            label="Overall Spending"
            value={formatInsightMoney(availableToSpend, currency)}
            meta="guilt-free balance"
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

"use client";

import { Calculator, Coffee, Coins, Wallet } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import { V0HomeGoalsSection } from "@/components/dream-fund/v0/V0HomeGoalsSection";
import { V0HomeProtectionSection } from "@/components/dream-fund/v0/V0HomeProtectionSection";
import { formatCurrency } from "@/lib/dream-fund-app-utils";

const QUICK_ACTIONS = [
  { id: "income", label: "Receive", action: "income" as const, icon: Coins },
  { id: "bill", label: "Bills", action: "bill" as const, icon: Calculator },
  { id: "spending", label: "Spend", action: "spending" as const, icon: Coffee },
] as const;

const SPEND_VIEW_OPTIONS = [
  { id: "today", label: "Today" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "anytime", label: "Anytime" },
] as const;

type SpendViewPeriod = (typeof SPEND_VIEW_OPTIONS)[number]["id"];

const SPEND_VIEW_STORAGE_KEY = "dream-fund-v0-spend-view";

export type V0HomeAction =
  | (typeof QUICK_ACTIONS)[number]["action"]
  | "overview"
  | "goals-list"
  | "activity"
  | "update";

type V0HomeDashboardProps = {
  onNavigate: (action: V0HomeAction) => void;
  onSelectGoal: (goalId: string) => void;
  onViewAllGoals: () => void;
};

function safeAmount(amount: number): number {
  return Number.isFinite(amount) ? Math.max(0, amount) : 0;
}

function isSpendViewPeriod(value: string): value is SpendViewPeriod {
  return SPEND_VIEW_OPTIONS.some((option) => option.id === value);
}

export function V0HomeDashboard({ onNavigate, onSelectGoal, onViewAllGoals }: V0HomeDashboardProps) {
  const { state, availableToSpend, saveableBalance } = useDreamFundApp();
  const currency = state.settings.currency;
  const [spendView, setSpendView] = useState<SpendViewPeriod>("today");

  useEffect(() => {
    const stored = window.localStorage.getItem(SPEND_VIEW_STORAGE_KEY);

    if (stored && isSpendViewPeriod(stored)) {
      setSpendView(stored);
    }
  }, []);

  function handleSpendViewChange(period: SpendViewPeriod) {
    setSpendView(period);
    window.localStorage.setItem(SPEND_VIEW_STORAGE_KEY, period);
  }

  const spendAmounts = useMemo(() => {
    const daily = safeAmount(availableToSpend);
    const monthly = safeAmount(daily * 30);
    const weeklyFromDaily = safeAmount(daily * 7);
    const weeklyFlexible = safeAmount(state.weeklyFlexibleBudget - state.weeklyFlexibleSpent);
    const anytime = safeAmount(
      state.currentBalance > 0 ? state.currentBalance : saveableBalance,
    );

    return {
      today: daily,
      weekly: weeklyFlexible > 0 ? weeklyFlexible : weeklyFromDaily,
      monthly,
      anytime,
    };
  }, [
    availableToSpend,
    saveableBalance,
    state.currentBalance,
    state.weeklyFlexibleBudget,
    state.weeklyFlexibleSpent,
  ]);

  const spendCaptions: Record<SpendViewPeriod, string> = {
    today: "Safe to spend today",
    weekly: "Safe to spend this week",
    monthly: "Safe to spend this month",
    anytime: "Total available right now",
  };

  const displayAmount = spendAmounts[spendView];

  return (
    <div className="v-dream-fund-v0__home">
      <section className="v-dream-fund-v0__spend-hero" aria-labelledby="v0-home-dashboard">
        <article className="v-dream-fund-v0__spend-card">
          <div className="v-dream-fund-v0__spend-card-top">
            <h2 id="v0-home-dashboard" className="v-dream-fund-v0__spend-card-label">
              Available to Spend
            </h2>
          </div>

          <button
            type="button"
            className="v-dream-fund-v0__spend-card-main"
            onClick={() => onNavigate("overview")}
          >
            <span className="v-dream-fund-v0__spend-card-icon" aria-hidden>
              <Wallet strokeWidth={1.75} size={24} />
            </span>
            <span className="v-dream-fund-v0__spend-card-copy">
              <span className="v-dream-fund-v0__spend-card-amount">
                {formatCurrency(displayAmount, currency)}
              </span>
              <span className="v-dream-fund-v0__spend-card-caption">{spendCaptions[spendView]}</span>
            </span>
          </button>

          <div
            className="v-dream-fund-v0__spend-periods"
            role="tablist"
            aria-label="Spending view"
          >
            {SPEND_VIEW_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={spendView === option.id}
                className={[
                  "v-dream-fund-v0__spend-period",
                  spendView === option.id ? "v-dream-fund-v0__spend-period--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleSpendViewChange(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="v-dream-fund-v0__home-panel" aria-labelledby="v0-quick-actions">
        <h2 id="v0-quick-actions" className="v-dream-fund-v0__home-panel-title">
          Quick Actions
        </h2>
        <ul className="v-dream-fund-v0__home-actions v-dream-fund-v0__home-actions--three">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;

            return (
              <li key={action.id}>
                <button
                  type="button"
                  className="v-dream-fund-v0__home-action"
                  onClick={() => onNavigate(action.action)}
                >
                  <span className="v-dream-fund-v0__home-action-icon" aria-hidden>
                    <Icon strokeWidth={2} size={22} />
                  </span>
                  <span className="v-dream-fund-v0__home-action-label">{action.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <V0HomeGoalsSection onViewAll={onViewAllGoals} onSelectGoal={onSelectGoal} />

      <V0HomeProtectionSection />
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import { formatCurrency } from "@/lib/dream-fund-app-utils";
import type { V0HomeAction } from "./V0HomeDashboard";
import { V0GoalDetailView } from "@/components/dream-fund/v0/V0GoalDetailView";
import {
  createEmptyGoalFormValues,
  V0GoalFormView,
  type GoalFormValues,
} from "@/components/dream-fund/v0/V0GoalFormView";

export type HomeDetailView =
  | "overview"
  | "goals-list"
  | "goal-detail"
  | "goal-add"
  | "goal-edit"
  | "activity"
  | "quick-update";

type V0HomeDetailScreensProps = {
  view: HomeDetailView;
  selectedGoalId: string | null;
  addMoneyOpen: boolean;
  onAddMoneyOpenChange: (open: boolean) => void;
  onQuickUpdateSelect: (action: V0HomeAction | "none" | "update") => void;
  onCreateGoal: (values: GoalFormValues) => void;
  onUpdateGoal: (values: GoalFormValues) => void;
};

const QUICK_UPDATE_OPTIONS = [
  { id: "income", label: "Money came in", emoji: "🟢", action: "income" as const },
  { id: "spending", label: "Money went out", emoji: "🔴", action: "spending" as const },
  { id: "bill", label: "Must-pay changed", emoji: "🟡", action: "bill" as const },
  { id: "goals", label: "Goal updated", emoji: "🔵", action: "goals-list" as const },
  { id: "nothing", label: "Nothing changed", emoji: "⚪", action: "none" as const },
] as const;

const ACTIVITY_TABS = [
  { id: "all", label: "All" },
  { id: "income", label: "In" },
  { id: "expense", label: "Out" },
] as const;

function groupLabel(date: string): string {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  if (date === today) {
    return "Today";
  }

  if (date === yesterday) {
    return "Yesterday";
  }

  return new Date(date).toLocaleDateString("ja-JP", { month: "short", day: "numeric" });
}

function V0OverviewDetail() {
  const { state, saveableBalance, availableToSpend, monthlyMandatoryTotal } = useDreamFundApp();
  const currency = state.settings.currency;

  const incomeTotal = state.transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expenseTotal = state.transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="v-dream-fund-v0__detail">
      <header className="v-dream-fund-v0__detail-head">
        <h1 className="v-dream-fund-v0__detail-title">Monthly Overview</h1>
        <p className="v-dream-fund-v0__detail-desc">How your money is organized this month.</p>
      </header>

      <div className="v-dream-fund-v0__detail-stat-grid">
        <article className="v-dream-fund-v0__detail-stat">
          <p className="v-dream-fund-v0__detail-stat-label">Income</p>
          <p className="v-dream-fund-v0__detail-stat-value">
            {formatCurrency(state.profile.monthlyIncome, currency)}
          </p>
        </article>
        <article className="v-dream-fund-v0__detail-stat">
          <p className="v-dream-fund-v0__detail-stat-label">Must-pay</p>
          <p className="v-dream-fund-v0__detail-stat-value">
            {formatCurrency(monthlyMandatoryTotal, currency)}
          </p>
        </article>
      </div>

      <article className="v-dream-fund-v0__detail-stat v-dream-fund-v0__detail-stat--hero">
        <p className="v-dream-fund-v0__detail-stat-label">Available after protection</p>
        <p className="v-dream-fund-v0__detail-stat-value v-dream-fund-v0__detail-stat-value--large">
          {formatCurrency(saveableBalance, currency)}
        </p>
        <p className="v-dream-fund-v0__detail-note">
          ~{formatCurrency(availableToSpend, currency)} safe to spend per day
        </p>
      </article>

      <section className="v-dream-fund-v0__detail-panel" aria-labelledby="v0-monthly-flow">
        <h2 id="v0-monthly-flow" className="v-dream-fund-v0__detail-panel-title">
          Recorded this month
        </h2>
        <div className="v-dream-fund-v0__detail-stat-grid">
          <article className="v-dream-fund-v0__detail-stat">
            <p className="v-dream-fund-v0__detail-stat-label">Money in</p>
            <p className="v-dream-fund-v0__detail-amount v-dream-fund-v0__detail-amount--income">
              +{formatCurrency(incomeTotal, currency)}
            </p>
          </article>
          <article className="v-dream-fund-v0__detail-stat">
            <p className="v-dream-fund-v0__detail-stat-label">Money out</p>
            <p className="v-dream-fund-v0__detail-amount v-dream-fund-v0__detail-amount--expense">
              −{formatCurrency(expenseTotal, currency)}
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}

function V0ActivityDetail({ onQuickUpdate }: { onQuickUpdate: () => void }) {
  const { state } = useDreamFundApp();
  const currency = state.settings.currency;
  const [activeTab, setActiveTab] = useState<(typeof ACTIVITY_TABS)[number]["id"]>("all");

  const filtered = useMemo(() => {
    if (activeTab === "all") {
      return state.transactions;
    }

    return state.transactions.filter((tx) => tx.type === activeTab);
  }, [activeTab, state.transactions]);

  const groups = useMemo(() => {
    const map = new Map<string, typeof filtered>();

    for (const tx of filtered) {
      const label = groupLabel(tx.date);
      const list = map.get(label) ?? [];
      list.push(tx);
      map.set(label, list);
    }

    return [...map.entries()];
  }, [filtered]);

  return (
    <div className="v-dream-fund-v0__detail">
      <header className="v-dream-fund-v0__detail-head v-dream-fund-v0__detail-head--row">
        <div>
          <h1 className="v-dream-fund-v0__detail-title">History</h1>
          <p className="v-dream-fund-v0__detail-desc">Recent money in and money out.</p>
        </div>
        <button
          type="button"
          className="v-cmp-btn v-cmp-btn--sm v-cmp-btn--secondary-green"
          onClick={onQuickUpdate}
        >
          <span className="v-cmp-btn__label">Update</span>
        </button>
      </header>

      <div className="v-dream-fund-v0__detail-segments" role="tablist" aria-label="Filter">
        {ACTIVITY_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={[
              "v-dream-fund-v0__detail-segment",
              activeTab === tab.id ? "v-dream-fund-v0__detail-segment--active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {groups.length === 0 ? (
        <p className="v-dream-fund-v0__detail-empty">No activity yet.</p>
      ) : (
        groups.map(([label, items]) => (
          <section key={label} className="v-dream-fund-v0__detail-group">
            <p className="v-dream-fund-v0__detail-group-label">{label}</p>
            {items.map((tx) => (
              <article key={tx.id} className="v-dream-fund-v0__detail-list-card">
                <div className="v-dream-fund-v0__detail-list-row">
                  <div>
                    <p className="v-dream-fund-v0__detail-list-title">{tx.title}</p>
                    <p className="v-dream-fund-v0__detail-list-meta">{tx.category}</p>
                  </div>
                  <span
                    className={
                      tx.type === "income"
                        ? "v-dream-fund-v0__detail-amount v-dream-fund-v0__detail-amount--income"
                        : "v-dream-fund-v0__detail-amount v-dream-fund-v0__detail-amount--expense"
                    }
                  >
                    {tx.type === "income" ? "+" : "−"}
                    {formatCurrency(tx.amount, currency)}
                  </span>
                </div>
              </article>
            ))}
          </section>
        ))
      )}
    </div>
  );
}

function V0QuickUpdateDetail({
  onSelect,
}: {
  onSelect: (action: V0HomeAction | "none") => void;
}) {
  return (
    <div className="v-dream-fund-v0__detail">
      <header className="v-dream-fund-v0__detail-head">
        <h1 className="v-dream-fund-v0__detail-title">Money Changed</h1>
        <p className="v-dream-fund-v0__detail-desc">What happened?</p>
      </header>

      <ul className="v-dream-fund-v0__detail-options">
        {QUICK_UPDATE_OPTIONS.map((option) => (
          <li key={option.id}>
            <button
              type="button"
              className="v-dream-fund-v0__detail-option"
              onClick={() => onSelect(option.action)}
            >
              <span className="v-dream-fund-v0__detail-option-emoji" aria-hidden>
                {option.emoji}
              </span>
              <span className="v-dream-fund-v0__detail-option-label">{option.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const DETAIL_TITLES: Record<HomeDetailView, string> = {
  overview: "Overview",
  "goals-list": "My Goals",
  "goal-detail": "Goal",
  "goal-add": "Add New Goal",
  "goal-edit": "Edit Goal",
  activity: "Activity",
  "quick-update": "Quick Update",
};

export function getHomeDetailTitle(view: HomeDetailView, goalName?: string | null): string {
  if (view === "goal-detail" && goalName) {
    return goalName;
  }

  return DETAIL_TITLES[view];
}

export function V0HomeDetailScreens({
  view,
  selectedGoalId,
  addMoneyOpen,
  onAddMoneyOpenChange,
  onQuickUpdateSelect,
  onCreateGoal,
  onUpdateGoal,
}: V0HomeDetailScreensProps) {
  const { getGoalById } = useDreamFundApp();

  if (view === "overview") {
    return <V0OverviewDetail />;
  }

  if (view === "goal-add") {
    return <V0GoalFormView mode="add" onSubmit={onCreateGoal} />;
  }

  if (view === "goal-edit" && selectedGoalId) {
    const goal = getGoalById(selectedGoalId);

    if (!goal) {
      return (
        <div className="v-dream-fund-v0__goal-detail">
          <p className="v-dream-fund-v0__goals-empty">This goal could not be found.</p>
        </div>
      );
    }

    return (
      <V0GoalFormView
        mode="edit"
        initialValues={{
          name: goal.name,
          targetAmount: goal.targetAmount,
          targetDate: goal.targetDate ?? "",
          monthlyAllocation: goal.monthlyAllocation,
          priority: goal.priority,
          emoji: goal.emoji,
        }}
        onSubmit={onUpdateGoal}
      />
    );
  }

  if (view === "goal-detail" && selectedGoalId) {
    return (
      <V0GoalDetailView
        goalId={selectedGoalId}
        addMoneyOpen={addMoneyOpen}
        onAddMoneyOpenChange={onAddMoneyOpenChange}
      />
    );
  }

  if (view === "goals-list") {
    return (
      <div className="v-dream-fund-v0__goal-detail">
        <p className="v-dream-fund-v0__goals-empty">Select a goal from the Goals tab.</p>
      </div>
    );
  }

  if (view === "activity") {
    return <V0ActivityDetail onQuickUpdate={() => onQuickUpdateSelect("update")} />;
  }

  return <V0QuickUpdateDetail onSelect={onQuickUpdateSelect} />;
}

export { createEmptyGoalFormValues };

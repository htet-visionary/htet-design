"use client";

import { Calculator, Coffee, Coins } from "lucide-react";
import { useMemo, useState } from "react";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import { daysUntil, formatCurrency } from "@/lib/dream-fund-app-utils";
import type { V0HomeAction } from "@/components/dream-fund/v0/V0HomeDashboard";

const QUICK_ACTIONS = [
  { id: "income", label: "Receive", action: "income" as const, icon: Coins },
  { id: "bill", label: "Bills", action: "bill" as const, icon: Calculator },
  { id: "spending", label: "Spend", action: "spending" as const, icon: Coffee },
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

type V0InsightsTabProps = {
  onNavigate: (action: V0HomeAction) => void;
};

export function V0InsightsTab({ onNavigate }: V0InsightsTabProps) {
  const { state, monthlyMandatoryTotal } = useDreamFundApp();
  const currency = state.settings.currency;
  const [activeTab, setActiveTab] = useState<(typeof ACTIVITY_TABS)[number]["id"]>("all");

  const expenseTotal = useMemo(
    () =>
      state.transactions
        .filter((tx) => tx.type === "expense")
        .reduce((sum, tx) => sum + tx.amount, 0),
    [state.transactions],
  );

  const upcomingBills = useMemo(
    () =>
      [...state.bills]
        .filter((bill) => !bill.paid)
        .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
        .slice(0, 3),
    [state.bills],
  );

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
    <div className="v-dream-fund-v0__tab-screen">
      <div className="v-dream-fund-v0__insights-summary">
        <article className="v-dream-fund-v0__insights-stat">
          <p className="v-dream-fund-v0__insights-stat-label">Income</p>
          <p className="v-dream-fund-v0__insights-stat-value">
            {formatCurrency(state.profile.monthlyIncome, currency)}
          </p>
        </article>
        <article className="v-dream-fund-v0__insights-stat">
          <p className="v-dream-fund-v0__insights-stat-label">Must-pay</p>
          <p className="v-dream-fund-v0__insights-stat-value">
            {formatCurrency(monthlyMandatoryTotal, currency)}
          </p>
        </article>
        <article className="v-dream-fund-v0__insights-stat">
          <p className="v-dream-fund-v0__insights-stat-label">Spent</p>
          <p className="v-dream-fund-v0__insights-stat-value v-dream-fund-v0__detail-amount--expense">
            {formatCurrency(expenseTotal, currency)}
          </p>
        </article>
      </div>

      {upcomingBills.length > 0 ? (
        <section className="v-dream-fund-v0__home-panel" aria-labelledby="v0-upcoming-bills">
          <h2 id="v0-upcoming-bills" className="v-dream-fund-v0__home-panel-title">
            Upcoming bills
          </h2>
          <ul className="v-dream-fund-v0__insights-bill-list">
            {upcomingBills.map((bill) => (
              <li key={bill.id} className="v-dream-fund-v0__insights-bill-item">
                <span className="v-dream-fund-v0__insights-bill-name">{bill.name}</span>
                <span className="v-dream-fund-v0__insights-bill-meta">
                  Due in {daysUntil(bill.dueDate)} days · {formatCurrency(bill.amount, currency)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="v-dream-fund-v0__home-panel" aria-labelledby="v0-insights-actions">
        <h2 id="v0-insights-actions" className="v-dream-fund-v0__home-panel-title">
          Update money
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

      <section className="v-dream-fund-v0__home-panel" aria-labelledby="v0-recent-activity">
        <h2 id="v0-recent-activity" className="v-dream-fund-v0__home-panel-title">
          Recent activity
        </h2>

        <div className="v-dream-fund-v0__detail-segments" role="tablist" aria-label="Filter activity">
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
      </section>
    </div>
  );
}

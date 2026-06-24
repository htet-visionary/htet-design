"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { SegmentTabs } from "@/components/dream-fund/app/SegmentTabs";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import { formatCurrency } from "@/lib/dream-fund-app-utils";

const tabs = [
  { id: "all", label: "All" },
  { id: "income", label: "Income" },
  { id: "expense", label: "Expense" },
];

function groupLabel(date: string): string {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  if (date === today) {
    return "Today";
  }

  if (date === yesterday) {
    return "Yesterday";
  }

  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function DreamFundTransactionsPage() {
  const { state } = useDreamFundApp();
  const [activeTab, setActiveTab] = useState("all");

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
    <div className="v-dream-fund-app__screen">
      <header className="v-dream-fund-app__goal-head">
        <div>
          <h1 className="v-dream-fund-app__section-title">Transactions</h1>
          <p className="v-dream-fund-app__section-desc">Lightweight weekly summaries, not daily guilt.</p>
        </div>
        <Link
          href="/dream-fund-app/transactions/new"
          className="v-cmp-btn v-cmp-btn--sm v-cmp-btn--icon-only v-cmp-btn--secondary-green"
          aria-label="Add transaction"
        >
          <span className="v-cmp-btn__icon">
            <Plus strokeWidth={2} size={18} />
          </span>
        </Link>
      </header>

      <SegmentTabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} />

      {groups.map(([label, items]) => (
        <section key={label}>
          <p className="v-dream-fund-app__group-label">{label}</p>
          {items.map((tx) => (
            <article key={tx.id} className="v-dream-fund-app__list-card">
              <div className="v-dream-fund-app__list-card-row">
                <div>
                  <p className="v-dream-fund-app__list-card-title">{tx.title}</p>
                  <p className="v-dream-fund-app__list-card-meta">{tx.category}</p>
                </div>
                <span
                  className={
                    tx.type === "income"
                      ? "v-dream-fund-app__amount--income"
                      : "v-dream-fund-app__amount--expense"
                  }
                >
                  {tx.type === "income" ? "+" : "-"}
                  {formatCurrency(tx.amount)}
                </span>
              </div>
            </article>
          ))}
        </section>
      ))}
    </div>
  );
}

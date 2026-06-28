"use client";

import { Receipt } from "lucide-react";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import { formatCurrency } from "@/lib/dream-fund-app-utils";
import { V0EmptyState, V0FlowHead, V0FlowScreen } from "@/components/dream-fund/v0/V0FlowScreen";
import { billFrequencyLabel, type BillFrequency } from "@/lib/dream-fund-v0-bills-data";

function formatDisplayDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BillFlowScreens() {
  const { state } = useDreamFundApp();
  const currency = state.settings.currency;
  const bills = [...state.bills].sort(
    (left, right) => new Date(left.dueDate).getTime() - new Date(right.dueDate).getTime(),
  );

  return (
    <V0FlowScreen>
      <V0FlowHead desc="Keep track of what you need to pay and when — so nothing catches you off guard." />

      {bills.length === 0 ? (
        <V0EmptyState>No bills yet. Tap Add Bill below when you&apos;re ready.</V0EmptyState>
      ) : (
        <ul className="v-dream-fund-v0__bills-list">
          {bills.map((bill) => (
            <li key={bill.id} className="v-dream-fund-v0__bills-list-item">
              <span className="v-dream-fund-v0__bills-list-icon" aria-hidden>
                <Receipt strokeWidth={2} size={18} />
              </span>
              <div className="v-dream-fund-v0__bills-list-copy">
                <p className="v-dream-fund-v0__bills-list-name">{bill.name}</p>
                <p className="v-dream-fund-v0__bills-list-meta">
                  {billFrequencyLabel(bill.frequency as BillFrequency)} · Due{" "}
                  {formatDisplayDate(bill.dueDate)}
                </p>
              </div>
              <span className="v-dream-fund-v0__bills-list-amount">
                {formatCurrency(bill.amount, currency)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </V0FlowScreen>
  );
}

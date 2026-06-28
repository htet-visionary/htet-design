"use client";

import { Pencil, Trash2, Wallet } from "lucide-react";
import {
  MONEY_COMING_IN_TYPES,
  frequencyLabel,
  recurringIncomeLabel,
  type IncomeSetupDraft,
} from "@/lib/dream-fund-v0-income-data";
import { V0EmptyState, V0FlowHead, V0FlowScreen } from "@/components/dream-fund/v0/V0FlowScreen";

function formatYen(amount: number): string {
  return `¥ ${amount.toLocaleString("en-US")}`;
}

type IncomeFlowScreensProps = {
  stepId: string;
  incomeDraft: IncomeSetupDraft;
  onEditBalance: () => void;
  onEditRecurring: (id: string) => void;
  onDeleteRecurring: (id: string) => void;
  onAddMoreIncome: () => void;
};

export function IncomeFlowScreens({
  stepId,
  incomeDraft,
  onEditBalance,
  onEditRecurring,
  onDeleteRecurring,
  onAddMoreIncome,
}: IncomeFlowScreensProps) {
  if (stepId === "money-intro") {
    return (
      <V0FlowScreen>
        <V0FlowHead
          title="Let's set up your money"
          desc="We'll use this to create your starting plan."
        />
        <p className="v-dream-fund-v0__money-intro-note">
          First, tell us what you have today. Then you can add money that comes in regularly — or
          skip that for now and add it later.
        </p>
      </V0FlowScreen>
    );
  }

  if (stepId === "money-incoming-prompt") {
    return (
      <V0FlowScreen>
        <V0FlowHead
          title="Do you receive money regularly?"
          desc="Add any money that comes in often. You can skip this and add it later."
        />
      </V0FlowScreen>
    );
  }

  if (stepId === "money-review") {
    return (
      <V0FlowScreen>
        <V0FlowHead
          title="Here's your starting point"
          desc="Make sure everything looks right before you continue."
        />

        {incomeDraft.currentBalance ? (
          <section className="v-dream-fund-v0__income-review-section">
            <h2 className="v-dream-fund-v0__income-review-heading">Current Balance</h2>
            <div className="v-dream-fund-v0__income-review-card">
              <span className="v-dream-fund-v0__income-review-icon">
                <Wallet strokeWidth={2} size={18} />
              </span>
              <div className="v-dream-fund-v0__income-review-copy">
                <p className="v-dream-fund-v0__income-review-title">
                  {incomeDraft.currentBalance.from || "Current Balance"}
                </p>
                <p className="v-dream-fund-v0__income-review-amount">
                  {formatYen(incomeDraft.currentBalance.amount)}
                </p>
              </div>
              <button
                type="button"
                className="v-dream-fund-v0__icon-btn"
                aria-label="Edit current balance"
                onClick={onEditBalance}
              >
                <Pencil strokeWidth={2} size={16} />
              </button>
            </div>
          </section>
        ) : null}

        <section className="v-dream-fund-v0__income-review-section">
          <div className="v-dream-fund-v0__income-review-header">
            <h2 className="v-dream-fund-v0__income-review-heading">Money Coming In</h2>
            <button type="button" className="v-dream-fund-v0__text-link" onClick={onAddMoreIncome}>
              + Add another
            </button>
          </div>
          {incomeDraft.recurringIncomes.length === 0 ? (
            <V0EmptyState inline>Nothing added yet — you can skip this for now.</V0EmptyState>
          ) : (
            <ul className="v-dream-fund-v0__income-review-list">
              {incomeDraft.recurringIncomes.map((income) => {
                const typeMeta = MONEY_COMING_IN_TYPES.find((item) => item.id === income.typeId);
                const Icon = typeMeta?.icon ?? Wallet;

                return (
                  <li key={income.id}>
                    <div className="v-dream-fund-v0__income-review-card">
                      <span className="v-dream-fund-v0__income-review-icon">
                        <Icon strokeWidth={2} size={18} />
                      </span>
                      <div className="v-dream-fund-v0__income-review-copy">
                        <p className="v-dream-fund-v0__income-review-title">
                          {recurringIncomeLabel(income.typeId)}
                        </p>
                        <p className="v-dream-fund-v0__income-review-meta">
                          {frequencyLabel(income.frequency).toLowerCase()}
                        </p>
                        <p className="v-dream-fund-v0__income-review-amount">{formatYen(income.amount)}</p>
                      </div>
                      <div className="v-dream-fund-v0__income-review-actions">
                        <button
                          type="button"
                          className="v-dream-fund-v0__icon-btn"
                          aria-label={`Edit ${recurringIncomeLabel(income.typeId)}`}
                          onClick={() => onEditRecurring(income.id)}
                        >
                          <Pencil strokeWidth={2} size={16} />
                        </button>
                        <button
                          type="button"
                          className="v-dream-fund-v0__icon-btn"
                          aria-label={`Delete ${recurringIncomeLabel(income.typeId)}`}
                          onClick={() => onDeleteRecurring(income.id)}
                        >
                          <Trash2 strokeWidth={2} size={16} />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </V0FlowScreen>
    );
  }

  return null;
}

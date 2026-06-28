"use client";

import { Camera, Check, Coffee, PlusCircle, Zap } from "lucide-react";
import { V0FlowHead, V0FlowScreen } from "@/components/dream-fund/v0/V0FlowScreen";
import {
  EXPENSE_CATEGORIES,
  QUICK_LOG_ITEMS,
  formatYenInput,
  type SpendingDraft,
  type SpendingMethod,
  type SpendingStepId,
} from "@/lib/dream-fund-v0-spending-data";

type SpendingFlowScreensProps = {
  stepId: SpendingStepId;
  draft: SpendingDraft;
  savedTitle: string | null;
  onChooseMethod: (method: SpendingMethod) => void;
  onSelectQuickItem: (itemId: string) => void;
  onDraftChange: (patch: Partial<SpendingDraft>) => void;
  onSelectCategory: (category: string) => void;
};

export function SpendingFlowScreens({
  stepId,
  draft,
  savedTitle,
  onChooseMethod,
  onSelectQuickItem,
  onDraftChange,
  onSelectCategory,
}: SpendingFlowScreensProps) {
  if (stepId === "choose-method") {
    return (
      <V0FlowScreen>
        <V0FlowHead
          title="How would you like to record it?"
          desc="Pick the method that fits this expense."
        />
        <ul className="v-dream-fund-v0__option-list">
          <li>
            <button
              type="button"
              className="v-dream-fund-v0__option v-dream-fund-v0__option--stacked"
              onClick={() => onChooseMethod("quick-log")}
            >
              <span className="v-dream-fund-v0__option-icon">
                <Zap strokeWidth={2} size={20} />
              </span>
              <span>
                <span className="v-dream-fund-v0__option-label">Quick Log</span>
                <span className="v-dream-fund-v0__option-desc">Pre-set items</span>
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="v-dream-fund-v0__option v-dream-fund-v0__option--stacked"
              onClick={() => onChooseMethod("custom")}
            >
              <span className="v-dream-fund-v0__option-icon">
                <PlusCircle strokeWidth={2} size={20} />
              </span>
              <span>
                <span className="v-dream-fund-v0__option-label">Custom Item</span>
                <span className="v-dream-fund-v0__option-desc">Enter your own expense</span>
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="v-dream-fund-v0__option v-dream-fund-v0__option--stacked"
              onClick={() => onChooseMethod("scan")}
            >
              <span className="v-dream-fund-v0__option-icon">
                <Camera strokeWidth={2} size={20} />
              </span>
              <span>
                <span className="v-dream-fund-v0__option-label">Scan Receipt</span>
                <span className="v-dream-fund-v0__option-desc">Optional — capture from photo</span>
              </span>
            </button>
          </li>
        </ul>
      </V0FlowScreen>
    );
  }

  if (stepId === "quick-pick") {
    return (
      <V0FlowScreen>
        <V0FlowHead title="Quick log" desc="Tap a common expense to log it fast." />
        <ul className="v-dream-fund-v0__spending-quick-grid">
          {QUICK_LOG_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="v-dream-fund-v0__spending-quick-card"
                onClick={() => onSelectQuickItem(item.id)}
              >
                <span className="v-dream-fund-v0__spending-quick-emoji" aria-hidden>
                  {item.emoji}
                </span>
                <span className="v-dream-fund-v0__spending-quick-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </V0FlowScreen>
    );
  }

  if (stepId === "scan") {
    return (
      <V0FlowScreen>
        <V0FlowHead
          title="Scan receipt"
          desc="Point your camera at a receipt — we'll help fill in the details."
        />
        <div
          className="v-dream-fund-v0__onboarding-hero v-dream-fund-v0__spending-scan"
          role="img"
          aria-label="Receipt scan placeholder"
        >
          <Camera strokeWidth={2} size={40} aria-hidden />
          <span>Receipt scan placeholder</span>
        </div>
        <p className="v-dream-fund-v0__income-hint">
          For this prototype, continue to enter the amount manually.
        </p>
      </V0FlowScreen>
    );
  }

  if (stepId === "amount") {
    return (
      <V0FlowScreen>
        <V0FlowHead title="Enter amount" desc="How much did you spend?" />
        {draft.method === "custom" ? (
          <label className="v-dream-fund-v0__field">
            <span className="v-dream-fund-v0__field-label">Item name</span>
            <input
              className="v-dream-fund-v0__field-input"
              value={draft.title}
              onChange={(event) => onDraftChange({ title: event.target.value })}
              placeholder="e.g. Coffee, Books"
            />
          </label>
        ) : draft.title ? (
          <p className="v-dream-fund-v0__spending-selected-item">
            {draft.title}
          </p>
        ) : null}
        <label className="v-dream-fund-v0__field">
          <span className="v-dream-fund-v0__field-label">Amount</span>
          <div className="v-dream-fund-v0__field-input-wrap">
            <span className="v-dream-fund-v0__field-prefix">¥</span>
            <input
              className="v-dream-fund-v0__field-input v-dream-fund-v0__field-input--prefixed"
              inputMode="numeric"
              value={formatYenInput(draft.amount)}
              onChange={(event) =>
                onDraftChange({
                  amount: Number.parseInt(event.target.value.replace(/\D/g, ""), 10) || 0,
                })
              }
              placeholder="1,200"
            />
          </div>
        </label>
      </V0FlowScreen>
    );
  }

  if (stepId === "category") {
    return (
      <V0FlowScreen>
        <V0FlowHead
          title="Choose category"
          desc="Tag this expense so you know where your money goes."
        />
        <ul className="v-dream-fund-v0__spending-category-list">
          {EXPENSE_CATEGORIES.map((category) => {
            const selected = draft.category === category;

            return (
              <li key={category}>
                <button
                  type="button"
                  className={[
                    "v-dream-fund-v0__spending-category-card",
                    selected ? "v-dream-fund-v0__spending-category-card--selected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => onSelectCategory(category)}
                >
                  <span>{category}</span>
                  {selected ? <Check strokeWidth={2.5} size={16} aria-hidden /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      </V0FlowScreen>
    );
  }

  if (stepId === "success") {
    return (
      <section className="v-dream-fund-v0__success v-dream-fund-v0__flow-success">
        <div className="v-dream-fund-v0__success-icon" aria-hidden>
          <Coffee strokeWidth={2.5} size={28} />
        </div>
        <div>
          <h1 className="v-dream-fund-v0__success-title">Spending Recorded</h1>
          <p className="v-dream-fund-v0__success-desc">
            {savedTitle
              ? `"${savedTitle}" has been saved to your activity.`
              : "Your expense has been saved."}
          </p>
        </div>
      </section>
    );
  }

  return null;
}

"use client";

import { useState } from "react";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import {
  calcDaysToGoal,
  calcProgress,
  formatCurrency,
  formatGoalDeadline,
  formatMonthsLeftFromDate,
  formatTimeline,
} from "@/lib/dream-fund-app-utils";

type AddMoneySource = "extra" | "balance" | null;

type V0GoalDetailViewProps = {
  goalId: string;
  addMoneyOpen: boolean;
  onAddMoneyOpenChange: (open: boolean) => void;
};

function parseAmountInput(value: string): number {
  return Number.parseInt(value.replace(/\D/g, ""), 10) || 0;
}

function formatAmountInput(amount: number): string {
  if (amount <= 0) {
    return "";
  }

  return amount.toLocaleString("en-US");
}

function priorityLabel(priority: string): string {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

export function V0GoalDetailView({
  goalId,
  addMoneyOpen,
  onAddMoneyOpenChange,
}: V0GoalDetailViewProps) {
  const {
    getGoalById,
    saveableBalance,
    addGoalSavings,
    addGoalSavingsFromBalance,
    state,
  } = useDreamFundApp();
  const currency = state.settings.currency;
  const goal = getGoalById(goalId);

  const [moneySource, setMoneySource] = useState<AddMoneySource>(null);
  const [amountInput, setAmountInput] = useState("");

  if (!goal) {
    return (
      <div className="v-dream-fund-v0__goal-detail">
        <p className="v-dream-fund-v0__goals-empty">This goal could not be found.</p>
      </div>
    );
  }

  const progress = calcProgress(goal.savedAmount, goal.targetAmount);
  const timelineDays = calcDaysToGoal(goal.targetAmount, goal.savedAmount, saveableBalance);
  const parsedAmount = parseAmountInput(amountInput);
  const maxBalanceAmount = state.currentBalance;
  const canSaveMoney =
    parsedAmount > 0 &&
    (moneySource === "extra" ||
      (moneySource === "balance" && parsedAmount <= maxBalanceAmount && maxBalanceAmount > 0));

  function closeAddMoney() {
    onAddMoneyOpenChange(false);
    setMoneySource(null);
    setAmountInput("");
  }

  function handleSaveMoney() {
    if (!canSaveMoney || !moneySource) {
      return;
    }

    if (moneySource === "extra") {
      addGoalSavings(goalId, parsedAmount);
    } else {
      addGoalSavingsFromBalance(goalId, parsedAmount);
    }

    closeAddMoney();
  }

  return (
    <>
      <div className="v-dream-fund-v0__goal-detail">
        <article className="v-dream-fund-v0__goal-detail-hero">
          <div className="v-dream-fund-v0__goal-detail-hero-media" aria-hidden>
            <span className="v-dream-fund-v0__goal-detail-hero-emoji">{goal.emoji}</span>
          </div>

          <div className="v-dream-fund-v0__goal-detail-hero-body">
            <div className="v-dream-fund-v0__goal-detail-hero-amounts">
              <span>
                {formatCurrency(goal.savedAmount, currency)} /{" "}
                {formatCurrency(goal.targetAmount, currency)}
              </span>
              <span>{progress}%</span>
            </div>

            <div
              className="v-dream-fund-v0__goal-detail-hero-progress"
              role="progressbar"
              aria-valuenow={progress}
            >
              <div
                className="v-dream-fund-v0__goal-detail-hero-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </article>

        <dl className="v-dream-fund-v0__goal-detail-rows">
          <div className="v-dream-fund-v0__goal-detail-row">
            <dt>Target amount</dt>
            <dd>{formatCurrency(goal.targetAmount, currency)}</dd>
          </div>
          <div className="v-dream-fund-v0__goal-detail-row">
            <dt>Monthly allocation</dt>
            <dd>{formatCurrency(goal.monthlyAllocation, currency)}</dd>
          </div>
          <div className="v-dream-fund-v0__goal-detail-row">
            <dt>Goal deadline</dt>
            <dd>{formatGoalDeadline(goal.targetDate)}</dd>
          </div>
          <div className="v-dream-fund-v0__goal-detail-row">
            <dt>Estimated completion</dt>
            <dd>
              {goal.targetDate
                ? formatMonthsLeftFromDate(goal.targetDate)
                : formatTimeline(timelineDays)}
            </dd>
          </div>
          <div className="v-dream-fund-v0__goal-detail-row">
            <dt>Priority</dt>
            <dd>
              <span className="v-dream-fund-v0__goal-detail-priority">{priorityLabel(goal.priority)}</span>
            </dd>
          </div>
        </dl>
      </div>

      {addMoneyOpen ? (
        <div className="v-dream-fund-v0__drawer-stage" role="presentation">
          <button
            type="button"
            className="v-dream-fund-v0__drawer-scrim"
            onClick={closeAddMoney}
            aria-label="Close"
          />
          <div
            className="v-dream-fund-v0__drawer v-dream-fund-v0__drawer--form"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-money-drawer-title"
          >
            <div>
              <h2 id="add-money-drawer-title" className="v-dream-fund-v0__drawer-title">
                Add money to {goal.name}
              </h2>
              <p className="v-dream-fund-v0__drawer-desc">Choose where the money comes from.</p>
            </div>

            <ul className="v-dream-fund-v0__add-money-options">
              <li>
                <button
                  type="button"
                  className={[
                    "v-dream-fund-v0__add-money-option",
                    moneySource === "extra" ? "v-dream-fund-v0__add-money-option--selected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setMoneySource("extra")}
                >
                  <span className="v-dream-fund-v0__add-money-option-title">Add extra money</span>
                  <span className="v-dream-fund-v0__add-money-option-desc">
                    Record new savings without using your current balance.
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={[
                    "v-dream-fund-v0__add-money-option",
                    moneySource === "balance" ? "v-dream-fund-v0__add-money-option--selected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setMoneySource("balance")}
                  disabled={maxBalanceAmount <= 0}
                >
                  <span className="v-dream-fund-v0__add-money-option-title">From current balance</span>
                  <span className="v-dream-fund-v0__add-money-option-desc">
                    {maxBalanceAmount > 0
                      ? `Move money you already have · ${formatCurrency(maxBalanceAmount, currency)} available`
                      : "No balance available right now"}
                  </span>
                </button>
              </li>
            </ul>

            {moneySource ? (
              <label className="v-dream-fund-v0__field">
                <span className="v-dream-fund-v0__field-label">Amount</span>
                <div className="v-dream-fund-v0__field-input-wrap">
                  <span className="v-dream-fund-v0__field-prefix">¥</span>
                  <input
                    className="v-dream-fund-v0__field-input v-dream-fund-v0__field-input--prefixed"
                    inputMode="numeric"
                    value={formatAmountInput(parsedAmount)}
                    onChange={(event) => setAmountInput(event.target.value.replace(/\D/g, ""))}
                    placeholder="10,000"
                  />
                </div>
              </label>
            ) : null}

            <button
              type="button"
              className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
              disabled={!canSaveMoney}
              onClick={handleSaveMoney}
            >
              <span className="v-cmp-btn__label">Save</span>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

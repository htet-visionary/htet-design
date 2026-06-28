"use client";

import { Clock, Info, PiggyBank, Shield, Wallet } from "lucide-react";
import { formatYenInput } from "@/lib/dream-fund-v0-bills-data";

type EmergencyFundFlowScreensProps = {
  stepId: string;
  targetAmount: number;
  depositAmount: number;
  onTargetAmountChange: (amount: number) => void;
  onDepositAmountChange: (amount: number) => void;
  onChooseAddNow: (addNow: boolean) => void;
};

export function EmergencyFundFlowScreens({
  stepId,
  targetAmount,
  depositAmount,
  onTargetAmountChange,
  onDepositAmountChange,
  onChooseAddNow,
}: EmergencyFundFlowScreensProps) {
  if (stepId === "emergency-target") {
    return (
      <>
        <div>
          <h1 className="v-dream-fund-v0__title">Set your emergency fund target</h1>
          <p className="v-dream-fund-v0__desc">
            Choose how much you want saved for unexpected expenses.
          </p>
        </div>
        <div
          className="v-dream-fund-v0__onboarding-hero v-dream-fund-v0__onboarding-hero--compact"
          role="img"
          aria-label="Emergency fund illustration placeholder"
        />
        <label className="v-dream-fund-v0__field">
          <span className="v-dream-fund-v0__field-label">Target Amount</span>
          <div className="v-dream-fund-v0__field-input-wrap">
            <span className="v-dream-fund-v0__field-prefix">¥</span>
            <input
              className="v-dream-fund-v0__field-input v-dream-fund-v0__field-input--prefixed"
              inputMode="numeric"
              value={formatYenInput(targetAmount)}
              onChange={(event) =>
                onTargetAmountChange(
                  Number.parseInt(event.target.value.replace(/\D/g, ""), 10) || 0,
                )
              }
              placeholder="300,000"
            />
          </div>
        </label>
      </>
    );
  }

  if (stepId === "emergency-why") {
    return (
      <>
        <div>
          <h1 className="v-dream-fund-v0__title">Why is it important?</h1>
          <p className="v-dream-fund-v0__desc">A safety net keeps your dreams on track.</p>
        </div>
        <div className="v-dream-fund-v0__info-panel">
          <span className="v-dream-fund-v0__info-panel-icon" aria-hidden>
            <Info strokeWidth={2} size={22} />
          </span>
          <ul className="v-dream-fund-v0__info-list">
            <li>Covers surprise expenses without touching dream savings</li>
            <li>Reduces stress when income or bills change</li>
            <li>Helps you stay consistent with your daily plan</li>
          </ul>
        </div>
      </>
    );
  }

  if (stepId === "emergency-add-now") {
    return (
      <>
        <div>
          <h1 className="v-dream-fund-v0__title">Add to your fund now?</h1>
          <p className="v-dream-fund-v0__desc">You can start with any amount — or set it up later.</p>
        </div>
        <ul className="v-dream-fund-v0__option-list">
          <li>
            <button
              type="button"
              className="v-dream-fund-v0__option v-dream-fund-v0__option--income"
              onClick={() => onChooseAddNow(true)}
            >
              <span className="v-dream-fund-v0__option-icon">
                <Wallet strokeWidth={2} size={20} />
              </span>
              <span>
                <span className="v-dream-fund-v0__option-label">Yes</span>
                <span className="v-dream-fund-v0__option-desc">Add money to your emergency fund now</span>
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="v-dream-fund-v0__option v-dream-fund-v0__option--income"
              onClick={() => onChooseAddNow(false)}
            >
              <span className="v-dream-fund-v0__option-icon">
                <Clock strokeWidth={2} size={20} />
              </span>
              <span>
                <span className="v-dream-fund-v0__option-label">Later</span>
                <span className="v-dream-fund-v0__option-desc">Remind me later from settings</span>
              </span>
            </button>
          </li>
        </ul>
      </>
    );
  }

  if (stepId === "emergency-amount") {
    return (
      <>
        <div>
          <h1 className="v-dream-fund-v0__title">Enter amount</h1>
          <p className="v-dream-fund-v0__desc">How much would you like to add today?</p>
        </div>
        <label className="v-dream-fund-v0__field">
          <span className="v-dream-fund-v0__field-label">Amount</span>
          <div className="v-dream-fund-v0__field-input-wrap">
            <span className="v-dream-fund-v0__field-prefix">¥</span>
            <input
              className="v-dream-fund-v0__field-input v-dream-fund-v0__field-input--prefixed"
              inputMode="numeric"
              value={formatYenInput(depositAmount)}
              onChange={(event) =>
                onDepositAmountChange(
                  Number.parseInt(event.target.value.replace(/\D/g, ""), 10) || 0,
                )
              }
              placeholder="50,000"
            />
          </div>
        </label>
      </>
    );
  }

  if (stepId === "emergency-later") {
    return (
      <section className="v-dream-fund-v0__success v-dream-fund-v0__flow-success">
        <div className="v-dream-fund-v0__success-icon" aria-hidden>
          <Clock strokeWidth={2.5} size={28} />
        </div>
        <div>
          <h1 className="v-dream-fund-v0__success-title">Remind me later</h1>
          <p className="v-dream-fund-v0__success-desc">
            No problem — you can add to your emergency fund anytime from Money or Profile settings.
          </p>
        </div>
      </section>
    );
  }

  if (stepId === "emergency-success") {
    return (
      <section className="v-dream-fund-v0__success v-dream-fund-v0__flow-success">
        <div className="v-dream-fund-v0__success-icon" aria-hidden>
          <Shield strokeWidth={2.5} size={28} />
        </div>
        <div>
          <h1 className="v-dream-fund-v0__success-title">Emergency Fund Set</h1>
          <p className="v-dream-fund-v0__success-desc">
            Your safety net is ready. Dream Fund will factor it into your daily plan.
          </p>
        </div>
        {targetAmount > 0 ? (
          <article className="v-dream-fund-v0__review-card v-dream-fund-v0__success-card">
            <div className="v-dream-fund-v0__review-image v-dream-fund-v0__review-image--icon" aria-hidden>
              <PiggyBank strokeWidth={2} size={32} />
            </div>
            <div>
              <h2 className="v-dream-fund-v0__review-title">Emergency Fund</h2>
              <span className="v-dream-fund-v0__badge">Safety net</span>
            </div>
            <dl className="v-dream-fund-v0__review-rows">
              <div className="v-dream-fund-v0__review-row">
                <dt>Target</dt>
                <dd>¥ {targetAmount.toLocaleString("en-US")}</dd>
              </div>
              {depositAmount > 0 ? (
                <div className="v-dream-fund-v0__review-row">
                  <dt>Saved today</dt>
                  <dd>¥ {depositAmount.toLocaleString("en-US")}</dd>
                </div>
              ) : null}
            </dl>
          </article>
        ) : null}
      </section>
    );
  }

  return null;
}

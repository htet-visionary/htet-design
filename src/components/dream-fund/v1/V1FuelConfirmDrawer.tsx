"use client";

import { ArrowRight, Clover } from "lucide-react";
import {
  dreamFundV1CurrencySymbol,
  formatDreamFundV1Amount,
  type DreamFundV1Currency,
} from "@/lib/dream-fund-v1-capture-data";
import { calcProgress } from "@/lib/dream-fund-app-utils";

type V1FuelConfirmDrawerProps = {
  dreamName: string;
  photoUrl?: string | null;
  emoji?: string;
  currency: DreamFundV1Currency;
  fuelAmount: number;
  savedAmount: number;
  targetAmount: number;
  onConfirm: () => void;
  onClose: () => void;
  onSmartSplit?: () => void;
};

function formatV1Money(amount: number, currency: DreamFundV1Currency): string {
  const formatted = formatDreamFundV1Amount(amount, currency);
  return `${dreamFundV1CurrencySymbol(currency)} ${formatted || "0"}`;
}

export function V1FuelConfirmDrawer({
  dreamName,
  photoUrl,
  emoji = "✨",
  currency,
  fuelAmount,
  savedAmount,
  targetAmount,
  onConfirm,
  onClose,
  onSmartSplit,
}: V1FuelConfirmDrawerProps) {
  const nextSaved = Math.min(targetAmount, savedAmount + fuelAmount);
  const currentProgress = calcProgress(savedAmount, targetAmount);
  const nextProgress = calcProgress(nextSaved, targetAmount);
  const targetLabel = formatV1Money(targetAmount, currency);

  return (
    <div
      className="v-dream-fund-v1__drawer-stage v-dream-fund-v1__drawer-stage--confirm"
      role="presentation"
    >
      <button
        type="button"
        className="v-dream-fund-v1__drawer-scrim"
        onClick={onClose}
        aria-label="Close"
      />
      <div
        className="v-dream-fund-v1__drawer v-dream-fund-v1__drawer--confirm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="v1-fuel-confirm-title"
      >
        <div className="v-dream-fund-v1__drawer-handle" aria-hidden />

        <div className="v-dream-fund-v1__fuel-confirm-head">
          <Clover className="v-dream-fund-v1__fuel-confirm-clover" strokeWidth={2} aria-hidden />
          <h2 id="v1-fuel-confirm-title" className="v-dream-fund-v1__fuel-confirm-heading">
            Your dream grows!
          </h2>
        </div>

        <div className="v-dream-fund-v1__fuel-confirm-card">
          <div className="v-dream-fund-v1__fuel-confirm-dream">
            <span className="v-dream-fund-v1__fuel-confirm-avatar" aria-hidden>
              {photoUrl ? (
                <img src={photoUrl} alt="" className="v-dream-fund-v1__fuel-confirm-avatar-image" />
              ) : (
                <span className="v-dream-fund-v1__fuel-confirm-avatar-emoji">{emoji}</span>
              )}
            </span>
            <span className="v-dream-fund-v1__fuel-confirm-dream-name">{dreamName}</span>
          </div>

          <div className="v-dream-fund-v1__fuel-confirm-compare">
            <div className="v-dream-fund-v1__fuel-confirm-stat">
              <span className="v-dream-fund-v1__fuel-confirm-stat-value">{currentProgress}%</span>
              <span className="v-dream-fund-v1__fuel-confirm-stat-label">Before</span>
            </div>
            <ArrowRight
              className="v-dream-fund-v1__fuel-confirm-arrow"
              strokeWidth={2}
              size={18}
              aria-hidden
            />
            <div className="v-dream-fund-v1__fuel-confirm-stat">
              <span className="v-dream-fund-v1__fuel-confirm-stat-value v-dream-fund-v1__fuel-confirm-stat-value--after">
                {nextProgress}%
              </span>
              <span className="v-dream-fund-v1__fuel-confirm-stat-label">After</span>
            </div>
          </div>

          <div className="v-dream-fund-v1__fuel-confirm-divider" aria-hidden />

          <p className="v-dream-fund-v1__fuel-confirm-added">
            + {formatV1Money(fuelAmount, currency)} Added
          </p>

          <div className="v-dream-fund-v1__fuel-confirm-progress">
            <div className="v-dream-fund-v1__fuel-confirm-totals">
              <span className="v-dream-fund-v1__fuel-confirm-totals-saved">
                {formatV1Money(savedAmount, currency)}
              </span>
              <span className="v-dream-fund-v1__fuel-confirm-totals-next">
                = {formatV1Money(nextSaved, currency)}
              </span>
            </div>

            <div
              className="v-dream-fund-v1__fuel-confirm-bar"
              role="progressbar"
              aria-valuenow={nextProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="v-dream-fund-v1__fuel-confirm-bar-fill"
                style={{ width: `${nextProgress}%` }}
              />
            </div>

            <div className="v-dream-fund-v1__fuel-confirm-target-row">
              <span className="v-dream-fund-v1__fuel-confirm-target">of {targetLabel}</span>
              <span className="v-dream-fund-v1__fuel-confirm-target">of {targetLabel}</span>
            </div>
          </div>
        </div>

        <div className="v-dream-fund-v1__fuel-confirm-actions">
          <button
            type="button"
            className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green v-dream-fund-v1__fuel-confirm-save"
            onClick={onConfirm}
          >
            <span className="v-cmp-btn__label">Save</span>
          </button>
          <button
            type="button"
            className="v-cmp-btn v-cmp-btn--md v-cmp-btn--secondary-green v-dream-fund-v1__fuel-confirm-split"
            onClick={onSmartSplit ?? onClose}
          >
            <span className="v-cmp-btn__label">Smart Allocation Instead</span>
          </button>
          <button type="button" className="v-dream-fund-v1__fuel-confirm-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

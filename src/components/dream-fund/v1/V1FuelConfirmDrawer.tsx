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
  return `${dreamFundV1CurrencySymbol(currency)} ${formatDreamFundV1Amount(amount, currency)}`;
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
  const addedProgress = Math.max(0, nextProgress - currentProgress);

  return (
    <div
      className="v-dream-fund-v1__drawer-stage v-dream-fund-v1__drawer-stage--modal"
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
        <Clover className="v-dream-fund-v1__fuel-confirm-clover" strokeWidth={1.75} aria-hidden />

        <h2 id="v1-fuel-confirm-title" className="v-dream-fund-v1__fuel-confirm-heading">
          Your dream grows!
        </h2>

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

          <p className="v-dream-fund-v1__fuel-confirm-added">
            + {formatV1Money(fuelAmount, currency)} Added
          </p>

          <div className="v-dream-fund-v1__fuel-confirm-totals">
            <span>{formatV1Money(savedAmount, currency)}</span>
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
              className="v-dream-fund-v1__fuel-confirm-bar-saved"
              style={{ width: `${currentProgress}%` }}
            />
            <div
              className="v-dream-fund-v1__fuel-confirm-bar-added"
              style={{ width: `${addedProgress}%` }}
            />
          </div>

          <div className="v-dream-fund-v1__fuel-confirm-targets">
            <span>of {formatV1Money(targetAmount, currency)}</span>
            <span>of {formatV1Money(targetAmount, currency)}</span>
          </div>
        </div>

        <div className="v-dream-fund-v1__fuel-confirm-actions">
          <button
            type="button"
            className="v-dream-fund-v1__fuel-confirm-btn v-dream-fund-v1__fuel-confirm-btn--save"
            onClick={onConfirm}
          >
            Save
          </button>
          <button
            type="button"
            className="v-dream-fund-v1__fuel-confirm-btn v-dream-fund-v1__fuel-confirm-btn--split"
            onClick={onSmartSplit ?? onClose}
          >
            Smart Allocation Instead
          </button>
          <button type="button" className="v-dream-fund-v1__fuel-confirm-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

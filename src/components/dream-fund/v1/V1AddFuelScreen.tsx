"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { DreamFundGoal } from "@/lib/dream-fund-app-data";
import {
  FUEL_SOURCE_OPTIONS,
  type FuelSource,
  type V1DreamDisplayMeta,
} from "@/lib/dream-fund-v1-capture-data";
import { V1AppChrome } from "@/components/dream-fund/v1/V1AppChrome";
import { V1FuelAmountField } from "@/components/dream-fund/v1/V1FuelAmountField";
import { V1FuelConfirmDrawer } from "@/components/dream-fund/v1/V1FuelConfirmDrawer";

type V1AddFuelScreenProps = {
  goal: DreamFundGoal;
  meta: V1DreamDisplayMeta;
  fuelAmount: number;
  confirmOpen: boolean;
  onFuelAmountChange: (amount: number) => void;
  onConfirmOpenChange: (open: boolean) => void;
  onBack: () => void;
  onConfirmFuel: () => void;
  onSmartSplit?: () => void;
};

export function V1AddFuelScreen({
  goal,
  meta,
  fuelAmount,
  confirmOpen,
  onFuelAmountChange,
  onConfirmOpenChange,
  onBack,
  onConfirmFuel,
  onSmartSplit,
}: V1AddFuelScreenProps) {
  const [source, setSource] = useState<FuelSource>("Cash");
  const [note, setNote] = useState("");

  return (
    <>
      <V1AppChrome
        variant="flow"
        title="Add Fuel"
        onBack={onBack}
        mainClassName="v-dream-fund-v1__main--add-fuel"
        footer={
          <>
            <button
              type="button"
              className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
              disabled={fuelAmount <= 0}
              onClick={() => onConfirmOpenChange(true)}
            >
              <span className="v-cmp-btn__label">Continue</span>
            </button>
            <p className="v-dream-fund-v1__fuel-footer-note">
              You&apos;re one step close to your dream. 🍀
            </p>
          </>
        }
      >
        <div className="v-dream-fund-v1__add-fuel-intro">
          <h2 className="v-dream-fund-v1__add-fuel-title">
            How much will you fuel your dream today?
          </h2>
          <p className="v-dream-fund-v1__add-fuel-desc">It all adds up.</p>
        </div>

        <div className="v-dream-fund-v1__add-fuel-form">
          <label className="v-dream-fund-v1__field">
            <span className="v-dream-fund-v1__field-label">Amount</span>
            <V1FuelAmountField
              currency={meta.currency}
              amount={fuelAmount}
              onAmountChange={onFuelAmountChange}
            />
          </label>

          <label className="v-dream-fund-v1__field">
            <span className="v-dream-fund-v1__field-label">Money Source (Optional)</span>
            <div className="v-dream-fund-v1__select-wrap">
              <select
                className="v-dream-fund-v1__field-input v-dream-fund-v1__field-select"
                value={source}
                onChange={(event) => setSource(event.target.value as FuelSource)}
              >
                {FUEL_SOURCE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown
                strokeWidth={2}
                size={18}
                className="v-dream-fund-v1__select-chevron"
                aria-hidden
              />
            </div>
          </label>

          <label className="v-dream-fund-v1__field">
            <span className="v-dream-fund-v1__field-label">Note (Optional)</span>
            <textarea
              className="v-dream-fund-v1__field-textarea v-dream-fund-v1__field-textarea--fuel"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Write a note ..."
              rows={4}
            />
          </label>
        </div>
      </V1AppChrome>

      {confirmOpen ? (
        <V1FuelConfirmDrawer
          dreamName={goal.name}
          photoUrl={meta.photoUrl}
          emoji={goal.emoji}
          currency={meta.currency}
          fuelAmount={fuelAmount}
          savedAmount={goal.savedAmount}
          targetAmount={goal.targetAmount}
          onConfirm={onConfirmFuel}
          onClose={() => onConfirmOpenChange(false)}
          onSmartSplit={onSmartSplit}
        />
      ) : null}
    </>
  );
}

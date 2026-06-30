"use client";

import { X } from "lucide-react";
import {
  amountFromPercent,
  clampPercent,
  percentFromAmount,
  type SmartSplitAllocationItem,
} from "@/lib/dream-fund-v1-smart-split";
import {
  dreamFundV1CurrencySymbol,
  formatDreamFundV1Amount,
  type DreamFundV1Currency,
} from "@/lib/dream-fund-v1-capture-data";

type V1AllocationCardProps = {
  item: SmartSplitAllocationItem;
  totalIncome: number;
  currency: DreamFundV1Currency;
  onChange: (next: SmartSplitAllocationItem) => void;
  onRemove: () => void;
};

function parseDigits(raw: string): number {
  const digits = raw.replace(/[^\d]/g, "");
  return digits ? Number.parseInt(digits, 10) : 0;
}

export function V1AllocationCard({ item, totalIncome, currency, onChange, onRemove }: V1AllocationCardProps) {
  const symbol = dreamFundV1CurrencySymbol(currency);

  function handlePercentInput(raw: string) {
    const percent = clampPercent(Number.parseInt(raw.replace(/\D/g, ""), 10) || 0);
    onChange({
      ...item,
      percent,
      amount: amountFromPercent(totalIncome, percent),
    });
  }

  function handleAmountInput(raw: string) {
    const amount = Math.max(0, parseDigits(raw));
    onChange({
      ...item,
      amount,
      percent: percentFromAmount(totalIncome, amount),
    });
  }

  function handleSlider(percent: number) {
    const nextPercent = clampPercent(percent);
    onChange({
      ...item,
      percent: nextPercent,
      amount: amountFromPercent(totalIncome, nextPercent),
    });
  }

  return (
    <article className="v-dream-fund-v1__allocation-card">
      <div className="v-dream-fund-v1__allocation-card-head">
        <span className="v-dream-fund-v1__allocation-card-emoji" aria-hidden>
          {item.emoji}
        </span>
        <h3 className="v-dream-fund-v1__allocation-card-title">{item.label}</h3>
        <button
          type="button"
          className="v-dream-fund-v1__allocation-card-remove"
          onClick={onRemove}
          aria-label={`Remove ${item.label}`}
        >
          <X strokeWidth={2} size={16} aria-hidden />
        </button>
      </div>

      <div className="v-dream-fund-v1__allocation-card-inputs">
        <label className="v-dream-fund-v1__allocation-field">
          <span className="v-dream-fund-v1__allocation-field-label">%</span>
          <input
            className="v-dream-fund-v1__allocation-input v-dream-fund-v1__allocation-input--percent"
            inputMode="numeric"
            value={item.percent}
            onChange={(event) => handlePercentInput(event.target.value)}
            aria-label={`${item.label} percent`}
          />
        </label>

        <label className="v-dream-fund-v1__allocation-field v-dream-fund-v1__allocation-field--amount">
          <span className="v-dream-fund-v1__allocation-field-label">{symbol}</span>
          <input
            className="v-dream-fund-v1__allocation-input v-dream-fund-v1__allocation-input--amount"
            inputMode="numeric"
            value={formatDreamFundV1Amount(item.amount, currency)}
            onChange={(event) => handleAmountInput(event.target.value)}
            aria-label={`${item.label} amount`}
          />
        </label>
      </div>

      <input
        className="v-dream-fund-v1__allocation-slider"
        type="range"
        min={0}
        max={100}
        step={1}
        value={item.percent}
        onChange={(event) => handleSlider(Number(event.target.value))}
        aria-label={`${item.label} allocation slider`}
      />
    </article>
  );
}

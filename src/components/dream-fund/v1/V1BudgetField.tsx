"use client";

import { ChevronDown } from "lucide-react";
import {
  DREAM_FUND_V1_CURRENCIES,
  formatDreamFundV1Amount,
  type DreamFundV1Currency,
} from "@/lib/dream-fund-v1-capture-data";

type V1BudgetFieldProps = {
  currency: DreamFundV1Currency;
  amount: number;
  onCurrencyChange: (currency: DreamFundV1Currency) => void;
  onAmountChange: (amount: number) => void;
};

function parseAmountInput(raw: string): number {
  const digits = raw.replace(/[^\d]/g, "");
  return digits ? Number.parseInt(digits, 10) : 0;
}

export function V1BudgetField({
  currency,
  amount,
  onCurrencyChange,
  onAmountChange,
}: V1BudgetFieldProps) {
  return (
    <div className="v-dream-fund-v1__budget-row">
      <div className="v-dream-fund-v1__currency-wrap">
        <select
          className="v-dream-fund-v1__currency-select"
          value={currency}
          onChange={(event) => onCurrencyChange(event.target.value as DreamFundV1Currency)}
          aria-label="Currency"
        >
          {DREAM_FUND_V1_CURRENCIES.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          strokeWidth={2}
          size={16}
          className="v-dream-fund-v1__currency-chevron"
          aria-hidden
        />
      </div>
      <input
        className="v-dream-fund-v1__budget-input"
        inputMode="numeric"
        value={formatDreamFundV1Amount(amount, currency)}
        placeholder="0"
        onChange={(event) => onAmountChange(parseAmountInput(event.target.value))}
        onFocus={(event) => {
          if (amount === 0) {
            event.currentTarget.select();
          }
        }}
        aria-label="Target budget"
      />
    </div>
  );
}

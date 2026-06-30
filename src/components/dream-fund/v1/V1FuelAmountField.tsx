"use client";

import {
  dreamFundV1CurrencyLabel,
  formatDreamFundV1Amount,
  type DreamFundV1Currency,
} from "@/lib/dream-fund-v1-capture-data";

type V1FuelAmountFieldProps = {
  currency: DreamFundV1Currency;
  amount: number;
  onAmountChange: (amount: number) => void;
};

function parseAmountInput(raw: string): number {
  const digits = raw.replace(/[^\d]/g, "");
  return digits ? Number.parseInt(digits, 10) : 0;
}

export function V1FuelAmountField({ currency, amount, onAmountChange }: V1FuelAmountFieldProps) {
  return (
    <div className="v-dream-fund-v1__fuel-row">
      <input
        className="v-dream-fund-v1__fuel-input"
        inputMode="numeric"
        value={formatDreamFundV1Amount(amount, currency)}
        placeholder="0"
        onChange={(event) => onAmountChange(parseAmountInput(event.target.value))}
        onFocus={(event) => {
          if (amount === 0) {
            event.currentTarget.select();
          }
        }}
        aria-label="Fuel amount"
      />
      <span className="v-dream-fund-v1__fuel-currency">{dreamFundV1CurrencyLabel(currency)}</span>
    </div>
  );
}

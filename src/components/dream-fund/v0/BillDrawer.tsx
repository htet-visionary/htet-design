"use client";

import { CalendarDays } from "lucide-react";
import {
  BILL_FREQUENCY_OPTIONS,
  formatYenInput,
  type BillDraft,
  type BillFrequency,
} from "@/lib/dream-fund-v0-bills-data";

type BillDrawerProps = {
  draft: BillDraft;
  onDraftChange: (patch: Partial<BillDraft>) => void;
  onConfirm: () => void;
  onClose: () => void;
};

function formatDisplayDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BillDrawer({ draft, onDraftChange, onConfirm, onClose }: BillDrawerProps) {
  const canSave =
    draft.name.trim().length > 0 && draft.amount > 0 && Boolean(draft.dueDate);

  return (
    <div className="v-dream-fund-v0__drawer-stage" role="presentation">
      <button type="button" className="v-dream-fund-v0__drawer-scrim" onClick={onClose} aria-label="Close" />
      <div
        className="v-dream-fund-v0__drawer v-dream-fund-v0__drawer--form"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bill-drawer-title"
      >
        <div>
          <h2 id="bill-drawer-title" className="v-dream-fund-v0__drawer-title">
            Add a bill
          </h2>
          <p className="v-dream-fund-v0__drawer-desc">
            Keep track of what you need to pay and when — so nothing catches you off guard.
          </p>
        </div>

        <label className="v-dream-fund-v0__field">
          <span className="v-dream-fund-v0__field-label">Bill name</span>
          <input
            className="v-dream-fund-v0__field-input"
            value={draft.name}
            onChange={(event) => onDraftChange({ name: event.target.value })}
            placeholder="e.g. Rent, Electricity"
            autoFocus
          />
        </label>

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
              placeholder="95,000"
            />
          </div>
        </label>

        <label className="v-dream-fund-v0__field">
          <span className="v-dream-fund-v0__field-label">How often does this come up?</span>
          <select
            className="v-dream-fund-v0__field-input v-dream-fund-v0__field-select"
            value={draft.frequency}
            onChange={(event) =>
              onDraftChange({ frequency: event.target.value as BillFrequency })
            }
          >
            {BILL_FREQUENCY_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="v-dream-fund-v0__field">
          <span className="v-dream-fund-v0__field-label">Next payment date</span>
          <div className="v-dream-fund-v0__field-trigger v-dream-fund-v0__field-trigger--static">
            <CalendarDays strokeWidth={2} size={18} aria-hidden />
            <input
              className="v-dream-fund-v0__field-date-input"
              type="date"
              value={draft.dueDate}
              onChange={(event) => onDraftChange({ dueDate: event.target.value })}
            />
          </div>
          {draft.dueDate ? (
            <p className="v-dream-fund-v0__field-hint">{formatDisplayDate(draft.dueDate)}</p>
          ) : null}
        </label>

        <button
          type="button"
          className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
          disabled={!canSave}
          onClick={onConfirm}
        >
          <span className="v-cmp-btn__label">Save</span>
        </button>
      </div>
    </div>
  );
}

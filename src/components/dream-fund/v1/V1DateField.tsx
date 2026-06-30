"use client";

import { CalendarDays } from "lucide-react";
import { useRef } from "react";

type V1DateFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

function formatDateDisplay(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");

  if (!year || !month || !day) {
    return "";
  }

  return `${year}/${month}/${day}`;
}

export function V1DateField({ value, onChange }: V1DateFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function openPicker() {
    const input = inputRef.current;

    if (!input) {
      return;
    }

    input.focus();

    if (typeof input.showPicker === "function") {
      input.showPicker();
    }
  }

  return (
    <label className="v-dream-fund-v1__date-row">
      <CalendarDays
        strokeWidth={2}
        size={20}
        className="v-dream-fund-v1__date-icon"
        aria-hidden
      />
      <span
        className={[
          "v-dream-fund-v1__date-display",
          value ? "" : "v-dream-fund-v1__date-display--placeholder",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {value ? formatDateDisplay(value) : "yyyy/mm/dd"}
      </span>
      <input
        ref={inputRef}
        className="v-dream-fund-v1__date-input"
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onClick={openPicker}
        aria-label="Set your target date"
      />
    </label>
  );
}

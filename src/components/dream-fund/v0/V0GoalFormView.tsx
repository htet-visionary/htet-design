"use client";

import { CalendarDays } from "lucide-react";
import { useState } from "react";
import type { DreamFundGoal } from "@/lib/dream-fund-app-data";

export type GoalFormValues = {
  name: string;
  targetAmount: number;
  targetDate: string;
  monthlyAllocation: number;
  priority: DreamFundGoal["priority"];
  emoji: string;
};

const PRIORITY_OPTIONS: DreamFundGoal["priority"][] = ["high", "medium", "low"];

type V0GoalFormViewProps = {
  mode: "add" | "edit";
  initialValues?: Partial<GoalFormValues>;
  onSubmit: (values: GoalFormValues) => void;
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

export function createEmptyGoalFormValues(): GoalFormValues {
  return {
    name: "",
    targetAmount: 0,
    targetDate: "",
    monthlyAllocation: 0,
    priority: "medium",
    emoji: "✨",
  };
}

export function V0GoalFormView({ mode, initialValues, onSubmit }: V0GoalFormViewProps) {
  const [values, setValues] = useState<GoalFormValues>({
    ...createEmptyGoalFormValues(),
    ...initialValues,
  });

  const canSubmit =
    values.name.trim().length > 0 && values.targetAmount > 0 && values.monthlyAllocation > 0;

  return (
    <form
      id="v0-goal-form"
      className="v-dream-fund-v0__form-stack"
      onSubmit={(event) => {
        event.preventDefault();

        if (!canSubmit) {
          return;
        }

        onSubmit({
          ...values,
          name: values.name.trim(),
        });
      }}
    >
      <div>
        <h1 className="v-dream-fund-v0__title">
          {mode === "add" ? "What goal are you saving for?" : "Edit your goal"}
        </h1>
        <p className="v-dream-fund-v0__desc">
          {mode === "add"
            ? "Give it a name and set a target so we can help you get there."
            : "Update the details for this goal."}
        </p>
      </div>

      <label className="v-dream-fund-v0__field">
        <span className="v-dream-fund-v0__field-label">Goal name</span>
        <input
          className="v-dream-fund-v0__field-input"
          value={values.name}
          onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
          placeholder="e.g. Trip to Kyoto"
        />
      </label>

      <label className="v-dream-fund-v0__field">
        <span className="v-dream-fund-v0__field-label">Target amount</span>
        <div className="v-dream-fund-v0__field-input-wrap">
          <span className="v-dream-fund-v0__field-prefix">¥</span>
          <input
            className="v-dream-fund-v0__field-input v-dream-fund-v0__field-input--prefixed"
            inputMode="numeric"
            value={formatAmountInput(values.targetAmount)}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                targetAmount: parseAmountInput(event.target.value),
              }))
            }
            placeholder="500,000"
          />
        </div>
      </label>

      <label className="v-dream-fund-v0__field">
        <span className="v-dream-fund-v0__field-label">Target date</span>
        <div className="v-dream-fund-v0__field-trigger v-dream-fund-v0__field-trigger--static">
          <CalendarDays strokeWidth={2} size={18} aria-hidden />
          <input
            className="v-dream-fund-v0__field-date-input"
            type="date"
            value={values.targetDate}
            onChange={(event) =>
              setValues((current) => ({ ...current, targetDate: event.target.value }))
            }
          />
        </div>
      </label>

      <label className="v-dream-fund-v0__field">
        <span className="v-dream-fund-v0__field-label">Monthly allocation</span>
        <div className="v-dream-fund-v0__field-input-wrap">
          <span className="v-dream-fund-v0__field-prefix">¥</span>
          <input
            className="v-dream-fund-v0__field-input v-dream-fund-v0__field-input--prefixed"
            inputMode="numeric"
            value={formatAmountInput(values.monthlyAllocation)}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                monthlyAllocation: parseAmountInput(event.target.value),
              }))
            }
            placeholder="25,000"
          />
        </div>
      </label>

      <fieldset className="v-dream-fund-v0__goal-form-fieldset">
        <legend className="v-dream-fund-v0__field-label">Priority</legend>
        <div className="v-dream-fund-v0__goal-form-priority-row">
          {PRIORITY_OPTIONS.map((priority) => (
            <button
              key={priority}
              type="button"
              className={[
                "v-dream-fund-v0__goal-form-priority",
                values.priority === priority ? "v-dream-fund-v0__goal-form-priority--selected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setValues((current) => ({ ...current, priority }))}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </button>
          ))}
        </div>
      </fieldset>
    </form>
  );
}

export function canSubmitGoalForm(values: GoalFormValues): boolean {
  return values.name.trim().length > 0 && values.targetAmount > 0 && values.monthlyAllocation > 0;
}

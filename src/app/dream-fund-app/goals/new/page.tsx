"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ScreenHeader } from "@/components/dream-fund/app/ScreenHeader";
import {
  dreamFundGoalColors,
  type GoalColor,
} from "@/lib/dream-fund-app-data";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";

export default function DreamFundAddGoalPage() {
  const router = useRouter();
  const { addGoal } = useDreamFundApp();
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [monthlyAllocation, setMonthlyAllocation] = useState("");
  const [color, setColor] = useState<GoalColor>("green");
  const [emoji, setEmoji] = useState("✨");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = Number.parseFloat(targetAmount);
    const monthly = Number.parseFloat(monthlyAllocation);

    if (!name.trim() || !Number.isFinite(target) || !targetDate || !Number.isFinite(monthly)) {
      return;
    }

    addGoal({
      name: name.trim(),
      targetAmount: target,
      targetDate,
      monthlyAllocation: monthly,
      color,
      emoji: emoji.trim() || "✨",
    });

    router.push("/dream-fund-app/goals");
  }

  return (
    <form className="v-dream-fund-app__screen" onSubmit={handleSubmit}>
      <ScreenHeader title="Add Goal" backHref="/dream-fund-app/goals" />

      <label className="v-dream-fund-app__field">
        <span className="v-dream-fund-app__field-label">Goal name</span>
        <input
          className="v-dream-fund-app__field-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="New Watch"
          required
        />
      </label>

      <label className="v-dream-fund-app__field">
        <span className="v-dream-fund-app__field-label">Target amount</span>
        <input
          className="v-dream-fund-app__field-input"
          type="number"
          min="1"
          value={targetAmount}
          onChange={(event) => setTargetAmount(event.target.value)}
          placeholder="1000"
          required
        />
      </label>

      <label className="v-dream-fund-app__field">
        <span className="v-dream-fund-app__field-label">Target date</span>
        <input
          className="v-dream-fund-app__field-input"
          type="date"
          value={targetDate}
          onChange={(event) => setTargetDate(event.target.value)}
          required
        />
      </label>

      <label className="v-dream-fund-app__field">
        <span className="v-dream-fund-app__field-label">Monthly allocation</span>
        <input
          className="v-dream-fund-app__field-input"
          type="number"
          min="1"
          value={monthlyAllocation}
          onChange={(event) => setMonthlyAllocation(event.target.value)}
          placeholder="100"
          required
        />
      </label>

      <div className="v-dream-fund-app__field">
        <span className="v-dream-fund-app__field-label">Goal color</span>
        <div className="v-dream-fund-app__swatches">
          {dreamFundGoalColors.map((option) => (
            <button
              key={option.id}
              type="button"
              className={[
                "v-dream-fund-app__swatch",
                `v-dream-fund-app__swatch--${option.id}`,
                color === option.id ? "v-dream-fund-app__swatch--selected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-label={option.label}
              onClick={() => setColor(option.id)}
            />
          ))}
        </div>
      </div>

      <label className="v-dream-fund-app__field">
        <span className="v-dream-fund-app__field-label">Emoji</span>
        <input
          className="v-dream-fund-app__field-input"
          value={emoji}
          onChange={(event) => setEmoji(event.target.value)}
          maxLength={2}
        />
      </label>

      <button type="submit" className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green">
        <span className="v-cmp-btn__label">Save Goal</span>
      </button>
    </form>
  );
}

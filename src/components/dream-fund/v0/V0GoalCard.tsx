"use client";

import {
  calcProgress,
  formatCurrency,
  formatMonthsLeftFromDate,
} from "@/lib/dream-fund-app-utils";

type V0GoalCardProps = {
  name: string;
  emoji: string;
  savedAmount: number;
  targetAmount: number;
  targetDate?: string;
  currency: string;
  variant?: "list" | "carousel";
  onClick?: () => void;
};

export function V0GoalCard({
  name,
  emoji,
  savedAmount,
  targetAmount,
  targetDate,
  currency,
  variant = "list",
  onClick,
}: V0GoalCardProps) {
  const progress = calcProgress(savedAmount, targetAmount);
  const timeLeft = formatMonthsLeftFromDate(targetDate);

  if (variant === "carousel") {
    return (
      <button type="button" className="v-dream-fund-v0__goal-card" onClick={onClick}>
        <div className="v-dream-fund-v0__goal-card-media" aria-hidden>
          <span className="v-dream-fund-v0__goal-card-emoji">{emoji}</span>
        </div>

        <div className="v-dream-fund-v0__goal-card-body">
          <p className="v-dream-fund-v0__goal-card-name">{name}</p>

          <p className="v-dream-fund-v0__goal-card-amounts">
            {formatCurrency(savedAmount, currency)} / {formatCurrency(targetAmount, currency)}
          </p>

          <div
            className="v-dream-fund-v0__goal-card-progress"
            role="progressbar"
            aria-valuenow={progress}
          >
            <div
              className="v-dream-fund-v0__goal-card-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="v-dream-fund-v0__goal-card-foot">
            <span className="v-dream-fund-v0__goal-card-date">{timeLeft}</span>
            <span className="v-dream-fund-v0__goal-card-percent">{progress}%</span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button type="button" className="v-dream-fund-v0__goal-list-card" onClick={onClick}>
      <div className="v-dream-fund-v0__goal-list-card-media" aria-hidden>
        <span className="v-dream-fund-v0__goal-list-card-emoji">{emoji}</span>
      </div>

      <div className="v-dream-fund-v0__goal-list-card-body">
        <p className="v-dream-fund-v0__goal-list-card-name">{name}</p>

        <div className="v-dream-fund-v0__goal-list-card-amounts">
          <span>
            {formatCurrency(savedAmount, currency)} / {formatCurrency(targetAmount, currency)}
          </span>
          <span>{progress}%</span>
        </div>

        <div
          className="v-dream-fund-v0__goal-list-card-progress"
          role="progressbar"
          aria-valuenow={progress}
        >
          <div
            className="v-dream-fund-v0__goal-list-card-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="v-dream-fund-v0__goal-list-card-time">{timeLeft}</p>
      </div>
    </button>
  );
}

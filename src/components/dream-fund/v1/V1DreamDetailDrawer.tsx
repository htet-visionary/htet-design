"use client";

import { Check, Clover, Plus } from "lucide-react";
import type { DreamFundGoal } from "@/lib/dream-fund-app-data";
import {
  calcProgress,
  formatGoalDeadline,
  formatMonthsLeftFromDate,
} from "@/lib/dream-fund-app-utils";
import { dreamCategoryTone, getDreamCategory } from "@/lib/dream-fund-v1-dream-categories";
import {
  dreamFundV1CurrencySymbol,
  formatDreamFundV1Amount,
  type DreamFundV1Currency,
} from "@/lib/dream-fund-v1-capture-data";

type V1DreamDetailDrawerProps = {
  goal: DreamFundGoal;
  currency: DreamFundV1Currency;
  photoUrl: string;
  isPrimary: boolean;
  harvested?: boolean;
  onAddFuel: () => void;
  onSetPrimary: () => void;
  onClose: () => void;
};

function formatBalance(amount: number, currency: DreamFundV1Currency): string {
  return `${dreamFundV1CurrencySymbol(currency)} ${formatDreamFundV1Amount(amount, currency)}`;
}

function factValue(value: string | undefined): string {
  return value?.trim() ? value.trim() : "—";
}

export function V1DreamDetailDrawer({
  goal,
  currency,
  photoUrl,
  isPrimary,
  harvested = false,
  onAddFuel,
  onSetPrimary,
  onClose,
}: V1DreamDetailDrawerProps) {
  const progress = calcProgress(goal.savedAmount, goal.targetAmount);
  const timelineLabel = formatMonthsLeftFromDate(goal.targetDate);
  const deadlineLabel = formatGoalDeadline(goal.targetDate);
  const categoryLabel = getDreamCategory(goal);
  const categoryTone = dreamCategoryTone(categoryLabel);

  return (
    <div className="v-dream-fund-v1__drawer-stage" role="presentation">
      <button
        type="button"
        className="v-dream-fund-v1__drawer-scrim"
        aria-label="Close dream details"
        onClick={onClose}
      />

      <div
        className="v-dream-fund-v1__drawer v-dream-fund-v1__drawer--dream-detail"
        role="dialog"
        aria-modal="true"
        aria-labelledby="v-dream-detail-title"
      >
        <div className="v-dream-fund-v1__drawer-handle" aria-hidden />

        <div className="v-dream-fund-v1__dream-detail-body">
          <div className="v-dream-fund-v1__dream-detail-hero">
            <img src={photoUrl} alt="" className="v-dream-fund-v1__dream-detail-photo" />
            {harvested ? (
              <span className="v-dream-fund-v1__dream-detail-harvested">Harvested</span>
            ) : null}
          </div>

          <div className="v-dream-fund-v1__dream-detail-head">
            <h2 id="v-dream-detail-title" className="v-dream-fund-v1__dream-detail-title">
              {goal.name}
            </h2>
            <span
              className={[
                "v-dream-fund-v1__dream-detail-tag",
                `v-dream-fund-v1__dream-detail-tag--${categoryTone}`,
              ].join(" ")}
            >
              {categoryLabel}
            </span>
          </div>

          {goal.description ? (
            <p className="v-dream-fund-v1__dream-detail-description">{goal.description}</p>
          ) : null}

          <div className="v-dream-fund-v1__dream-detail-stats">
            <div className="v-dream-fund-v1__dream-detail-stat">
              <span className="v-dream-fund-v1__dream-detail-stat-label">Saved</span>
              <span className="v-dream-fund-v1__dream-detail-stat-value v-dream-fund-v1__dream-detail-stat-value--saved">
                {formatBalance(goal.savedAmount, currency)}
              </span>
            </div>
            <div className="v-dream-fund-v1__dream-detail-stat">
              <span className="v-dream-fund-v1__dream-detail-stat-label">Goal</span>
              <span className="v-dream-fund-v1__dream-detail-stat-value">
                {formatBalance(goal.targetAmount, currency)}
              </span>
            </div>
          </div>

          <div
            className="v-dream-fund-v1__dream-progress v-dream-fund-v1__dream-progress--detail"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${goal.name} progress`}
          >
            <div
              className="v-dream-fund-v1__dream-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="v-dream-fund-v1__dream-detail-progress-meta">
            <span className="v-dream-fund-v1__dream-detail-percent">{progress}%</span>
            <span className="v-dream-fund-v1__dream-detail-time">{timelineLabel}</span>
          </div>

          <dl className="v-dream-fund-v1__dream-detail-facts">
            <div>
              <dt>Target date</dt>
              <dd>{deadlineLabel}</dd>
            </div>
            <div>
              <dt>Money Source</dt>
              <dd>{factValue(goal.source)}</dd>
            </div>
          </dl>

          <div className="v-dream-fund-v1__dream-detail-notes">
            <p className="v-dream-fund-v1__dream-detail-notes-label">Notes</p>
            <p className="v-dream-fund-v1__dream-detail-notes-value">{factValue(goal.notes)}</p>
          </div>

          {!harvested ? (
            <div className="v-dream-fund-v1__dream-detail-actions">
              <button
                type="button"
                className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green v-dream-fund-v1__dream-detail-fuel-btn"
                onClick={() => {
                  onAddFuel();
                  onClose();
                }}
              >
                <span className="v-cmp-btn__icon" aria-hidden>
                  <Plus strokeWidth={2} size={18} />
                </span>
                <span className="v-cmp-btn__label">Add Fuel</span>
              </button>

              <button
                type="button"
                className={[
                  "v-cmp-btn v-cmp-btn--md v-dream-fund-v1__dream-detail-primary-btn",
                  isPrimary ? "v-dream-fund-v1__dream-detail-primary-btn--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={onSetPrimary}
                disabled={isPrimary}
                aria-pressed={isPrimary}
              >
                {isPrimary ? (
                  <span className="v-cmp-btn__icon" aria-hidden>
                    <Check strokeWidth={2.5} size={16} />
                  </span>
                ) : (
                  <span className="v-cmp-btn__icon" aria-hidden>
                    <Clover strokeWidth={2} size={16} />
                  </span>
                )}
                <span className="v-cmp-btn__label">
                  {isPrimary ? "Primary on home" : "Show on home"}
                </span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

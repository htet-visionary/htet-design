"use client";

import { Check, Clover, Plus } from "lucide-react";
import type { DreamFundGoal } from "@/lib/dream-fund-app-data";
import { dreamFundPriorities } from "@/lib/dream-fund-app-data";
import {
  calcProgress,
  formatGoalDeadline,
  formatMonthsLeftFromDate,
} from "@/lib/dream-fund-app-utils";
import {
  dreamFundV1CurrencySymbol,
  formatDreamFundV1Amount,
  type DreamFundV1Currency,
} from "@/lib/dream-fund-v1-capture-data";

const MILESTONES = [25, 50, 75, 100];

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

function priorityLabel(priority: DreamFundGoal["priority"]): string {
  return dreamFundPriorities.find((item) => item.id === priority)?.label ?? priority;
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

        <div className="v-dream-fund-v1__dream-detail-hero">
          <img src={photoUrl} alt="" className="v-dream-fund-v1__dream-detail-photo" />
          <div className="v-dream-fund-v1__dream-detail-hero-scrim" aria-hidden />
          {harvested ? (
            <span className="v-dream-fund-v1__dream-detail-harvested">Harvested</span>
          ) : null}
        </div>

        <div className="v-dream-fund-v1__dream-detail-body">
          <div className="v-dream-fund-v1__dream-detail-head">
            <div className="v-dream-fund-v1__dream-detail-title-wrap">
              {isPrimary && !harvested ? (
                <span className="v-dream-fund-v1__dream-detail-primary" aria-label="Primary dream">
                  <Clover strokeWidth={2.25} size={14} />
                </span>
              ) : null}
              <h2 id="v-dream-detail-title" className="v-dream-fund-v1__dream-detail-title">
                {goal.name}
              </h2>
            </div>
            <span className="v-dream-fund-v1__dream-detail-percent">{progress}%</span>
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

          <div className="v-dream-fund-v1__dream-detail-amounts">
            <span>
              {formatBalance(goal.savedAmount, currency)} /{" "}
              {formatDreamFundV1Amount(goal.targetAmount, currency)}
            </span>
            <span>{timelineLabel}</span>
          </div>

          <section className="v-dream-fund-v1__dream-detail-timeline" aria-label="Milestone timeline">
            <h3 className="v-dream-fund-v1__dream-detail-section-title">Timeline</h3>
            <div className="v-dream-fund-v1__dream-detail-milestones">
              {MILESTONES.map((milestone) => {
                const reached = progress >= milestone;

                return (
                  <div
                    key={milestone}
                    className={[
                      "v-dream-fund-v1__dream-detail-milestone",
                      reached ? "v-dream-fund-v1__dream-detail-milestone--reached" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span className="v-dream-fund-v1__dream-detail-milestone-dot" aria-hidden />
                    <span className="v-dream-fund-v1__dream-detail-milestone-label">{milestone}%</span>
                  </div>
                );
              })}
            </div>
            <dl className="v-dream-fund-v1__dream-detail-facts">
              <div>
                <dt>Target date</dt>
                <dd>{deadlineLabel}</dd>
              </div>
              <div>
                <dt>Time left</dt>
                <dd>{timelineLabel}</dd>
              </div>
              <div>
                <dt>Monthly fuel</dt>
                <dd>{formatBalance(goal.monthlyAllocation, currency)}</dd>
              </div>
              <div>
                <dt>Priority</dt>
                <dd>{priorityLabel(goal.priority)}</dd>
              </div>
            </dl>
          </section>

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
                  "v-cmp-btn v-cmp-btn--md v-cmp-btn--secondary-green v-dream-fund-v1__dream-detail-primary-btn",
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

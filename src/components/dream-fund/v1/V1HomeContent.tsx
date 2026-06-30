"use client";

import { ArrowLeftRight, ChevronRight, Plus } from "lucide-react";
import type { DreamFundGoal } from "@/lib/dream-fund-app-data";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import {
  calcProgress,
  formatMonthsLeftFromDate,
} from "@/lib/dream-fund-app-utils";
import {
  dreamFundV1CurrencySymbol,
  formatDreamFundV1Amount,
  type DreamFundV1Currency,
  type V1DreamDisplayMeta,
} from "@/lib/dream-fund-v1-capture-data";

const MILESTONES = [25, 50, 75, 100];

type V1HomeContentProps = {
  goal: DreamFundGoal;
  meta: V1DreamDisplayMeta;
  onAddFuel: () => void;
};

function formatV1Money(amount: number, currency: DreamFundV1Currency): string {
  return `${dreamFundV1CurrencySymbol(currency)} ${formatDreamFundV1Amount(amount, currency)}`;
}

function nextMilestone(progress: number): number | null {
  if (progress >= 100) {
    return null;
  }

  return MILESTONES.find((milestone) => milestone > progress) ?? null;
}

export function V1HomeContent({ goal, meta, onAddFuel }: V1HomeContentProps) {
  const { availableToSpend } = useDreamFundApp();

  const progress = calcProgress(goal.savedAmount, goal.targetAmount);
  const milestone = nextMilestone(progress);
  const timelineLabel = formatMonthsLeftFromDate(goal.targetDate);

  return (
    <>
      <article className="v-dream-fund-v1__goal-hero">
        <div className="v-dream-fund-v1__goal-hero-back" aria-hidden>
          {meta.photoUrl ? (
            <img src={meta.photoUrl} alt="" className="v-dream-fund-v1__goal-hero-image" />
          ) : (
            <div className="v-dream-fund-v1__goal-hero-placeholder" />
          )}
        </div>

        <div className="v-dream-fund-v1__goal-hero-panel">
          <div className="v-dream-fund-v1__goal-hero-head">
            <div className="v-dream-fund-v1__goal-hero-title-wrap">
              <span className="v-dream-fund-v1__goal-hero-dot" aria-hidden />
              <h2 className="v-dream-fund-v1__goal-hero-title">{goal.name}</h2>
            </div>
            <button
              type="button"
              className="v-dream-fund-v1__goal-hero-swap"
              aria-label="Switch dream"
            >
              <ArrowLeftRight strokeWidth={2} size={18} />
            </button>
          </div>

          <div className="v-dream-fund-v1__goal-hero-progress-row">
            <span className="v-dream-fund-v1__goal-hero-percent">{progress}%</span>
            {milestone ? (
              <span className="v-dream-fund-v1__goal-hero-milestone">
                Next milestone {milestone}%
              </span>
            ) : (
              <span className="v-dream-fund-v1__goal-hero-milestone">Dream complete</span>
            )}
          </div>

          <div
            className="v-dream-fund-v1__dream-progress v-dream-fund-v1__dream-progress--hero"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="v-dream-fund-v1__dream-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="v-dream-fund-v1__goal-hero-meta">
            <span>
              {formatV1Money(goal.savedAmount, meta.currency)} /{" "}
              {formatDreamFundV1Amount(goal.targetAmount, meta.currency)}
            </span>
            <span>{timelineLabel}</span>
          </div>

          <p className="v-dream-fund-v1__goal-hero-encourage">Grow this dream! ♡</p>

          <button
            type="button"
            className="v-dream-fund-v1__goal-hero-fuel-btn"
            onClick={onAddFuel}
          >
            <Plus strokeWidth={2.25} size={20} aria-hidden />
            <span>Add Fuel</span>
          </button>
        </div>
      </article>

      <button type="button" className="v-dream-fund-v1__spend-card">
        <div className="v-dream-fund-v1__spend-card-copy">
          <p className="v-dream-fund-v1__spend-card-label">Safe to spend</p>
          <p className="v-dream-fund-v1__spend-card-amount">
            {formatV1Money(availableToSpend, meta.currency)}
          </p>
          <p className="v-dream-fund-v1__spend-card-tagline">Use it freely. No guilt.</p>
        </div>
        <span className="v-dream-fund-v1__spend-card-action" aria-hidden>
          <ChevronRight strokeWidth={2} size={18} />
        </span>
      </button>
    </>
  );
}

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
import { getDreamCardPhotoUrl } from "@/lib/dream-fund-v1-dream-visuals";

const MILESTONES = [25, 50, 75, 100];

type V1HomeContentProps = {
  goal: DreamFundGoal;
  meta: V1DreamDisplayMeta;
  primaryGoalId?: string;
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

export function V1HomeContent({ goal, meta, primaryGoalId, onAddFuel }: V1HomeContentProps) {
  const { availableToSpend, state } = useDreamFundApp();
  const { emergencyFund } = state;

  const progress = calcProgress(goal.savedAmount, goal.targetAmount);
  const emergencyProgress = calcProgress(emergencyFund.savedAmount, emergencyFund.targetAmount);
  const milestone = nextMilestone(progress);
  const timelineLabel = formatMonthsLeftFromDate(goal.targetDate);
  const showEmergencyFund = emergencyFund.targetAmount > 0;
  const heroPhotoUrl = getDreamCardPhotoUrl(goal, primaryGoalId, meta.photoUrl);

  return (
    <>
      <article className="v-dream-fund-v1__goal-hero">
        <div className="v-dream-fund-v1__goal-hero-back" aria-hidden>
          {heroPhotoUrl ? (
            <img src={heroPhotoUrl} alt="" className="v-dream-fund-v1__goal-hero-image" />
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

          <button
            type="button"
            className="v-cmp-btn v-cmp-btn--md v-cmp-btn--secondary-green v-dream-fund-v1__goal-hero-fuel-btn"
            onClick={onAddFuel}
          >
            <span className="v-cmp-btn__icon" aria-hidden>
              <Plus strokeWidth={2} size={18} />
            </span>
            <span className="v-cmp-btn__label">Add Fuel</span>
          </button>
        </div>
      </article>

      <div className="v-dream-fund-v1__spend-card">
        <div className="v-dream-fund-v1__spend-card-copy">
          <p className="v-dream-fund-v1__spend-card-label">Guilt-free spending</p>
          <p className="v-dream-fund-v1__spend-card-tagline">Use it freely. No guilt.</p>
        </div>
        <p className="v-dream-fund-v1__spend-card-amount">
          {formatV1Money(availableToSpend, meta.currency)}
        </p>
      </div>

      {showEmergencyFund ? (
        <button type="button" className="v-dream-fund-v1__emergency-card">
          <div className="v-dream-fund-v1__emergency-card-copy">
            <p className="v-dream-fund-v1__emergency-card-label">Emergency fund</p>
            <p className="v-dream-fund-v1__emergency-card-amount">
              {formatV1Money(emergencyFund.savedAmount, meta.currency)}
            </p>
            <div
              className="v-dream-fund-v1__emergency-card-progress"
              role="progressbar"
              aria-valuenow={emergencyProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="v-dream-fund-v1__emergency-card-progress-fill"
                style={{ width: `${emergencyProgress}%` }}
              />
            </div>
            <p className="v-dream-fund-v1__emergency-card-meta">
              {emergencyProgress}% of{" "}
              {formatDreamFundV1Amount(emergencyFund.targetAmount, meta.currency)} goal · always
              protected
            </p>
          </div>
          <span className="v-dream-fund-v1__spend-card-action" aria-hidden>
            <ChevronRight strokeWidth={2} size={18} />
          </span>
        </button>
      ) : null}
    </>
  );
}

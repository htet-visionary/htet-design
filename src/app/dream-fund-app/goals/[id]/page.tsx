"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { IllustrationPlaceholder } from "@/components/dream-fund/app/IllustrationPlaceholder";
import { ScreenHeader } from "@/components/dream-fund/app/ScreenHeader";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import {
  calcDaysToGoal,
  calcProgress,
  formatCurrency,
  formatTimeline,
} from "@/lib/dream-fund-app-utils";

export default function DreamFundGoalDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getGoalById, saveableBalance, addGoalSavings, state } = useDreamFundApp();
  const goal = getGoalById(params.id);

  if (!goal) {
    return (
      <div className="v-dream-fund-app__screen">
        <ScreenHeader title="Goal not found" backHref="/dream-fund-app/goals" />
        <p className="v-dream-fund-app__empty">This dream could not be found.</p>
      </div>
    );
  }

  const goalRecord = goal;
  const progress = calcProgress(goalRecord.savedAmount, goalRecord.targetAmount);
  const timelineDays = calcDaysToGoal(
    goalRecord.targetAmount,
    goalRecord.savedAmount,
    saveableBalance,
  );
  const funded = goalRecord.savedAmount >= goalRecord.targetAmount;

  function handleAddMoney() {
    addGoalSavings(goalRecord.id, 50);

    if (goalRecord.savedAmount + 50 >= goalRecord.targetAmount) {
      router.push("/dream-fund-app/achievement");
    }
  }

  return (
    <div className="v-dream-fund-app__screen">
      <ScreenHeader title={goalRecord.name} backHref="/dream-fund-app/goals" />

      <IllustrationPlaceholder variant="hero" label={`${goalRecord.name} product image placeholder`} />

      <article className="v-dream-fund-app__stat">
        <p className="v-dream-fund-app__stat-label">Target</p>
        <p className="v-dream-fund-app__stat-value">{formatCurrency(goalRecord.targetAmount)}</p>
      </article>

      <div className="v-dream-fund-app__stat-grid">
        <article className="v-dream-fund-app__stat">
          <p className="v-dream-fund-app__stat-label">Monthly allocation</p>
          <p className="v-dream-fund-app__stat-value">{formatCurrency(goalRecord.monthlyAllocation)}</p>
        </article>
        <article className="v-dream-fund-app__stat">
          <p className="v-dream-fund-app__stat-label">Deadline</p>
          <p className="v-dream-fund-app__stat-value">
            {new Date(goalRecord.targetDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </article>
      </div>

      <div className="v-dream-fund-app__progress">
        <div className="v-dream-fund-app__progress-track" role="progressbar" aria-valuenow={progress}>
          <div className="v-dream-fund-app__progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="v-dream-fund-app__progress-labels">
          <span>{formatCurrency(goalRecord.savedAmount)} saved</span>
          <span>{formatTimeline(timelineDays)} left</span>
        </div>
      </div>

      {!funded ? (
        <button
          type="button"
          className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
          onClick={handleAddMoney}
        >
          <span className="v-cmp-btn__label">Add Money</span>
        </button>
      ) : (
        <Link href="/dream-fund-app/achievement" className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green">
          <span className="v-cmp-btn__label">View achievement</span>
        </Link>
      )}

      {state.lastAchievedGoalId === goalRecord.id ? (
        <p className="v-dream-fund-app__hero-note">Goal achieved — celebrate your progress.</p>
      ) : null}
    </div>
  );
}

"use client";

import Link from "next/link";
import { IllustrationPlaceholder } from "@/components/dream-fund/app/IllustrationPlaceholder";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";

export default function DreamFundAchievementPage() {
  const { state, getGoalById, setLastAchievedGoal } = useDreamFundApp();
  const goal =
    (state.lastAchievedGoalId ? getGoalById(state.lastAchievedGoalId) : null) ??
    state.goals.find((item) => item.savedAmount >= item.targetAmount) ??
    state.goals[0];

  return (
    <div className="v-dream-fund-app__achievement">
      <IllustrationPlaceholder variant="square" label="Achievement trophy illustration placeholder" />

      <div>
        <h1 className="v-dream-fund-app__achievement-title">Goal Achieved!</h1>
        <p className="v-dream-fund-app__achievement-desc">
          {goal ? `${goal.name} is fully funded.` : "Your dream is fully funded."}
        </p>
      </div>

      <Link
        href="/dream-fund-app/goals"
        className="v-cmp-btn v-cmp-btn--md v-cmp-btn--secondary-green"
        onClick={() => setLastAchievedGoal(null)}
      >
        <span className="v-cmp-btn__label">Back to goals</span>
      </Link>
    </div>
  );
}

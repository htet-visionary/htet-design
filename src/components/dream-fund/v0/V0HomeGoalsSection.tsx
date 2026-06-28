"use client";

import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import { V0GoalCard } from "@/components/dream-fund/v0/V0GoalCard";

type V0HomeGoalsSectionProps = {
  onViewAll: () => void;
  onSelectGoal: (goalId: string) => void;
};

export function V0HomeGoalsSection({ onViewAll, onSelectGoal }: V0HomeGoalsSectionProps) {
  const { state } = useDreamFundApp();
  const currency = state.settings.currency;

  const activeGoals = state.goals.filter((goal) => goal.savedAmount < goal.targetAmount);

  if (activeGoals.length === 0) {
    return null;
  }

  return (
    <section className="v-dream-fund-v0__home-goals" aria-labelledby="v0-home-goals">
      <div className="v-dream-fund-v0__home-goals-head">
        <h2 id="v0-home-goals" className="v-dream-fund-v0__home-panel-title">
          My Goals
        </h2>
        <button type="button" className="v-dream-fund-v0__home-goals-view-all" onClick={onViewAll}>
          See all
        </button>
      </div>

      <ul className="v-dream-fund-v0__home-goals-list">
        {activeGoals.map((goal) => (
          <li key={goal.id}>
            <V0GoalCard
              name={goal.name}
              emoji={goal.emoji}
              savedAmount={goal.savedAmount}
              targetAmount={goal.targetAmount}
              targetDate={goal.targetDate}
              currency={currency}
              onClick={() => onSelectGoal(goal.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

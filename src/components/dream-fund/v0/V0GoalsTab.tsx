"use client";

import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import { V0GoalCard } from "@/components/dream-fund/v0/V0GoalCard";
import { V0EmptyState } from "@/components/dream-fund/v0/V0FlowScreen";

type V0GoalsTabProps = {
  onSelectGoal: (goalId: string) => void;
};

export function V0GoalsTab({ onSelectGoal }: V0GoalsTabProps) {
  const { state } = useDreamFundApp();
  const currency = state.settings.currency;
  const goals = [...state.goals].sort((left, right) => {
    const leftComplete = left.savedAmount >= left.targetAmount;
    const rightComplete = right.savedAmount >= right.targetAmount;

    if (leftComplete !== rightComplete) {
      return leftComplete ? 1 : -1;
    }

    return left.name.localeCompare(right.name);
  });

  return (
    <div className="v-dream-fund-v0__goals-tab">
      {goals.length === 0 ? (
        <V0EmptyState>No goals yet. Tap + to add something you&apos;re saving for.</V0EmptyState>
      ) : (
        <ul className="v-dream-fund-v0__goals-list">
          {goals.map((goal) => (
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
      )}
    </div>
  );
}

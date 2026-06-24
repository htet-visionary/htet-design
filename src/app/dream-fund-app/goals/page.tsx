"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { GoalListCard } from "@/components/dream-fund/app/GoalListCard";
import { IllustrationPlaceholder } from "@/components/dream-fund/app/IllustrationPlaceholder";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import { calcDaysToGoal } from "@/lib/dream-fund-app-utils";

export default function DreamFundGoalsPage() {
  const { state, saveableBalance } = useDreamFundApp();

  if (state.goals.length === 0) {
    return (
      <div className="v-dream-fund-app__flow v-dream-fund-app__flow--center">
        <IllustrationPlaceholder variant="square" label="Empty goals illustration placeholder" />
        <div>
          <h1 className="v-dream-fund-app__flow-title">No dreams yet</h1>
          <p className="v-dream-fund-app__flow-desc">
            Add your first goal and start saving with intention.
          </p>
        </div>
        <Link href="/dream-fund-app/goals/new" className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green">
          <span className="v-cmp-btn__label">Add Your First Goal</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="v-dream-fund-app__screen">
      <header className="v-dream-fund-app__goal-head">
        <div>
          <h1 className="v-dream-fund-app__section-title">Goals</h1>
          <p className="v-dream-fund-app__section-desc">Dream timelines with supportive progress.</p>
        </div>
        <Link href="/dream-fund-app/goals/new" className="v-cmp-btn v-cmp-btn--sm v-cmp-btn--icon-only v-cmp-btn--secondary-green" aria-label="Add goal">
          <span className="v-cmp-btn__icon">
            <Plus strokeWidth={2} size={18} />
          </span>
        </Link>
      </header>

      {state.goals.map((goal) => (
        <GoalListCard
          key={goal.id}
          goal={goal}
          href={`/dream-fund-app/goals/${goal.id}`}
          timelineDays={calcDaysToGoal(goal.targetAmount, goal.savedAmount, saveableBalance)}
        />
      ))}
    </div>
  );
}

"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { GoalListCard } from "@/components/dream-fund/app/GoalListCard";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import { calcDaysToGoal, formatCurrency } from "@/lib/dream-fund-app-utils";

export default function DreamFundHomePage() {
  const { state, safeToSpend, saveableBalance } = useDreamFundApp();

  return (
    <div className="v-dream-fund-app__screen">
      <section className="v-dream-fund-app__hero" aria-labelledby="safe-to-spend">
        <p className="v-dream-fund-app__hero-label" id="safe-to-spend">
          Safe to Spend
        </p>
        <p className="v-dream-fund-app__hero-amount">{formatCurrency(safeToSpend)}</p>
        <p className="v-dream-fund-app__hero-note">
          {formatCurrency(saveableBalance)} saveable this month after must-pay costs and goal
          allocations.
        </p>
      </section>

      <section aria-labelledby="my-goals">
        <div className="v-dream-fund-app__goal-head">
          <div>
            <h2 id="my-goals" className="v-dream-fund-app__section-title">
              My Goals
            </h2>
            <p className="v-dream-fund-app__section-desc">Progress toward your dreams.</p>
          </div>
          <Link href="/dream-fund-app/goals/new" className="v-cmp-btn v-cmp-btn--sm v-cmp-btn--icon-only v-cmp-btn--secondary-green" aria-label="Add goal">
            <span className="v-cmp-btn__icon">
              <Plus strokeWidth={2} size={18} />
            </span>
          </Link>
        </div>

        {state.goals.map((goal) => (
          <GoalListCard
            key={goal.id}
            goal={goal}
            compact
            href={`/dream-fund-app/goals/${goal.id}`}
            timelineDays={calcDaysToGoal(goal.targetAmount, goal.savedAmount, saveableBalance)}
          />
        ))}
      </section>

      <Link href="/dream-fund-app/transactions" className="v-dream-fund-app__menu-link">
        View transactions
      </Link>
    </div>
  );
}

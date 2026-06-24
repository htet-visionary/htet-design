"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoalListCard } from "@/components/dream-fund/app/GoalListCard";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import { calcDaysToGoal } from "@/lib/dream-fund-app-utils";

const subnav = [
  { href: "/dream-fund-app/insights", label: "Overview" },
  { href: "/dream-fund-app/insights/goals", label: "Goals progress" },
  { href: "/dream-fund-app/insights/alerts", label: "Alerts" },
];

export default function DreamFundInsightsGoalsPage() {
  const pathname = usePathname();
  const { state, saveableBalance } = useDreamFundApp();

  return (
    <div className="v-dream-fund-app__screen">
      <header>
        <h1 className="v-dream-fund-app__section-title">Goals progress</h1>
        <p className="v-dream-fund-app__section-desc">Compare momentum across active dreams.</p>
      </header>

      <nav className="v-dream-fund-app__subnav" aria-label="Insights views">
        {subnav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "v-dream-fund-app__subnav-link",
              pathname === item.href ? "v-dream-fund-app__subnav-link--active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {state.goals.map((goal) => (
        <GoalListCard
          key={goal.id}
          goal={goal}
          compact
          href={`/dream-fund-app/goals/${goal.id}`}
          timelineDays={calcDaysToGoal(goal.targetAmount, goal.savedAmount, saveableBalance)}
        />
      ))}
    </div>
  );
}

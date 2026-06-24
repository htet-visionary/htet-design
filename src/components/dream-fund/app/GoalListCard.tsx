import Link from "next/link";
import type { DreamFundGoal } from "@/lib/dream-fund-app-data";
import {
  calcProgress,
  formatCurrency,
  formatTimeline,
} from "@/lib/dream-fund-app-utils";
import { IllustrationPlaceholder } from "@/components/dream-fund/app/IllustrationPlaceholder";

type GoalListCardProps = {
  goal: DreamFundGoal;
  timelineDays: number | null;
  href: string;
  compact?: boolean;
};

export function GoalListCard({ goal, timelineDays, href, compact = false }: GoalListCardProps) {
  const progress = calcProgress(goal.savedAmount, goal.targetAmount);

  return (
    <Link href={href} className="v-dream-fund-app__goal-link">
      <article
        className={[
          "v-dream-fund-app__goal-card",
          `v-dream-fund-app__goal-card--${goal.color}`,
          compact ? "v-dream-fund-app__goal-card--compact" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {!compact ? (
          <IllustrationPlaceholder variant="card" label={`${goal.name} image placeholder`} />
        ) : null}

        <div className="v-dream-fund-app__goal-head">
          <div>
            <h3 className="v-dream-fund-app__goal-title">{goal.name}</h3>
            <p className="v-dream-fund-app__goal-meta">
              {formatCurrency(goal.savedAmount)} / {formatCurrency(goal.targetAmount)} ·{" "}
              {formatTimeline(timelineDays)} left
            </p>
          </div>
          <span className="v-dream-fund-app__goal-emoji" aria-hidden>
            {goal.emoji}
          </span>
        </div>

        <div className="v-dream-fund-app__progress">
          <div
            className="v-dream-fund-app__progress-track"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="v-dream-fund-app__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="v-dream-fund-app__progress-labels">
            <span>{progress}%</span>
            <span>{formatCurrency(goal.monthlyAllocation)}/mo</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

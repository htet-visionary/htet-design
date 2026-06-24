"use client";

import Link from "next/link";
import { IllustrationPlaceholder } from "@/components/dream-fund/app/IllustrationPlaceholder";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import { calcProgress, formatCurrency } from "@/lib/dream-fund-app-utils";

export default function DreamFundPartnerDashboardPage() {
  const { state } = useDreamFundApp();

  return (
    <div className="v-dream-fund-app__screen">
      <header>
        <h1 className="v-dream-fund-app__section-title">Partner dashboard</h1>
        <p className="v-dream-fund-app__section-desc">Shared dreams with combined progress.</p>
      </header>

      {state.partnerGoals.map((goal) => {
        const progress = calcProgress(goal.savedAmount, goal.targetAmount);

        return (
          <article key={goal.id} className="v-dream-fund-app__goal-card">
            <IllustrationPlaceholder variant="card" label={`${goal.name} shared goal placeholder`} />
            <div className="v-dream-fund-app__goal-head">
              <div>
                <h2 className="v-dream-fund-app__goal-title">{goal.name}</h2>
                <p className="v-dream-fund-app__goal-meta">
                  {formatCurrency(goal.savedAmount)} / {formatCurrency(goal.targetAmount)}
                </p>
              </div>
              <div className="v-dream-fund-app__partner-avatars" aria-label="Contributors">
                {goal.contributors.map((name) => (
                  <span key={name} className="v-dream-fund-app__partner-avatar">
                    {name[0]}
                  </span>
                ))}
              </div>
            </div>
            <div className="v-dream-fund-app__progress">
              <div className="v-dream-fund-app__progress-track" role="progressbar" aria-valuenow={progress}>
                <div className="v-dream-fund-app__progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="v-dream-fund-app__progress-labels">
                <span>{progress}% funded</span>
                <span>{goal.contributors.join(" & ")}</span>
              </div>
            </div>
          </article>
        );
      })}

      <Link href="/dream-fund-app/partner" className="v-cmp-btn v-cmp-btn--md v-cmp-btn--secondary-green">
        <span className="v-cmp-btn__label">Invite another partner</span>
      </Link>
    </div>
  );
}

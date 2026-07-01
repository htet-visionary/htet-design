"use client";

import { Clover, Plus } from "lucide-react";
import { useId, useMemo, useState, type CSSProperties } from "react";
import type { DreamFundGoal } from "@/lib/dream-fund-app-data";
import { calcProgress, formatMonthsLeftFromDate } from "@/lib/dream-fund-app-utils";
import {
  dreamFundV1CurrencySymbol,
  formatDreamFundV1Amount,
  type DreamFundV1Currency,
} from "@/lib/dream-fund-v1-capture-data";
import {
  getDreamCardPhotoUrl,
} from "@/lib/dream-fund-v1-dream-visuals";
import { getActiveGoals, sortDreamGoalsForStack } from "@/lib/dream-fund-v1-smart-split";

const MILESTONES = [25, 50, 75, 100];

function nextMilestone(progress: number): number | null {
  if (progress >= 100) {
    return null;
  }

  return MILESTONES.find((milestone) => milestone > progress) ?? null;
}

function getDreamEncouragement(progress: number, harvested: boolean): string {
  if (harvested) {
    return "Harvested — your dream became real.";
  }

  const milestone = nextMilestone(progress);

  if (milestone) {
    return `Next milestone ${milestone}% — keep the momentum.`;
  }

  if (progress >= 75) {
    return "So close now. One more push.";
  }

  if (progress >= 50) {
    return "Past halfway — you're doing this.";
  }

  if (progress > 0) {
    return "Every fuel deposit moves you closer.";
  }

  return "Plant your first fuel to start growing.";
}

type DreamsTab = "active" | "completed";

type V1DreamsScreenProps = {
  goals: DreamFundGoal[];
  currency: DreamFundV1Currency;
  primaryGoalId?: string;
  primaryPhotoUrl?: string | null;
  onAddFuelForGoal: (goalId: string) => void;
};

function formatBalance(amount: number, currency: DreamFundV1Currency): string {
  return `${dreamFundV1CurrencySymbol(currency)} ${formatDreamFundV1Amount(amount, currency)}`;
}

type DreamStackCardProps = {
  goal: DreamFundGoal;
  currency: DreamFundV1Currency;
  isPrimary: boolean;
  photoUrl: string;
  harvested?: boolean;
  onAddFuel: () => void;
};

function DreamStackCard({
  goal,
  currency,
  isPrimary,
  photoUrl,
  harvested = false,
  onAddFuel,
}: DreamStackCardProps) {
  const progress = calcProgress(goal.savedAmount, goal.targetAmount);
  const timelineLabel = formatMonthsLeftFromDate(goal.targetDate);
  const encouragement = getDreamEncouragement(progress, harvested);
  const milestone = nextMilestone(progress);

  return (
    <article
      className={[
        "v-dream-fund-v1__dream-stack-card",
        "v-dream-fund-v1__dream-stack-card--focus",
        harvested ? "v-dream-fund-v1__dream-stack-card--harvested" : "",
      ].join(" ")}
    >
      <div className="v-dream-fund-v1__dream-stack-card-visual" aria-hidden>
        <img src={photoUrl} alt="" className="v-dream-fund-v1__dream-stack-card-photo" />
        <div className="v-dream-fund-v1__dream-stack-card-scrim" />
        {harvested ? (
          <span className="v-dream-fund-v1__dream-stack-card-harvested">Harvested</span>
        ) : null}
      </div>

      <div className="v-dream-fund-v1__dream-stack-card-panel">
        <div className="v-dream-fund-v1__dream-stack-card-head">
          <div className="v-dream-fund-v1__dream-stack-card-title-wrap">
            {isPrimary && !harvested ? (
              <span className="v-dream-fund-v1__dream-stack-card-primary" aria-label="Primary dream">
                <Clover strokeWidth={2.25} size={12} />
              </span>
            ) : (
              <span className="v-dream-fund-v1__dream-stack-card-dot" aria-hidden />
            )}
            <h3 className="v-dream-fund-v1__dream-stack-card-title">{goal.name}</h3>
          </div>
          <span className="v-dream-fund-v1__dream-stack-card-percent">{progress}%</span>
        </div>

        <p className="v-dream-fund-v1__dream-stack-card-encourage">{encouragement}</p>

        <div
          className="v-dream-fund-v1__dream-progress v-dream-fund-v1__dream-progress--stack"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${goal.name} progress`}
        >
          <div
            className="v-dream-fund-v1__dream-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="v-dream-fund-v1__dream-stack-card-meta">
          <span className="v-dream-fund-v1__dream-stack-card-amounts">
            {formatBalance(goal.savedAmount, currency)} /{" "}
            {formatDreamFundV1Amount(goal.targetAmount, currency)}
          </span>
          <span className="v-dream-fund-v1__dream-stack-card-date">{timelineLabel}</span>
        </div>

        {!harvested ? (
          <button
            type="button"
            className="v-cmp-btn v-cmp-btn--md v-cmp-btn--secondary-green v-dream-fund-v1__dream-stack-card-fuel-btn"
            aria-label={`Add fuel to ${goal.name}`}
            onClick={(event) => {
              event.stopPropagation();
              onAddFuel();
            }}
          >
            <span className="v-cmp-btn__icon" aria-hidden>
              <Plus strokeWidth={2} size={16} />
            </span>
            <span className="v-cmp-btn__label">Add Fuel</span>
          </button>
        ) : null}
      </div>
    </article>
  );
}

type V1DreamsStackProps = {
  goals: DreamFundGoal[];
  currency: DreamFundV1Currency;
  primaryGoalId?: string;
  primaryPhotoUrl?: string | null;
  harvested?: boolean;
  onAddFuelForGoal: (goalId: string) => void;
};

function V1DreamsStack({
  goals,
  currency,
  primaryGoalId,
  primaryPhotoUrl,
  harvested = false,
  onAddFuelForGoal,
}: V1DreamsStackProps) {
  const stackId = useId();
  const [expanded, setExpanded] = useState(false);
  const canExpand = goals.length > 1;

  return (
    <ul
      className={[
        "v-dream-fund-v1__dreams-stack",
        expanded ? "v-dream-fund-v1__dreams-stack--expanded" : "",
        canExpand ? "v-dream-fund-v1__dreams-stack--interactive" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--dream-stack-count": goals.length } as CSSProperties}
      aria-expanded={canExpand ? expanded : undefined}
      onClick={canExpand ? () => setExpanded((value) => !value) : undefined}
      onKeyDown={
        canExpand
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setExpanded((value) => !value);
              }
            }
          : undefined
      }
      role={canExpand ? "button" : "list"}
      tabIndex={canExpand ? 0 : undefined}
      aria-label={canExpand ? (expanded ? "Collapse dreams" : "Expand dreams") : undefined}
    >
      {goals.map((goal, index) => (
        <li
          key={goal.id}
          id={`${stackId}-dream-${goal.id}`}
          className="v-dream-fund-v1__dreams-stack-item"
          style={{ "--dream-stack-index": index } as CSSProperties}
          role="listitem"
        >
          <DreamStackCard
            goal={goal}
            currency={currency}
            isPrimary={!harvested && goal.id === primaryGoalId}
            photoUrl={getDreamCardPhotoUrl(goal, primaryGoalId, primaryPhotoUrl)}
            harvested={harvested}
            onAddFuel={() => onAddFuelForGoal(goal.id)}
          />
        </li>
      ))}
    </ul>
  );
}

export function V1DreamsScreen({
  goals,
  currency,
  primaryGoalId,
  primaryPhotoUrl,
  onAddFuelForGoal,
}: V1DreamsScreenProps) {
  const [activeTab, setActiveTab] = useState<DreamsTab>("active");
  const activeGoals = useMemo(() => getActiveGoals(goals), [goals]);
  const completedGoals = useMemo(
    () => goals.filter((goal) => goal.savedAmount >= goal.targetAmount),
    [goals],
  );
  const visibleGoals = useMemo(() => {
    const tabGoals = activeTab === "active" ? activeGoals : completedGoals;
    return sortDreamGoalsForStack(tabGoals);
  }, [activeTab, activeGoals, completedGoals]);

  return (
    <div className="v-dream-fund-v1__dreams">
      <div className="v-dream-fund-v1__dreams-tabs" role="tablist" aria-label="Dream status">
        <button
          type="button"
          role="tab"
          id="v1-dreams-tab-active"
          className={[
            "v-dream-fund-v1__dreams-tab",
            activeTab === "active" ? "v-dream-fund-v1__dreams-tab--active" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-selected={activeTab === "active"}
          onClick={() => setActiveTab("active")}
        >
          Active
        </button>
        <button
          type="button"
          role="tab"
          id="v1-dreams-tab-completed"
          className={[
            "v-dream-fund-v1__dreams-tab",
            activeTab === "completed" ? "v-dream-fund-v1__dreams-tab--active" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-selected={activeTab === "completed"}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
      </div>

      <section
        className="v-dream-fund-v1__dreams-panel"
        role="tabpanel"
        aria-labelledby={activeTab === "active" ? "v1-dreams-tab-active" : "v1-dreams-tab-completed"}
      >
        {visibleGoals.length > 0 ? (
          <V1DreamsStack
            key={activeTab}
            goals={visibleGoals}
            currency={currency}
            primaryGoalId={primaryGoalId}
            primaryPhotoUrl={primaryPhotoUrl}
            harvested={activeTab === "completed"}
            onAddFuelForGoal={onAddFuelForGoal}
          />
        ) : (
          <p className="v-dream-fund-v1__dreams-empty">
            {activeTab === "active"
              ? "No active dreams yet. Plant your first one."
              : "No completed dreams yet. Finish one to see it here."}
          </p>
        )}
      </section>

      <div className="v-dream-fund-v1__dreams-action">
        <button
          type="button"
          className="v-cmp-btn v-cmp-btn--md v-cmp-btn--secondary-green v-dream-fund-v1__dreams-fab"
        >
          <span className="v-cmp-btn__icon" aria-hidden>
            <Plus strokeWidth={2} size={18} />
          </span>
          <span className="v-cmp-btn__label">New Dream</span>
        </button>
      </div>
    </div>
  );
}

"use client";

import { Clover, Plus } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import { V1DreamDetailDrawer } from "@/components/dream-fund/v1/V1DreamDetailDrawer";
import type { DreamFundGoal } from "@/lib/dream-fund-app-data";
import { calcProgress, formatMonthsLeftFromDate } from "@/lib/dream-fund-app-utils";
import {
  dreamFundV1CurrencySymbol,
  formatDreamFundV1Amount,
  type DreamFundV1Currency,
} from "@/lib/dream-fund-v1-capture-data";
import { getDreamCardPhotoUrl } from "@/lib/dream-fund-v1-dream-visuals";
import { getActiveGoals, sortDreamGoalsForStack } from "@/lib/dream-fund-v1-smart-split";

type DreamsTab = "active" | "completed";

type V1DreamsScreenProps = {
  goals: DreamFundGoal[];
  currency: DreamFundV1Currency;
  primaryGoalId?: string;
  primaryPhotoUrl?: string | null;
  onAddFuelForGoal: (goalId: string) => void;
  onSetPrimaryGoal: (goalId: string) => void;
};

function formatBalance(amount: number, currency: DreamFundV1Currency): string {
  const formatted = formatDreamFundV1Amount(amount, currency);
  return `${dreamFundV1CurrencySymbol(currency)} ${formatted || "0"}`;
}

type DreamStackCardProps = {
  goal: DreamFundGoal;
  currency: DreamFundV1Currency;
  isPrimary: boolean;
  harvested?: boolean;
  onOpen: () => void;
};

function DreamStackCard({
  goal,
  currency,
  isPrimary,
  harvested = false,
  onOpen,
}: DreamStackCardProps) {
  const progress = calcProgress(goal.savedAmount, goal.targetAmount);
  const timelineLabel = formatMonthsLeftFromDate(goal.targetDate);

  return (
    <article
      className={[
        "v-dream-fund-v1__dream-stack-card",
        "v-dream-fund-v1__dream-stack-card--focus",
        "v-dream-fund-v1__dream-stack-card--clickable",
        harvested ? "v-dream-fund-v1__dream-stack-card--harvested" : "",
      ].join(" ")}
      role="button"
      tabIndex={0}
      aria-label={`Open ${goal.name} details`}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      {harvested ? (
        <span className="v-dream-fund-v1__dream-stack-card-harvested">Harvested</span>
      ) : null}

      <div className="v-dream-fund-v1__dream-stack-card-glass">
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
          <span className="v-dream-fund-v1__dream-stack-card-percent" aria-hidden>
            <span className="v-dream-fund-v1__dream-stack-card-percent-value">{progress}</span>
            <span className="v-dream-fund-v1__dream-stack-card-percent-symbol">%</span>
          </span>
        </div>

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
            <span className="v-dream-fund-v1__dream-stack-card-amounts-saved">
              {formatBalance(goal.savedAmount, currency)}
            </span>
            <span className="v-dream-fund-v1__dream-stack-card-amounts-target">
              {" / "}
              {formatDreamFundV1Amount(goal.targetAmount, currency)}
            </span>
          </span>
          <span className="v-dream-fund-v1__dream-stack-card-date">{timelineLabel}</span>
        </div>
      </div>
    </article>
  );
}

const STACK_CARD_HEIGHT_PX = 184;
const STACK_COLLAPSED_PEEK_PX = 52;
const STACK_FAN_GAP_PX = 12;

function getStackScrollRange(goalCount: number, panelHeight = 0): number {
  if (goalCount <= 1) {
    return 0;
  }

  const collapsedHeight = STACK_CARD_HEIGHT_PX + STACK_COLLAPSED_PEEK_PX * (goalCount - 1);
  const expandedHeight = STACK_CARD_HEIGHT_PX * goalCount + STACK_FAN_GAP_PX * (goalCount - 1);
  const expansion = Math.max(0, expandedHeight - collapsedHeight);

  return expansion + Math.max(0, panelHeight - collapsedHeight);
}

type V1DreamsStackProps = {
  goals: DreamFundGoal[];
  currency: DreamFundV1Currency;
  primaryGoalId?: string;
  harvested?: boolean;
  expandProgress: number;
  onOpenGoal: (goalId: string) => void;
};

function V1DreamsStack({
  goals,
  currency,
  primaryGoalId,
  harvested = false,
  expandProgress,
  onOpenGoal,
}: V1DreamsStackProps) {
  const stackId = useId();

  return (
    <div className="v-dream-fund-v1__dreams-stack-wrap">
      <ul
        className="v-dream-fund-v1__dreams-stack"
        style={
          {
            "--dream-stack-count": goals.length,
            "--dream-stack-expand": expandProgress,
          } as CSSProperties
        }
        aria-label="Dream cards"
      >
        {goals.map((goal, index) => (
          <li
            key={goal.id}
            id={`${stackId}-dream-${goal.id}`}
            className="v-dream-fund-v1__dreams-stack-item"
            style={{ "--dream-stack-index": index } as CSSProperties}
          >
            <DreamStackCard
              goal={goal}
              currency={currency}
              isPrimary={!harvested && goal.id === primaryGoalId}
              harvested={harvested}
              onOpen={() => onOpenGoal(goal.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function V1DreamsScreen({
  goals,
  currency,
  primaryGoalId,
  primaryPhotoUrl,
  onAddFuelForGoal,
  onSetPrimaryGoal,
}: V1DreamsScreenProps) {
  const [activeTab, setActiveTab] = useState<DreamsTab>("active");
  const [detailGoalId, setDetailGoalId] = useState<string | null>(null);
  const activeGoals = useMemo(() => getActiveGoals(goals), [goals]);
  const completedGoals = useMemo(
    () => goals.filter((goal) => goal.savedAmount >= goal.targetAmount),
    [goals],
  );
  const visibleGoals = useMemo(() => {
    const tabGoals = activeTab === "active" ? activeGoals : completedGoals;
    return sortDreamGoalsForStack(tabGoals);
  }, [activeTab, activeGoals, completedGoals]);

  const detailGoal = detailGoalId ? goals.find((goal) => goal.id === detailGoalId) : undefined;
  const panelRef = useRef<HTMLElement>(null);
  const [stackExpand, setStackExpand] = useState(0);
  const [panelHeight, setPanelHeight] = useState(0);
  const canFanStack = visibleGoals.length > 1;
  const stackScrollRange = getStackScrollRange(visibleGoals.length, panelHeight);

  useEffect(() => {
    setStackExpand(0);
    if (panelRef.current) {
      panelRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const updatePanelHeight = () => {
      setPanelHeight(panel.clientHeight);
    };

    updatePanelHeight();

    const observer = new ResizeObserver(updatePanelHeight);
    observer.observe(panel);

    return () => {
      observer.disconnect();
    };
  }, [activeTab, visibleGoals.length]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !canFanStack || stackScrollRange <= 0) {
      return;
    }

    function handleScroll() {
      const progress = Math.min(1, Math.max(0, panel!.scrollTop / stackScrollRange));
      setStackExpand(progress);
    }

    panel.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      panel.removeEventListener("scroll", handleScroll);
    };
  }, [activeTab, canFanStack, stackScrollRange, visibleGoals.length]);

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
        ref={panelRef}
        className="v-dream-fund-v1__dreams-panel"
        role="tabpanel"
        aria-labelledby={activeTab === "active" ? "v1-dreams-tab-active" : "v1-dreams-tab-completed"}
      >
        {visibleGoals.length > 0 ? (
          <>
            <V1DreamsStack
              key={activeTab}
              goals={visibleGoals}
              currency={currency}
              primaryGoalId={primaryGoalId}
              harvested={activeTab === "completed"}
              expandProgress={stackExpand}
              onOpenGoal={setDetailGoalId}
            />
            {canFanStack ? (
              <div
                className="v-dream-fund-v1__dreams-stack-scroll-spacer"
                style={{ height: stackScrollRange }}
                aria-hidden
              />
            ) : null}
          </>
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

      {detailGoal ? (
        <V1DreamDetailDrawer
          goal={detailGoal}
          currency={currency}
          photoUrl={getDreamCardPhotoUrl(detailGoal, primaryGoalId, primaryPhotoUrl)}
          isPrimary={detailGoal.id === primaryGoalId}
          harvested={detailGoal.savedAmount >= detailGoal.targetAmount}
          onAddFuel={() => onAddFuelForGoal(detailGoal.id)}
          onSetPrimary={() => onSetPrimaryGoal(detailGoal.id)}
          onClose={() => setDetailGoalId(null)}
        />
      ) : null}
    </div>
  );
}

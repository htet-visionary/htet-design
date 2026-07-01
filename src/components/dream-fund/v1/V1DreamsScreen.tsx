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
  onSetPrimaryGoal: (goalId: string) => void;
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
  onOpen: () => void;
};

function DreamStackCard({
  goal,
  currency,
  isPrimary,
  photoUrl,
  harvested = false,
  onOpen,
}: DreamStackCardProps) {
  const progress = calcProgress(goal.savedAmount, goal.targetAmount);
  const timelineLabel = formatMonthsLeftFromDate(goal.targetDate);
  const encouragement = getDreamEncouragement(progress, harvested);

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
      </div>
    </article>
  );
}

const STACK_EXPAND_SCROLL_DISTANCE = 140;

type V1DreamsStackProps = {
  goals: DreamFundGoal[];
  currency: DreamFundV1Currency;
  primaryGoalId?: string;
  primaryPhotoUrl?: string | null;
  harvested?: boolean;
  expandProgress: number;
  onOpenGoal: (goalId: string) => void;
};

function V1DreamsStack({
  goals,
  currency,
  primaryGoalId,
  primaryPhotoUrl,
  harvested = false,
  expandProgress,
  onOpenGoal,
}: V1DreamsStackProps) {
  const stackId = useId();
  const isFanning = expandProgress > 0.28;

  return (
    <div className="v-dream-fund-v1__dreams-stack-wrap">
      <ul
        className={[
          "v-dream-fund-v1__dreams-stack",
          isFanning ? "v-dream-fund-v1__dreams-stack--expanded" : "",
        ]
          .filter(Boolean)
          .join(" ")}
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
              photoUrl={getDreamCardPhotoUrl(goal, primaryGoalId, primaryPhotoUrl)}
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
  const stackExpandRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const [stackExpand, setStackExpand] = useState(0);
  const canFanStack = visibleGoals.length > 1;

  stackExpandRef.current = stackExpand;

  useEffect(() => {
    setStackExpand(0);
    if (panelRef.current) {
      panelRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !canFanStack) {
      return;
    }

    function setExpandFromScroll() {
      const progress = Math.min(1, panel!.scrollTop / STACK_EXPAND_SCROLL_DISTANCE);
      setStackExpand(progress);
    }

    function applyWheelExpand(deltaY: number) {
      if (deltaY === 0) {
        return;
      }

      const atTop = panel!.scrollTop <= 0;
      const current = stackExpandRef.current;

      if (deltaY < 0 && atTop && current > 0) {
        setStackExpand(Math.max(0, current + deltaY / 180));
        return;
      }

      if (deltaY > 0 && atTop && current < 1) {
        const panelFillsViewport = panel!.scrollHeight <= panel!.clientHeight + 1;
        if (panelFillsViewport || current < 1) {
          setStackExpand(Math.min(1, current + deltaY / 180));
        }
      }
    }

    function handleScroll() {
      setExpandFromScroll();
    }

    function handleWheel(event: WheelEvent) {
      const atTop = panel!.scrollTop <= 0;
      const current = stackExpandRef.current;
      const shouldCapture =
        (event.deltaY < 0 && atTop && current > 0) ||
        (event.deltaY > 0 && atTop && current < 1 && panel!.scrollHeight <= panel!.clientHeight + 1);

      if (shouldCapture) {
        event.preventDefault();
        applyWheelExpand(event.deltaY);
      }
    }

    function handleTouchStart(event: TouchEvent) {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    }

    function handleTouchMove(event: TouchEvent) {
      const startY = touchStartYRef.current;
      const currentY = event.touches[0]?.clientY;
      if (startY == null || currentY == null) {
        return;
      }

      const deltaY = startY - currentY;
      const atTop = panel!.scrollTop <= 0;
      const current = stackExpandRef.current;
      const shouldCapture =
        (deltaY < 0 && atTop && current > 0) ||
        (deltaY > 0 && atTop && current < 1 && panel!.scrollHeight <= panel!.clientHeight + 1);

      if (shouldCapture) {
        event.preventDefault();
        applyWheelExpand(deltaY * 0.45);
        touchStartYRef.current = currentY;
      }
    }

    panel.addEventListener("scroll", handleScroll, { passive: true });
    panel.addEventListener("wheel", handleWheel, { passive: false });
    panel.addEventListener("touchstart", handleTouchStart, { passive: true });
    panel.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      panel.removeEventListener("scroll", handleScroll);
      panel.removeEventListener("wheel", handleWheel);
      panel.removeEventListener("touchstart", handleTouchStart);
      panel.removeEventListener("touchmove", handleTouchMove);
    };
  }, [activeTab, canFanStack, visibleGoals.length]);

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
          <V1DreamsStack
            key={activeTab}
            goals={visibleGoals}
            currency={currency}
            primaryGoalId={primaryGoalId}
            primaryPhotoUrl={primaryPhotoUrl}
            harvested={activeTab === "completed"}
            expandProgress={stackExpand}
            onOpenGoal={setDetailGoalId}
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

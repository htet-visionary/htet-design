import type {
  DreamFundEmergencyFund,
  DreamFundGoal,
  DreamPriority,
} from "@/lib/dream-fund-app-data";

export const EMERGENCY_ALLOCATION_ID = "emergency-fund";

const DREAM_PRIORITY_ORDER: Record<DreamPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

function dreamTargetDateSortKey(targetDate?: string): number {
  if (!targetDate) {
    return Number.MAX_SAFE_INTEGER;
  }

  const time = new Date(targetDate).getTime();
  return Number.isNaN(time) ? Number.MAX_SAFE_INTEGER : time;
}

/** Highest priority and nearest target date render on top of the dream stack. */
export function sortDreamGoalsForStack(goals: DreamFundGoal[]): DreamFundGoal[] {
  return [...goals].sort((a, b) => {
    const priorityDiff =
      DREAM_PRIORITY_ORDER[b.priority] - DREAM_PRIORITY_ORDER[a.priority];

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return dreamTargetDateSortKey(b.targetDate) - dreamTargetDateSortKey(a.targetDate);
  });
}

export type SmartSplitAllocationKind = "goal" | "emergency";

export type SmartSplitAllocationItem = {
  id: string;
  kind: SmartSplitAllocationKind;
  label: string;
  emoji: string;
  percent: number;
  amount: number;
};

export function clampPercent(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(value)));
}

export function amountFromPercent(total: number, percent: number): number {
  if (total <= 0 || percent <= 0) {
    return 0;
  }

  return Math.round((total * percent) / 100);
}

export function percentFromAmount(total: number, amount: number): number {
  if (total <= 0 || amount <= 0) {
    return 0;
  }

  return clampPercent((amount / total) * 100);
}

export function getActiveGoals(goals: DreamFundGoal[]): DreamFundGoal[] {
  return goals.filter((goal) => goal.savedAmount < goal.targetAmount);
}

export function goalToAllocationItem(
  goal: DreamFundGoal,
  totalIncome: number,
): SmartSplitAllocationItem {
  const percent =
    totalIncome > 0 ? clampPercent((goal.monthlyAllocation / totalIncome) * 100) : 0;

  return {
    id: goal.id,
    kind: "goal",
    label: goal.name,
    emoji: goal.emoji,
    percent,
    amount: amountFromPercent(totalIncome, percent),
  };
}

export function emergencyToAllocationItem(
  emergencyFund: DreamFundEmergencyFund,
  totalIncome: number,
): SmartSplitAllocationItem {
  const emergencyPercent =
    totalIncome > 0 && emergencyFund.targetAmount > 0
      ? clampPercent(
          ((Math.max(0, emergencyFund.targetAmount - emergencyFund.savedAmount) / 12) /
            totalIncome) *
            100,
        ) || 10
      : 10;

  return {
    id: EMERGENCY_ALLOCATION_ID,
    kind: "emergency",
    label: "Emergency Fund",
    emoji: "🛡️",
    percent: emergencyPercent,
    amount: amountFromPercent(totalIncome, emergencyPercent),
  };
}

export function getInitialSmartSplitSelection(goals: DreamFundGoal[]): {
  goalIds: string[];
  includeEmergency: boolean;
} {
  const activeGoals = getActiveGoals(goals);
  const fundedGoals = activeGoals.filter((goal) => goal.monthlyAllocation > 0);

  return {
    goalIds:
      fundedGoals.length > 0 ? fundedGoals.map((goal) => goal.id) : activeGoals.map((goal) => goal.id),
    includeEmergency: true,
  };
}

export function buildSmartSplitAllocations(
  goals: DreamFundGoal[],
  emergencyFund: DreamFundEmergencyFund,
  totalIncome: number,
  selection?: { goalIds: string[]; includeEmergency: boolean },
): SmartSplitAllocationItem[] {
  const activeGoals = getActiveGoals(goals);
  const initialSelection = selection ?? getInitialSmartSplitSelection(goals);
  const selectedGoalSet = new Set(initialSelection.goalIds);

  const items: SmartSplitAllocationItem[] = activeGoals
    .filter((goal) => selectedGoalSet.has(goal.id))
    .map((goal) => goalToAllocationItem(goal, totalIncome));

  if (initialSelection.includeEmergency) {
    items.push(emergencyToAllocationItem(emergencyFund, totalIncome));
  }

  return items;
}

export function sumAllocationAmounts(items: SmartSplitAllocationItem[]): number {
  return items.reduce((sum, item) => sum + item.amount, 0);
}

export function recalculateAllocationsForTotal(
  items: SmartSplitAllocationItem[],
  totalIncome: number,
): SmartSplitAllocationItem[] {
  return items.map((item) => ({
    ...item,
    amount: amountFromPercent(totalIncome, item.percent),
  }));
}

import type {
  DreamFundEmergencyFund,
  DreamFundGoal,
  DreamFundTransaction,
} from "@/lib/dream-fund-app-data";
import { calcProgress } from "@/lib/dream-fund-app-utils";

export type DreamFundV1InsightsSnapshot = {
  totalAdded: number;
  overallProgress: number;
  completedDreams: number;
  totalDreams: number;
  totalEmergency: number;
};

export type MonthlySavingsChartPoint = {
  label: string;
  amount: number;
  growthRate: number;
};

const CHART_MONTHS = 6;
const DEMO_CHART_REFERENCE_DATE = new Date(2026, 6, 4);

export const INSIGHTS_CHART_YEARS = [2026] as const;

export type InsightsChartYear = (typeof INSIGHTS_CHART_YEARS)[number];

function totalSavings(
  goals: DreamFundGoal[],
  emergencyFund: DreamFundEmergencyFund,
): number {
  const goalsSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  return goalsSaved + emergencyFund.savedAmount;
}

export function formatCompactAmount(amount: number): string {
  const abs = Math.abs(amount);

  if (abs >= 1_000_000) {
    const millions = amount / 1_000_000;
    if (millions >= 10) {
      return `${Math.round(millions)}M`;
    }
    return `${millions.toFixed(2).replace(/\.?0+$/, "")}M`;
  }

  if (abs >= 1_000) {
    return `${Math.round(amount / 1_000)}K`;
  }

  return String(Math.round(amount));
}

export function buildMonthlySavingsChart(
  year: number,
  goals: DreamFundGoal[],
  emergencyFund: DreamFundEmergencyFund,
  referenceDate: Date = DEMO_CHART_REFERENCE_DATE,
): MonthlySavingsChartPoint[] {
  const currentSavings = totalSavings(goals, emergencyFund);
  const referenceYear = referenceDate.getFullYear();
  const referenceMonth = referenceDate.getMonth();
  const startSavings =
    currentSavings > 0 ? Math.max(1, Math.round(currentSavings * 0.077)) : 0;
  const growthBaseline =
    currentSavings > 0 ? Math.max(1, Math.round(currentSavings / 1.74)) : 0;
  const finalGrowthRate =
    growthBaseline > 0
      ? Math.round(((currentSavings - growthBaseline) / growthBaseline) * 100)
      : 0;

  return Array.from({ length: CHART_MONTHS }, (_, index) => {
    const monthIndex =
      year === referenceYear
        ? referenceMonth - (CHART_MONTHS - 1) + index
        : index;
    const monthDate = new Date(year, monthIndex, 1);
    const label = monthDate.toLocaleDateString("en-US", { month: "short" });
    const progress = index / (CHART_MONTHS - 1);
    const easedProgress = progress * progress;
    const ramp = (index + 1) / CHART_MONTHS;
    const amount =
      year === referenceYear
        ? Math.round(startSavings + (currentSavings - startSavings) * easedProgress)
        : 0;
    const growthRate =
      year === referenceYear ? Math.round(finalGrowthRate * ramp * ramp) : 0;

    return { label, amount, growthRate };
  });
}

export function buildDreamFundV1Insights(
  goals: DreamFundGoal[],
  emergencyFund: DreamFundEmergencyFund,
  transactions: DreamFundTransaction[],
): DreamFundV1InsightsSnapshot {
  const totalAdded = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const completedDreams = goals.filter((goal) => goal.savedAmount >= goal.targetAmount).length;

  return {
    totalAdded,
    overallProgress: calcProgress(totalSaved, totalTarget),
    completedDreams,
    totalDreams: goals.length,
    totalEmergency: emergencyFund.savedAmount,
  };
}

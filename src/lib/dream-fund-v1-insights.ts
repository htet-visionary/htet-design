import type { DreamFundGoal, DreamFundTransaction } from "@/lib/dream-fund-app-data";
import { formatMonthsLeftFromDate } from "@/lib/dream-fund-app-utils";

export type DreamFundV1InsightsSnapshot = {
  incomeAdded: number;
  dreamsAchieved: number;
  totalGoals: number;
  achievementRate: number;
  totalSaved: number;
  timelineLabel: string;
};

function sumIncome(transactions: DreamFundTransaction[]): number {
  return transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
}

function sumGoalSavings(goals: DreamFundGoal[]): number {
  return goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
}

function getNearestActiveGoalDate(goals: DreamFundGoal[]): string | undefined {
  const activeGoals = goals
    .filter((goal) => goal.savedAmount < goal.targetAmount && goal.targetDate)
    .sort((a, b) => {
      const aTime = new Date(a.targetDate ?? "").getTime();
      const bTime = new Date(b.targetDate ?? "").getTime();
      return aTime - bTime;
    });

  return activeGoals[0]?.targetDate;
}

export function buildDreamFundV1Insights(
  goals: DreamFundGoal[],
  transactions: DreamFundTransaction[],
): DreamFundV1InsightsSnapshot {
  const completedGoals = goals.filter((goal) => goal.savedAmount >= goal.targetAmount);
  const totalGoals = goals.length;
  const achievementRate =
    totalGoals > 0 ? Math.round((completedGoals.length / totalGoals) * 100) : 0;
  const nearestDate = getNearestActiveGoalDate(goals);

  return {
    incomeAdded: sumIncome(transactions),
    dreamsAchieved: completedGoals.length,
    totalGoals,
    achievementRate,
    totalSaved: sumGoalSavings(goals),
    timelineLabel: nearestDate ? formatMonthsLeftFromDate(nearestDate) : "Flexible timeline",
  };
}

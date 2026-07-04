import type {
  DreamFundEmergencyFund,
  DreamFundGoal,
  DreamFundTransaction,
} from "@/lib/dream-fund-app-data";
import { calcProgress } from "@/lib/dream-fund-app-utils";

export type DreamFundV1InsightsSnapshot = {
  totalAdded: number;
  overallProgress: number;
  totalEmergency: number;
};

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

  return {
    totalAdded,
    overallProgress: calcProgress(totalSaved, totalTarget),
    totalEmergency: emergencyFund.savedAmount,
  };
}

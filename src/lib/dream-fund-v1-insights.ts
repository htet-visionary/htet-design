import type { DreamFundEmergencyFund, DreamFundGoal } from "@/lib/dream-fund-app-data";
import { calcProgress } from "@/lib/dream-fund-app-utils";

export type DreamFundV1InsightsSnapshot = {
  totalSaved: number;
  overallProgress: number;
  totalEmergency: number;
};

export function buildDreamFundV1Insights(
  goals: DreamFundGoal[],
  emergencyFund: DreamFundEmergencyFund,
): DreamFundV1InsightsSnapshot {
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);

  return {
    totalSaved,
    overallProgress: calcProgress(totalSaved, totalTarget),
    totalEmergency: emergencyFund.savedAmount,
  };
}

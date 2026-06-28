export function createDreamFundId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function dedupeTransactionsById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (seen.has(item.id)) {
      return false;
    }

    seen.add(item.id);
    return true;
  });
}

export function formatCurrency(amount: number, currency = "JPY"): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "JPY" ? 0 : 2,
  }).format(amount);
}

export function formatCurrencyDetailed(amount: number, currency = "JPY"): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency,
    minimumFractionDigits: currency === "JPY" ? 0 : 2,
    maximumFractionDigits: currency === "JPY" ? 0 : 2,
  }).format(amount);
}

export function calcSaveableBalance(income: number, mandatoryTotal: number): number {
  return Math.max(0, income - mandatoryTotal);
}

export function calcEmergencyMonthlyReserve(
  targetAmount: number,
  savedAmount: number,
): number {
  const remaining = Math.max(0, targetAmount - savedAmount);

  if (remaining <= 0) {
    return 0;
  }

  return Math.ceil(remaining / 12);
}

export function calcAvailableToSpend(
  saveableBalance: number,
  goalAllocations: number,
  emergencyMonthlyReserve: number,
): number {
  const monthlySpendable = Math.max(
    0,
    saveableBalance - goalAllocations - emergencyMonthlyReserve,
  );

  return Math.round(monthlySpendable / 30);
}

export function calcDaysToGoal(
  targetAmount: number,
  savedAmount: number,
  monthlySaveable: number,
): number | null {
  if (monthlySaveable <= 0) {
    return null;
  }

  const remaining = targetAmount - savedAmount;

  if (remaining <= 0) {
    return 0;
  }

  const dailyRate = monthlySaveable / 30;

  return Math.ceil(remaining / dailyRate);
}

export function formatTimeline(days: number | null): string {
  if (days === null) {
    return "Adjust income or expenses";
  }

  if (days === 0) {
    return "Fully funded";
  }

  if (days < 30) {
    return `${days} day${days === 1 ? "" : "s"}`;
  }

  const months = Math.round(days / 30);

  return `${months} month${months === 1 ? "" : "s"}`;
}

export function formatMonthsLeftFromDate(targetDate?: string): string {
  if (!targetDate) {
    return "Flexible timeline";
  }

  const days = daysUntil(targetDate);

  if (days <= 0) {
    return "Due now";
  }

  if (days < 30) {
    return `${days} day${days === 1 ? "" : "s"} left`;
  }

  const months = Math.max(1, Math.round(days / 30));

  return `${months} month${months === 1 ? "" : "s"} left`;
}

export function formatGoalDeadline(targetDate?: string): string {
  if (!targetDate) {
    return "Not set";
  }

  return new Date(targetDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function calcProgress(saved: number, target: number): number {
  if (target <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((saved / target) * 100));
}

export function daysUntil(dateIso: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dateIso);
  due.setHours(0, 0, 0, 0);

  return Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function emergencyFundStatus(
  savedAmount: number,
  targetAmount: number,
): "healthy" | "building" | "low" {
  const ratio = targetAmount > 0 ? savedAmount / targetAmount : 0;

  if (ratio >= 0.7) {
    return "healthy";
  }

  if (ratio >= 0.35) {
    return "building";
  }

  return "low";
}

export function greetingForHour(date = new Date()): string {
  const hour = date.getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 17) {
    return "Good afternoon";
  }

  return "Good evening";
}

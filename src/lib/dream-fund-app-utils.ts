export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyDetailed(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function calcSaveableBalance(income: number, mandatoryTotal: number): number {
  return Math.max(0, income - mandatoryTotal);
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

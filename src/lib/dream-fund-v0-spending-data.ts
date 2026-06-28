export type SpendingMethod = "quick-log" | "custom" | "scan";

export type SpendingStepId =
  | "choose-method"
  | "quick-pick"
  | "scan"
  | "amount"
  | "category"
  | "success";

export type SpendingDraft = {
  method: SpendingMethod;
  title: string;
  amount: number;
  category: string;
};

export const EXPENSE_CATEGORIES = ["Food", "Shopping", "Transport", "Bills", "Other"] as const;

export const QUICK_LOG_ITEMS = [
  { id: "coffee", label: "Coffee", emoji: "☕", category: "Food", amount: 500 },
  { id: "lunch", label: "Lunch", emoji: "🍱", category: "Food", amount: 1200 },
  { id: "groceries", label: "Groceries", emoji: "🛒", category: "Food", amount: 3500 },
  { id: "train", label: "Train", emoji: "🚃", category: "Transport", amount: 280 },
  { id: "snack", label: "Snack", emoji: "🍙", category: "Food", amount: 350 },
  { id: "shopping", label: "Shopping", emoji: "🛍️", category: "Shopping", amount: 2000 },
] as const;

export const SPENDING_FLOW_META: Record<
  SpendingStepId,
  { flowNumber: string; label: string; progressIndex: number }
> = {
  "choose-method": { flowNumber: "7.1", label: "Choose Method", progressIndex: 0 },
  "quick-pick": { flowNumber: "7.2", label: "Quick Log", progressIndex: 1 },
  scan: { flowNumber: "7.2", label: "Scan Receipt", progressIndex: 1 },
  amount: { flowNumber: "7.3", label: "Enter Amount", progressIndex: 2 },
  category: { flowNumber: "7.4", label: "Choose Category", progressIndex: 3 },
  success: { flowNumber: "7.5", label: "Spending Recorded", progressIndex: 4 },
};

export const SPENDING_PROGRESS_STEPS = 4;

export function formatYenInput(amount: number): string {
  if (amount <= 0) {
    return "";
  }

  return amount.toLocaleString("en-US");
}

export function createEmptySpendingDraft(): SpendingDraft {
  return {
    method: "custom",
    title: "",
    amount: 0,
    category: EXPENSE_CATEGORIES[0],
  };
}

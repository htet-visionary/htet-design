import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  Briefcase,
  Gift,
  Laptop,
  MoreHorizontal,
  PieChart,
  RotateCcw,
  Store,
} from "lucide-react";

export type RecurringIncomeTypeId =
  | "salary"
  | "freelance"
  | "business"
  | "allowance"
  | "gift"
  | "investment"
  | "refund"
  | "other";

export type IncomeFrequency = "once" | "daily" | "weekly" | "monthly" | "yearly" | "custom";

export type RecurringIncomeDraft = {
  id: string;
  typeId: RecurringIncomeTypeId;
  amount: number;
  frequency: IncomeFrequency;
  startDate: string;
  note: string;
};

export type CurrentBalanceDraft = {
  amount: number;
  from: string;
  note: string;
};

export type IncomeSetupDraft = {
  currentBalance: CurrentBalanceDraft | null;
  recurringIncomes: RecurringIncomeDraft[];
};

export const BALANCE_SOURCE_OPTIONS = [
  "Bank account",
  "Cash",
  "Wallet",
  "Other",
] as const;

export const INCOME_FREQUENCY_OPTIONS: { id: IncomeFrequency; label: string }[] = [
  { id: "once", label: "One time" },
  { id: "daily", label: "Every day" },
  { id: "weekly", label: "Every week" },
  { id: "monthly", label: "Every month" },
  { id: "yearly", label: "Every year" },
  { id: "custom", label: "Custom" },
];

export const MONEY_COMING_IN_TYPES: {
  id: RecurringIncomeTypeId;
  label: string;
  icon: LucideIcon;
}[] = [
  { id: "salary", label: "Salary", icon: Briefcase },
  { id: "freelance", label: "Freelance", icon: Laptop },
  { id: "business", label: "Business", icon: Store },
  { id: "allowance", label: "Allowance", icon: Banknote },
  { id: "gift", label: "Gift", icon: Gift },
  { id: "investment", label: "Investment", icon: PieChart },
  { id: "refund", label: "Refund", icon: RotateCcw },
  { id: "other", label: "Other", icon: MoreHorizontal },
];

/** @deprecated Use MONEY_COMING_IN_TYPES */
export const RECURRING_INCOME_TYPES = MONEY_COMING_IN_TYPES.map((item) => ({
  ...item,
  description: item.label,
}));

export function recurringIncomeLabel(typeId: RecurringIncomeTypeId): string {
  return MONEY_COMING_IN_TYPES.find((item) => item.id === typeId)?.label ?? "Income";
}

export function frequencyLabel(frequency: IncomeFrequency): string {
  return INCOME_FREQUENCY_OPTIONS.find((item) => item.id === frequency)?.label ?? "Every month";
}

export function monthlyIncomeEquivalent(amount: number, frequency: IncomeFrequency): number {
  switch (frequency) {
    case "once":
      return amount / 12;
    case "daily":
      return amount * 30;
    case "weekly":
      return (amount * 52) / 12;
    case "monthly":
    case "custom":
      return amount;
    case "yearly":
      return amount / 12;
    default:
      return amount;
  }
}

export function parseYenInput(value: string): number {
  const parsed = Number.parseInt(value.replace(/\D/g, ""), 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatYenInput(amount: number): string {
  if (amount <= 0) {
    return "";
  }

  return amount.toLocaleString("en-US");
}

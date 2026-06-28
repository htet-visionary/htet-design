export type BillFrequency = "once" | "weekly" | "monthly" | "yearly";

export type BillDraft = {
  name: string;
  amount: number;
  frequency: BillFrequency;
  dueDate: string;
};

export const BILL_FREQUENCY_OPTIONS: { id: BillFrequency; label: string }[] = [
  { id: "once", label: "One time" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "yearly", label: "Yearly" },
];

export function createEmptyBillDraft(): BillDraft {
  return {
    name: "",
    amount: 0,
    frequency: "monthly",
    dueDate: "",
  };
}

export function billFrequencyLabel(frequency: BillFrequency): string {
  return BILL_FREQUENCY_OPTIONS.find((option) => option.id === frequency)?.label ?? "Monthly";
}

export function formatYenInput(amount: number): string {
  if (amount <= 0) {
    return "";
  }

  return amount.toLocaleString("en-US");
}

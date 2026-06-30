export type DreamPriority = "high" | "medium" | "low";

export type DreamFundGoal = {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  emoji: string;
  targetDate?: string;
  monthlyAllocation: number;
  priority: DreamPriority;
};

export type DreamFundBill = {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  frequency: "monthly" | "weekly" | "yearly" | "once" | "daily" | "custom";
  paid: boolean;
};

export type DreamFundTransaction = {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  note?: string;
};

export type DreamFundAlert = {
  id: string;
  type: "bill" | "budget" | "goal";
  title: string;
  message: string;
  timeLabel: string;
};

export type DreamFundPartnerGoal = {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  contributors: string[];
};

export type DreamFundEmergencyFund = {
  targetAmount: number;
  savedAmount: number;
};

export type DreamFundRecurringIncome = {
  id: string;
  typeId: string;
  label: string;
  amount: number;
  frequency: "monthly" | "weekly" | "yearly" | "once" | "daily" | "custom";
  startDate: string;
  note?: string;
};

export type DreamFundSettings = {
  currency: string;
  weeklySummary: boolean;
  billReminders: boolean;
  budgetAlerts: boolean;
  darkMode: boolean;
};

export type DreamFundProfile = {
  name: string;
  email: string;
  monthlyIncome: number;
  mandatoryExpenses: {
    id: string;
    label: string;
    amount: number;
  }[];
};

export type DreamFundAppState = {
  hasOnboarded: boolean;
  isSignedUp: boolean;
  profile: DreamFundProfile;
  currentBalance: number;
  recurringIncomes: DreamFundRecurringIncome[];
  goals: DreamFundGoal[];
  bills: DreamFundBill[];
  transactions: DreamFundTransaction[];
  alerts: DreamFundAlert[];
  partnerGoals: DreamFundPartnerGoal[];
  emergencyFund: DreamFundEmergencyFund;
  settings: DreamFundSettings;
  weeklyFlexibleSpent: number;
  weeklyFlexibleBudget: number;
  lastAchievedGoalId: string | null;
};

export const dreamFundPriorities: { id: DreamPriority; label: string }[] = [
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
];

export const dreamFundCategories = [
  "Salary",
  "Shopping",
  "Food",
  "Transport",
  "Bills",
  "Other",
] as const;

export const defaultDreamFundAppState: DreamFundAppState = {
  hasOnboarded: false,
  isSignedUp: false,
  profile: {
    name: "Jennie Kim",
    email: "jennie@example.com",
    monthlyIncome: 310_000,
    mandatoryExpenses: [
      { id: "rent", label: "Rent", amount: 95_000 },
      { id: "utilities", label: "Utilities", amount: 12_000 },
      { id: "debt", label: "Debt repayment", amount: 18_000 },
      { id: "insurance", label: "Insurance", amount: 8_000 },
    ],
  },
  currentBalance: 0,
  recurringIncomes: [],
  goals: [
    {
      id: "japan-trip",
      name: "Japan Trip",
      targetAmount: 500_000,
      savedAmount: 365_000,
      emoji: "✈️",
      targetDate: "2026-11-20",
      monthlyAllocation: 25_000,
      priority: "high",
    },
    {
      id: "weekend-camera",
      name: "Weekend Camera",
      targetAmount: 120_000,
      savedAmount: 48_000,
      emoji: "📷",
      targetDate: "2026-09-01",
      monthlyAllocation: 12_000,
      priority: "medium",
    },
  ],
  bills: [
    {
      id: "rent-bill",
      name: "Rent",
      amount: 95_000,
      dueDate: "2026-07-01",
      frequency: "monthly",
      paid: false,
    },
    {
      id: "electricity",
      name: "Electricity",
      amount: 8_500,
      dueDate: "2026-06-27",
      frequency: "monthly",
      paid: false,
    },
    {
      id: "internet",
      name: "Internet",
      amount: 5_500,
      dueDate: "2026-07-05",
      frequency: "monthly",
      paid: false,
    },
    {
      id: "insurance-bill",
      name: "Insurance",
      amount: 8_000,
      dueDate: "2026-07-12",
      frequency: "monthly",
      paid: false,
    },
  ],
  transactions: [
    {
      id: "t1",
      title: "Salary",
      amount: 310_000,
      type: "income",
      category: "Salary",
      date: "2026-06-24",
      note: "Monthly pay",
    },
    {
      id: "t2",
      title: "Shopping",
      amount: 4_200,
      type: "expense",
      category: "Shopping",
      date: "2026-06-24",
    },
    {
      id: "t3",
      title: "Lunch",
      amount: 1_200,
      type: "expense",
      category: "Food",
      date: "2026-06-23",
    },
    {
      id: "t4",
      title: "Train pass",
      amount: 980,
      type: "expense",
      category: "Transport",
      date: "2026-06-23",
    },
  ],
  alerts: [
    {
      id: "a1",
      type: "bill",
      title: "Electricity due in 3 days",
      message: "Set aside ¥8,500 before Jun 27 so your Japan Trip stays on track.",
      timeLabel: "Today",
    },
    {
      id: "a2",
      type: "goal",
      title: "Japan Trip update",
      message: "You're 73% toward your trip. Today's spending still keeps your dream on schedule.",
      timeLabel: "Today",
    },
    {
      id: "a3",
      type: "budget",
      title: "Available to spend refreshed",
      message: "You can safely spend ¥2,680 today without affecting your active dreams.",
      timeLabel: "This morning",
    },
  ],
  partnerGoals: [
    {
      id: "anniversary",
      name: "Anniversary Trip",
      targetAmount: 800_000,
      savedAmount: 320_000,
      contributors: ["Jennie", "Ken"],
    },
  ],
  emergencyFund: {
    targetAmount: 600_000,
    savedAmount: 450_000,
  },
  settings: {
    currency: "JPY",
    weeklySummary: true,
    billReminders: true,
    budgetAlerts: true,
    darkMode: false,
  },
  weeklyFlexibleSpent: 18_500,
  weeklyFlexibleBudget: 22_000,
  lastAchievedGoalId: null,
};

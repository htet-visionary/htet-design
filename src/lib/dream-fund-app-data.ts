export type GoalColor = "green" | "accent" | "lavender";

export type DreamFundGoal = {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  emoji: string;
  targetDate: string;
  monthlyAllocation: number;
  color: GoalColor;
};

export type DreamFundBill = {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  frequency: "monthly" | "weekly" | "yearly";
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
  goals: DreamFundGoal[];
  bills: DreamFundBill[];
  transactions: DreamFundTransaction[];
  alerts: DreamFundAlert[];
  partnerGoals: DreamFundPartnerGoal[];
  settings: DreamFundSettings;
  weeklyFlexibleSpent: number;
  weeklyFlexibleBudget: number;
  lastAchievedGoalId: string | null;
};

export const dreamFundGoalColors: { id: GoalColor; label: string }[] = [
  { id: "green", label: "Green" },
  { id: "accent", label: "Warm" },
  { id: "lavender", label: "Lavender" },
];

export const dreamFundCategories = [
  "Shopping",
  "Food & Dining",
  "Transport",
  "Entertainment",
  "Income",
  "Other",
] as const;

export const defaultDreamFundAppState: DreamFundAppState = {
  hasOnboarded: false,
  isSignedUp: false,
  profile: {
    name: "Alex Morgan",
    email: "alex@example.com",
    monthlyIncome: 4200,
    mandatoryExpenses: [
      { id: "rent", label: "Rent", amount: 1400 },
      { id: "utilities", label: "Utilities", amount: 120 },
      { id: "debt", label: "Debt repayment", amount: 300 },
      { id: "insurance", label: "Insurance", amount: 80 },
    ],
  },
  goals: [
    {
      id: "watch",
      name: "New Watch",
      targetAmount: 1000,
      savedAmount: 234,
      emoji: "⌚",
      targetDate: "2026-08-15",
      monthlyAllocation: 100,
      color: "green",
    },
    {
      id: "kyoto",
      name: "Trip to Kyoto",
      targetAmount: 2000,
      savedAmount: 420,
      emoji: "✈️",
      targetDate: "2026-11-20",
      monthlyAllocation: 150,
      color: "accent",
    },
  ],
  bills: [
    { id: "rent-bill", name: "Rent", amount: 1400, dueDate: "2026-07-01", frequency: "monthly", paid: false },
    { id: "electricity", name: "Electricity Bill", amount: 85, dueDate: "2026-06-28", frequency: "monthly", paid: false },
    { id: "internet", name: "Internet", amount: 45, dueDate: "2026-07-05", frequency: "monthly", paid: false },
    { id: "insurance-bill", name: "Insurance", amount: 80, dueDate: "2026-07-12", frequency: "monthly", paid: false },
  ],
  transactions: [
    { id: "t1", title: "Salary deposit", amount: 4200, type: "income", category: "Income", date: "2026-06-24", note: "Monthly pay" },
    { id: "t2", title: "Grocery run", amount: 48, type: "expense", category: "Food & Dining", date: "2026-06-24" },
    { id: "t3", title: "Coffee shop", amount: 12, type: "expense", category: "Food & Dining", date: "2026-06-23" },
    { id: "t4", title: "Train pass", amount: 35, type: "expense", category: "Transport", date: "2026-06-23" },
    { id: "t5", title: "Online store", amount: 62, type: "expense", category: "Shopping", date: "2026-06-22" },
  ],
  alerts: [
    {
      id: "a1",
      type: "bill",
      title: "Electricity due in 4 days",
      message: "Set aside $85 before Jun 28 to stay on track.",
      timeLabel: "Today",
    },
    {
      id: "a2",
      type: "budget",
      title: "Food budget at 80%",
      message: "You've spent 80% of your Food & Dining plan this week — one lighter meal puts you back on track.",
      timeLabel: "Yesterday",
    },
    {
      id: "a3",
      type: "goal",
      title: "Kyoto trip update",
      message: "You're 21% toward Kyoto. Keep saving $150/month to reach your date.",
      timeLabel: "2 days ago",
    },
  ],
  partnerGoals: [
    {
      id: "europe",
      name: "Europe Trip",
      targetAmount: 5000,
      savedAmount: 2100,
      contributors: ["Alex", "Sam"],
    },
    {
      id: "home",
      name: "New Home Fund",
      targetAmount: 20000,
      savedAmount: 8500,
      contributors: ["Alex", "Sam"],
    },
  ],
  settings: {
    currency: "USD",
    weeklySummary: true,
    billReminders: true,
    budgetAlerts: true,
    darkMode: false,
  },
  weeklyFlexibleSpent: 320,
  weeklyFlexibleBudget: 280,
  lastAchievedGoalId: null,
};

export const dreamFundAppTabs = [
  { id: "home", label: "Home", href: "/dream-fund-app" },
  { id: "goals", label: "Goals", href: "/dream-fund-app/goals" },
  { id: "bills", label: "Bills", href: "/dream-fund-app/bills" },
  { id: "insights", label: "Insights", href: "/dream-fund-app/insights" },
  { id: "profile", label: "Profile", href: "/dream-fund-app/profile" },
] as const;

export const dreamFundPartnerTab = {
  id: "partner",
  label: "Partner",
  href: "/dream-fund-app/partner/dashboard",
} as const;

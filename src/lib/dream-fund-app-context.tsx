"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultDreamFundAppState,
  type DreamFundAppState,
  type DreamFundBill,
  type DreamFundGoal,
  type DreamFundRecurringIncome,
  type DreamFundSettings,
  type DreamFundTransaction,
} from "@/lib/dream-fund-app-data";
import {
  calcAvailableToSpend,
  calcEmergencyMonthlyReserve,
  calcSaveableBalance,
  createDreamFundId,
  dedupeTransactionsById,
} from "@/lib/dream-fund-app-utils";
import { monthlyIncomeEquivalent } from "@/lib/dream-fund-v0-income-data";

const STORAGE_KEY = "dream-fund-app-state-v3";

type DreamFundAppContextValue = {
  state: DreamFundAppState;
  hydrated: boolean;
  monthlyMandatoryTotal: number;
  saveableBalance: number;
  availableToSpend: number;
  safeToSpend: number;
  dailySaveable: number;
  activeDream: DreamFundGoal | undefined;
  completeOnboarding: () => void;
  completeSignUp: (name: string, email: string) => void;
  setupFinances: (input: {
    currentBalance: number;
    balanceSource?: string;
    balanceNote?: string;
    recurringIncomes: DreamFundRecurringIncome[];
  }) => void;
  addBills: (bills: Omit<DreamFundBill, "id" | "paid">[]) => void;
  setupEmergencyFund: (input: { targetAmount: number; savedAmount?: number }) => void;
  addGoal: (goal: Omit<DreamFundGoal, "id" | "savedAmount"> & { savedAmount?: number }) => void;
  updateGoal: (goalId: string, updates: Partial<Omit<DreamFundGoal, "id">>) => void;
  deleteGoal: (goalId: string) => void;
  addGoalSavings: (goalId: string, amount: number) => void;
  addGoalSavingsFromBalance: (goalId: string, amount: number) => void;
  addTransaction: (transaction: Omit<DreamFundTransaction, "id">) => void;
  markBillPaid: (billId: string) => void;
  updateIncome: (amount: number) => void;
  updateProfileName: (name: string) => void;
  updateSettings: (settings: Partial<DreamFundSettings>) => void;
  setLastAchievedGoal: (goalId: string | null) => void;
  resetState: () => void;
  getGoalById: (id: string) => DreamFundGoal | undefined;
  getBillById: (id: string) => DreamFundBill | undefined;
};

const DreamFundAppContext = createContext<DreamFundAppContextValue | null>(null);

function mergeState(stored: Partial<DreamFundAppState>): DreamFundAppState {
  return {
    ...defaultDreamFundAppState,
    ...stored,
    profile: { ...defaultDreamFundAppState.profile, ...stored.profile },
    settings: { ...defaultDreamFundAppState.settings, ...stored.settings },
    emergencyFund: {
      ...defaultDreamFundAppState.emergencyFund,
      ...stored.emergencyFund,
    },
    goals: (stored.goals ?? defaultDreamFundAppState.goals).map((goal) => ({
      ...goal,
      priority: goal.priority ?? "medium",
    })),
    currentBalance: stored.currentBalance ?? defaultDreamFundAppState.currentBalance,
    recurringIncomes: stored.recurringIncomes ?? defaultDreamFundAppState.recurringIncomes,
    bills: stored.bills ?? defaultDreamFundAppState.bills,
    transactions: dedupeTransactionsById(
      stored.transactions ?? defaultDreamFundAppState.transactions,
    ),
    alerts: stored.alerts ?? defaultDreamFundAppState.alerts,
    partnerGoals: stored.partnerGoals ?? defaultDreamFundAppState.partnerGoals,
  };
}

function loadState(): DreamFundAppState {
  if (typeof window === "undefined") {
    return defaultDreamFundAppState;
  }

  try {
    const storedV3 = window.localStorage.getItem(STORAGE_KEY);
    if (storedV3) {
      return mergeState(JSON.parse(storedV3));
    }

    const storedV2 = window.localStorage.getItem("dream-fund-app-state-v2");
    if (storedV2) {
      return mergeState(JSON.parse(storedV2));
    }

    const storedV1 = window.localStorage.getItem("dream-fund-app-state");
    if (storedV1) {
      const parsed = JSON.parse(storedV1);
      return mergeState({
        ...parsed,
        hasOnboarded: true,
        isSignedUp: true,
      });
    }

    return defaultDreamFundAppState;
  } catch {
    return defaultDreamFundAppState;
  }
}

export function DreamFundAppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DreamFundAppState>(defaultDreamFundAppState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    setState((current) => {
      const transactions = dedupeTransactionsById(current.transactions);

      if (transactions.length === current.transactions.length) {
        return current;
      }

      return { ...current, transactions };
    });
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const monthlyMandatoryTotal = useMemo(
    () => state.profile.mandatoryExpenses.reduce((sum, item) => sum + item.amount, 0),
    [state.profile.mandatoryExpenses],
  );

  const saveableBalance = useMemo(
    () => calcSaveableBalance(state.profile.monthlyIncome, monthlyMandatoryTotal),
    [state.profile.monthlyIncome, monthlyMandatoryTotal],
  );

  const goalAllocations = useMemo(
    () => state.goals.reduce((sum, goal) => sum + goal.monthlyAllocation, 0),
    [state.goals],
  );

  const emergencyMonthlyReserve = useMemo(
    () =>
      calcEmergencyMonthlyReserve(
        state.emergencyFund.targetAmount,
        state.emergencyFund.savedAmount,
      ),
    [state.emergencyFund],
  );

  const availableToSpend = useMemo(
    () => calcAvailableToSpend(saveableBalance, goalAllocations, emergencyMonthlyReserve),
    [saveableBalance, goalAllocations, emergencyMonthlyReserve],
  );

  const safeToSpend = availableToSpend;
  const dailySaveable = saveableBalance / 30;

  const activeDream = useMemo(
    () =>
      [...state.goals]
        .filter((goal) => goal.savedAmount < goal.targetAmount)
        .sort((a, b) => {
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        })[0],
    [state.goals],
  );

  const completeOnboarding = useCallback(() => {
    setState((current) => ({ ...current, hasOnboarded: true }));
  }, []);

  const completeSignUp = useCallback((name: string, email: string) => {
    setState((current) => ({
      ...current,
      isSignedUp: true,
      profile: { ...current.profile, name, email },
    }));
  }, []);

  const setupFinances = useCallback(
    (input: {
      currentBalance: number;
      balanceSource?: string;
      balanceNote?: string;
      recurringIncomes: DreamFundRecurringIncome[];
    }) => {
      setState((current) => {
        const incomeTxIds = new Set([
          ...current.recurringIncomes.map((income) => `tx-${income.id}`),
          ...input.recurringIncomes.map((income) => `tx-${income.id}`),
        ]);

        const transactions = current.transactions.filter(
          (tx) =>
            !incomeTxIds.has(tx.id) &&
            !(tx.id.startsWith("tx-balance-") && tx.title === "Current Balance"),
        );

        if (input.currentBalance > 0) {
          transactions.unshift({
            id: createDreamFundId("tx-balance"),
            title: "Current Balance",
            amount: input.currentBalance,
            type: "income",
            category: input.balanceSource ?? "Savings",
            date: new Date().toISOString().slice(0, 10),
            note: input.balanceNote,
          });
        }

        for (const income of input.recurringIncomes) {
          transactions.unshift({
            id: `tx-${income.id}`,
            title: income.label,
            amount: income.amount,
            type: "income",
            category: income.label,
            date: income.startDate,
            note: income.note,
          });
        }

        const recurringById = new Map(
          current.recurringIncomes.map((income) => [income.id, income] as const),
        );

        for (const income of input.recurringIncomes) {
          recurringById.set(income.id, income);
        }

        const recurringIncomes = [...recurringById.values()];
        const monthlyTotal = recurringIncomes.reduce(
          (sum, income) => sum + monthlyIncomeEquivalent(income.amount, income.frequency),
          0,
        );

        return {
          ...current,
          currentBalance: input.currentBalance,
          recurringIncomes,
          profile: {
            ...current.profile,
            monthlyIncome: monthlyTotal,
          },
          transactions: dedupeTransactionsById(transactions),
        };
      });
    },
    [],
  );

  const addBills = useCallback((bills: Omit<DreamFundBill, "id" | "paid">[]) => {
    if (bills.length === 0) {
      return;
    }

    setState((current) => ({
      ...current,
      bills: [
        ...current.bills,
        ...bills.map((bill, index) => ({
          ...bill,
          id: `bill-${Date.now()}-${index}`,
          paid: false,
        })),
      ],
    }));
  }, []);

  const setupEmergencyFund = useCallback(
    (input: { targetAmount: number; savedAmount?: number }) => {
      setState((current) => ({
        ...current,
        emergencyFund: {
          targetAmount: Math.max(0, input.targetAmount),
          savedAmount: Math.max(0, input.savedAmount ?? 0),
        },
      }));
    },
    [],
  );

  const addGoal = useCallback(
    (goal: Omit<DreamFundGoal, "id" | "savedAmount"> & { savedAmount?: number }) => {
      setState((current) => ({
        ...current,
        goals: [
          ...current.goals,
          {
            ...goal,
            savedAmount: goal.savedAmount ?? 0,
            id: `goal-${Date.now()}`,
          },
        ],
      }));
    },
    [],
  );

  const addGoalSavings = useCallback((goalId: string, amount: number) => {
    if (amount <= 0) {
      return;
    }

    setState((current) => {
      let achievedId = current.lastAchievedGoalId;

      const goals = current.goals.map((goal) => {
        if (goal.id !== goalId) {
          return goal;
        }

        const wasFunded = goal.savedAmount >= goal.targetAmount;
        const savedAmount = Math.min(goal.targetAmount, goal.savedAmount + amount);

        if (!wasFunded && savedAmount >= goal.targetAmount) {
          achievedId = goal.id;
        }

        return { ...goal, savedAmount };
      });

      return { ...current, goals, lastAchievedGoalId: achievedId };
    });
  }, []);

  const updateGoal = useCallback((goalId: string, updates: Partial<Omit<DreamFundGoal, "id">>) => {
    setState((current) => ({
      ...current,
      goals: current.goals.map((goal) => (goal.id === goalId ? { ...goal, ...updates } : goal)),
    }));
  }, []);

  const deleteGoal = useCallback((goalId: string) => {
    setState((current) => ({
      ...current,
      goals: current.goals.filter((goal) => goal.id !== goalId),
      lastAchievedGoalId: current.lastAchievedGoalId === goalId ? null : current.lastAchievedGoalId,
    }));
  }, []);

  const addGoalSavingsFromBalance = useCallback((goalId: string, amount: number) => {
    if (amount <= 0) {
      return;
    }

    setState((current) => {
      const transferAmount = Math.min(amount, current.currentBalance);

      if (transferAmount <= 0) {
        return current;
      }

      let achievedId = current.lastAchievedGoalId;

      const goals = current.goals.map((goal) => {
        if (goal.id !== goalId) {
          return goal;
        }

        const wasFunded = goal.savedAmount >= goal.targetAmount;
        const savedAmount = Math.min(goal.targetAmount, goal.savedAmount + transferAmount);

        if (!wasFunded && savedAmount >= goal.targetAmount) {
          achievedId = goal.id;
        }

        return { ...goal, savedAmount };
      });

      return {
        ...current,
        currentBalance: current.currentBalance - transferAmount,
        goals,
        lastAchievedGoalId: achievedId,
      };
    });
  }, []);

  const addTransaction = useCallback((transaction: Omit<DreamFundTransaction, "id">) => {
    setState((current) => ({
      ...current,
      transactions: dedupeTransactionsById([
        { ...transaction, id: createDreamFundId("tx") },
        ...current.transactions,
      ]),
      weeklyFlexibleSpent:
        transaction.type === "expense"
          ? current.weeklyFlexibleSpent + transaction.amount
          : current.weeklyFlexibleSpent,
    }));
  }, []);

  const markBillPaid = useCallback((billId: string) => {
    setState((current) => ({
      ...current,
      bills: current.bills.map((bill) =>
        bill.id === billId ? { ...bill, paid: true } : bill,
      ),
    }));
  }, []);

  const updateIncome = useCallback((amount: number) => {
    setState((current) => ({
      ...current,
      profile: {
        ...current.profile,
        monthlyIncome: Math.max(0, amount),
      },
    }));
  }, []);

  const updateProfileName = useCallback((name: string) => {
    setState((current) => ({
      ...current,
      profile: { ...current.profile, name },
    }));
  }, []);

  const updateSettings = useCallback((settings: Partial<DreamFundSettings>) => {
    setState((current) => ({
      ...current,
      settings: { ...current.settings, ...settings },
    }));
  }, []);

  const setLastAchievedGoal = useCallback((goalId: string | null) => {
    setState((current) => ({ ...current, lastAchievedGoalId: goalId }));
  }, []);

  const resetState = useCallback(() => {
    setState(defaultDreamFundAppState);
  }, []);

  const getGoalById = useCallback(
    (id: string) => state.goals.find((goal) => goal.id === id),
    [state.goals],
  );

  const getBillById = useCallback(
    (id: string) => state.bills.find((bill) => bill.id === id),
    [state.bills],
  );

  const value = useMemo(
    () => ({
      state,
      hydrated,
      monthlyMandatoryTotal,
      saveableBalance,
      availableToSpend,
      safeToSpend,
      dailySaveable,
      activeDream,
      completeOnboarding,
      completeSignUp,
      setupFinances,
      addBills,
      setupEmergencyFund,
      addGoal,
      updateGoal,
      deleteGoal,
      addGoalSavings,
      addGoalSavingsFromBalance,
      addTransaction,
      markBillPaid,
      updateIncome,
      updateProfileName,
      updateSettings,
      setLastAchievedGoal,
      resetState,
      getGoalById,
      getBillById,
    }),
    [
      state,
      hydrated,
      monthlyMandatoryTotal,
      saveableBalance,
      availableToSpend,
      safeToSpend,
      dailySaveable,
      activeDream,
      completeOnboarding,
      completeSignUp,
      setupFinances,
      addBills,
      setupEmergencyFund,
      addGoal,
      updateGoal,
      deleteGoal,
      addGoalSavings,
      addGoalSavingsFromBalance,
      addTransaction,
      markBillPaid,
      updateIncome,
      updateProfileName,
      updateSettings,
      setLastAchievedGoal,
      resetState,
      getGoalById,
      getBillById,
    ],
  );

  return (
    <DreamFundAppContext.Provider value={value}>{children}</DreamFundAppContext.Provider>
  );
}

export function useDreamFundApp() {
  const context = useContext(DreamFundAppContext);

  if (!context) {
    throw new Error("useDreamFundApp must be used within DreamFundAppProvider");
  }

  return context;
}

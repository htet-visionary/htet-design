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
  type DreamFundSettings,
  type DreamFundTransaction,
} from "@/lib/dream-fund-app-data";
import { calcSaveableBalance } from "@/lib/dream-fund-app-utils";

const STORAGE_KEY = "dream-fund-app-state-v2";

type DreamFundAppContextValue = {
  state: DreamFundAppState;
  hydrated: boolean;
  monthlyMandatoryTotal: number;
  saveableBalance: number;
  safeToSpend: number;
  dailySaveable: number;
  completeOnboarding: () => void;
  completeSignUp: (name: string, email: string) => void;
  addGoal: (goal: Omit<DreamFundGoal, "id" | "savedAmount"> & { savedAmount?: number }) => void;
  addGoalSavings: (goalId: string, amount: number) => void;
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
    goals: stored.goals ?? defaultDreamFundAppState.goals,
    bills: stored.bills ?? defaultDreamFundAppState.bills,
    transactions: stored.transactions ?? defaultDreamFundAppState.transactions,
    alerts: stored.alerts ?? defaultDreamFundAppState.alerts,
    partnerGoals: stored.partnerGoals ?? defaultDreamFundAppState.partnerGoals,
  };
}

function loadState(): DreamFundAppState {
  if (typeof window === "undefined") {
    return defaultDreamFundAppState;
  }

  try {
    const storedV2 = window.localStorage.getItem(STORAGE_KEY);
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

  const safeToSpend = useMemo(() => {
    const allocated = state.goals.reduce((sum, goal) => sum + goal.monthlyAllocation, 0);
    return Math.max(0, saveableBalance - allocated);
  }, [saveableBalance, state.goals]);

  const dailySaveable = saveableBalance / 30;

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

  const addTransaction = useCallback((transaction: Omit<DreamFundTransaction, "id">) => {
    setState((current) => ({
      ...current,
      transactions: [{ ...transaction, id: `tx-${Date.now()}` }, ...current.transactions],
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
      safeToSpend,
      dailySaveable,
      completeOnboarding,
      completeSignUp,
      addGoal,
      addGoalSavings,
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
      safeToSpend,
      dailySaveable,
      completeOnboarding,
      completeSignUp,
      addGoal,
      addGoalSavings,
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

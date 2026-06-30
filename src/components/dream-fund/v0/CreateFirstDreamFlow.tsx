"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Globe2,
  ImageIcon,
  MoreHorizontal,
  PieChart,
  Plus,
  Sprout,
  Star,
  Target,
  User,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import {
  type CurrentBalanceDraft,
  type IncomeSetupDraft,
  type RecurringIncomeDraft,
  type RecurringIncomeTypeId,
  type IncomeFrequency,
  BALANCE_SOURCE_OPTIONS,
  INCOME_FREQUENCY_OPTIONS,
  MONEY_COMING_IN_TYPES,
  recurringIncomeLabel,
} from "@/lib/dream-fund-v0-income-data";
import { IncomeFlowScreens } from "@/components/dream-fund/v0/IncomeFlowScreens";
import { BillFlowScreens } from "@/components/dream-fund/v0/BillFlowScreens";
import { BillDrawer } from "@/components/dream-fund/v0/BillDrawer";
import { SpendingFlowScreens } from "@/components/dream-fund/v0/SpendingFlowScreens";
import { V0HomeDashboard, type V0HomeAction } from "@/components/dream-fund/v0/V0HomeDashboard";
import { V0AppTabBar, type V0HomeTab } from "@/components/dream-fund/v0/V0AppTabBar";
import { V0InsightsTab } from "@/components/dream-fund/v0/V0InsightsTab";
import { V0ProfileTab } from "@/components/dream-fund/v0/V0ProfileTab";
import { V0GoalsTab } from "@/components/dream-fund/v0/V0GoalsTab";
import { V0HeaderIconButton, V0ScreenHeader } from "@/components/dream-fund/v0/V0ScreenHeader";
import {
  V0HomeDetailScreens,
  getHomeDetailTitle,
  type HomeDetailView,
} from "@/components/dream-fund/v0/V0HomeDetailScreens";
import type { GoalFormValues } from "@/components/dream-fund/v0/V0GoalFormView";
import {
  createEmptyBillDraft,
  type BillDraft,
} from "@/lib/dream-fund-v0-bills-data";
import {
  createEmptySpendingDraft,
  QUICK_LOG_ITEMS,
  SPENDING_FLOW_META,
  SPENDING_PROGRESS_STEPS,
  type SpendingDraft,
  type SpendingMethod,
  type SpendingStepId,
} from "@/lib/dream-fund-v0-spending-data";
import { greetingForHour, createDreamFundId } from "@/lib/dream-fund-app-utils";

type DreamType = "personal" | "partner" | "community";
type DrawerKind = "amount" | "date" | "balance" | "incoming" | null;

type DreamDraft = {
  type: DreamType;
  name: string;
  amount: number;
  targetDate: string | null;
};

const STEP_META = [
  { id: "welcome", number: 1, label: "Welcome" },
  { id: "intro-confidence", number: 1, label: "Quick Intro" },
  { id: "intro-features", number: 1, label: "Quick Intro" },
  { id: "type", number: 2, label: "Choose Dream Type" },
  { id: "details", number: 3, label: "Enter Dream Details" },
  { id: "review", number: 4, label: "Review Dream" },
  { id: "success", number: 5, label: "Dream Created" },
  { id: "account", number: 6, label: "Create Account" },
  { id: "money-intro", number: 7, flowNumber: "2.0", label: "Set Up Your Money" },
  { id: "money-incoming-prompt", number: 7, flowNumber: "2.1", label: "Money Coming In" },
  { id: "money-review", number: 7, flowNumber: "2.2", label: "Review Money Setup" },
  { id: "home", number: 8, flowNumber: "3", label: "Home Dashboard" },
  { id: "login", number: 1, label: "Log In" },
] as const;

const FLOW_HEADER_STEPS = ["type", "details", "review", "account"] as const;

const INCOME_HEADER_STEPS = [
  "money-intro",
  "money-incoming-prompt",
  "money-review",
] as const;

const INCOME_FOOTER_STEPS = [
  "money-intro",
  "money-incoming-prompt",
  "money-review",
] as const;

const INTRO_FEATURES = [
  {
    title: "Set your dreams",
    description: "Break big dreams into small goals",
    icon: Target,
    iconVariant: "default" as const,
  },
  {
    title: "Track your money",
    description: "Know where your money goes",
    icon: PieChart,
    iconVariant: "default" as const,
  },
  {
    title: "Plan & save",
    description: "Get a daily plan and stay consistent",
    icon: CalendarDays,
    iconVariant: "default" as const,
  },
  {
    title: "Celebrate progress",
    description: "Reach your dreams step by step!",
    icon: Star,
    iconVariant: "star" as const,
  },
];

const DREAM_TYPES: {
  id: DreamType;
  label: string;
  description: string;
  icon: typeof User;
}[] = [
  { id: "personal", label: "Personal", description: "Just for you", icon: User },
  { id: "partner", label: "Partner", description: "Save together", icon: Users },
  { id: "community", label: "Community", description: "Crowdfund a project", icon: Globe2 },
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function formatYen(amount: number): string {
  if (amount <= 0) {
    return "¥ 0";
  }

  return `¥ ${amount.toLocaleString("en-US")}`;
}

function formatDisplayDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function dreamTypeLabel(type: DreamType): string {
  return DREAM_TYPES.find((item) => item.id === type)?.label ?? "Personal";
}

function getOnboardingDotIndex(stepId: (typeof STEP_META)[number]["id"]): number | null {
  if (stepId === "welcome") {
    return 0;
  }

  if (stepId === "intro-confidence") {
    return 1;
  }

  if (stepId === "intro-features") {
    return 2;
  }

  return null;
}

function OnboardingDots({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="v-dream-fund-v0__dots" aria-hidden>
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className={[
            "v-dream-fund-v0__dot",
            index === activeIndex ? "v-dream-fund-v0__dot--active" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      ))}
    </div>
  );
}

function buildCalendarCells(month: Date) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: Array<{ day: number | null; iso: string | null }> = [];

  for (let i = 0; i < firstDay; i += 1) {
    cells.push({ day: null, iso: null });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const iso = new Date(year, monthIndex, day).toISOString().slice(0, 10);
    cells.push({ day, iso });
  }

  return cells;
}

function AmountDrawer({
  amountInput,
  onDigit,
  onBackspace,
  onConfirm,
  onClose,
}: {
  amountInput: string;
  onDigit: (digit: string) => void;
  onBackspace: () => void;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const parsedAmount = Number.parseInt(amountInput, 10) || 0;

  return (
    <div className="v-dream-fund-v0__drawer-stage" role="presentation">
      <button type="button" className="v-dream-fund-v0__drawer-scrim" onClick={onClose} aria-label="Close" />
      <div className="v-dream-fund-v0__drawer" role="dialog" aria-modal="true" aria-labelledby="amount-drawer-title">
        <div>
          <h2 id="amount-drawer-title" className="v-dream-fund-v0__drawer-title">
            How much do you need?
          </h2>
          <p className="v-dream-fund-v0__drawer-desc">This is your target amount.</p>
        </div>
        <p className="v-dream-fund-v0__amount-display">{formatYen(parsedAmount)}</p>
        <div className="v-dream-fund-v0__numpad" aria-label="Amount keypad">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
            <button
              key={digit}
              type="button"
              className="v-dream-fund-v0__numpad-key"
              onClick={() => onDigit(digit)}
            >
              {digit}
            </button>
          ))}
          <button type="button" className="v-dream-fund-v0__numpad-key" disabled aria-hidden />
          <button type="button" className="v-dream-fund-v0__numpad-key" onClick={() => onDigit("0")}>
            0
          </button>
          <button
            type="button"
            className="v-dream-fund-v0__numpad-key"
            onClick={onBackspace}
            aria-label="Backspace"
          >
            ⌫
          </button>
        </div>
        <button
          type="button"
          className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
          disabled={parsedAmount <= 0}
          onClick={onConfirm}
        >
          <span className="v-cmp-btn__label">Done</span>
        </button>
      </div>
    </div>
  );
}

function BalanceDrawer({
  amountInput,
  balanceFrom,
  onDigit,
  onBackspace,
  onFromChange,
  onConfirm,
  onClose,
}: {
  amountInput: string;
  balanceFrom: string;
  onDigit: (digit: string) => void;
  onBackspace: () => void;
  onFromChange: (from: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const parsedAmount = Number.parseInt(amountInput, 10) || 0;

  return (
    <div className="v-dream-fund-v0__drawer-stage" role="presentation">
      <button type="button" className="v-dream-fund-v0__drawer-scrim" onClick={onClose} aria-label="Close" />
      <div
        className="v-dream-fund-v0__drawer v-dream-fund-v0__drawer--balance"
        role="dialog"
        aria-modal="true"
        aria-labelledby="balance-drawer-title"
      >
        <div>
          <h2 id="balance-drawer-title" className="v-dream-fund-v0__drawer-title">
            How much money do you have today?
          </h2>
          <p className="v-dream-fund-v0__drawer-desc">
            Add the money you already have right now. You can edit this later.
          </p>
        </div>
        <label className="v-dream-fund-v0__field">
          <span className="v-dream-fund-v0__field-label">Amount</span>
          <p className="v-dream-fund-v0__amount-display">{formatYen(parsedAmount)}</p>
        </label>
        <div className="v-dream-fund-v0__numpad" aria-label="Amount keypad">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
            <button
              key={digit}
              type="button"
              className="v-dream-fund-v0__numpad-key"
              onClick={() => onDigit(digit)}
            >
              {digit}
            </button>
          ))}
          <button type="button" className="v-dream-fund-v0__numpad-key" disabled aria-hidden />
          <button type="button" className="v-dream-fund-v0__numpad-key" onClick={() => onDigit("0")}>
            0
          </button>
          <button
            type="button"
            className="v-dream-fund-v0__numpad-key"
            onClick={onBackspace}
            aria-label="Backspace"
          >
            ⌫
          </button>
        </div>
        <label className="v-dream-fund-v0__field">
          <span className="v-dream-fund-v0__field-label">Where is this money?</span>
          <select
            className="v-dream-fund-v0__field-input v-dream-fund-v0__field-select"
            value={balanceFrom}
            onChange={(event) => onFromChange(event.target.value)}
          >
            {BALANCE_SOURCE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
          disabled={parsedAmount <= 0}
          onClick={onConfirm}
        >
          <span className="v-cmp-btn__label">Save Current Balance</span>
        </button>
      </div>
    </div>
  );
}

function IncomingMoneyDrawer({
  draft,
  onDraftChange,
  onConfirm,
  onClose,
}: {
  draft: Omit<RecurringIncomeDraft, "id">;
  onDraftChange: (patch: Partial<Omit<RecurringIncomeDraft, "id">>) => void;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const canSave = draft.amount > 0 && Boolean(draft.startDate);

  return (
    <div className="v-dream-fund-v0__drawer-stage" role="presentation">
      <button type="button" className="v-dream-fund-v0__drawer-scrim" onClick={onClose} aria-label="Close" />
      <div
        className="v-dream-fund-v0__drawer v-dream-fund-v0__drawer--form"
        role="dialog"
        aria-modal="true"
        aria-labelledby="incoming-drawer-title"
      >
        <div>
          <h2 id="incoming-drawer-title" className="v-dream-fund-v0__drawer-title">
            Add money coming in
          </h2>
          <p className="v-dream-fund-v0__drawer-desc">Tell us about money you expect to receive.</p>
        </div>
        <label className="v-dream-fund-v0__field">
          <span className="v-dream-fund-v0__field-label">Amount</span>
          <div className="v-dream-fund-v0__field-input-wrap">
            <span className="v-dream-fund-v0__field-prefix">¥</span>
            <input
              className="v-dream-fund-v0__field-input v-dream-fund-v0__field-input--prefixed"
              inputMode="numeric"
              value={draft.amount > 0 ? draft.amount.toLocaleString("en-US") : ""}
              onChange={(event) =>
                onDraftChange({
                  amount: Number.parseInt(event.target.value.replace(/\D/g, ""), 10) || 0,
                })
              }
              placeholder="300,000"
            />
          </div>
        </label>
        <label className="v-dream-fund-v0__field">
          <span className="v-dream-fund-v0__field-label">How often do you receive it?</span>
          <select
            className="v-dream-fund-v0__field-input v-dream-fund-v0__field-select"
            value={draft.frequency}
            onChange={(event) =>
              onDraftChange({ frequency: event.target.value as IncomeFrequency })
            }
          >
            {INCOME_FREQUENCY_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="v-dream-fund-v0__field">
          <span className="v-dream-fund-v0__field-label">What is this money?</span>
          <select
            className="v-dream-fund-v0__field-input v-dream-fund-v0__field-select"
            value={draft.typeId}
            onChange={(event) =>
              onDraftChange({ typeId: event.target.value as RecurringIncomeTypeId })
            }
          >
            {MONEY_COMING_IN_TYPES.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="v-dream-fund-v0__field">
          <span className="v-dream-fund-v0__field-label">Start date</span>
          <input
            className="v-dream-fund-v0__field-input"
            type="date"
            value={draft.startDate}
            onChange={(event) => onDraftChange({ startDate: event.target.value })}
          />
        </label>
        <label className="v-dream-fund-v0__field">
          <span className="v-dream-fund-v0__field-label">Note (optional)</span>
          <input
            className="v-dream-fund-v0__field-input"
            value={draft.note}
            onChange={(event) => onDraftChange({ note: event.target.value })}
            placeholder="e.g. From my main job"
          />
        </label>
        <button
          type="button"
          className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
          disabled={!canSave}
          onClick={onConfirm}
        >
          <span className="v-cmp-btn__label">Save</span>
        </button>
      </div>
    </div>
  );
}

function DateDrawer({
  calendarMonth,
  selectedDate,
  onMonthChange,
  onSelectDate,
  onConfirm,
  onClose,
}: {
  calendarMonth: Date;
  selectedDate: string | null;
  onMonthChange: (next: Date) => void;
  onSelectDate: (iso: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const cells = useMemo(() => buildCalendarCells(calendarMonth), [calendarMonth]);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="v-dream-fund-v0__drawer-stage" role="presentation">
      <button type="button" className="v-dream-fund-v0__drawer-scrim" onClick={onClose} aria-label="Close" />
      <div className="v-dream-fund-v0__drawer" role="dialog" aria-modal="true" aria-labelledby="date-drawer-title">
        <div>
          <h2 id="date-drawer-title" className="v-dream-fund-v0__drawer-title">
            When do you want to achieve it?
          </h2>
          <p className="v-dream-fund-v0__drawer-desc">Set your target date.</p>
        </div>
        <div className="v-dream-fund-v0__calendar">
          <div className="v-dream-fund-v0__calendar-head">
            <button
              type="button"
              className="v-dream-fund-v0__icon-btn"
              onClick={() =>
                onMonthChange(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))
              }
              aria-label="Previous month"
            >
              <ChevronLeft strokeWidth={2} size={18} />
            </button>
            <p className="v-dream-fund-v0__calendar-title">
              {calendarMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
            <button
              type="button"
              className="v-dream-fund-v0__icon-btn"
              onClick={() =>
                onMonthChange(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))
              }
              aria-label="Next month"
            >
              <ChevronRight strokeWidth={2} size={18} />
            </button>
          </div>
          <div className="v-dream-fund-v0__calendar-grid">
            {WEEKDAYS.map((day) => (
              <span key={day} className="v-dream-fund-v0__calendar-weekday">
                {day}
              </span>
            ))}
            {cells.map((cell, index) => {
              if (!cell.day || !cell.iso) {
                return <span key={`blank-${index}`} />;
              }

              const selected = selectedDate === cell.iso;
              const muted = cell.iso < today;

              return (
                <button
                  key={cell.iso}
                  type="button"
                  className={[
                    "v-dream-fund-v0__calendar-day",
                    selected ? "v-dream-fund-v0__calendar-day--selected" : "",
                    muted ? "v-dream-fund-v0__calendar-day--muted" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={muted}
                  onClick={() => onSelectDate(cell.iso!)}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
          disabled={!selectedDate}
          onClick={onConfirm}
        >
          <span className="v-cmp-btn__label">Done</span>
        </button>
      </div>
    </div>
  );
}

export function CreateFirstDreamFlow() {
  const router = useRouter();
  const {
    state,
    hydrated,
    addGoal,
    updateGoal,
    deleteGoal,
    completeOnboarding,
    completeSignUp,
    setupFinances,
    addBills,
    addTransaction,
    getGoalById,
    resetState,
  } = useDreamFundApp();
  const [stepIndex, setStepIndex] = useState(0);
  const [bootstrapped, setBootstrapped] = useState(false);
  const [drawer, setDrawer] = useState<DrawerKind>(null);
  const [draft, setDraft] = useState<DreamDraft>({
    type: "personal",
    name: "",
    amount: 0,
    targetDate: null,
  });
  const [accountName, setAccountName] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [incomeDraft, setIncomeDraft] = useState<IncomeSetupDraft>({
    currentBalance: null,
    recurringIncomes: [],
  });
  const [balanceDraft, setBalanceDraft] = useState<CurrentBalanceDraft>({
    amount: 0,
    from: "Bank account",
    note: "",
  });
  const [recurringDraft, setRecurringDraft] = useState<Omit<RecurringIncomeDraft, "id">>({
    typeId: "salary",
    amount: 0,
    frequency: "monthly",
    startDate: new Date().toISOString().slice(0, 10),
    note: "",
  });
  const [editingRecurringId, setEditingRecurringId] = useState<string | null>(null);
  const [moneyReturnToReview, setMoneyReturnToReview] = useState(false);
  const [billsFlowOpen, setBillsFlowOpen] = useState(false);
  const [billDrawerOpen, setBillDrawerOpen] = useState(false);
  const [billDraft, setBillDraft] = useState<BillDraft>(createEmptyBillDraft());
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [spendingStep, setSpendingStep] = useState<SpendingStepId | null>(null);
  const [spendingDraft, setSpendingDraft] = useState<SpendingDraft>(createEmptySpendingDraft);
  const [savedSpendingTitle, setSavedSpendingTitle] = useState<string | null>(null);
  const [homeDetailView, setHomeDetailView] = useState<HomeDetailView | null>(null);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [goalMenuOpen, setGoalMenuOpen] = useState(false);
  const [goalAddMoneyOpen, setGoalAddMoneyOpen] = useState(false);
  const goalMenuRef = useRef<HTMLDivElement>(null);
  const [homeTab, setHomeTab] = useState<V0HomeTab>("home");
  const [homeFlowReturn, setHomeFlowReturn] = useState(false);
  const [amountInput, setAmountInput] = useState("0");
  const [balanceAmountInput, setBalanceAmountInput] = useState("0");
  const [dateDraft, setDateDraft] = useState<string | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const step = STEP_META[stepIndex];
  const onboardingDotIndex = getOnboardingDotIndex(step.id);
  const isOnboarding = onboardingDotIndex !== null;
  const incomeHeaderIndex = INCOME_HEADER_STEPS.indexOf(
    step.id as (typeof INCOME_HEADER_STEPS)[number],
  );
  const isIncomeStep = incomeHeaderIndex >= 0;
  const isHomeStep = step.id === "home";
  const isLoginStep = step.id === "login";
  const isHomeDetail = homeDetailView !== null;
  const isSpendingFlow = spendingStep !== null;
  const isBillFlow = billsFlowOpen;
  const showHomeTabBar = isHomeStep && !isSpendingFlow && !isBillFlow && !isHomeDetail;
  const spendingMeta = spendingStep ? SPENDING_FLOW_META[spendingStep] : null;
  const spendingProgress = spendingMeta
    ? ((Math.min(spendingMeta.progressIndex, SPENDING_PROGRESS_STEPS - 1) + 1) /
        SPENDING_PROGRESS_STEPS) *
      100
    : 0;
  const showFlowHeader =
    (FLOW_HEADER_STEPS.includes(step.id as (typeof FLOW_HEADER_STEPS)[number]) ||
      isIncomeStep ||
      isLoginStep) &&
    !isHomeStep;
  const flowHeaderIndex = FLOW_HEADER_STEPS.indexOf(step.id as (typeof FLOW_HEADER_STEPS)[number]);
  const progress =
    incomeHeaderIndex >= 0
      ? ((incomeHeaderIndex + 1) / INCOME_HEADER_STEPS.length) * 100
      : flowHeaderIndex >= 0
        ? ((flowHeaderIndex + 1) / FLOW_HEADER_STEPS.length) * 100
        : 0;
  const isCelebration = step.id === "success";
  const isAccountStep = step.id === "account";
  const isIncomeFooterStep = INCOME_FOOTER_STEPS.includes(
    step.id as (typeof INCOME_FOOTER_STEPS)[number],
  );
  const firstName = state.profile.name.split(" ")[0];

  function goToStepById(stepId: (typeof STEP_META)[number]["id"]) {
    const index = STEP_META.findIndex((item) => item.id === stepId);

    if (index >= 0) {
      setStepIndex(index);
    }
  }

  function resetRecurringDraft() {
    setRecurringDraft({
      typeId: "salary",
      amount: 0,
      frequency: "monthly",
      startDate: new Date().toISOString().slice(0, 10),
      note: "",
    });
  }

  function persistDreamToApp() {
    const dreamName = draft.name.trim() || "My Dream";

    addGoal({
      name: dreamName,
      targetAmount: draft.amount,
      targetDate: draft.targetDate ?? undefined,
      monthlyAllocation: Math.max(1000, Math.ceil(draft.amount / 12)),
      priority: "high",
      emoji: draft.type === "partner" ? "👥" : draft.type === "community" ? "🌍" : "✨",
    });
  }

  function startIncomeSetup() {
    persistDreamToApp();
    goToStepById("money-intro");
  }

  function handleSkipAccount() {
    startIncomeSetup();
  }

  function handleCreateAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    completeSignUp(
      accountName.trim() || "Jennie Kim",
      accountEmail.trim() || "jennie@example.com",
    );
    startIncomeSetup();
  }

  function openBalanceDrawer(returnToReview = false) {
    const existing = incomeDraft.currentBalance ?? balanceDraft;
    setBalanceDraft(existing);
    setBalanceAmountInput(existing.amount > 0 ? String(existing.amount) : "0");
    setMoneyReturnToReview(returnToReview);
    setDrawer("balance");
  }

  function handleContinueFromMoneyIntro() {
    openBalanceDrawer(false);
  }

  function handleSaveCurrentBalance() {
    const amount = Number.parseInt(balanceAmountInput, 10) || 0;

    if (amount <= 0) {
      return;
    }

    const returnToReview = moneyReturnToReview;
    const savedBalance: CurrentBalanceDraft = {
      ...balanceDraft,
      amount,
    };

    setBalanceDraft(savedBalance);
    setIncomeDraft((current) => ({
      ...current,
      currentBalance: savedBalance,
    }));
    setDrawer(null);
    setMoneyReturnToReview(false);

    if (returnToReview) {
      goToStepById("money-review");
      return;
    }

    goToStepById("money-incoming-prompt");
  }

  function closeIncomingDrawer() {
    setMoneyReturnToReview(false);
    setEditingRecurringId(null);
    resetRecurringDraft();
    setDrawer(null);
  }

  function openIncomingDrawer(returnToReview = false, editingId: string | null = null) {
    if (editingId) {
      const income = incomeDraft.recurringIncomes.find((item) => item.id === editingId);

      if (!income) {
        return;
      }

      setEditingRecurringId(editingId);
      setRecurringDraft({
        typeId: income.typeId,
        amount: income.amount,
        frequency: income.frequency,
        startDate: income.startDate,
        note: income.note,
      });
    } else {
      setEditingRecurringId(null);
      resetRecurringDraft();
    }

    setMoneyReturnToReview(returnToReview);
    setDrawer("incoming");
  }

  function handleStartAddMoneyIncoming() {
    openIncomingDrawer(false);
  }

  function handleSkipMoneyIncoming() {
    goToStepById("money-review");
  }

  function handleSaveRecurringIncome() {
    if (recurringDraft.amount <= 0 || !recurringDraft.startDate) {
      return;
    }

    const entry: RecurringIncomeDraft = {
      id: editingRecurringId ?? createDreamFundId("income"),
      ...recurringDraft,
    };

    setIncomeDraft((current) => ({
      ...current,
      recurringIncomes: editingRecurringId
        ? current.recurringIncomes.map((item) => (item.id === editingRecurringId ? entry : item))
        : [...current.recurringIncomes, entry],
    }));
    closeIncomingDrawer();
    goToStepById("money-review");
  }

  function handleEditBalance() {
    openBalanceDrawer(true);
  }

  function handleEditRecurring(id: string) {
    openIncomingDrawer(true, id);
  }

  function handleDeleteRecurring(id: string) {
    setIncomeDraft((current) => ({
      ...current,
      recurringIncomes: current.recurringIncomes.filter((item) => item.id !== id),
    }));
  }

  function handleAddMoreIncome() {
    openIncomingDrawer(true);
  }

  function goToHome() {
    setHomeDetailView(null);
    setSelectedGoalId(null);
    setHomeTab("home");
    goToStepById("home");
  }

  function exitHomeDetail() {
    setGoalMenuOpen(false);
    setGoalAddMoneyOpen(false);

    if (homeDetailView === "goal-edit") {
      setHomeDetailView("goal-detail");
      return;
    }

    setHomeDetailView(null);
    setSelectedGoalId(null);
  }

  function handleSelectGoal(goalId: string) {
    setSelectedGoalId(goalId);
    setHomeDetailView("goal-detail");
    setGoalMenuOpen(false);
    setGoalAddMoneyOpen(false);
  }

  function handleAddGoal() {
    setSelectedGoalId(null);
    setHomeDetailView("goal-add");
    setGoalMenuOpen(false);
    setGoalAddMoneyOpen(false);
  }

  function handleCreateGoal(values: GoalFormValues) {
    addGoal({
      name: values.name,
      targetAmount: values.targetAmount,
      targetDate: values.targetDate || undefined,
      monthlyAllocation: values.monthlyAllocation,
      priority: values.priority,
      emoji: values.emoji,
    });
    setHomeDetailView(null);
    setHomeTab("goals");
  }

  function handleUpdateGoal(values: GoalFormValues) {
    if (!selectedGoalId) {
      return;
    }

    updateGoal(selectedGoalId, {
      name: values.name,
      targetAmount: values.targetAmount,
      targetDate: values.targetDate || undefined,
      monthlyAllocation: values.monthlyAllocation,
      priority: values.priority,
      emoji: values.emoji,
    });
    setHomeDetailView("goal-detail");
  }

  function handleDeleteGoal() {
    if (!selectedGoalId) {
      return;
    }

    deleteGoal(selectedGoalId);
    setGoalMenuOpen(false);
    setGoalAddMoneyOpen(false);
    setHomeDetailView(null);
    setSelectedGoalId(null);
    setHomeTab("goals");
  }

  function handleEditGoal() {
    setGoalMenuOpen(false);
    setHomeDetailView("goal-edit");
  }

  function handleViewAllGoals() {
    setHomeDetailView(null);
    setSelectedGoalId(null);
    setHomeTab("goals");
  }

  function handleResetPrototype() {
    resetState();
    setHomeTab("home");
    setHomeDetailView(null);
    setSelectedGoalId(null);
    setSpendingStep(null);
    setSpendingDraft(createEmptySpendingDraft());
    setBillDrawerOpen(false);
    setBillsFlowOpen(false);
    setBillDraft(createEmptyBillDraft());
    setHomeFlowReturn(false);
    setStepIndex(0);
    setBootstrapped(false);
  }

  function startIncomeFromHome() {
    setHomeFlowReturn(true);
    setIncomeDraft({
      currentBalance:
        state.currentBalance > 0
          ? {
              amount: state.currentBalance,
              from: "Bank account",
              note: "",
            }
          : null,
      recurringIncomes: state.recurringIncomes.map((income) => ({
        id: income.id,
        typeId: income.typeId as RecurringIncomeTypeId,
        amount: income.amount,
        frequency: income.frequency as IncomeFrequency,
        startDate: income.startDate,
        note: income.note ?? "",
      })),
    });
    goToStepById("money-review");
  }

  function startBillsFlow() {
    setBillDraft(createEmptyBillDraft());
    setBillDrawerOpen(false);
    setBillsFlowOpen(true);
  }

  function startAddBill() {
    setBillDraft(createEmptyBillDraft());
    setBillDrawerOpen(true);
  }

  function closeBillDrawer() {
    setBillDrawerOpen(false);
    setBillDraft(createEmptyBillDraft());
  }

  function exitBillsFlow() {
    setBillDrawerOpen(false);
    setBillsFlowOpen(false);
    setBillDraft(createEmptyBillDraft());
  }

  function handleSaveBill() {
    if (!billDraft.name.trim() || billDraft.amount <= 0 || !billDraft.dueDate) {
      return;
    }

    addBills([
      {
        name: billDraft.name.trim(),
        amount: billDraft.amount,
        dueDate: billDraft.dueDate,
        frequency: billDraft.frequency,
      },
    ]);
    closeBillDrawer();
  }

  function handleBillHeaderBack() {
    if (billDrawerOpen) {
      closeBillDrawer();
      return;
    }

    exitBillsFlow();
  }

  function exitSpendingFlow() {
    setSpendingStep(null);
    setSpendingDraft(createEmptySpendingDraft());
    setSavedSpendingTitle(null);
  }

  function startSpendingFlow() {
    setSpendingDraft(createEmptySpendingDraft());
    setSavedSpendingTitle(null);
    setSpendingStep("choose-method");
  }

  function handleChooseSpendingMethod(method: SpendingMethod) {
    setSpendingDraft((current) => ({ ...current, method }));

    if (method === "quick-log") {
      setSpendingStep("quick-pick");
      return;
    }

    if (method === "scan") {
      setSpendingStep("scan");
      return;
    }

    setSpendingStep("amount");
  }

  function handleSelectQuickLogItem(itemId: string) {
    const item = QUICK_LOG_ITEMS.find((entry) => entry.id === itemId);

    if (!item) {
      return;
    }

    setSpendingDraft((current) => ({
      ...current,
      method: "quick-log",
      title: item.label,
      amount: item.amount,
      category: item.category,
    }));
    setSpendingStep("amount");
  }

  function handleSaveSpendingExpense() {
    const title = spendingDraft.title.trim() || spendingDraft.category;

    addTransaction({
      title,
      amount: spendingDraft.amount,
      type: "expense",
      category: spendingDraft.category,
      date: new Date().toISOString().slice(0, 10),
    });
    setSavedSpendingTitle(title);
    setSpendingStep("success");
  }

  function goBackSpending() {
    if (!spendingStep) {
      return;
    }

    if (spendingStep === "choose-method") {
      exitSpendingFlow();
      return;
    }

    if (spendingStep === "quick-pick" || spendingStep === "scan") {
      setSpendingStep("choose-method");
      return;
    }

    if (spendingStep === "amount") {
      if (spendingDraft.method === "quick-log") {
        setSpendingStep("quick-pick");
        return;
      }

      if (spendingDraft.method === "scan") {
        setSpendingStep("scan");
        return;
      }

      setSpendingStep("choose-method");
      return;
    }

    if (spendingStep === "category") {
      setSpendingStep("amount");
      return;
    }

    if (spendingStep === "success") {
      exitSpendingFlow();
    }
  }

  function handleHomeNavigate(action: V0HomeAction) {
    if (action === "spending") {
      setHomeDetailView(null);
      startSpendingFlow();
      return;
    }

    if (action === "income") {
      setHomeDetailView(null);
      startIncomeFromHome();
      return;
    }

    if (action === "bill") {
      setHomeDetailView(null);
      startBillsFlow();
      return;
    }

    if (action === "update") {
      setHomeDetailView("quick-update");
      return;
    }

    if (action === "goals-list") {
      handleViewAllGoals();
      return;
    }

    setHomeDetailView(action);
  }

  function handleQuickUpdateSelect(action: V0HomeAction | "none" | "update") {
    if (action === "update") {
      setHomeDetailView("quick-update");
      return;
    }

    if (action === "none") {
      setHomeDetailView(null);
      return;
    }

    if (action === "goals-list") {
      handleViewAllGoals();
      return;
    }

    setHomeDetailView(null);

    if (action === "income") {
      startIncomeFromHome();
      return;
    }

    if (action === "bill") {
      startBillsFlow();
      return;
    }

    if (action === "spending") {
      startSpendingFlow();
    }
  }

  const homeTabTitle: Record<V0HomeTab, string | null> = {
    home: null,
    goals: "My Goals",
    insights: "Insights",
    profile: "Profile",
  };

  const selectedGoal = selectedGoalId ? getGoalById(selectedGoalId) : null;
  const selectedGoalFunded = Boolean(
    selectedGoal && selectedGoal.savedAmount >= selectedGoal.targetAmount,
  );
  const homeDetailTitle =
    homeDetailView && isHomeDetail
      ? getHomeDetailTitle(homeDetailView, selectedGoal?.name)
      : null;

  useEffect(() => {
    if (!goalMenuOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!goalMenuRef.current?.contains(event.target as Node)) {
        setGoalMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [goalMenuOpen]);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!state.hasOnboarded) {
      setLoginError("No account found yet. Continue with Get Started first.");
      return;
    }

    completeSignUp(loginEmail.trim() || state.profile.email, loginEmail.trim() || state.profile.email);
    setLoginError("");
    goToHome();
  }

  useEffect(() => {
    if (!hydrated || bootstrapped) {
      return;
    }

    if (state.hasOnboarded) {
      goToStepById("home");
    }

    setBootstrapped(true);
  }, [bootstrapped, hydrated, state.hasOnboarded]);

  function handleSaveAllIncomes() {
    setupFinances({
      currentBalance: incomeDraft.currentBalance?.amount ?? 0,
      balanceSource: incomeDraft.currentBalance?.from,
      balanceNote: incomeDraft.currentBalance?.note || undefined,
      recurringIncomes: incomeDraft.recurringIncomes.map((item) => ({
        id: item.id,
        typeId: item.typeId,
        label: recurringIncomeLabel(item.typeId),
        amount: item.amount,
        frequency: item.frequency,
        startDate: item.startDate,
        note: item.note || undefined,
      })),
    });

    if (homeFlowReturn) {
      setHomeFlowReturn(false);
      goToHome();
      return;
    }

    completeOnboarding();
    goToHome();
  }

  useEffect(() => {
    if (drawer !== "amount") {
      return;
    }

    setAmountInput(draft.amount > 0 ? String(draft.amount) : "0");
  }, [drawer, draft.amount]);

  useEffect(() => {
    if (drawer !== "date") {
      return;
    }

    setDateDraft(draft.targetDate);

    if (draft.targetDate) {
      const selected = new Date(draft.targetDate);
      setCalendarMonth(new Date(selected.getFullYear(), selected.getMonth(), 1));
    }
  }, [drawer, draft.targetDate]);

  function goBack() {
    if (drawer) {
      if (drawer === "balance" || drawer === "incoming") {
        if (drawer === "incoming") {
          setEditingRecurringId(null);
          resetRecurringDraft();
        }

        setMoneyReturnToReview(false);
      }

      setDrawer(null);
      return;
    }

    if (stepIndex === 0) {
      router.push("/dream-fund");
      return;
    }

    if (step.id === "money-incoming-prompt") {
      goToStepById("money-intro");
      return;
    }

    if (step.id === "money-intro") {
      if (homeFlowReturn) {
        setHomeFlowReturn(false);
        goToHome();
        return;
      }

      goToStepById("account");
      return;
    }

    if (step.id === "money-review") {
      if (homeFlowReturn) {
        setHomeFlowReturn(false);
        goToHome();
        return;
      }

      goToStepById("money-incoming-prompt");
      return;
    }

    if (step.id === "login") {
      goToStepById("welcome");
      return;
    }

    setStepIndex((current) => Math.max(0, current - 1));
  }

  function goNext() {
    if (stepIndex < STEP_META.length - 1) {
      setStepIndex((current) => current + 1);
    }
  }

  function handleNumpad(value: string) {
    setAmountInput((current) => {
      const next = current === "0" ? value : `${current}${value}`;
      const parsed = Number.parseInt(next, 10);

      if (!Number.isFinite(parsed)) {
        return current;
      }

      return String(Math.min(parsed, 99_999_999));
    });
  }

  function handleBackspace() {
    setAmountInput((current) => (current.length <= 1 ? "0" : current.slice(0, -1)));
  }

  function handleBalanceNumpad(value: string) {
    setBalanceAmountInput((current) => {
      const next = current === "0" ? value : `${current}${value}`;
      const parsed = Number.parseInt(next, 10);

      if (!Number.isFinite(parsed)) {
        return current;
      }

      return String(Math.min(parsed, 99_999_999));
    });
  }

  function handleBalanceBackspace() {
    setBalanceAmountInput((current) => (current.length <= 1 ? "0" : current.slice(0, -1)));
  }

  function confirmAmount() {
    const parsed = Number.parseInt(amountInput, 10) || 0;

    if (parsed <= 0) {
      return;
    }

    setDraft((current) => ({ ...current, amount: parsed }));
    setDrawer(null);
  }

  function confirmDate() {
    if (!dateDraft) {
      return;
    }

    setDraft((current) => ({ ...current, targetDate: dateDraft }));
    setDrawer(null);
  }

  const canContinue =
    step.id === "type" ||
    (step.id === "details" &&
      draft.name.trim().length > 0 &&
      draft.amount > 0 &&
      Boolean(draft.targetDate)) ||
    step.id === "review";

  const canCreateAccount =
    accountName.trim().length > 0 &&
    accountEmail.trim().length > 0 &&
    accountPassword.trim().length >= 6;

  const canContinueMoneySetup =
    incomeDraft.currentBalance !== null && incomeDraft.currentBalance.amount > 0;

  const canLogin =
    loginEmail.trim().length > 0 && loginPassword.trim().length >= 6;

  const canContinueSpendingAmount =
    spendingDraft.amount > 0 &&
    (spendingDraft.method !== "custom" || spendingDraft.title.trim().length > 0);
  const canSaveSpending =
    spendingDraft.amount > 0 &&
    Boolean(spendingDraft.category) &&
    (spendingDraft.title.trim().length > 0 || spendingDraft.method !== "custom");

  const goalDetailMenu = (
    <div className="v-dream-fund-v0__header-menu" ref={goalMenuRef}>
      <V0HeaderIconButton
        label="Goal options"
        expanded={goalMenuOpen}
        onClick={() => setGoalMenuOpen((open) => !open)}
      >
        <MoreHorizontal strokeWidth={2} size={20} />
      </V0HeaderIconButton>
      {goalMenuOpen ? (
        <div className="v-dream-fund-v0__goal-detail-menu" role="menu">
          <button
            type="button"
            className="v-dream-fund-v0__goal-detail-menu-item"
            role="menuitem"
            onClick={handleEditGoal}
          >
            Edit goal
          </button>
          <button
            type="button"
            className="v-dream-fund-v0__goal-detail-menu-item v-dream-fund-v0__goal-detail-menu-item--danger"
            role="menuitem"
            onClick={handleDeleteGoal}
          >
            Delete goal
          </button>
        </div>
      ) : null}
    </div>
  );

  return (
    <div className="v-dream-fund-v0 v-theme-dream-fund">
      <div className="v-dream-fund-v0__device">
        {isSpendingFlow && spendingMeta ? (
          <V0ScreenHeader
            title={spendingStep === "success" ? undefined : spendingMeta.label}
            left={
              <V0HeaderIconButton label="Back" onClick={goBackSpending}>
                <ArrowLeft strokeWidth={2} size={20} />
              </V0HeaderIconButton>
            }
            right={
              <V0HeaderIconButton label="Close" onClick={exitSpendingFlow}>
                <X strokeWidth={2} size={20} />
              </V0HeaderIconButton>
            }
            progress={spendingStep !== "success" ? spendingProgress : null}
          />
        ) : isBillFlow ? (
          <V0ScreenHeader
            title="Your bills"
            left={
              <V0HeaderIconButton label="Back" onClick={handleBillHeaderBack}>
                <ArrowLeft strokeWidth={2} size={20} />
              </V0HeaderIconButton>
            }
            right={
              <V0HeaderIconButton label="Close" onClick={exitBillsFlow}>
                <X strokeWidth={2} size={20} />
              </V0HeaderIconButton>
            }
          />
        ) : isHomeStep && isHomeDetail ? (
          <V0ScreenHeader
            title={homeDetailTitle ?? undefined}
            left={
              <V0HeaderIconButton label="Back" onClick={exitHomeDetail}>
                <ArrowLeft strokeWidth={2} size={20} />
              </V0HeaderIconButton>
            }
            right={homeDetailView === "goal-detail" ? goalDetailMenu : undefined}
          />
        ) : isHomeStep && !isHomeDetail && !isSpendingFlow && !isBillFlow ? (
          homeTab === "home" ? (
            <V0ScreenHeader
              variant="brand"
              brand={{
                greeting: `🌱 ${greetingForHour()}`,
                name: firstName,
              }}
            />
          ) : (
            <V0ScreenHeader
              title={homeTabTitle[homeTab] ?? undefined}
              right={
                homeTab === "goals" ? (
                  <V0HeaderIconButton label="Add goal" onClick={handleAddGoal}>
                    <Plus strokeWidth={2} size={20} />
                  </V0HeaderIconButton>
                ) : undefined
              }
            />
          )
        ) : showFlowHeader ? (
          <V0ScreenHeader
            title={step.label}
            left={
              <V0HeaderIconButton label="Back" onClick={goBack}>
                <ArrowLeft strokeWidth={2} size={20} />
              </V0HeaderIconButton>
            }
            right={
              <Link href="/dream-fund" className="v-dream-fund-v0__icon-btn" aria-label="Close">
                <X strokeWidth={2} size={20} />
              </Link>
            }
            progress={progress}
          />
        ) : null}

        <main
          className={[
            "v-dream-fund-v0__main",
            isCelebration ? "v-dream-fund-v0__main--success" : "",
            isOnboarding ? "v-dream-fund-v0__main--onboarding" : "",
            step.id === "welcome" ? "v-dream-fund-v0__main--onboarding-welcome" : "",
            step.id === "intro-features" ? "v-dream-fund-v0__main--onboarding-features" : "",
            isIncomeStep ? "v-dream-fund-v0__main--flow" : "",
            isHomeStep && !isSpendingFlow && !isBillFlow && !isHomeDetail ? "v-dream-fund-v0__main--home v-dream-fund-v0__main--with-tabbar" : "",
            isHomeStep && isHomeDetail ? "v-dream-fund-v0__main--home-detail v-dream-fund-v0__main--flow" : "",
            isSpendingFlow ? "v-dream-fund-v0__main--flow" : "",
            isBillFlow ? "v-dream-fund-v0__main--flow" : "",
            spendingStep === "success" ? "v-dream-fund-v0__main--success" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {step.id === "welcome" ? (
            <section className="v-dream-fund-v0__welcome">
              <div className="v-dream-fund-v0__welcome-brand">
                <p className="v-dream-fund-v0__welcome-kicker">Welcome to</p>
                <h1 className="v-dream-fund-v0__welcome-title">
                  Dream Fund
                  <Sprout strokeWidth={2} size={22} aria-hidden />
                </h1>
                <p className="v-dream-fund-v0__welcome-desc">
                  A simple way to manage your money and achieve your dreams.
                </p>
              </div>
              <div
                className="v-dream-fund-v0__onboarding-hero"
                role="img"
                aria-label="Dream Fund mascot illustration placeholder"
              />
            </section>
          ) : null}

          {step.id === "intro-confidence" ? (
            <section className="v-dream-fund-v0__intro-panel">
              <button
                type="button"
                className="v-dream-fund-v0__intro-back"
                onClick={goBack}
                aria-label="Back"
              >
                <ArrowLeft strokeWidth={2} size={20} />
              </button>
              <div className="v-dream-fund-v0__intro-copy">
                <h1 className="v-dream-fund-v0__intro-title">
                  Save toward what{" "}
                  <span className="v-dream-fund-v0__intro-accent">matters</span>
                </h1>
                <p className="v-dream-fund-v0__intro-desc">
                  No guilt-driven tracking — just clear steps toward the life you want.
                </p>
              </div>
              <div
                className="v-dream-fund-v0__onboarding-hero v-dream-fund-v0__onboarding-hero--compact"
                role="img"
                aria-label="Saving with confidence illustration placeholder"
              />
            </section>
          ) : null}

          {step.id === "intro-features" ? (
            <section className="v-dream-fund-v0__intro-panel">
              <button
                type="button"
                className="v-dream-fund-v0__intro-back"
                onClick={goBack}
                aria-label="Back"
              >
                <ArrowLeft strokeWidth={2} size={20} />
              </button>
              <div className="v-dream-fund-v0__intro-copy">
                <h1 className="v-dream-fund-v0__intro-title">
                  We&apos;ll help you stay{" "}
                  <span className="v-dream-fund-v0__intro-accent">on track</span>
                  <span aria-hidden> ✨</span>
                </h1>
                <p className="v-dream-fund-v0__intro-desc">
                  Here&apos;s what you can do with Dream Fund.
                </p>
              </div>
              <ul className="v-dream-fund-v0__feature-list">
                {INTRO_FEATURES.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <li key={feature.title}>
                      <div className="v-dream-fund-v0__feature-card">
                        <span
                          className={[
                            "v-dream-fund-v0__feature-icon",
                            feature.iconVariant === "star"
                              ? "v-dream-fund-v0__feature-icon--star"
                              : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          <Icon
                            strokeWidth={2}
                            size={20}
                            fill={feature.iconVariant === "star" ? "currentColor" : "none"}
                            aria-hidden
                          />
                        </span>
                        <div>
                          <p className="v-dream-fund-v0__feature-title">{feature.title}</p>
                          <p className="v-dream-fund-v0__feature-desc">{feature.description}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}

          {step.id === "type" ? (
            <>
              <div>
                <h1 className="v-dream-fund-v0__title">What kind of dream is this?</h1>
                <p className="v-dream-fund-v0__desc">You can change this later.</p>
              </div>
              <ul className="v-dream-fund-v0__option-list">
                {DREAM_TYPES.map((option) => {
                  const Icon = option.icon;
                  const selected = draft.type === option.id;

                  return (
                    <li key={option.id}>
                      <button
                        type="button"
                        className={[
                          "v-dream-fund-v0__option",
                          selected ? "v-dream-fund-v0__option--selected" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => setDraft((current) => ({ ...current, type: option.id }))}
                      >
                        <span className="v-dream-fund-v0__option-icon">
                          <Icon strokeWidth={2} size={20} />
                        </span>
                        <span>
                          <span className="v-dream-fund-v0__option-label">{option.label}</span>
                          <span className="v-dream-fund-v0__option-desc">{option.description}</span>
                        </span>
                        {selected ? <Check strokeWidth={2} size={18} aria-hidden /> : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : null}

          {step.id === "details" ? (
            <>
              <div>
                <h1 className="v-dream-fund-v0__title">Tell us about your dream</h1>
                <p className="v-dream-fund-v0__desc">The more details, the better!</p>
              </div>
              <label className="v-dream-fund-v0__field">
                <span className="v-dream-fund-v0__field-label">Dream Name</span>
                <input
                  className="v-dream-fund-v0__field-input"
                  value={draft.name}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder="e.g. Trip to Kyoto"
                />
              </label>
              <div className="v-dream-fund-v0__field">
                <span className="v-dream-fund-v0__field-label">Add Image (Optional)</span>
                <button type="button" className="v-dream-fund-v0__media-placeholder">
                  <ImageIcon strokeWidth={2} size={28} aria-hidden />
                  <span>+ Add Photo</span>
                </button>
              </div>
              <div className="v-dream-fund-v0__field">
                <span className="v-dream-fund-v0__field-label">Target Amount</span>
                <button
                  type="button"
                  className="v-dream-fund-v0__field-trigger"
                  onClick={() => setDrawer("amount")}
                >
                  {formatYen(draft.amount)}
                </button>
              </div>
              <div className="v-dream-fund-v0__field">
                <span className="v-dream-fund-v0__field-label">Target Date</span>
                <button
                  type="button"
                  className={[
                    "v-dream-fund-v0__field-trigger",
                    !draft.targetDate ? "v-dream-fund-v0__field-trigger--placeholder" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setDrawer("date")}
                >
                  <CalendarDays strokeWidth={2} size={18} aria-hidden />
                  <span>
                    {draft.targetDate ? formatDisplayDate(draft.targetDate) : "Select target date"}
                  </span>
                </button>
              </div>
            </>
          ) : null}

          {step.id === "review" ? (
            <>
              <div>
                <h1 className="v-dream-fund-v0__title">Review your dream</h1>
                <p className="v-dream-fund-v0__desc">Looks good? Let&apos;s make it happen!</p>
              </div>
              <article className="v-dream-fund-v0__review-card">
                <div className="v-dream-fund-v0__review-image" aria-label="Dream image placeholder" />
                <div>
                  <h2 className="v-dream-fund-v0__review-title">
                    {draft.name.trim() || "Trip to Kyoto"}
                  </h2>
                  <span className="v-dream-fund-v0__badge">{dreamTypeLabel(draft.type)}</span>
                </div>
                <dl className="v-dream-fund-v0__review-rows">
                  <div className="v-dream-fund-v0__review-row">
                    <dt>Target Amount</dt>
                    <dd>{formatYen(draft.amount)}</dd>
                  </div>
                  <div className="v-dream-fund-v0__review-row">
                    <dt>Target Date</dt>
                    <dd>
                      {draft.targetDate ? formatDisplayDate(draft.targetDate) : "Not set"}
                    </dd>
                  </div>
                </dl>
                <p className="v-dream-fund-v0__encourage">
                  <Sprout strokeWidth={2} size={16} aria-hidden />
                  We&apos;ll help you reach your dream step by step.
                </p>
              </article>
            </>
          ) : null}

          {step.id === "success" ? (
            <section className="v-dream-fund-v0__success">
              <div className="v-dream-fund-v0__confetti" aria-hidden />
              <div className="v-dream-fund-v0__success-icon" aria-hidden>
                <Check strokeWidth={2.5} size={32} />
              </div>
              <div>
                <h1 className="v-dream-fund-v0__success-title">Dream Created! 🎉</h1>
                <p className="v-dream-fund-v0__success-desc">
                  You&apos;re one step closer to making it real.
                </p>
              </div>
              <article className="v-dream-fund-v0__review-card v-dream-fund-v0__success-card">
                <div className="v-dream-fund-v0__review-image" aria-label="Dream image placeholder" />
                <div>
                  <h2 className="v-dream-fund-v0__review-title">
                    {draft.name.trim() || "Trip to Kyoto"}
                  </h2>
                  <span className="v-dream-fund-v0__badge">{dreamTypeLabel(draft.type)}</span>
                </div>
                <dl className="v-dream-fund-v0__review-rows">
                  <div className="v-dream-fund-v0__review-row">
                    <dt>Target Amount</dt>
                    <dd>{formatYen(draft.amount)}</dd>
                  </div>
                  <div className="v-dream-fund-v0__review-row">
                    <dt>Target Date</dt>
                    <dd>
                      {draft.targetDate ? formatDisplayDate(draft.targetDate) : "Not set"}
                    </dd>
                  </div>
                </dl>
              </article>
            </section>
          ) : null}

          {isAccountStep ? (
            <form
              id="v-dream-fund-v0-account-form"
              className="v-dream-fund-v0__account-form"
              onSubmit={handleCreateAccount}
            >
              <div>
                <h1 className="v-dream-fund-v0__title">Create your account</h1>
                <p className="v-dream-fund-v0__desc">
                  Optional — save your dream and sync across devices.
                </p>
              </div>

              <label className="v-dream-fund-v0__field">
                <span className="v-dream-fund-v0__field-label">Full name</span>
                <input
                  className="v-dream-fund-v0__field-input"
                  value={accountName}
                  onChange={(event) => setAccountName(event.target.value)}
                  placeholder="Jennie Kim"
                  autoComplete="name"
                  required
                />
              </label>

              <label className="v-dream-fund-v0__field">
                <span className="v-dream-fund-v0__field-label">Email</span>
                <input
                  className="v-dream-fund-v0__field-input"
                  type="email"
                  value={accountEmail}
                  onChange={(event) => setAccountEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="v-dream-fund-v0__field">
                <span className="v-dream-fund-v0__field-label">Password</span>
                <input
                  className="v-dream-fund-v0__field-input"
                  type="password"
                  value={accountPassword}
                  onChange={(event) => setAccountPassword(event.target.value)}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
              </label>

              <div className="v-dream-fund-v0__social-row">
                <button type="button" className="v-cmp-btn v-cmp-btn--md v-cmp-btn--secondary-green">
                  <span className="v-cmp-btn__label">Google</span>
                </button>
                <button type="button" className="v-cmp-btn v-cmp-btn--md v-cmp-btn--secondary-green">
                  <span className="v-cmp-btn__label">Facebook</span>
                </button>
              </div>
            </form>
          ) : null}

          {isIncomeStep ? (
            <IncomeFlowScreens
              stepId={step.id}
              incomeDraft={incomeDraft}
              onEditBalance={handleEditBalance}
              onEditRecurring={handleEditRecurring}
              onDeleteRecurring={handleDeleteRecurring}
              onAddMoreIncome={handleAddMoreIncome}
            />
          ) : null}

          {isBillFlow ? <BillFlowScreens /> : null}

          {isLoginStep ? (
            <form
              id="v-dream-fund-v0-login-form"
              className="v-dream-fund-v0__account-form"
              onSubmit={handleLogin}
            >
              <div>
                <h1 className="v-dream-fund-v0__title">Welcome back</h1>
                <p className="v-dream-fund-v0__desc">Log in to continue to your dashboard.</p>
              </div>

              <label className="v-dream-fund-v0__field">
                <span className="v-dream-fund-v0__field-label">Email</span>
                <input
                  className="v-dream-fund-v0__field-input"
                  type="email"
                  value={loginEmail}
                  onChange={(event) => setLoginEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="v-dream-fund-v0__field">
                <span className="v-dream-fund-v0__field-label">Password</span>
                <input
                  className="v-dream-fund-v0__field-input"
                  type="password"
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                  placeholder="Your password"
                  autoComplete="current-password"
                  minLength={6}
                  required
                />
              </label>

              {loginError ? <p className="v-dream-fund-v0__login-error">{loginError}</p> : null}
            </form>
          ) : null}

          {isHomeStep && !isSpendingFlow && !isBillFlow && !isHomeDetail ? (
            <>
              {homeTab === "home" ? (
                <V0HomeDashboard
                  onNavigate={handleHomeNavigate}
                  onSelectGoal={handleSelectGoal}
                  onViewAllGoals={handleViewAllGoals}
                />
              ) : null}
              {homeTab === "goals" ? (
                <V0GoalsTab onSelectGoal={handleSelectGoal} />
              ) : null}
              {homeTab === "insights" ? <V0InsightsTab onNavigate={handleHomeNavigate} /> : null}
              {homeTab === "profile" ? <V0ProfileTab onReset={handleResetPrototype} /> : null}
            </>
          ) : null}

          {isHomeStep && isHomeDetail && homeDetailView ? (
            <V0HomeDetailScreens
              view={homeDetailView}
              selectedGoalId={selectedGoalId}
              addMoneyOpen={goalAddMoneyOpen}
              onAddMoneyOpenChange={setGoalAddMoneyOpen}
              onQuickUpdateSelect={handleQuickUpdateSelect}
              onCreateGoal={handleCreateGoal}
              onUpdateGoal={handleUpdateGoal}
            />
          ) : null}

          {isSpendingFlow && spendingStep ? (
            <SpendingFlowScreens
              stepId={spendingStep}
              draft={spendingDraft}
              savedTitle={savedSpendingTitle}
              onChooseMethod={handleChooseSpendingMethod}
              onSelectQuickItem={handleSelectQuickLogItem}
              onDraftChange={(patch) => setSpendingDraft((current) => ({ ...current, ...patch }))}
              onSelectCategory={(category) =>
                setSpendingDraft((current) => ({ ...current, category }))
              }
            />
          ) : null}
        </main>

        {isCelebration ? (
          <footer className="v-dream-fund-v0__footer v-dream-fund-v0__footer--success">
            <button
              type="button"
              className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
              onClick={goNext}
            >
              <span className="v-cmp-btn__label">Set up account</span>
            </button>
            <button
              type="button"
              className="v-dream-fund-v0__text-link"
              onClick={handleSkipAccount}
            >
              Skip for now
            </button>
          </footer>
        ) : isAccountStep ? (
          <footer className="v-dream-fund-v0__footer v-dream-fund-v0__footer--success">
            <button
              type="submit"
              form="v-dream-fund-v0-account-form"
              className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
              disabled={!canCreateAccount}
            >
              <span className="v-cmp-btn__label">Create Account</span>
            </button>
            <button
              type="button"
              className="v-dream-fund-v0__text-link"
              onClick={handleSkipAccount}
            >
              Skip for now
            </button>
          </footer>
        ) : isOnboarding ? (
          <footer className="v-dream-fund-v0__footer v-dream-fund-v0__footer--onboarding">
            <OnboardingDots activeIndex={onboardingDotIndex} />
            <button
              type="button"
              className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
              onClick={goNext}
            >
              <span className="v-cmp-btn__label">Next</span>
            </button>
            {step.id === "welcome" ? (
              <button
                type="button"
                className="v-dream-fund-v0__text-link"
                onClick={() => goToStepById("login")}
              >
                Log in
              </button>
            ) : null}
          </footer>
        ) : isIncomeFooterStep ? (
          <footer className="v-dream-fund-v0__footer v-dream-fund-v0__footer--success">
            {step.id === "money-intro" && drawer !== "balance" ? (
              <button
                type="button"
                className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
                onClick={handleContinueFromMoneyIntro}
              >
                <span className="v-cmp-btn__label">Continue</span>
              </button>
            ) : null}
            {step.id === "money-incoming-prompt" && drawer !== "incoming" ? (
              <>
                <button
                  type="button"
                  className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
                  onClick={handleStartAddMoneyIncoming}
                >
                  <span className="v-cmp-btn__label">Add Money Coming In</span>
                </button>
                <button
                  type="button"
                  className="v-dream-fund-v0__text-link"
                  onClick={handleSkipMoneyIncoming}
                >
                  Skip for now
                </button>
              </>
            ) : null}
            {step.id === "money-review" ? (
              <button
                type="button"
                className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
                disabled={!canContinueMoneySetup}
                onClick={handleSaveAllIncomes}
              >
                <span className="v-cmp-btn__label">Continue</span>
              </button>
            ) : null}
          </footer>
        ) : showHomeTabBar ? (
          <V0AppTabBar
            activeTab={homeTab}
            onChange={(tab) => {
              setHomeTab(tab);
              setHomeDetailView(null);
              setSelectedGoalId(null);
              setGoalMenuOpen(false);
              setGoalAddMoneyOpen(false);
            }}
          />
        ) : isHomeStep && homeDetailView === "goal-detail" && selectedGoalId && !selectedGoalFunded ? (
          <footer className="v-dream-fund-v0__footer v-dream-fund-v0__footer--success">
            <button
              type="button"
              className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
              onClick={() => setGoalAddMoneyOpen(true)}
            >
              <span className="v-cmp-btn__label">Add Money</span>
            </button>
          </footer>
        ) : isHomeStep && homeDetailView === "goal-detail" && selectedGoalFunded ? (
          <footer className="v-dream-fund-v0__footer v-dream-fund-v0__footer--success">
            <p className="v-dream-fund-v0__goal-detail-complete">Goal complete — nice work!</p>
          </footer>
        ) : isHomeStep && homeDetailView === "goal-add" ? (
          <footer className="v-dream-fund-v0__footer v-dream-fund-v0__footer--success">
            <button
              type="submit"
              form="v0-goal-form"
              className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
            >
              <span className="v-cmp-btn__label">Create Goal</span>
            </button>
          </footer>
        ) : isHomeStep && homeDetailView === "goal-edit" ? (
          <footer className="v-dream-fund-v0__footer v-dream-fund-v0__footer--success">
            <button
              type="submit"
              form="v0-goal-form"
              className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
            >
              <span className="v-cmp-btn__label">Save</span>
            </button>
          </footer>
        ) : isBillFlow && !billDrawerOpen ? (
          <footer className="v-dream-fund-v0__footer">
            <button
              type="button"
              className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
              onClick={startAddBill}
            >
              <span className="v-cmp-btn__label">Add Bill</span>
            </button>
          </footer>
        ) : isSpendingFlow && spendingStep ? (
          <footer className="v-dream-fund-v0__footer v-dream-fund-v0__footer--success">
            {spendingStep === "scan" ? (
              <button
                type="button"
                className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
                onClick={() => setSpendingStep("amount")}
              >
                <span className="v-cmp-btn__label">Continue</span>
              </button>
            ) : null}
            {spendingStep === "amount" ? (
              <button
                type="button"
                className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
                disabled={!canContinueSpendingAmount}
                onClick={() => setSpendingStep("category")}
              >
                <span className="v-cmp-btn__label">Next</span>
              </button>
            ) : null}
            {spendingStep === "category" ? (
              <button
                type="button"
                className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
                disabled={!canSaveSpending}
                onClick={handleSaveSpendingExpense}
              >
                <span className="v-cmp-btn__label">Save Expense</span>
              </button>
            ) : null}
            {spendingStep === "success" ? (
              <button
                type="button"
                className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
                onClick={exitSpendingFlow}
              >
                <span className="v-cmp-btn__label">Done</span>
              </button>
            ) : null}
          </footer>
        ) : isLoginStep ? (
          <footer className="v-dream-fund-v0__footer v-dream-fund-v0__footer--success">
            <button
              type="submit"
              form="v-dream-fund-v0-login-form"
              className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
              disabled={!canLogin}
            >
              <span className="v-cmp-btn__label">Log In</span>
            </button>
          </footer>
        ) : !drawer && !isIncomeStep && !isHomeStep && !isLoginStep ? (
          <footer className="v-dream-fund-v0__footer v-dream-fund-v0__footer--success">
            <button
              type="button"
              className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
              disabled={!canContinue}
              onClick={goNext}
            >
              <span className="v-cmp-btn__label">
                {step.id === "review" ? "Create Dream" : "Next"}
              </span>
            </button>
          </footer>
        ) : null}

        {drawer === "amount" ? (
          <AmountDrawer
            amountInput={amountInput}
            onDigit={handleNumpad}
            onBackspace={handleBackspace}
            onConfirm={confirmAmount}
            onClose={() => setDrawer(null)}
          />
        ) : null}

        {drawer === "date" ? (
          <DateDrawer
            calendarMonth={calendarMonth}
            selectedDate={dateDraft}
            onMonthChange={setCalendarMonth}
            onSelectDate={setDateDraft}
            onConfirm={confirmDate}
            onClose={() => setDrawer(null)}
          />
        ) : null}

        {drawer === "balance" ? (
          <BalanceDrawer
            amountInput={balanceAmountInput}
            balanceFrom={balanceDraft.from}
            onDigit={handleBalanceNumpad}
            onBackspace={handleBalanceBackspace}
            onFromChange={(from) => setBalanceDraft((current) => ({ ...current, from }))}
            onConfirm={handleSaveCurrentBalance}
            onClose={() => {
              setMoneyReturnToReview(false);
              setDrawer(null);
            }}
          />
        ) : null}

        {drawer === "incoming" ? (
          <IncomingMoneyDrawer
            draft={recurringDraft}
            onDraftChange={(patch) => setRecurringDraft((current) => ({ ...current, ...patch }))}
            onConfirm={handleSaveRecurringIncome}
            onClose={closeIncomingDrawer}
          />
        ) : null}

        {billDrawerOpen ? (
          <BillDrawer
            draft={billDraft}
            onDraftChange={(patch) => setBillDraft((current) => ({ ...current, ...patch }))}
            onConfirm={handleSaveBill}
            onClose={closeBillDrawer}
          />
        ) : null}
      </div>
    </div>
  );
}

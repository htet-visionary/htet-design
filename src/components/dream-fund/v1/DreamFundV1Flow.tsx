"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { V1AddFuelScreen } from "@/components/dream-fund/v1/V1AddFuelScreen";
import { V1BudgetField } from "@/components/dream-fund/v1/V1BudgetField";
import { V1DateField } from "@/components/dream-fund/v1/V1DateField";
import { V1MainApp } from "@/components/dream-fund/v1/V1MainApp";
import { V1SmartSplitScreen } from "@/components/dream-fund/v1/V1SmartSplitScreen";
import {
  V1BrandMark,
  V1CloverMark,
  V1DreamHeroCard,
  V1FlowChrome,
  V1PhotoPicker,
  V1ScreenIntro,
} from "@/components/dream-fund/v1/V1FlowChrome";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import { greetingForHour } from "@/lib/dream-fund-app-utils";
import {
  DREAM_CAPTURE_PROGRESS,
  emptyDreamFundV1CaptureDraft,
  type DreamFundV1CaptureDraft,
  type DreamFundV1CaptureStep,
  type DreamFundV1Currency,
  type V1AppPhase,
  type V1DreamDisplayMeta,
} from "@/lib/dream-fund-v1-capture-data";

const CAPTURE_ORDER: DreamFundV1CaptureStep[] = [
  "onboarding",
  "dream-1",
  "dream-2",
  "dream-3",
];

export function DreamFundV1Flow() {
  const router = useRouter();
  const { state, hydrated, addGoal, addGoalSavings, completeOnboarding, activeDream, updateSettings, resetState } =
    useDreamFundApp();
  const [phase, setPhase] = useState<"capture" | "app">("capture");
  const [appPhase, setAppPhase] = useState<V1AppPhase>("home");
  const [step, setStep] = useState<DreamFundV1CaptureStep>("onboarding");
  const [draft, setDraft] = useState<DreamFundV1CaptureDraft>(emptyDreamFundV1CaptureDraft);
  const [dreamMeta, setDreamMeta] = useState<V1DreamDisplayMeta | null>(null);
  const [fuelAmount, setFuelAmount] = useState(0);
  const [fuelGoalId, setFuelGoalId] = useState<string | null>(null);
  const [fuelConfirmOpen, setFuelConfirmOpen] = useState(false);
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    if (!hydrated || bootstrapped) {
      return;
    }

    if (state.hasOnboarded && state.goals.length > 0) {
      setDreamMeta((current) =>
        current ?? {
          story: "",
          photoUrl: null,
          currency: (state.settings.currency as DreamFundV1Currency) || "JPY",
        },
      );
      setPhase("app");
    }

    setBootstrapped(true);
  }, [bootstrapped, hydrated, state.goals.length, state.hasOnboarded]);

  const activeGoal = activeDream ?? state.goals[0];
  const fuelGoal =
    state.goals.find((goal) => goal.id === fuelGoalId) ?? activeGoal ?? state.goals[0];
  const firstName = state.profile.name.split(" ")[0] || "there";

  function handleCurrencyChange(currency: DreamFundV1Currency) {
    setDreamMeta((current) => (current ? { ...current, currency } : current));
    updateSettings({ currency });
  }

  function handleLogout() {
    resetState();
    setDreamMeta(null);
    setDraft(emptyDreamFundV1CaptureDraft());
    setFuelAmount(0);
    setFuelGoalId(null);
    setFuelConfirmOpen(false);
    setAppPhase("home");
    setPhase("capture");
    setStep("onboarding");
    setBootstrapped(true);
  }

  if (phase === "app") {
    if (!dreamMeta || state.goals.length === 0) {
      return (
        <div className="v-dream-fund-v1 v-theme-dream-fund">
          <div className="v-dream-fund-v1__device">
            <main className="v-dream-fund-v1__main v-dream-fund-v1__main--home">
              <V1ScreenIntro
                title="No dream yet"
                description="Create a dream to start fueling your goals."
              />
            </main>
          </div>
        </div>
      );
    }

    if (appPhase === "smart-split") {
      return (
        <div className="v-dream-fund-v1 v-theme-dream-fund">
          <V1SmartSplitScreen
            currency={dreamMeta.currency}
            onBack={() => setAppPhase("home")}
          />
        </div>
      );
    }

    if (appPhase === "add-fuel") {
      return (
        <div className="v-dream-fund-v1 v-theme-dream-fund">
          <V1AddFuelScreen
            goal={fuelGoal}
            meta={dreamMeta}
            fuelAmount={fuelAmount}
            confirmOpen={fuelConfirmOpen}
            onFuelAmountChange={setFuelAmount}
            onConfirmOpenChange={setFuelConfirmOpen}
            onBack={() => {
              setFuelConfirmOpen(false);
              setFuelGoalId(null);
              setAppPhase("home");
            }}
            onConfirmFuel={() => {
              addGoalSavings(fuelGoal.id, fuelAmount);
              setFuelAmount(0);
              setFuelConfirmOpen(false);
              setFuelGoalId(null);
              setAppPhase("home");
            }}
            onSmartSplit={() => {
              setFuelConfirmOpen(false);
              setAppPhase("smart-split");
            }}
          />
        </div>
      );
    }

    return (
      <div className="v-dream-fund-v1 v-theme-dream-fund">
        <V1MainApp
          greeting={greetingForHour()}
          name={firstName}
          goal={activeGoal ?? fuelGoal}
          goals={state.goals}
          meta={dreamMeta}
          primaryGoalId={activeDream?.id}
          onAddFuel={() => {
            setFuelGoalId(activeDream?.id ?? state.goals[0]?.id ?? null);
            setFuelAmount(0);
            setFuelConfirmOpen(false);
            setAppPhase("add-fuel");
          }}
          onAddFuelForGoal={(goalId) => {
            setFuelGoalId(goalId);
            setFuelAmount(0);
            setFuelConfirmOpen(false);
            setAppPhase("add-fuel");
          }}
          onSmartSplit={() => setAppPhase("smart-split")}
          onCurrencyChange={handleCurrencyChange}
          onLogout={handleLogout}
        />
      </div>
    );
  }

  const stepIndex = CAPTURE_ORDER.indexOf(step);

  function goToStep(next: DreamFundV1CaptureStep) {
    setStep(next);
  }

  function goBack() {
    if (step === "onboarding") {
      router.push("/dream-fund");
      return;
    }

    setStep(CAPTURE_ORDER[Math.max(0, stepIndex - 1)]);
  }

  function finishToApp(withGoal = false) {
    if (withGoal && draft.name.trim()) {
      addGoal({
        name: draft.name.trim(),
        targetAmount: draft.amount,
        savedAmount: 0,
        emoji: "✨",
        targetDate: draft.targetDate || undefined,
        monthlyAllocation: 0,
        priority: "medium",
      });
      setDreamMeta({
        story: draft.story,
        photoUrl: draft.photoUrl,
        currency: draft.currency,
      });
    }

    completeOnboarding();
    setAppPhase("home");
    setPhase("app");
  }

  function handlePrimary() {
    if (step === "onboarding") {
      goToStep("dream-1");
      return;
    }

    if (step === "dream-1") {
      goToStep("dream-2");
      return;
    }

    if (step === "dream-2") {
      goToStep("dream-3");
      return;
    }

    finishToApp(true);
  }

  const progressStep = DREAM_CAPTURE_PROGRESS[step];

  if (step === "onboarding") {
    return (
      <div className="v-dream-fund-v1 v-theme-dream-fund">
        <div className="v-dream-fund-v1__device v-dream-fund-v1__device--onboarding">
          <div className="v-dream-fund-v1__onboarding-arch" aria-hidden />
          <main className="v-dream-fund-v1__main v-dream-fund-v1__main--onboarding">
            <div className="v-dream-fund-v1__onboarding-top">
              <V1BrandMark />
              <span className="v-dream-fund-v1__brand-rule" aria-hidden />
            </div>
            <div className="v-dream-fund-v1__onboarding-copy">
              <h1 className="v-dream-fund-v1__onboarding-title">
                Dream it. Fuel it.
                <br />
                Harvest it.
              </h1>
              <p className="v-dream-fund-v1__onboarding-desc">
                Turn your dreams into real life
                <br />
                with every clover you grow.
              </p>
              <V1CloverMark />
            </div>
          </main>
          <footer className="v-dream-fund-v1__footer v-dream-fund-v1__footer--onboarding">
            <button
              type="button"
              className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
              onClick={handlePrimary}
            >
              <span className="v-cmp-btn__label">Let&apos;s start</span>
            </button>
          </footer>
        </div>
      </div>
    );
  }

  if (step === "dream-1") {
    return (
      <div className="v-dream-fund-v1 v-theme-dream-fund">
        <V1FlowChrome
          progressStep={progressStep}
          onBack={goBack}
          primaryLabel="Continue"
          onPrimary={handlePrimary}
          primaryDisabled={!draft.name.trim()}
          onSkip={() => finishToApp(false)}
        >
          <V1ScreenIntro
            title="What's your dream?"
            description="Every dream starts with a reason."
          />

          <V1PhotoPicker
            photoUrl={draft.photoUrl}
            onPhotoChange={(photoUrl) =>
              setDraft((current) => ({ ...current, photoUrl }))
            }
          />

          <div className="v-dream-fund-v1__form-stack">
            <label className="v-dream-fund-v1__field">
              <span className="v-dream-fund-v1__field-label">Dream Name</span>
              <input
                className="v-dream-fund-v1__field-input"
                value={draft.name}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="eg., Trip to Europe"
              />
            </label>

            <label className="v-dream-fund-v1__field">
              <span className="v-dream-fund-v1__field-label">Why is this important to you?</span>
              <textarea
                className="v-dream-fund-v1__field-textarea"
                value={draft.story}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, story: event.target.value }))
                }
                placeholder="Tell us the story behind your dream ..."
                rows={4}
              />
            </label>
          </div>
        </V1FlowChrome>
      </div>
    );
  }

  if (step === "dream-2") {
    return (
      <div className="v-dream-fund-v1 v-theme-dream-fund">
        <V1FlowChrome
          progressStep={progressStep}
          onBack={goBack}
          primaryLabel="Continue"
          onPrimary={handlePrimary}
          primaryDisabled={draft.amount <= 0}
          onSkip={() => finishToApp(false)}
        >
          <V1DreamHeroCard
            name={draft.name}
            story={draft.story}
            photoUrl={draft.photoUrl}
            compact
          />

          <div className="v-dream-fund-v1__form-stack">
            <h2 className="v-dream-fund-v1__section-title">How much will it take?</h2>
            <label className="v-dream-fund-v1__field">
              <span className="v-dream-fund-v1__field-label">Set your target budget</span>
              <V1BudgetField
                currency={draft.currency}
                amount={draft.amount}
                onCurrencyChange={(currency) =>
                  setDraft((current) => ({ ...current, currency }))
                }
                onAmountChange={(amount) =>
                  setDraft((current) => ({ ...current, amount }))
                }
              />
            </label>
          </div>
        </V1FlowChrome>
      </div>
    );
  }

  return (
    <div className="v-dream-fund-v1 v-theme-dream-fund">
      <V1FlowChrome
        progressStep={progressStep}
        onBack={goBack}
        primaryLabel="Create my dream"
        onPrimary={handlePrimary}
        primaryTone="accent"
        primaryDisabled={!draft.targetDate}
        onSkip={() => finishToApp(false)}
      >
        <V1DreamHeroCard
          name={draft.name}
          story={draft.story}
          amount={draft.amount}
          currency={draft.currency}
          photoUrl={draft.photoUrl}
          compact
        />

        <div className="v-dream-fund-v1__form-stack">
          <h2 className="v-dream-fund-v1__section-title v-dream-fund-v1__section-title--narrow">
            When do you want to achieve this goal?
          </h2>
          <div className="v-dream-fund-v1__field">
            <span className="v-dream-fund-v1__field-label">Set your target date</span>
            <V1DateField
              value={draft.targetDate}
              onChange={(targetDate) =>
                setDraft((current) => ({ ...current, targetDate }))
              }
            />
          </div>
        </div>
      </V1FlowChrome>
    </div>
  );
}

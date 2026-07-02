"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import {
  buildSmartSplitAllocations,
  EMERGENCY_ALLOCATION_ID,
  getActiveGoals,
  getInitialSmartSplitSelection,
  goalToAllocationItem,
  emergencyToAllocationItem,
  recalculateAllocationsForTotal,
  sumAllocationAmounts,
  type SmartSplitAllocationItem,
} from "@/lib/dream-fund-v1-smart-split";
import {
  dreamFundV1CurrencySymbol,
  formatDreamFundV1Amount,
  FUEL_SOURCE_OPTIONS,
  type DreamFundV1Currency,
  type FuelSource,
} from "@/lib/dream-fund-v1-capture-data";
import { V1AllocationCard } from "@/components/dream-fund/v1/V1AllocationCard";
import { V1AppChrome } from "@/components/dream-fund/v1/V1AppChrome";
import { V1DreamSelectDrawer } from "@/components/dream-fund/v1/V1DreamSelectDrawer";
import { V1FuelAmountField } from "@/components/dream-fund/v1/V1FuelAmountField";

type V1SmartSplitScreenProps = {
  currency: DreamFundV1Currency;
  onBack: () => void;
};

function formatV1Money(amount: number, currency: DreamFundV1Currency): string {
  return `${dreamFundV1CurrencySymbol(currency)} ${formatDreamFundV1Amount(amount, currency)}`;
}

export function V1SmartSplitScreen({ currency, onBack }: V1SmartSplitScreenProps) {
  const { state, updateGoal, updateIncome } = useDreamFundApp();
  const activeGoals = useMemo(() => getActiveGoals(state.goals), [state.goals]);
  const initialSelection = useMemo(
    () => getInitialSmartSplitSelection(state.goals),
    [state.goals],
  );

  const [totalIncome, setTotalIncome] = useState(
    state.profile.monthlyIncome > 0 ? state.profile.monthlyIncome : 0,
  );
  const [selectedGoalIds, setSelectedGoalIds] = useState<string[]>(initialSelection.goalIds);
  const [includeEmergency, setIncludeEmergency] = useState(initialSelection.includeEmergency);
  const [allocations, setAllocations] = useState<SmartSplitAllocationItem[]>(() =>
    buildSmartSplitAllocations(state.goals, state.emergencyFund, state.profile.monthlyIncome, {
      goalIds: initialSelection.goalIds,
      includeEmergency: initialSelection.includeEmergency,
    }),
  );
  const [source, setSource] = useState<FuelSource>("Cash");
  const [note, setNote] = useState("");
  const [dreamDrawerOpen, setDreamDrawerOpen] = useState(false);

  const allocatedTotal = useMemo(() => sumAllocationAmounts(allocations), [allocations]);
  const guiltFreeRemaining = Math.max(0, totalIncome - allocatedTotal);
  const isOverAllocated = allocatedTotal > totalIncome;
  const selectedCount = selectedGoalIds.length + (includeEmergency ? 1 : 0);

  function syncAllocations(
    nextGoalIds: string[],
    nextIncludeEmergency: boolean,
    income = totalIncome,
  ) {
    setAllocations((current) => {
      const currentById = new Map(current.map((item) => [item.id, item]));
      const nextItems: SmartSplitAllocationItem[] = [];

      for (const goal of activeGoals) {
        if (!nextGoalIds.includes(goal.id)) {
          continue;
        }

        nextItems.push(currentById.get(goal.id) ?? goalToAllocationItem(goal, income));
      }

      if (nextIncludeEmergency) {
        nextItems.push(
          currentById.get(EMERGENCY_ALLOCATION_ID) ??
            emergencyToAllocationItem(state.emergencyFund, income),
        );
      }

      return recalculateAllocationsForTotal(nextItems, income);
    });
  }

  function handleTotalChange(nextTotal: number) {
    setTotalIncome(nextTotal);
    setAllocations((current) => recalculateAllocationsForTotal(current, nextTotal));
  }

  function handleAllocationChange(id: string, next: SmartSplitAllocationItem) {
    setAllocations((current) => current.map((item) => (item.id === id ? next : item)));
  }

  function applyDreamSelection(selection: { goalIds: string[]; includeEmergency: boolean }) {
    setSelectedGoalIds(selection.goalIds);
    setIncludeEmergency(selection.includeEmergency);
    syncAllocations(selection.goalIds, selection.includeEmergency);
  }

  function removeAllocation(item: SmartSplitAllocationItem) {
    if (item.kind === "emergency") {
      applyDreamSelection({ goalIds: selectedGoalIds, includeEmergency: false });
      return;
    }

    applyDreamSelection({
      goalIds: selectedGoalIds.filter((id) => id !== item.id),
      includeEmergency,
    });
  }

  function handleSave() {
    if (isOverAllocated || allocations.length === 0) {
      return;
    }

    updateIncome(totalIncome);

    const allocationByGoalId = new Map(
      allocations
        .filter((item) => item.kind === "goal")
        .map((item) => [item.id, item.amount]),
    );

    for (const goal of state.goals) {
      updateGoal(goal.id, {
        monthlyAllocation: allocationByGoalId.get(goal.id) ?? 0,
      });
    }

    onBack();
  }

  return (
    <>
    <V1AppChrome
      variant="flow"
      title="Smart Allocation"
      onBack={onBack}
      mainClassName="v-dream-fund-v1__main--smart-split"
      footer={
          <button
            type="button"
            className="v-cmp-btn v-cmp-btn--md v-cmp-btn--accent-primary v-dream-fund-v1__smart-split-save"
            disabled={isOverAllocated || allocations.length === 0}
            onClick={handleSave}
          >
            <span className="v-cmp-btn__label">Save</span>
          </button>
      }
    >
      <section className="v-dream-fund-v1__smart-split-section v-dream-fund-v1__smart-split-section--income">
        <div className="v-dream-fund-v1__smart-split-section-head">
          <h2 className="v-dream-fund-v1__smart-split-section-title">Top-up Amount</h2>
        </div>
        <V1FuelAmountField
          currency={currency}
          amount={totalIncome}
          onAmountChange={handleTotalChange}
        />

        <div
          className={[
            "v-dream-fund-v1__guilt-free-summary",
            isOverAllocated ? "v-dream-fund-v1__guilt-free-summary--warning" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-live="polite"
        >
          <div className="v-dream-fund-v1__guilt-free-summary-copy">
            <p className="v-dream-fund-v1__guilt-free-summary-label">Guilt-free spending</p>
            {isOverAllocated ? (
              <p className="v-dream-fund-v1__guilt-free-summary-note">Over-allocated — adjust to save</p>
            ) : (
              <p className="v-dream-fund-v1__guilt-free-summary-tagline">Updates as you split</p>
            )}
          </div>
          <p className="v-dream-fund-v1__guilt-free-summary-amount">
            {formatV1Money(guiltFreeRemaining, currency)}
          </p>
        </div>
      </section>

      <section className="v-dream-fund-v1__smart-split-section">
        <div className="v-dream-fund-v1__smart-split-section-head">
          <h2 className="v-dream-fund-v1__smart-split-section-title">Your split</h2>
          <span className="v-dream-fund-v1__smart-split-section-meta">
            {formatV1Money(allocatedTotal, currency)} allocated
          </span>
        </div>

        <button
          type="button"
          className="v-dream-fund-v1__your-split-choose"
          onClick={() => setDreamDrawerOpen(true)}
        >
          <span className="v-dream-fund-v1__your-split-choose-icon" aria-hidden>
            🍀
          </span>
          <span className="v-dream-fund-v1__your-split-choose-copy">
            <span className="v-dream-fund-v1__your-split-choose-label">Choose dreams</span>
            <span className="v-dream-fund-v1__your-split-choose-meta">
              {selectedCount} selected
            </span>
          </span>
          <ChevronRight
            className="v-dream-fund-v1__your-split-choose-chevron"
            strokeWidth={2}
            size={18}
            aria-hidden
          />
        </button>

        {allocations.length > 0 ? (
          <>
            <div className="v-dream-fund-v1__allocation-list">
              {allocations.map((item) => (
                <V1AllocationCard
                  key={item.id}
                  item={item}
                  totalIncome={totalIncome}
                  currency={currency}
                  onChange={(next) => handleAllocationChange(item.id, next)}
                  onRemove={() => removeAllocation(item)}
                />
              ))}
            </div>

            <div className="v-dream-fund-v1__smart-split-divider" role="separator" aria-hidden />

            <div className="v-dream-fund-v1__smart-split-form">
              <label className="v-dream-fund-v1__field">
                <span className="v-dream-fund-v1__field-label">Money Source (Optional)</span>
                <div className="v-dream-fund-v1__select-wrap">
                  <select
                    className="v-dream-fund-v1__field-input v-dream-fund-v1__field-select"
                    value={source}
                    onChange={(event) => setSource(event.target.value as FuelSource)}
                  >
                    {FUEL_SOURCE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    strokeWidth={2}
                    size={18}
                    className="v-dream-fund-v1__select-chevron"
                    aria-hidden
                  />
                </div>
              </label>

              <label className="v-dream-fund-v1__field">
                <span className="v-dream-fund-v1__field-label">Note (Optional)</span>
                <textarea
                  className="v-dream-fund-v1__field-textarea v-dream-fund-v1__field-textarea--fuel"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Write a note ..."
                  rows={4}
                />
              </label>
            </div>
          </>
        ) : (
          <div className="v-dream-fund-v1__smart-split-empty">
            <p>Select at least one dream to start allocating your income.</p>
          </div>
        )}
      </section>
    </V1AppChrome>

    {dreamDrawerOpen ? (
      <V1DreamSelectDrawer
        goals={activeGoals}
        selectedGoalIds={selectedGoalIds}
        includeEmergency={includeEmergency}
        onApply={applyDreamSelection}
        onClose={() => setDreamDrawerOpen(false)}
      />
    ) : null}
    </>
  );
}

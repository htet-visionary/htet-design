"use client";

import { Check, ChevronDown, GripVertical, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { DreamFundGoal } from "@/lib/dream-fund-app-data";
import {
  DREAM_CATEGORY_FILTERS,
  dreamCategoryTone,
  getDreamCategory,
  type DreamCategory,
  type DreamCategoryFilter,
} from "@/lib/dream-fund-v1-dream-categories";

type V1DreamSelectDrawerProps = {
  goals: DreamFundGoal[];
  selectedGoalIds: string[];
  includeEmergency: boolean;
  onApply: (selection: { goalIds: string[]; includeEmergency: boolean }) => void;
  onClose: () => void;
};

const EMERGENCY_ITEM = {
  id: "emergency-fund",
  name: "Emergency Fund",
  emoji: "🛡️",
  category: "Safety" as const,
};

function matchesSearch(label: string, query: string): boolean {
  if (!query.trim()) {
    return true;
  }

  return label.toLowerCase().includes(query.trim().toLowerCase());
}

function matchesFilter(category: string, filter: DreamCategoryFilter): boolean {
  return filter === "All" || category === filter;
}

export function V1DreamSelectDrawer({
  goals,
  selectedGoalIds,
  includeEmergency,
  onApply,
  onClose,
}: V1DreamSelectDrawerProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<DreamCategoryFilter>("All");
  const [draftGoalIds, setDraftGoalIds] = useState(selectedGoalIds);
  const [draftIncludeEmergency, setDraftIncludeEmergency] = useState(includeEmergency);

  const selectedGoals = useMemo(
    () => goals.filter((goal) => draftGoalIds.includes(goal.id)),
    [goals, draftGoalIds],
  );

  const unselectedGoals = useMemo(
    () => goals.filter((goal) => !draftGoalIds.includes(goal.id)),
    [goals, draftGoalIds],
  );

  const selectedCount = selectedGoals.length + (draftIncludeEmergency ? 1 : 0);

  const visibleSelectedGoals = selectedGoals.filter(
    (goal) =>
      matchesSearch(goal.name, search) &&
      matchesFilter(getDreamCategory(goal), categoryFilter),
  );

  const showEmergencySelected =
    draftIncludeEmergency &&
    matchesSearch(EMERGENCY_ITEM.name, search) &&
    matchesFilter(EMERGENCY_ITEM.category, categoryFilter);

  const visibleUnselectedGoals = unselectedGoals.filter((goal) => {
    const category = getDreamCategory(goal);
    return matchesSearch(goal.name, search) && matchesFilter(category, categoryFilter);
  });

  const showEmergencyUnselected =
    !draftIncludeEmergency &&
    matchesSearch(EMERGENCY_ITEM.name, search) &&
    matchesFilter(EMERGENCY_ITEM.category, categoryFilter);

  function toggleDraftGoal(goalId: string) {
    setDraftGoalIds((current) =>
      current.includes(goalId)
        ? current.filter((id) => id !== goalId)
        : [...current, goalId],
    );
  }

  function toggleDraftEmergency() {
    setDraftIncludeEmergency((current) => !current);
  }

  function handleSelect() {
    onApply({
      goalIds: draftGoalIds,
      includeEmergency: draftIncludeEmergency,
    });
    onClose();
  }

  return (
    <div className="v-dream-fund-v1__drawer-stage" role="presentation">
      <button
        type="button"
        className="v-dream-fund-v1__drawer-scrim"
        aria-label="Close dream selection"
        onClick={onClose}
      />

      <div
        className="v-dream-fund-v1__drawer v-dream-fund-v1__drawer--dream-select"
        role="dialog"
        aria-modal="true"
        aria-labelledby="v-dream-select-title"
      >
        <div className="v-dream-fund-v1__drawer-handle" aria-hidden />

        <div className="v-dream-fund-v1__dream-select-head">
          <h2 id="v-dream-select-title" className="v-dream-fund-v1__dream-select-title">
            🍀 Select Dreams
          </h2>
          <p className="v-dream-fund-v1__dream-select-subtitle">
            Choose the dreams you want to fuel.
          </p>
        </div>

        <div className="v-dream-fund-v1__dream-select-toolbar">
          <label className="v-dream-fund-v1__dream-select-search">
            <Search className="v-dream-fund-v1__dream-select-search-icon" strokeWidth={2} size={16} />
            <input
              className="v-dream-fund-v1__dream-select-search-input"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search dreams..."
            />
          </label>
          <div className="v-dream-fund-v1__dream-select-filter-wrap">
            <select
              className="v-dream-fund-v1__field-input v-dream-fund-v1__field-select v-dream-fund-v1__dream-select-filter"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value as DreamCategoryFilter)}
              aria-label="Filter by category"
            >
              {DREAM_CATEGORY_FILTERS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              strokeWidth={2}
              size={16}
              className="v-dream-fund-v1__select-chevron"
              aria-hidden
            />
          </div>
        </div>

        <div className="v-dream-fund-v1__dream-select-body">
          {selectedCount > 0 ? (
            <section className="v-dream-fund-v1__dream-select-section">
              <h3 className="v-dream-fund-v1__dream-select-section-title v-dream-fund-v1__dream-select-section-title--selected">
                Selected ({selectedCount})
              </h3>
              <div className="v-dream-fund-v1__dream-select-list">
                {visibleSelectedGoals.map((goal) => (
                  <DreamSelectRow
                    key={goal.id}
                    emoji={goal.emoji}
                    label={goal.name}
                    selected
                    showGrip
                    onToggle={() => toggleDraftGoal(goal.id)}
                  />
                ))}
                {showEmergencySelected ? (
                  <DreamSelectRow
                    emoji={EMERGENCY_ITEM.emoji}
                    label={EMERGENCY_ITEM.name}
                    selected
                    showGrip
                    onToggle={toggleDraftEmergency}
                  />
                ) : null}
              </div>
            </section>
          ) : null}

          <section className="v-dream-fund-v1__dream-select-section">
            <h3 className="v-dream-fund-v1__dream-select-section-title">All Dreams</h3>
            <div className="v-dream-fund-v1__dream-select-list">
              {visibleUnselectedGoals.map((goal) => (
                <DreamSelectRow
                  key={goal.id}
                  emoji={goal.emoji}
                  label={goal.name}
                  category={getDreamCategory(goal)}
                  selected={false}
                  onToggle={() => toggleDraftGoal(goal.id)}
                />
              ))}
              {showEmergencyUnselected ? (
                <DreamSelectRow
                  emoji={EMERGENCY_ITEM.emoji}
                  label={EMERGENCY_ITEM.name}
                  category={EMERGENCY_ITEM.category}
                  selected={false}
                  onToggle={toggleDraftEmergency}
                />
              ) : null}
              {visibleUnselectedGoals.length === 0 && !showEmergencyUnselected ? (
                <p className="v-dream-fund-v1__dream-select-empty">No dreams match your search.</p>
              ) : null}
            </div>
          </section>
        </div>

        <div className="v-dream-fund-v1__dream-select-actions">
          <button
            type="button"
            className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
            disabled={selectedCount === 0}
            onClick={handleSelect}
          >
            <span className="v-cmp-btn__label">Select</span>
          </button>
          <button
            type="button"
            className="v-dream-fund-v1__dream-select-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

type DreamSelectRowProps = {
  emoji: string;
  label: string;
  category?: DreamCategory;
  selected: boolean;
  showGrip?: boolean;
  onToggle: () => void;
};

function DreamSelectRow({
  emoji,
  label,
  category,
  selected,
  showGrip = false,
  onToggle,
}: DreamSelectRowProps) {
  const categoryTone = category ? dreamCategoryTone(category) : null;

  return (
    <button
      type="button"
      className={[
        "v-dream-fund-v1__dream-select-row",
        selected ? "v-dream-fund-v1__dream-select-row--selected" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-pressed={selected}
      onClick={onToggle}
    >
      <span
        className={[
          "v-dream-fund-v1__dream-select-check",
          selected ? "v-dream-fund-v1__dream-select-check--on" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden
      >
        {selected ? <Check strokeWidth={2.5} size={12} /> : null}
      </span>
      <span className="v-dream-fund-v1__dream-select-emoji" aria-hidden>
        {emoji}
      </span>
      <span className="v-dream-fund-v1__dream-select-label">{label}</span>
      {category && categoryTone ? (
        <span
          className={[
            "v-dream-fund-v1__dream-select-tag",
            `v-dream-fund-v1__dream-select-tag--${categoryTone}`,
          ].join(" ")}
        >
          {category}
        </span>
      ) : null}
      {showGrip ? (
        <GripVertical
          className="v-dream-fund-v1__dream-select-grip"
          strokeWidth={2}
          size={16}
          aria-hidden
        />
      ) : null}
    </button>
  );
}

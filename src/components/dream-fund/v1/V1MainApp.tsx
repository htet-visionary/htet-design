"use client";

import { Bell, Sprout } from "lucide-react";
import { useState } from "react";
import type { DreamFundGoal } from "@/lib/dream-fund-app-data";
import { V1AppTabBar, type V1HomeTab } from "@/components/dream-fund/v1/V1AppTabBar";
import { V1DreamsScreen } from "@/components/dream-fund/v1/V1DreamsScreen";
import { V1HomeContent } from "@/components/dream-fund/v1/V1HomeContent";
import { V1InsightsScreen } from "@/components/dream-fund/v1/V1InsightsScreen";
import { V1ProfileScreen } from "@/components/dream-fund/v1/V1ProfileScreen";
import type { DreamFundV1Currency, V1DreamDisplayMeta } from "@/lib/dream-fund-v1-capture-data";

const TAB_TITLES: Record<Exclude<V1HomeTab, "home">, string> = {
  dreams: "Dreams",
  insights: "Insights",
  profile: "Profile",
};

type V1MainAppProps = {
  greeting: string;
  name: string;
  goal: DreamFundGoal;
  goals: DreamFundGoal[];
  meta: V1DreamDisplayMeta;
  primaryGoalId?: string;
  onAddFuel: () => void;
  onAddFuelForGoal: (goalId: string) => void;
  onSetPrimaryGoal: (goalId: string) => void;
  onSmartSplit: () => void;
  onCurrencyChange: (currency: DreamFundV1Currency) => void;
  onLogout: () => void;
};

export function V1MainApp({
  greeting,
  name,
  goal,
  goals,
  meta,
  primaryGoalId,
  onAddFuel,
  onAddFuelForGoal,
  onSetPrimaryGoal,
  onSmartSplit,
  onCurrencyChange,
  onLogout,
}: V1MainAppProps) {
  const [activeTab, setActiveTab] = useState<V1HomeTab>("home");

  function handleTabChange(tab: V1HomeTab) {
    setActiveTab(tab);
  }

  return (
    <div className="v-dream-fund-v1__device">
      {activeTab === "home" ? (
        <header className="v-dream-fund-v1__home-topbar">
          <p className="v-dream-fund-v1__home-greeting-line">
            <Sprout className="v-dream-fund-v1__home-sprout" strokeWidth={2} size={18} aria-hidden />
            <span>
              {greeting}, {name}
            </span>
          </p>
          <button type="button" className="v-dream-fund-v1__home-bell" aria-label="Notifications">
            <Bell strokeWidth={2} size={20} />
            <span className="v-dream-fund-v1__home-bell-dot" aria-hidden />
          </button>
        </header>
      ) : (
        <header className="v-dream-fund-v1__app-tab-header">
          <h1 className="v-dream-fund-v1__app-tab-title">{TAB_TITLES[activeTab]}</h1>
        </header>
      )}

      <main
        className={[
          "v-dream-fund-v1__main",
          activeTab === "home" ? "v-dream-fund-v1__main--home" : "v-dream-fund-v1__main--tab",
          activeTab === "dreams" ? "v-dream-fund-v1__main--dreams" : "",
          activeTab === "insights" ? "v-dream-fund-v1__main--insights" : "",
          "v-dream-fund-v1__main--with-tabbar",
        ].join(" ")}
      >
        {activeTab === "home" ? (
          <V1HomeContent
            goal={goal}
            meta={meta}
            primaryGoalId={primaryGoalId}
            onAddFuel={onAddFuel}
          />
        ) : null}

        {activeTab === "profile" ? (
          <V1ProfileScreen
            currency={meta.currency}
            onCurrencyChange={onCurrencyChange}
            onLogout={onLogout}
          />
        ) : null}

        {activeTab === "dreams" ? (
          <V1DreamsScreen
            goals={goals}
            currency={meta.currency}
            primaryGoalId={primaryGoalId}
            primaryPhotoUrl={meta.photoUrl}
            onAddFuelForGoal={onAddFuelForGoal}
            onSetPrimaryGoal={onSetPrimaryGoal}
          />
        ) : null}

        {activeTab === "insights" ? <V1InsightsScreen currency={meta.currency} /> : null}
      </main>

      <V1AppTabBar
        activeTab={activeTab}
        onChange={handleTabChange}
        onCloverAction={onSmartSplit}
      />
    </div>
  );
}

"use client";

import { Home, LineChart, Star, User } from "lucide-react";

export type V0HomeTab = "home" | "goals" | "insights" | "profile";

const TABS = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "goals" as const, label: "Goals", icon: Star },
  { id: "insights" as const, label: "Insights", icon: LineChart },
  { id: "profile" as const, label: "Profile", icon: User },
];

type V0AppTabBarProps = {
  activeTab: V0HomeTab;
  onChange: (tab: V0HomeTab) => void;
};

export function V0AppTabBar({ activeTab, onChange }: V0AppTabBarProps) {
  return (
    <nav className="v-dream-fund-v0__tabbar" aria-label="Main navigation">
      <ul className="v-dream-fund-v0__tabbar-list">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <li key={tab.id}>
              <button
                type="button"
                className={[
                  "v-dream-fund-v0__tabbar-item",
                  isActive ? "v-dream-fund-v0__tabbar-item--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={isActive ? "page" : undefined}
                onClick={() => onChange(tab.id)}
              >
                <Icon strokeWidth={isActive ? 2.25 : 2} size={22} aria-hidden />
                <span className="v-dream-fund-v0__tabbar-label">{tab.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import { Clock3, Clover, Home, Star, User } from "lucide-react";

export type V1HomeTab = "home" | "dreams" | "insights" | "profile";

const SIDE_TABS = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "dreams" as const, label: "Dreams", icon: Star },
  { id: "insights" as const, label: "Insights", icon: Clock3 },
  { id: "profile" as const, label: "Profile", icon: User },
] as const;

type V1AppTabBarProps = {
  activeTab: V1HomeTab;
  onChange: (tab: V1HomeTab) => void;
  onCloverAction?: () => void;
};

export function V1AppTabBar({ activeTab, onChange, onCloverAction }: V1AppTabBarProps) {
  return (
    <nav className="v-dream-fund-v1__tabbar" aria-label="Main navigation">
      <ul className="v-dream-fund-v1__tabbar-list">
        {SIDE_TABS.slice(0, 2).map((tab) => (
          <li key={tab.id}>
            <TabItem tab={tab} active={activeTab === tab.id} onSelect={() => onChange(tab.id)} />
          </li>
        ))}
        <li className="v-dream-fund-v1__tabbar-fab-cell">
          <button
            type="button"
            className="v-dream-fund-v1__tabbar-fab"
            onClick={onCloverAction}
            aria-label="Quick action"
          >
            <Clover strokeWidth={2} size={24} aria-hidden />
          </button>
        </li>
        {SIDE_TABS.slice(2).map((tab) => (
          <li key={tab.id}>
            <TabItem tab={tab} active={activeTab === tab.id} onSelect={() => onChange(tab.id)} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function TabItem({
  tab,
  active,
  onSelect,
}: {
  tab: (typeof SIDE_TABS)[number];
  active: boolean;
  onSelect: () => void;
}) {
  const Icon = tab.icon;

  return (
    <button
      type="button"
      className={[
        "v-dream-fund-v1__tabbar-item",
        active ? "v-dream-fund-v1__tabbar-item--active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-current={active ? "page" : undefined}
      onClick={onSelect}
    >
      <span className="v-dream-fund-v1__tabbar-icon" aria-hidden>
        <Icon strokeWidth={active ? 2.25 : 2} size={22} />
      </span>
      <span className="v-dream-fund-v1__tabbar-label">{tab.label}</span>
    </button>
  );
}

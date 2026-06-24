"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  Home,
  Target,
  User,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  dreamFundAppTabs,
  dreamFundPartnerTab,
} from "@/lib/dream-fund-app-data";
import {
  isDreamFundPartnerRoute,
  shouldShowDreamFundHeader,
  shouldShowDreamFundTabBar,
} from "@/lib/dream-fund-app-routes";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";

const tabIcons = {
  home: Home,
  goals: Target,
  bills: CalendarDays,
  insights: BarChart3,
  profile: User,
  partner: Users,
} as const;

export function DreamFundAppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { state } = useDreamFundApp();
  const showHeader = shouldShowDreamFundHeader(pathname);
  const showTabBar = shouldShowDreamFundTabBar(pathname);
  const partnerMode = isDreamFundPartnerRoute(pathname);

  const tabs = partnerMode
    ? dreamFundAppTabs.map((tab) =>
        tab.id === "profile" ? dreamFundPartnerTab : tab,
      )
    : dreamFundAppTabs;

  return (
    <div className="v-dream-fund-app v-theme-dream-fund">
      <div
        className={[
          "v-dream-fund-app__frame",
          !showTabBar ? "v-dream-fund-app__frame--no-tabbar" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {showHeader ? (
          <header className="v-dream-fund-app__header">
            <div className="v-dream-fund-app__brand">
              <p className="v-dream-fund-app__eyebrow">Dream Fund</p>
              <h1 className="v-dream-fund-app__title">Hi, {state.profile.name.split(" ")[0]}</h1>
            </div>
          </header>
        ) : null}

        <main
          className={[
            "v-dream-fund-app__main",
            !showHeader ? "v-dream-fund-app__main--flush" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </main>

        {showTabBar ? (
          <nav className="v-dream-fund-app__tabbar" aria-label="Main navigation">
            {tabs.map((tab) => {
              const iconKey =
                tab.id in tabIcons ? (tab.id as keyof typeof tabIcons) : "profile";
              const Icon = tabIcons[iconKey];
              const isActive =
                tab.href === "/dream-fund-app"
                  ? pathname === "/dream-fund-app"
                  : pathname.startsWith(tab.href);

              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={[
                    "v-dream-fund-app__tab",
                    isActive ? "v-dream-fund-app__tab--active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon strokeWidth={2} aria-hidden />
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        ) : null}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Sparkles, TriangleAlert } from "lucide-react";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";

const subnav = [
  { href: "/dream-fund-app/insights", label: "Overview" },
  { href: "/dream-fund-app/insights/goals", label: "Goals progress" },
  { href: "/dream-fund-app/insights/alerts", label: "Alerts" },
];

export default function DreamFundInsightsAlertsPage() {
  const pathname = usePathname();
  const { state } = useDreamFundApp();

  return (
    <div className="v-dream-fund-app__screen">
      <header>
        <h1 className="v-dream-fund-app__section-title">Alerts</h1>
        <p className="v-dream-fund-app__section-desc">Bills, budget nudges, and goal updates.</p>
      </header>

      <nav className="v-dream-fund-app__subnav" aria-label="Insights views">
        {subnav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "v-dream-fund-app__subnav-link",
              pathname === item.href ? "v-dream-fund-app__subnav-link--active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="v-dream-fund-app__insight-list">
        {state.alerts.map((alert) => {
          const Icon =
            alert.type === "bill" ? Bell : alert.type === "budget" ? TriangleAlert : Sparkles;
          const variant = alert.type === "budget" ? "warning" : alert.type === "goal" ? "success" : "info";

          return (
            <div key={alert.id} className={`v-cmp-alert v-cmp-alert--${variant}`} role="status">
              <span className="v-cmp-alert__icon" aria-hidden>
                <Icon strokeWidth={2} size={16} />
              </span>
              <div>
                <p className="v-cmp-alert__message v-dream-fund-app__alert-title">{alert.title}</p>
                <p className="v-cmp-alert__message v-dream-fund-app__alert-body">{alert.message}</p>
                <p className="v-dream-fund-app__list-card-meta">{alert.timeLabel}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

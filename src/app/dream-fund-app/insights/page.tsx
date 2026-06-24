"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";

const subnav = [
  { href: "/dream-fund-app/insights", label: "Overview" },
  { href: "/dream-fund-app/insights/goals", label: "Goals progress" },
  { href: "/dream-fund-app/insights/alerts", label: "Alerts" },
];

export default function DreamFundInsightsPage() {
  const pathname = usePathname();
  const { state } = useDreamFundApp();

  return (
    <div className="v-dream-fund-app__screen">
      <header>
        <h1 className="v-dream-fund-app__section-title">Insights</h1>
        <p className="v-dream-fund-app__section-desc">Understand your money with supportive summaries.</p>
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

      <section className="v-dream-fund-app__chart-panel" aria-labelledby="balance-trend">
        <h2 id="balance-trend" className="v-dream-fund-app__calendar-title">
          Total balance trend
        </h2>
        <div className="v-dream-fund-app__line-chart" aria-hidden />
      </section>

      <section className="v-dream-fund-app__chart-panel" aria-labelledby="spending-category">
        <h2 id="spending-category" className="v-dream-fund-app__calendar-title">
          Spending by category
        </h2>
        <div className="v-dream-fund-app__donut" aria-hidden />
        <ul className="v-dream-fund-app__legend">
          <li className="v-dream-fund-app__legend-item">
            <span className="v-dream-fund-app__legend-swatch v-dream-fund-app__legend-swatch--green" />
            Shopping
          </li>
          <li className="v-dream-fund-app__legend-item">
            <span className="v-dream-fund-app__legend-swatch v-dream-fund-app__legend-swatch--accent" />
            Food & Dining
          </li>
          <li className="v-dream-fund-app__legend-item">
            <span className="v-dream-fund-app__legend-swatch v-dream-fund-app__legend-swatch--lavender" />
            Transport
          </li>
        </ul>
      </section>

      <Link href="/dream-fund-app/insights/alerts" className="v-dream-fund-app__menu-link">
        View {state.alerts.length} alerts
      </Link>
    </div>
  );
}

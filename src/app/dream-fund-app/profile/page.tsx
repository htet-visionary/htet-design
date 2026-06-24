"use client";

import Link from "next/link";
import { IllustrationPlaceholder } from "@/components/dream-fund/app/IllustrationPlaceholder";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import { formatCurrency } from "@/lib/dream-fund-app-utils";

export default function DreamFundProfilePage() {
  const { state, saveableBalance, monthlyMandatoryTotal, resetState } = useDreamFundApp();

  return (
    <div className="v-dream-fund-app__screen">
      <header className="v-dream-fund-app__goal-head">
        <div>
          <h1 className="v-dream-fund-app__section-title">Profile</h1>
          <p className="v-dream-fund-app__section-desc">{state.profile.email}</p>
        </div>
        <IllustrationPlaceholder variant="avatar" label="Profile photo placeholder" />
      </header>

      <ul className="v-dream-fund-app__menu-list">
        <li>
          <Link href="/dream-fund-app/profile/settings" className="v-dream-fund-app__menu-link">
            Personal information
          </Link>
        </li>
        <li>
          <Link href="/dream-fund-app/profile/settings" className="v-dream-fund-app__menu-link">
            Preferences
          </Link>
        </li>
        <li>
          <Link href="/dream-fund-app/partner" className="v-dream-fund-app__menu-link">
            Linked accounts / Partner
          </Link>
        </li>
        <li>
          <Link href="/dream-fund" className="v-dream-fund-app__menu-link">
            View case study
          </Link>
        </li>
      </ul>

      <article className="v-dream-fund-app__stat">
        <p className="v-dream-fund-app__stat-label">Saveable balance</p>
        <p className="v-dream-fund-app__stat-value">{formatCurrency(saveableBalance)}</p>
        <p className="v-dream-fund-app__hero-note">
          {formatCurrency(state.profile.monthlyIncome)} income − {formatCurrency(monthlyMandatoryTotal)} must-pay
        </p>
      </article>

      <button
        type="button"
        className="v-cmp-btn v-cmp-btn--md v-cmp-btn--secondary-green"
        onClick={resetState}
      >
        <span className="v-cmp-btn__label">Log out / Reset prototype</span>
      </button>
    </div>
  );
}

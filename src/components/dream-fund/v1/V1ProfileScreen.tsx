"use client";

import { ChevronDown, LogOut } from "lucide-react";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import {
  DREAM_FUND_V1_CURRENCIES,
  type DreamFundV1Currency,
} from "@/lib/dream-fund-v1-capture-data";

type V1ProfileScreenProps = {
  currency: DreamFundV1Currency;
  onCurrencyChange: (currency: DreamFundV1Currency) => void;
  onLogout: () => void;
};

export function V1ProfileScreen({ currency, onCurrencyChange, onLogout }: V1ProfileScreenProps) {
  const { state } = useDreamFundApp();
  const { profile } = state;
  const initial = profile.name.trim().charAt(0).toUpperCase() || "J";

  return (
    <div className="v-dream-fund-v1__profile">
      <section className="v-dream-fund-v1__profile-card" aria-labelledby="v1-profile-account">
        <h2 id="v1-profile-account" className="v-dream-fund-v1__profile-section-title">
          Account
        </h2>
        <div className="v-dream-fund-v1__profile-user">
          <span className="v-dream-fund-v1__profile-avatar" aria-hidden>
            {initial}
          </span>
          <div className="v-dream-fund-v1__profile-user-copy">
            <p className="v-dream-fund-v1__profile-name">{profile.name}</p>
            <p className="v-dream-fund-v1__profile-email">{profile.email || "Dream Fund member"}</p>
          </div>
        </div>
      </section>

      <section className="v-dream-fund-v1__profile-card" aria-labelledby="v1-profile-preferences">
        <h2 id="v1-profile-preferences" className="v-dream-fund-v1__profile-section-title">
          Preferences
        </h2>
        <label className="v-dream-fund-v1__field">
          <span className="v-dream-fund-v1__field-label">Currency</span>
          <div className="v-dream-fund-v1__select-wrap">
            <select
              className="v-dream-fund-v1__field-input v-dream-fund-v1__field-select"
              value={currency}
              onChange={(event) => onCurrencyChange(event.target.value as DreamFundV1Currency)}
            >
              {DREAM_FUND_V1_CURRENCIES.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
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
      </section>

      <section className="v-dream-fund-v1__profile-card">
        <button type="button" className="v-dream-fund-v1__profile-logout" onClick={onLogout}>
          <LogOut strokeWidth={2} size={18} aria-hidden />
          <span>Log out</span>
        </button>
        <p className="v-dream-fund-v1__profile-logout-desc">
          Starts the prototype over from the beginning.
        </p>
      </section>
    </div>
  );
}

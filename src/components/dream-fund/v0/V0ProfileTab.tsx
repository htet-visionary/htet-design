"use client";

import { useDreamFundApp } from "@/lib/dream-fund-app-context";

const CURRENCY_OPTIONS = [
  { value: "JPY", label: "Japanese Yen (¥)" },
  { value: "USD", label: "US Dollar ($)" },
  { value: "EUR", label: "Euro (€)" },
] as const;

type V0ProfileTabProps = {
  onReset: () => void;
};

export function V0ProfileTab({ onReset }: V0ProfileTabProps) {
  const { state, updateSettings } = useDreamFundApp();
  const { profile, settings } = state;

  return (
    <div className="v-dream-fund-v0__tab-screen">
      <section className="v-dream-fund-v0__profile-card" aria-labelledby="v0-profile-user">
        <h2 id="v0-profile-user" className="v-dream-fund-v0__home-panel-title">
          Account
        </h2>

        <div className="v-dream-fund-v0__profile-user">
          <span className="v-dream-fund-v0__profile-avatar" aria-hidden>
            {profile.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="v-dream-fund-v0__profile-name">{profile.name}</p>
            <p className="v-dream-fund-v0__profile-email">{profile.email}</p>
          </div>
        </div>
      </section>

      <section className="v-dream-fund-v0__profile-card" aria-labelledby="v0-profile-settings">
        <h2 id="v0-profile-settings" className="v-dream-fund-v0__home-panel-title">
          Preferences
        </h2>

        <label className="v-dream-fund-v0__field">
          <span className="v-dream-fund-v0__field-label">Currency</span>
          <select
            className="v-dream-fund-v0__field-input"
            value={settings.currency}
            onChange={(event) => updateSettings({ currency: event.target.value })}
          >
            {CURRENCY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="v-dream-fund-v0__profile-card">
        <h2 className="v-dream-fund-v0__home-panel-title">Prototype</h2>
        <p className="v-dream-fund-v0__profile-reset-desc">
          Reset clears all saved dreams, bills, and transactions so you can run through onboarding again.
        </p>
        <button
          type="button"
          className="v-cmp-btn v-cmp-btn--md v-cmp-btn--secondary-green v-dream-fund-v0__profile-reset-btn"
          onClick={onReset}
        >
          <span className="v-cmp-btn__label">Reset prototype</span>
        </button>
      </section>
    </div>
  );
}

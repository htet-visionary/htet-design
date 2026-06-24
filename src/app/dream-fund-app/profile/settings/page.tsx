"use client";

import { ScreenHeader } from "@/components/dream-fund/app/ScreenHeader";
import { SettingToggle } from "@/components/dream-fund/app/SettingToggle";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";

export default function DreamFundSettingsPage() {
  const { state, updateSettings, updateProfileName, updateIncome } = useDreamFundApp();

  return (
    <div className="v-dream-fund-app__screen">
      <ScreenHeader title="Settings" backHref="/dream-fund-app/profile" />

      <section className="v-dream-fund-app__profile-card">
        <label className="v-dream-fund-app__field">
          <span className="v-dream-fund-app__field-label">Display name</span>
          <input
            className="v-dream-fund-app__field-input"
            value={state.profile.name}
            onChange={(event) => updateProfileName(event.target.value)}
          />
        </label>

        <label className="v-dream-fund-app__field">
          <span className="v-dream-fund-app__field-label">Monthly income</span>
          <input
            className="v-dream-fund-app__field-input"
            type="number"
            min="0"
            value={state.profile.monthlyIncome}
            onChange={(event) => updateIncome(Number.parseFloat(event.target.value) || 0)}
          />
        </label>

        <label className="v-dream-fund-app__field">
          <span className="v-dream-fund-app__field-label">Currency</span>
          <input
            className="v-dream-fund-app__field-input"
            value={state.settings.currency}
            readOnly
          />
        </label>
      </section>

      <section className="v-dream-fund-app__profile-card">
        <SettingToggle
          label="Weekly summary"
          description="Lightweight check-in each week"
          checked={state.settings.weeklySummary}
          onChange={(checked) => updateSettings({ weeklySummary: checked })}
        />
        <SettingToggle
          label="Bill reminders"
          description="Alerts before due dates"
          checked={state.settings.billReminders}
          onChange={(checked) => updateSettings({ billReminders: checked })}
        />
        <SettingToggle
          label="Budget alerts"
          description="Supportive nudges at 80% spent"
          checked={state.settings.budgetAlerts}
          onChange={(checked) => updateSettings({ budgetAlerts: checked })}
        />
        <SettingToggle
          label="Dark mode"
          description="Prototype toggle — not implemented"
          checked={state.settings.darkMode}
          onChange={(checked) => updateSettings({ darkMode: checked })}
        />
      </section>
    </div>
  );
}

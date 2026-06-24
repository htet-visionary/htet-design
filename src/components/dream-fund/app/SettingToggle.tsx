"use client";

export function SettingToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="v-dream-fund-app__setting">
      <span className="v-dream-fund-app__setting-copy">
        <span className="v-dream-fund-app__setting-label">{label}</span>
        {description ? (
          <span className="v-dream-fund-app__setting-desc">{description}</span>
        ) : null}
      </span>
      <span className="v-dream-fund-app__switch">
        <input
          type="checkbox"
          className="v-dream-fund-app__switch-input"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className="v-dream-fund-app__switch-track" aria-hidden />
      </span>
    </label>
  );
}

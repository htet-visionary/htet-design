import type { CSSProperties } from "react";
import { Sparkles } from "lucide-react";
import {
  elevation,
  grid,
  icons,
  motion,
  radius,
  spacing,
  touchTarget,
} from "@design-system/visionary";

export function SpacingScalePreview() {
  return (
    <ul className="v-foundation-preview v-spacing-scale" aria-label="Spacing scale preview">
      {Object.entries(spacing).map(([step, px]) => (
        <li key={step} className="v-spacing-scale__row">
          <code className="v-code v-code--sm v-spacing-scale__token">spacing.{step}</code>
          <span
            className="v-spacing-scale__bar"
            style={{ width: px, height: px >= 24 ? 12 : 8 }}
            aria-hidden
          />
          <span className="v-spacing-scale__px">{px}px</span>
        </li>
      ))}
    </ul>
  );
}

export function RadiusScalePreview() {
  return (
    <ul className="v-foundation-preview v-radius-scale" aria-label="Radius scale preview">
      {Object.keys(radius).map((name) => (
        <li key={name} className="v-radius-scale__item">
          <span
            className="v-radius-scale__box"
            style={{ borderRadius: `var(--v-radius-${name})` }}
            aria-hidden
          />
          <code className="v-code v-code--sm">radius.{name}</code>
        </li>
      ))}
    </ul>
  );
}

export function RadiusUsagePreview() {
  const demos = [
    { token: "radius.sm", label: "Input", className: "v-radius-usage--sm" },
    { token: "radius.md", label: "Button", className: "v-radius-usage--md" },
    { token: "radius.lg", label: "Card", className: "v-radius-usage--lg" },
    { token: "radius.pill", label: "Pill", className: "v-radius-usage--pill" },
  ] as const;

  return (
    <div className="v-foundation-preview v-usage-grid v-usage-grid--compact" aria-label="Radius usage preview">
      {demos.map((demo) => (
        <figure key={demo.token} className="v-usage-demo">
          <figcaption className="v-usage-demo__label">{demo.token}</figcaption>
          <div className={`v-usage-demo__surface v-radius-usage ${demo.className}`}>
            {demo.label}
          </div>
        </figure>
      ))}
    </div>
  );
}

export function ElevationPreview() {
  const levels = [
    { token: "elevation.card", label: "Card", shadow: "var(--v-shadow-card)", z: elevation.card.zIndex },
    {
      token: "elevation.dropdown",
      label: "Dropdown",
      shadow: "var(--v-shadow-dropdown)",
      z: elevation.dropdown.zIndex,
    },
    {
      token: "elevation.modal",
      label: "Modal",
      shadow: "var(--v-shadow-modal)",
      z: elevation.modal.zIndex,
    },
  ] as const;

  return (
    <div className="v-foundation-preview v-elevation-preview" aria-label="Elevation preview">
      <div className="v-elevation-preview__stage">
        {levels.map((level, index) => (
          <div
            key={level.token}
            className="v-elevation-preview__layer"
            style={{
              boxShadow: level.shadow,
              zIndex: level.z,
              transform: `translate(${index * 20}px, ${index * 16}px)`,
            }}
          >
            <span className="v-elevation-preview__label">{level.label}</span>
            <code className="v-code v-code--sm">{level.token}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MotionPreview() {
  const durations = [
    { token: "motion.duration.fast", varName: "--v-motion-fast", label: "Fast · 150ms" },
    { token: "motion.duration.normal", varName: "--v-motion-normal", label: "Normal · 250ms" },
    { token: "motion.duration.slow", varName: "--v-motion-slow", label: "Slow · 400ms" },
  ] as const;

  return (
    <div className="v-foundation-preview v-motion-preview" aria-label="Motion duration preview">
      <p className="v-foundation-preview__hint">Hover each bar to preview duration.</p>
      <ul className="v-motion-preview__list">
        {durations.map((item) => (
          <li key={item.token} className="v-motion-preview__item">
            <code className="v-code v-code--sm">{item.token}</code>
            <div
              className="v-motion-preview__track"
              style={
                {
                  "--motion-duration": `var(${item.varName})`,
                } as CSSProperties
              }
            >
              <span className="v-motion-preview__bar">{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LayoutGridPreview() {
  return (
    <figure className="v-foundation-preview v-layout-grid-preview" aria-label="12-column grid preview">
      <figcaption className="v-usage-demo__label">
        12 columns · gutter spacing.{grid.gutter / 4}
      </figcaption>
      <div className="v-layout-grid-preview__grid">
        {Array.from({ length: grid.columns }, (_, index) => (
          <span key={index} className="v-layout-grid-preview__col" aria-hidden />
        ))}
      </div>
    </figure>
  );
}

export function LayoutTouchTargetPreview() {
  return (
    <div
      className="v-foundation-preview v-usage-grid v-usage-grid--compact"
      aria-label="Touch target preview"
    >
      <figure className="v-usage-demo">
        <figcaption className="v-usage-demo__label">
          touchTarget.minimum · {touchTarget.minimum}px
        </figcaption>
        <div className="v-touch-target-preview">
          <span
            className="v-touch-target-preview__hit v-touch-target-preview__hit--min"
            aria-hidden
          />
          <span className="v-touch-target-preview__visual" aria-hidden />
        </div>
      </figure>

      <figure className="v-usage-demo">
        <figcaption className="v-usage-demo__label">
          touchTarget.recommended · {touchTarget.recommended}px
        </figcaption>
        <div className="v-touch-target-preview">
          <span
            className="v-touch-target-preview__hit v-touch-target-preview__hit--rec"
            aria-hidden
          />
          <span className="v-touch-target-preview__visual" aria-hidden />
        </div>
      </figure>
    </div>
  );
}

export function IconsUsagePreview() {
  return (
    <div className="v-foundation-preview v-usage-grid" aria-label="Icon usage preview">
      <figure className="v-usage-demo">
        <figcaption className="v-usage-demo__label">Sidebar nav · icons.size.sm</figcaption>
        <div className="v-usage-demo__surface v-icons-usage-nav">
          <Sparkles
            className="v-icons-usage-nav__icon"
            strokeWidth={icons.strokeWidth}
            aria-hidden
          />
          <span>Colors</span>
        </div>
      </figure>

      <figure className="v-usage-demo">
        <figcaption className="v-usage-demo__label">Inline label · icons.size.md</figcaption>
        <div className="v-usage-demo__surface v-icons-usage-inline">
          <Sparkles
            className="v-icons-usage-inline__icon"
            strokeWidth={icons.strokeWidth}
            aria-hidden
          />
          <span>Save changes</span>
        </div>
      </figure>

      <figure className="v-usage-demo">
        <figcaption className="v-usage-demo__label">Link card · icons.size.lg</figcaption>
        <div className="v-icons-usage-card">
          <Sparkles
            className="v-icons-usage-card__icon"
            strokeWidth={icons.strokeWidth}
            aria-hidden
          />
          <span className="v-icons-usage-card__title">Typography</span>
        </div>
      </figure>

      <figure className="v-usage-demo">
        <figcaption className="v-usage-demo__label">
          Icon-only · icons.size.md + {touchTarget.minimum}px hit area
        </figcaption>
        <button type="button" className="v-icons-usage-icon-only" aria-label="Settings preview">
          <Sparkles strokeWidth={icons.strokeWidth} aria-hidden />
        </button>
      </figure>
    </div>
  );
}

export function ReadingWidthPreview() {
  return (
    <figure className="v-foundation-preview v-reading-width-preview" aria-label="Reading width preview">
      <figcaption className="v-usage-demo__label">reading.max-width · 65ch</figcaption>
      <p className="v-reading-width-preview__text">
        Visionary typography keeps long-form content within a comfortable measure so paragraphs
        stay readable without forcing horizontal scanning across the full viewport.
      </p>
    </figure>
  );
}

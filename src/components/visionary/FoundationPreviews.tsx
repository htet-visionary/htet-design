import {
  spacing,
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

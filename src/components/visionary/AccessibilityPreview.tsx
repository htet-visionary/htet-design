import { focusRing, motion } from "@design-system/visionary";
import { TouchTargetPreview } from "@/components/visionary/LayoutPreview";

const contrastRows = [
  {
    pairing: "Body text",
    ratio: "4.5:1",
    variant: "body" as const,
  },
  {
    pairing: "Large text",
    ratio: "3:1",
    variant: "large" as const,
  },
  {
    pairing: "UI components",
    ratio: "3:1",
    variant: "ui" as const,
  },
  {
    pairing: "Focus indicator",
    ratio: "3:1",
    variant: "focus" as const,
  },
  {
    pairing: "Text on solid",
    ratio: "4.5:1",
    variant: "on-solid" as const,
    note: "text.on-solid",
  },
];

const focusRingRows = [
  { token: "width", value: `${focusRing.width}px` },
  { token: "style", value: focusRing.style },
  { token: "color", value: "focus.ring" },
  { token: "offset", value: `${focusRing.offset}px` },
  { token: "offset-color", value: "focus.ring-offset" },
];

const reducedMotionRows = [
  {
    token: "motion.duration.instant",
    value: `${motion.duration.instant}ms`,
    note: "Use under prefers-reduced-motion",
  },
  {
    token: "Max opacity fade",
    value: "100ms",
    note: "Modal and alert enter only",
  },
];

function ContrastPreviewBox({
  variant,
}: {
  variant: (typeof contrastRows)[number]["variant"];
}) {
  if (variant === "large") {
    return (
      <span className="v-a11y-contrast-preview v-a11y-contrast-preview--large" aria-hidden>
        Aa
      </span>
    );
  }

  if (variant === "ui") {
    return (
      <span className="v-a11y-contrast-preview v-a11y-contrast-preview--ui" aria-hidden>
        <span className="v-a11y-contrast-preview__ui-box" />
      </span>
    );
  }

  if (variant === "focus") {
    return (
      <span className="v-a11y-contrast-preview v-a11y-contrast-preview--focus" aria-hidden>
        <span className="v-a11y-contrast-preview__focus-target" />
      </span>
    );
  }

  if (variant === "on-solid") {
    return (
      <span className="v-a11y-contrast-preview v-a11y-contrast-preview--on-solid" aria-hidden>
        Aa
      </span>
    );
  }

  return (
    <span className="v-a11y-contrast-preview v-a11y-contrast-preview--body" aria-hidden>
      Aa
    </span>
  );
}

export function ContrastRequirementsPreview() {
  return (
    <div
      className="v-foundation-preview v-a11y-token-table"
      aria-label="Contrast requirements"
    >
      <div className="v-a11y-token-table__head" aria-hidden>
        <span>Pairing</span>
        <span>Preview</span>
        <span>Minimum ratio</span>
      </div>
      <ul className="v-a11y-token-table__body">
        {contrastRows.map((row) => (
          <li key={row.pairing} className="v-a11y-token-table__row">
            <span className="v-a11y-token-table__label">{row.pairing}</span>
            <ContrastPreviewBox variant={row.variant} />
            <code className="v-code v-code--sm v-spacing-scale__token v-a11y-token-table__value">
              {row.ratio}
              {row.note ? (
                <>
                  <span aria-hidden> · </span>
                  <span className="v-a11y-token-table__note">{row.note}</span>
                </>
              ) : null}
            </code>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FocusRingPreview() {
  return (
    <div className="v-a11y-focus">
      <figure className="v-foundation-preview v-a11y-focus__demo" aria-label="Focus ring preview">
        <button className="v-a11y-focus__target" type="button" tabIndex={-1}>
          Focus target
        </button>
      </figure>
      <ul className="v-foundation-preview v-spacing-scale v-a11y-focus__specs" aria-label="Focus ring tokens">
        {focusRingRows.map((row) => (
          <li key={row.token} className="v-spacing-scale__row">
            <code className="v-code v-code--sm v-spacing-scale__token">{row.token}</code>
            <span className="v-a11y-focus__spacer" aria-hidden />
            <span className="v-spacing-scale__px">{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { TouchTargetPreview };

export function ReducedMotionPreview() {
  return (
    <ul
      className="v-foundation-preview v-spacing-scale v-a11y-reduced-motion"
      aria-label="Reduced motion tokens"
    >
      {reducedMotionRows.map((row) => (
        <li key={row.token} className="v-spacing-scale__row">
          <code className="v-code v-code--sm v-spacing-scale__token">{row.token}</code>
          <span className="v-a11y-reduced-motion__spacer" aria-hidden />
          <span className="v-spacing-scale__px">
            {row.note ? (
              <>
                <span className="v-a11y-token-table__note">{row.note}</span>
                <span aria-hidden> · </span>
              </>
            ) : null}
            {row.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

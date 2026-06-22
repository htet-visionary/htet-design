import type { ReactNode } from "react";
import { focusRing, motion, touchTarget } from "@design-system/visionary";

const contrastRows = [
  { pairing: "Body text", ratio: "4.5:1", variant: "body" as const },
  { pairing: "Large text", ratio: "3:1", variant: "large" as const },
  { pairing: "UI components", ratio: "3:1", variant: "ui" as const },
  { pairing: "Focus indicator", ratio: "3:1", variant: "focus" as const },
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

const touchTargetRows = [
  { name: "minimum", px: touchTarget.minimum, variant: "minimum" as const },
  { name: "recommended", px: touchTarget.recommended, variant: "recommended" as const },
];

const keyboardRows = [
  {
    requirement: "Tab order",
    detail: "Logical sequence; all actions reachable by keyboard",
    variant: "tab-order" as const,
  },
  {
    requirement: "Focus trap",
    detail: "Modals keep focus inside while open",
    variant: "focus-trap" as const,
  },
  {
    requirement: "Return focus",
    detail: "Restore focus to the trigger on close",
    variant: "return-focus" as const,
  },
  {
    requirement: "Labels",
    detail: "Visible labels required; placeholder is not a label",
    variant: "labels" as const,
  },
  {
    requirement: "Roles & ARIA",
    detail: "Correct semantics for custom controls",
    variant: "aria" as const,
  },
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

function PreviewSlot({ children }: { children: ReactNode }) {
  return <span className="v-a11y-token-table__preview">{children}</span>;
}

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

function TouchTargetSpecimen({ size }: { size: "minimum" | "recommended" }) {
  return (
    <span className="v-touch-target-preview" aria-hidden>
      <span
        className={`v-touch-target-preview__hit v-touch-target-preview__hit--${size === "minimum" ? "min" : "rec"}`}
      />
      <span className="v-touch-target-preview__visual" />
    </span>
  );
}

function KeyboardPreviewBox({
  variant,
}: {
  variant: (typeof keyboardRows)[number]["variant"];
}) {
  if (variant === "tab-order") {
    return (
      <span className="v-a11y-keyboard-preview v-a11y-keyboard-preview--tab-order" aria-hidden>
        <span className="v-a11y-keyboard-preview__step" />
        <span className="v-a11y-keyboard-preview__arrow" />
        <span className="v-a11y-keyboard-preview__step" />
        <span className="v-a11y-keyboard-preview__arrow" />
        <span className="v-a11y-keyboard-preview__step" />
      </span>
    );
  }

  if (variant === "focus-trap") {
    return (
      <span className="v-a11y-keyboard-preview v-a11y-keyboard-preview--focus-trap" aria-hidden>
        <span className="v-a11y-keyboard-preview__trap" />
        <span className="v-a11y-keyboard-preview__trap-focus" />
      </span>
    );
  }

  if (variant === "return-focus") {
    return (
      <span className="v-a11y-keyboard-preview v-a11y-keyboard-preview--return-focus" aria-hidden>
        <span className="v-a11y-keyboard-preview__trigger" />
        <span className="v-a11y-keyboard-preview__return-arrow" />
        <span className="v-a11y-keyboard-preview__dialog" />
      </span>
    );
  }

  if (variant === "labels") {
    return (
      <span className="v-a11y-keyboard-preview v-a11y-keyboard-preview--labels" aria-hidden>
        <span className="v-a11y-keyboard-preview__label">Email</span>
        <span className="v-a11y-keyboard-preview__field" />
      </span>
    );
  }

  return (
    <span className="v-a11y-keyboard-preview v-a11y-keyboard-preview--aria" aria-hidden>
      <span className="v-a11y-keyboard-preview__icon" />
      <span className="v-a11y-keyboard-preview__badge">aria-label</span>
    </span>
  );
}

export function ContrastPreview() {
  return (
    <div className="v-foundation-preview v-a11y-token-table" aria-label="Contrast requirements">
      <div className="v-a11y-token-table__head" aria-hidden>
        <span>Pairing</span>
        <span>Preview</span>
        <span>Minimum ratio</span>
      </div>
      <ul className="v-a11y-token-table__body">
        {contrastRows.map((row) => (
          <li key={row.pairing} className="v-a11y-token-table__row">
            <span className="v-a11y-token-table__label">{row.pairing}</span>
            <PreviewSlot>
              <ContrastPreviewBox variant={row.variant} />
            </PreviewSlot>
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

export function FocusPreview() {
  return (
    <div className="v-foundation-preview v-a11y-focus-card" aria-label="Focus ring">
      <div className="v-a11y-focus-card__demo" aria-hidden>
        <button className="v-a11y-focus-card__target" type="button" tabIndex={-1}>
          Focus target
        </button>
      </div>
      <ul className="v-a11y-focus-card__specs">
        {focusRingRows.map((row) => (
          <li key={row.token} className="v-spacing-scale__row">
            <code className="v-code v-code--sm v-spacing-scale__token">{row.token}</code>
            <span className="v-a11y-focus-card__spacer" aria-hidden />
            <span className="v-spacing-scale__px">{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TouchTargetPreview() {
  return (
    <ul className="v-foundation-preview v-spacing-scale v-touch-target-scale" aria-label="Touch targets">
      {touchTargetRows.map((row) => (
        <li key={row.name} className="v-spacing-scale__row v-touch-target-scale__row">
          <code className="v-code v-code--sm v-spacing-scale__token">{row.name}</code>
          <TouchTargetSpecimen size={row.variant} />
          <span className="v-spacing-scale__px">{row.px}px</span>
        </li>
      ))}
    </ul>
  );
}

export function KeyboardPreview() {
  return (
    <div className="v-foundation-preview v-a11y-token-table" aria-label="Keyboard requirements">
      <div className="v-a11y-token-table__head" aria-hidden>
        <span>Requirement</span>
        <span>Preview</span>
        <span>Detail</span>
      </div>
      <ul className="v-a11y-token-table__body">
        {keyboardRows.map((row) => (
          <li key={row.requirement} className="v-a11y-token-table__row">
            <span className="v-a11y-token-table__label">{row.requirement}</span>
            <PreviewSlot>
              <KeyboardPreviewBox variant={row.variant} />
            </PreviewSlot>
            <span className="v-a11y-token-table__detail">{row.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReducedMotionPreview() {
  return (
    <ul className="v-foundation-preview v-a11y-reduced-motion" aria-label="Reduced motion">
      {reducedMotionRows.map((row) => (
        <li
          key={row.token}
          className="v-a11y-reduced-motion__item"
          aria-label={`${row.token}: ${row.note ? `${row.note}, ` : ""}${row.value}`}
        >
          {row.token.startsWith("motion.") ? (
            <code className="v-code v-code--sm v-a11y-reduced-motion__chip">{row.token}</code>
          ) : (
            <span className="v-a11y-reduced-motion__chip">{row.token}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

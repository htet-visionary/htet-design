import type { ReactNode } from "react";
import { elevation, semantic } from "@design-system/visionary";

const dropShadowRows = [
  {
    level: "card" as const,
    shadow: elevation.card.shadow,
    usage: "Cards and panels",
  },
  {
    level: "dropdown" as const,
    shadow: elevation.dropdown.shadow,
    usage: "Menus and popovers",
  },
  {
    level: "modal" as const,
    shadow: elevation.modal.shadow,
    usage: "Dialogs and sheets",
  },
];

const overlayRows = [
  {
    level: "scrim" as const,
    token: "overlay.scrim",
    value: semantic.overlay.scrim,
    usage: "Modal and dialog backdrops",
  },
  {
    level: "scrim-light" as const,
    token: "overlay.scrim-light",
    value: semantic.overlay.scrimLight,
    usage: "Drawers and non-blocking overlays",
  },
  {
    level: "none" as const,
    token: "none",
    value: "transparent",
    usage: "Dropdowns and floating layers",
  },
];

function PreviewSlot({ children }: { children: ReactNode }) {
  return <span className="v-elevation-token-table__preview">{children}</span>;
}

function DropShadowPreviewBox({
  level,
  shadow,
}: {
  level: (typeof dropShadowRows)[number]["level"];
  shadow: string;
}) {
  return (
    <span
      className={`v-elevation-specimen v-elevation-specimen--${level} v-elevation-specimen--shadow-preview`}
      style={{ boxShadow: shadow }}
      aria-hidden
    />
  );
}

function OverlayPreviewBox({
  level,
}: {
  level: (typeof overlayRows)[number]["level"];
}) {
  return (
    <span
      className={`v-elevation-overlay-preview v-elevation-overlay-preview--${level}`}
      aria-hidden
    >
      <span className="v-elevation-overlay-preview__stage" />
      <span className="v-elevation-overlay-preview__content" />
      {level !== "none" ? <span className="v-elevation-overlay-preview__scrim" /> : null}
    </span>
  );
}

export function ElevationDropShadowPreview() {
  return (
    <div
      className="v-foundation-preview v-elevation-token-table"
      aria-label="Elevation drop shadow"
    >
      <div className="v-elevation-token-table__head" aria-hidden>
        <span>Level</span>
        <span>Preview</span>
        <span>Shadow</span>
      </div>
      <ul className="v-elevation-token-table__body">
        {dropShadowRows.map((row) => (
          <li key={row.level} className="v-elevation-token-table__row">
            <code className="v-code v-code--sm v-spacing-scale__token v-elevation-token-table__level">{row.level}</code>
            <PreviewSlot>
              <DropShadowPreviewBox level={row.level} shadow={row.shadow} />
            </PreviewSlot>
            <code className="v-code v-code--sm v-spacing-scale__token v-elevation-token-table__value">
              {row.shadow}
            </code>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ElevationOverlayPreview() {
  return (
    <div
      className="v-foundation-preview v-elevation-token-table v-elevation-token-table--overlay"
      aria-label="Elevation overlay"
    >
      <div className="v-elevation-token-table__head" aria-hidden>
        <span>Style</span>
        <span>Preview</span>
        <span>Value</span>
      </div>
      <ul className="v-elevation-token-table__body">
        {overlayRows.map((row) => (
          <li key={row.level} className="v-elevation-token-table__row">
            <code className="v-code v-code--sm v-spacing-scale__token v-elevation-token-table__level">{row.level}</code>
            <PreviewSlot>
              <OverlayPreviewBox level={row.level} />
            </PreviewSlot>
            <code className="v-code v-code--sm v-spacing-scale__token v-elevation-token-table__value">
              {row.value}
            </code>
          </li>
        ))}
      </ul>
    </div>
  );
}

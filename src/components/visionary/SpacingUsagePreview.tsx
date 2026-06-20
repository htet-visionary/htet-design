import type { ReactNode } from "react";
import { spacing } from "@design-system/visionary";

const usageRows = [
  {
    name: "Inline gaps",
    tokens: "spacing.1–2",
    range: "4–8px",
    demoPx: spacing[2],
    variant: "inline",
  },
  {
    name: "Component padding",
    tokens: "spacing.3–4",
    range: "12–16px",
    demoPx: spacing[4],
    variant: "padding",
  },
  {
    name: "Between components",
    tokens: "spacing.4–6",
    range: "16–24px",
    demoPx: spacing[6],
    variant: "stack",
  },
  {
    name: "Section separation",
    tokens: "spacing.8–12",
    range: "32–48px",
    demoPx: spacing[12],
    variant: "section",
  },
  {
    name: "Page rhythm",
    tokens: "spacing.12–16",
    range: "48–64px",
    demoPx: spacing[16],
    variant: "page",
  },
] as const;

type SpacingUsageVariant = (typeof usageRows)[number]["variant"];

function SpacingMeasure({
  orientation,
  sizePx,
}: {
  orientation: "horizontal" | "vertical";
  sizePx: number;
}) {
  const trackStyle =
    orientation === "horizontal"
      ? { width: sizePx, minWidth: sizePx }
      : { height: sizePx, minHeight: sizePx };

  return (
    <span
      className={`v-spacing-measure v-spacing-measure--${orientation}`}
      aria-hidden
    >
      <span className="v-spacing-measure__track" style={trackStyle}>
        <span className="v-spacing-measure__tick" />
        <span className="v-spacing-measure__line" />
        <span className="v-spacing-measure__tick" />
      </span>
      <span className="v-spacing-measure__label">{sizePx}px</span>
    </span>
  );
}

function InlineGapMeasure({ sizePx }: { sizePx: number }) {
  return (
    <span
      className="v-spacing-measure v-spacing-measure--horizontal v-spacing-measure--inline-gap"
      style={{ width: sizePx, minWidth: sizePx }}
      aria-hidden
    >
      <span
        className="v-spacing-measure__track"
        style={{ width: sizePx, minWidth: sizePx }}
      >
        <span className="v-spacing-measure__tick" />
        <span className="v-spacing-measure__line" />
        <span className="v-spacing-measure__tick" />
      </span>
      <span className="v-spacing-measure__label">{sizePx}px</span>
    </span>
  );
}

function VerticalGapDiagram({
  gapPx,
  top,
  bottom,
  className,
}: {
  gapPx: number;
  top: ReactNode;
  bottom: ReactNode;
  className?: string;
}) {
  return (
    <div className={["v-spacing-diagram__v-stack", className].filter(Boolean).join(" ")}>
      <div className="v-spacing-diagram__v-stack-top">{top}</div>
      <div className="v-spacing-diagram__v-stack-gap" style={{ height: gapPx }}>
        <SpacingMeasure orientation="vertical" sizePx={gapPx} />
      </div>
      <div className="v-spacing-diagram__v-stack-bottom">{bottom}</div>
    </div>
  );
}

function SpacingUsageDiagram({
  variant,
  gapPx,
}: {
  variant: SpacingUsageVariant;
  gapPx: number;
}) {
  if (variant === "inline") {
    return (
      <div className="v-spacing-diagram v-spacing-diagram--inline" aria-hidden>
        <div className="v-spacing-diagram__inline-row">
          <span className="v-spacing-diagram__icon" />
          <InlineGapMeasure sizePx={gapPx} />
          <span className="v-spacing-diagram__label">Label</span>
        </div>
      </div>
    );
  }

  if (variant === "padding") {
    return (
      <div className="v-spacing-diagram v-spacing-diagram--padding" aria-hidden>
        <div className="v-spacing-diagram__padding-wrap">
          <div className="v-spacing-diagram__padding-shell" style={{ padding: gapPx }}>
            <div className="v-spacing-diagram__padding-inner">
              <span className="v-spacing-diagram__padding-label">Content</span>
            </div>
          </div>
          <div className="v-spacing-diagram__padding-measure" style={{ width: gapPx }}>
            <SpacingMeasure orientation="horizontal" sizePx={gapPx} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "stack") {
    return (
      <div className="v-spacing-diagram v-spacing-diagram--stack" aria-hidden>
        <VerticalGapDiagram
          gapPx={gapPx}
          top={<span className="v-spacing-diagram__block" />}
          bottom={<span className="v-spacing-diagram__block" />}
        />
      </div>
    );
  }

  if (variant === "section") {
    return (
      <div className="v-spacing-diagram v-spacing-diagram--section" aria-hidden>
        <VerticalGapDiagram
          gapPx={gapPx}
          top={
            <div className="v-spacing-diagram__section">
              <span className="v-spacing-diagram__section-title" />
              <span className="v-spacing-diagram__block v-spacing-diagram__block--wide" />
            </div>
          }
          bottom={
            <div className="v-spacing-diagram__section">
              <span className="v-spacing-diagram__section-title" />
              <span className="v-spacing-diagram__block v-spacing-diagram__block--wide" />
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="v-spacing-diagram v-spacing-diagram--page" aria-hidden>
      <VerticalGapDiagram
        gapPx={gapPx}
        top={<span className="v-spacing-diagram__page-block" />}
        bottom={<span className="v-spacing-diagram__page-block" />}
      />
    </div>
  );
}

export function SpacingUsagePreview() {
  return (
    <ul className="v-foundation-preview v-spacing-usage" aria-label="Spacing usage">
      {usageRows.map((row) => (
        <li key={row.name} className="v-spacing-usage__item">
          <div className="v-spacing-usage__head">
            <span className="v-spacing-usage__name">{row.name}</span>
            <span className="v-spacing-usage__meta">
              <code className="v-code v-code--sm">{row.tokens}</code>
              <span aria-hidden>·</span>
              <span>{row.range}</span>
            </span>
          </div>
          <SpacingUsageDiagram variant={row.variant} gapPx={row.demoPx} />
        </li>
      ))}
    </ul>
  );
}

import type { CSSProperties } from "react";
import { spacing } from "@design-system/visionary";

type UsageDemo = "inline" | "padding" | "stack" | "section" | "page";

type SpacingUsageItem = {
  id: string;
  name: string;
  tokens: string;
  measure: string;
  usedFor: string;
  demoToken: keyof typeof spacing;
  demo: UsageDemo;
};

const usageItems: SpacingUsageItem[] = [
  {
    id: "inline",
    name: "Inline gaps",
    tokens: "spacing.1–2",
    measure: "4–8px",
    usedFor: "Gap between inline elements like icons and labels",
    demoToken: 2,
    demo: "inline",
  },
  {
    id: "padding",
    name: "Component padding",
    tokens: "spacing.3–4",
    measure: "12–16px",
    usedFor: "Internal spacing within buttons, inputs, and cards",
    demoToken: 4,
    demo: "padding",
  },
  {
    id: "stack",
    name: "Between components",
    tokens: "spacing.4–6",
    measure: "16–24px",
    usedFor: "Vertical or horizontal spacing between UI elements",
    demoToken: 6,
    demo: "stack",
  },
  {
    id: "section",
    name: "Section separation",
    tokens: "spacing.8–12",
    measure: "32–48px",
    usedFor: "Spacing between major content sections",
    demoToken: 12,
    demo: "section",
  },
  {
    id: "page",
    name: "Page rhythm",
    tokens: "spacing.12–16",
    measure: "48–64px",
    usedFor: "Large vertical spacing between page-level blocks",
    demoToken: 16,
    demo: "page",
  },
];

function betweenSize(px: number, axis: "x" | "y"): CSSProperties {
  const cap = axis === "x" ? 56 : 48;
  const visual = Math.min(Math.max(Math.round(px * 0.65), 12), cap);
  const minSpan = axis === "x" ? 4.5 : 4.5;

  return axis === "x"
    ? { width: Math.max(visual, minSpan * 16) }
    : { height: Math.max(visual, minSpan * 16), width: "100%" };
}

function padSize(px: number): CSSProperties {
  const pad = Math.min(Math.max(px, 14), 32);
  return { padding: pad };
}

function MeasureValue({ px }: { px: number }) {
  return <span className="v-spacing-measure__value">{px}px</span>;
}

function MeasureBetween({ px, axis }: { px: number; axis: "x" | "y" }) {
  return (
    <div
      className={`v-spacing-measure__between v-spacing-measure__between--${axis}`}
      style={betweenSize(px, axis)}
    >
      <span className="v-spacing-measure__guide v-spacing-measure__guide--a" aria-hidden />
      <span className="v-spacing-measure__guide v-spacing-measure__guide--b" aria-hidden />
      <MeasureValue px={px} />
    </div>
  );
}

function InlineMeasure({ px }: { px: number }) {
  return (
    <div className="v-spacing-measure__spec v-spacing-measure__spec--inline">
      <div className="v-spacing-measure__ui-row">
        <span className="v-spacing-measure__ui-icon" aria-hidden />
        <MeasureBetween px={px} axis="x" />
        <span className="v-spacing-measure__ui-label">Label</span>
      </div>
    </div>
  );
}

function PaddingMeasure({ px }: { px: number }) {
  return (
    <div className="v-spacing-measure__spec v-spacing-measure__spec--pad">
      <div className="v-spacing-measure__ui-chip" style={padSize(px)}>
        <span className="v-spacing-measure__guide v-spacing-measure__guide--inset-top" aria-hidden />
        <span className="v-spacing-measure__guide v-spacing-measure__guide--inset-right" aria-hidden />
        <span className="v-spacing-measure__guide v-spacing-measure__guide--inset-bottom" aria-hidden />
        <span className="v-spacing-measure__guide v-spacing-measure__guide--inset-left" aria-hidden />
        <div className="v-spacing-measure__ui-chip-body" aria-hidden />
        <MeasureValue px={px} />
      </div>
    </div>
  );
}

function StackMeasure({
  px,
  size = "md",
}: {
  px: number;
  size?: "md" | "lg" | "xl";
}) {
  return (
    <div className="v-spacing-measure__spec v-spacing-measure__spec--stack">
      <div className="v-spacing-measure__ui-stack">
        <span className={`v-spacing-measure__ui-bar v-spacing-measure__ui-bar--${size}`} aria-hidden />
        <MeasureBetween px={px} axis="y" />
        <span className={`v-spacing-measure__ui-bar v-spacing-measure__ui-bar--${size}`} aria-hidden />
      </div>
    </div>
  );
}

function MeasureDiagram({ demo, px }: { demo: UsageDemo; px: number }) {
  switch (demo) {
    case "inline":
      return <InlineMeasure px={px} />;
    case "padding":
      return <PaddingMeasure px={px} />;
    case "stack":
      return <StackMeasure px={px} size="md" />;
    case "section":
      return <StackMeasure px={px} size="lg" />;
    case "page":
      return <StackMeasure px={px} size="xl" />;
  }
}

function SpacingUsageItemRow({ item }: { item: SpacingUsageItem }) {
  const demoPx = spacing[item.demoToken];

  return (
    <li className="v-spacing-usage-item">
      <figure className="v-spacing-measure" aria-label={`${item.name}: ${demoPx}px`}>
        <MeasureDiagram demo={item.demo} px={demoPx} />
      </figure>
      <div className="v-spacing-usage-item__caption">
        <h3 className="v-spacing-usage-item__name">{item.name}</h3>
        <p className="v-spacing-usage-item__meta">
          <code>{item.tokens}</code>
          <span aria-hidden>·</span>
          <span>{item.measure}</span>
        </p>
        <p className="v-spacing-usage-item__desc">{item.usedFor}</p>
      </div>
    </li>
  );
}

export function SpacingUsageBoard() {
  return (
    <ul className="v-spacing-usage-board" aria-label="Spacing usage">
      {usageItems.map((item) => (
        <SpacingUsageItemRow key={item.id} item={item} />
      ))}
    </ul>
  );
}

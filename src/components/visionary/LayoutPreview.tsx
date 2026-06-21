import {
  Laptop,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  breakpoints,
  grid,
} from "@design-system/visionary";

type BreakpointName = keyof typeof breakpoints;

type BreakpointRow = {
  name: BreakpointName;
  min: number;
  max: number | null;
  device: string;
  icon: LucideIcon;
};

const breakpointRows: BreakpointRow[] = [
  { name: "sm", min: breakpoints.sm, max: breakpoints.md - 1, device: "Mobile", icon: Smartphone },
  { name: "md", min: breakpoints.md, max: breakpoints.lg - 1, device: "Tablet", icon: Tablet },
  { name: "lg", min: breakpoints.lg, max: breakpoints.xl - 1, device: "Laptop", icon: Laptop },
  { name: "xl", min: breakpoints.xl, max: breakpoints["2xl"] - 1, device: "Desktop", icon: Monitor },
  {
    name: "2xl",
    min: breakpoints["2xl"],
    max: null,
    device: "Large Desktop",
    icon: Monitor,
  },
];

function breakpointTokenClass() {
  return "v-code v-code--sm v-spacing-scale__token";
}

const breakpointScaleVisualMax = Math.round(breakpoints["2xl"] * 1.25);
const openSegmentArrowReserve = 4;

function axisLabelClass(value: number) {
  const position = (value / breakpointScaleVisualMax) * 100;

  if (position <= 6) {
    return "v-layout-bp-scale__label--align-start";
  }

  if (position >= 94) {
    return "v-layout-bp-scale__label--align-end";
  }

  return "v-layout-bp-scale__label--align-center";
}

function BreakpointVisualScale({
  min,
  max,
}: {
  min: number;
  max: number | null;
}) {
  const left = (min / breakpointScaleVisualMax) * 100;
  const width = max
    ? ((max - min + 1) / breakpointScaleVisualMax) * 100
    : Math.max(100 - left - openSegmentArrowReserve, 6);

  return (
    <div className="v-layout-bp-scale" aria-hidden>
      <div className="v-layout-bp-scale__track">
      <span className="v-layout-bp-scale__axis" />
      <span
        className={[
          "v-layout-bp-scale__segment",
          max ? "" : "v-layout-bp-scale__segment--open",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ left: `${left}%`, width: `${width}%` }}
      >
        <span className="v-layout-bp-scale__tick v-layout-bp-scale__tick--start" />
        {max ? <span className="v-layout-bp-scale__tick v-layout-bp-scale__tick--end" /> : null}
      </span>
      <span
        className={[
          "v-layout-bp-scale__label",
          "v-layout-bp-scale__label--axis",
          axisLabelClass(min),
        ].join(" ")}
        style={{ left: `${left}%` }}
      >
        {min}px
      </span>
      {max ? (
        <span
          className={[
            "v-layout-bp-scale__label",
            "v-layout-bp-scale__label--axis",
            axisLabelClass(max + 1),
          ].join(" ")}
          style={{ left: `${((max + 1) / breakpointScaleVisualMax) * 100}%` }}
        >
          {max}px
        </span>
      ) : (
        <span className="v-layout-bp-scale__arrow" aria-hidden />
      )}
      </div>
    </div>
  );
}

export function BreakpointsTablePreview() {
  return (
    <div className="v-foundation-preview v-layout-bp-table" aria-label="Breakpoints">
      <div className="v-layout-bp-table__head" aria-hidden>
        <span>Name</span>
        <span>Min width</span>
        <span>Max width</span>
        <span>Device range</span>
      </div>
      <ul className="v-layout-bp-table__body">
        {breakpointRows.map((row) => {
          const Icon = row.icon;
          return (
            <li key={row.name} className="v-layout-bp-table__row">
              <code className={breakpointTokenClass()}>{row.name}</code>
              <span className="v-layout-bp-table__value">{row.min}px</span>
              <span className="v-layout-bp-table__value">
                {row.max ? `${row.max}px` : "—"}
              </span>
              <span className="v-layout-bp-table__device">
                <Icon
                  className="v-layout-bp-table__icon"
                  strokeWidth={2}
                  aria-hidden
                />
                <span>{row.device}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function BreakpointVisualScalePreview() {
  return (
    <ul className="v-foundation-preview v-layout-bp-scales" aria-label="Breakpoint visual scale">
      {breakpointRows.map((row) => (
        <li key={row.name} className="v-layout-bp-scales__row">
          <code className={breakpointTokenClass()}>{row.name}</code>
          <BreakpointVisualScale min={row.min} max={row.max} />
        </li>
      ))}
    </ul>
  );
}

export function GridScalePreview() {
  const gridRows = [
    { name: "columns", value: String(grid.columns) },
    { name: "gutter", value: `${grid.gutter}px`, note: "spacing.4" },
    { name: "gutter-lg", value: `${grid.gutterLg}px`, note: "spacing.6" },
    { name: "margin", value: `${grid.margin}px`, note: "spacing.4" },
    { name: "margin-lg", value: `${grid.marginLg}px`, note: "spacing.8" },
  ];

  return (
    <div className="v-foundation-preview v-layout-grid-scale" aria-label="12-column grid">
      <div className="v-layout-grid-preview__grid">
        {Array.from({ length: grid.columns }, (_, index) => (
          <span key={index} className="v-layout-grid-preview__col" aria-hidden />
        ))}
      </div>
      <ul className="v-layout-grid-scale__specs" aria-label="Grid tokens">
        {gridRows.map((row) => (
          <li key={row.name} className="v-spacing-scale__row">
            <code className="v-code v-code--sm v-spacing-scale__token">{row.name}</code>
            <span className="v-layout-grid-scale__spacer" aria-hidden />
            <span className="v-spacing-scale__px">
              {row.note ? (
                <>
                  <span className="v-layout-grid-scale__note">{row.note}</span>
                  <span aria-hidden> · </span>
                </>
              ) : null}
              {row.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

import {
  breakpoints,
  container,
  content,
  grid,
  touchTarget,
} from "@design-system/visionary";

const breakpointMax = breakpoints["2xl"];
const containerMax = container.xl;

type ContainerToken = keyof typeof container;
type ContentToken = keyof typeof content;

function LayoutScaleBar({ ratio }: { ratio: number }) {
  return (
    <span className="v-layout-scale__track" aria-hidden>
      <span
        className="v-layout-scale__bar"
        style={{ width: `${Math.min(Math.max(ratio * 100, 2), 100)}%` }}
      />
    </span>
  );
}

function ContainerWidthSpecimen({
  token,
  px,
}: {
  token: ContainerToken | ContentToken;
  px: number | string;
}) {
  const ratio =
    typeof px === "number" ? px / containerMax : 1;

  if (typeof px === "string") {
    return (
      <span className="v-layout-specimen v-layout-specimen--full" aria-hidden>
        <span className="v-layout-specimen__full-bar" />
      </span>
    );
  }

  if (token === "reading" || token === "narrow" || token === "wide") {
    return (
      <span
        className="v-layout-specimen v-layout-specimen--content"
        style={{ maxWidth: px }}
        aria-hidden
      >
        <span className="v-layout-specimen__content-line" />
        <span className="v-layout-specimen__content-line v-layout-specimen__content-line--short" />
      </span>
    );
  }

  return (
    <span className="v-layout-specimen v-layout-specimen--container" aria-hidden>
      <span className="v-layout-specimen__container-shell" style={{ width: px }} />
    </span>
  );
}

function GridUsageSpecimen() {
  return (
    <span className="v-layout-specimen v-layout-specimen--grid" aria-hidden>
      <span className="v-layout-grid-preview__grid v-layout-grid-preview__grid--compact">
        {Array.from({ length: grid.columns }, (_, index) => (
          <span key={index} className="v-layout-grid-preview__col" />
        ))}
      </span>
    </span>
  );
}

function TouchTargetSpecimen({ size }: { size: "minimum" | "recommended" }) {
  const px = size === "minimum" ? touchTarget.minimum : touchTarget.recommended;

  return (
    <span className="v-layout-specimen v-layout-specimen--touch" aria-hidden>
      <span className="v-touch-target-preview">
        <span
          className={`v-touch-target-preview__hit v-touch-target-preview__hit--${size === "minimum" ? "min" : "rec"}`}
        />
        <span className="v-touch-target-preview__visual" />
      </span>
      <span className="v-layout-specimen__touch-label">{px}px</span>
    </span>
  );
}

export function BreakpointsScalePreview() {
  return (
    <ul className="v-foundation-preview v-spacing-scale" aria-label="Breakpoint scale">
      {(Object.keys(breakpoints) as Array<keyof typeof breakpoints>).map((name) => {
        const px = breakpoints[name];
        return (
          <li key={name} className="v-spacing-scale__row">
            <code className="v-code v-code--sm v-spacing-scale__token">{name}</code>
            <LayoutScaleBar ratio={px / breakpointMax} />
            <span className="v-spacing-scale__px">{px}px</span>
          </li>
        );
      })}
    </ul>
  );
}

export function ContainerScalePreview() {
  const containerRows = (Object.keys(container) as ContainerToken[]).map((name) => ({
    name,
    group: "container" as const,
    px: container[name],
    display:
      typeof container[name] === "number"
        ? `${container[name]}px`
        : container[name],
  }));

  const contentRows = (Object.keys(content) as ContentToken[]).map((name) => ({
    name,
    group: "content" as const,
    px: content[name],
    display: `${content[name]}px`,
  }));

  return (
    <ul className="v-foundation-preview v-spacing-scale" aria-label="Container and content widths">
      {containerRows.map((row) => (
        <li key={`container-${row.name}`} className="v-spacing-scale__row">
          <code className="v-code v-code--sm v-spacing-scale__token">{row.name}</code>
          <LayoutScaleBar
            ratio={typeof row.px === "number" ? row.px / containerMax : 1}
          />
          <span className="v-spacing-scale__px">{row.display}</span>
        </li>
      ))}
      {contentRows.map((row) => (
        <li
          key={`content-${row.name}`}
          className="v-spacing-scale__row v-layout-scale__row--content"
        >
          <code className="v-code v-code--sm v-spacing-scale__token">{row.name}</code>
          <LayoutScaleBar ratio={row.px / containerMax} />
          <span className="v-spacing-scale__px">{row.display}</span>
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
    <div className="v-layout-grid-scale">
      <figure className="v-foundation-preview v-layout-grid-preview" aria-label="12-column grid">
        <div className="v-layout-grid-preview__grid">
          {Array.from({ length: grid.columns }, (_, index) => (
            <span key={index} className="v-layout-grid-preview__col" aria-hidden />
          ))}
        </div>
      </figure>
      <ul className="v-foundation-preview v-spacing-scale v-layout-grid-scale__specs" aria-label="Grid tokens">
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

const usageRows = [
  {
    name: "Page shell",
    token: "xl",
    value: `${container.xl}px`,
    specimen: { kind: "container" as const, token: "xl" as ContainerToken, px: container.xl },
  },
  {
    name: "Article body",
    token: "reading",
    value: `${content.reading}px`,
    specimen: { kind: "content" as const, token: "reading" as ContentToken, px: content.reading },
  },
  {
    name: "Form column",
    token: "narrow",
    value: `${content.narrow}px`,
    specimen: { kind: "content" as const, token: "narrow" as ContentToken, px: content.narrow },
  },
  {
    name: "Marketing hero",
    token: "full",
    value: "100%",
    specimen: { kind: "container-full" as const, token: "full" as ContainerToken, px: "100%" },
  },
  {
    name: "Product layout",
    token: "12 col",
    value: `${grid.columns} columns`,
    specimen: { kind: "grid" as const },
  },
];

export function LayoutUsagePreview() {
  return (
    <ul className="v-foundation-preview v-spacing-usage" aria-label="Layout usage">
      {usageRows.map((row) => (
        <li key={row.name} className="v-spacing-usage__row">
          <span className="v-spacing-usage__name">{row.name}</span>
          {row.specimen.kind === "grid" ? (
            <GridUsageSpecimen />
          ) : (
            <ContainerWidthSpecimen
              token={row.specimen.token}
              px={row.specimen.px}
            />
          )}
          <span className="v-spacing-usage__meta">
            <code className="v-code v-code--sm">{row.token}</code>
            <span aria-hidden>·</span>
            <span>{row.value}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function TouchTargetPreview() {
  const rows = [
    { name: "minimum", px: touchTarget.minimum, variant: "minimum" as const },
    { name: "recommended", px: touchTarget.recommended, variant: "recommended" as const },
    {
      name: "spacing-between",
      px: touchTarget.spacingBetween,
      variant: null,
    },
  ];

  return (
    <ul className="v-foundation-preview v-spacing-scale" aria-label="Touch target scale">
      {rows.map((row) => (
        <li key={row.name} className="v-spacing-scale__row">
          <code className="v-code v-code--sm v-spacing-scale__token">{row.name}</code>
          {row.variant ? (
            <TouchTargetSpecimen size={row.variant} />
          ) : (
            <span className="v-layout-scale__track v-layout-scale__track--gap" aria-hidden>
              <span
                className="v-layout-scale__gap-bar"
                style={{ width: row.px }}
              />
            </span>
          )}
          <span className="v-spacing-scale__px">
            {row.variant ? `${row.px}px` : `spacing.2 · ${row.px}px`}
          </span>
        </li>
      ))}
    </ul>
  );
}

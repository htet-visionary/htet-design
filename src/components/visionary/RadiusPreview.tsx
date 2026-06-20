import { radius } from "@design-system/visionary";

const usageRows = [
  { name: "Input", token: "sm", px: radius.sm, variant: "input" },
  { name: "Button, alert", token: "md", px: radius.md, variant: "button" },
  { name: "Card, modal", token: "lg", px: radius.lg, variant: "card" },
  { name: "Pill controls", token: "pill", px: radius.pill, variant: "pill" },
] as const;

function RadiusPreviewBox({
  name,
  className,
}: {
  name: keyof typeof radius;
  className?: string;
}) {
  return (
    <span
      className={["v-radius-preview", className].filter(Boolean).join(" ")}
      style={{ borderRadius: `var(--v-radius-${name})` }}
      aria-hidden
    />
  );
}

function RadiusUsageSpecimen({ variant }: { variant: (typeof usageRows)[number]["variant"] }) {
  if (variant === "input") {
    return <span className="v-radius-usage-specimen v-radius-usage-specimen--input" aria-hidden />;
  }

  if (variant === "button") {
    return (
      <span className="v-radius-usage-specimen v-radius-usage-specimen--button" aria-hidden>
        Button
      </span>
    );
  }

  if (variant === "card") {
    return (
      <span className="v-radius-usage-specimen v-radius-usage-specimen--card" aria-hidden>
        <span className="v-radius-usage-specimen__card-line" />
        <span className="v-radius-usage-specimen__card-line v-radius-usage-specimen__card-line--short" />
      </span>
    );
  }

  return (
    <span className="v-radius-usage-specimen v-radius-usage-specimen--pill" aria-hidden>
      Filter
    </span>
  );
}

export function RadiusScalePreview() {
  return (
    <ul className="v-foundation-preview v-spacing-scale" aria-label="Radius scale">
      {(Object.keys(radius) as Array<keyof typeof radius>).map((name) => {
        const px = radius[name];
        return (
          <li key={name} className="v-spacing-scale__row">
            <code className="v-code v-code--sm v-spacing-scale__token">{name}</code>
            <RadiusPreviewBox name={name} className="v-spacing-scale__radius" />
            <span className="v-spacing-scale__px">{px}px</span>
          </li>
        );
      })}
    </ul>
  );
}

export function RadiusUsagePreview() {
  return (
    <ul className="v-foundation-preview v-spacing-usage" aria-label="Radius usage">
      {usageRows.map((row) => (
        <li key={row.name} className="v-spacing-usage__row">
          <span className="v-spacing-usage__name">{row.name}</span>
          <RadiusUsageSpecimen variant={row.variant} />
          <span className="v-spacing-usage__meta">
            <code className="v-code v-code--sm">{row.token}</code>
            <span aria-hidden>·</span>
            <span>{row.px}px</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

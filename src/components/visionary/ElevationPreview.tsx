import { elevation } from "@design-system/visionary";

type ElevationLevel = keyof typeof elevation;

const levelRows: Array<{
  name: ElevationLevel;
  shadow?: string;
  zIndex: number;
  variant: ElevationLevel;
}> = [
  { name: "card", shadow: elevation.card.shadow, zIndex: elevation.card.zIndex, variant: "card" },
  {
    name: "dropdown",
    shadow: elevation.dropdown.shadow,
    zIndex: elevation.dropdown.zIndex,
    variant: "dropdown",
  },
  { name: "overlay", zIndex: elevation.overlay.zIndex, variant: "overlay" },
  { name: "modal", shadow: elevation.modal.shadow, zIndex: elevation.modal.zIndex, variant: "modal" },
];

const usageRows: Array<{
  name: string;
  token: ElevationLevel;
  shadow?: string;
  zIndex: number;
  variant: ElevationLevel;
}> = [
  {
    name: "Card, panel",
    token: "card",
    shadow: elevation.card.shadow,
    zIndex: elevation.card.zIndex,
    variant: "card",
  },
  {
    name: "Dropdown, menu",
    token: "dropdown",
    shadow: elevation.dropdown.shadow,
    zIndex: elevation.dropdown.zIndex,
    variant: "dropdown",
  },
  {
    name: "Modal scrim",
    token: "overlay",
    zIndex: elevation.overlay.zIndex,
    variant: "overlay",
  },
  {
    name: "Modal dialog",
    token: "modal",
    shadow: elevation.modal.shadow,
    zIndex: elevation.modal.zIndex,
    variant: "modal",
  },
];

type ElevationVariant = (typeof levelRows)[number]["variant"];
type ElevationSize = "scale" | "usage";

function ElevationValues({
  shadow,
  zIndex,
  className,
}: {
  shadow?: string;
  zIndex: number;
  className?: string;
}) {
  return (
    <span className={["v-elevation-values", className].filter(Boolean).join(" ")}>
      {shadow ? (
        <span className="v-elevation-values__shadow">{shadow}</span>
      ) : (
        <span className="v-elevation-values__shadow v-elevation-values__shadow--none">—</span>
      )}
      <span className="v-elevation-values__z">z-index {zIndex}</span>
    </span>
  );
}

function ElevationSpecimen({
  variant,
  size,
}: {
  variant: ElevationVariant;
  size: ElevationSize;
}) {
  const className = [
    "v-elevation-specimen",
    `v-elevation-specimen--${variant}`,
    `v-elevation-specimen--${size}`,
  ].join(" ");

  if (variant === "overlay") {
    return (
      <span className={className} aria-hidden>
        <span className="v-elevation-specimen__overlay-content" />
        <span className="v-elevation-specimen__overlay-scrim" />
      </span>
    );
  }

  if (variant === "card" && size === "usage") {
    return (
      <span className={className} aria-hidden>
        <span className="v-elevation-specimen__card-line" />
        <span className="v-elevation-specimen__card-line v-elevation-specimen__card-line--short" />
      </span>
    );
  }

  if (variant === "modal" && size === "usage") {
    return (
      <span className={className} aria-hidden>
        <span className="v-elevation-specimen__modal-title" />
        <span className="v-elevation-specimen__card-line" />
        <span className="v-elevation-specimen__card-line v-elevation-specimen__card-line--short" />
      </span>
    );
  }

  if (variant === "dropdown" && size === "usage") {
    return (
      <span className={className} aria-hidden>
        <span className="v-elevation-specimen__menu-item" />
        <span className="v-elevation-specimen__menu-item" />
        <span className="v-elevation-specimen__menu-item v-elevation-specimen__menu-item--muted" />
      </span>
    );
  }

  return <span className={className} aria-hidden />;
}

export function ElevationLevelsPreview() {
  return (
    <ul className="v-foundation-preview v-spacing-scale v-elevation-scale" aria-label="Elevation levels">
      {levelRows.map((row) => (
        <li key={row.name} className="v-spacing-scale__row v-elevation-scale__row">
          <code className="v-code v-code--sm v-spacing-scale__token">{row.name}</code>
          <ElevationSpecimen variant={row.variant} size="scale" />
          <ElevationValues shadow={row.shadow} zIndex={row.zIndex} />
        </li>
      ))}
    </ul>
  );
}

export function ElevationUsagePreview() {
  return (
    <ul className="v-foundation-preview v-spacing-usage" aria-label="Elevation usage">
      {usageRows.map((row) => (
        <li key={row.name} className="v-spacing-usage__row">
          <span className="v-spacing-usage__name">{row.name}</span>
          <ElevationSpecimen variant={row.variant} size="usage" />
          <span className="v-spacing-usage__meta v-spacing-usage__meta--elevation">
            <code className="v-code v-code--sm">{row.token}</code>
            <ElevationValues shadow={row.shadow} zIndex={row.zIndex} />
          </span>
        </li>
      ))}
    </ul>
  );
}

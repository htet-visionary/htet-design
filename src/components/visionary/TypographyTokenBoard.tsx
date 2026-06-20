import type { CSSProperties } from "react";
import { fonts, reading } from "@design-system/visionary";
import {
  fontRoleCssVar,
  typographyEntries,
  typographyStyle,
  typographyTokenKey,
} from "@/lib/typography-utils";

type FontRole = keyof typeof fonts;

const fontRoles: FontRole[] = ["display", "reading", "interface"];

const sectionDescriptions: Record<string, string> = {
  fonts: "Typeface roles for headings, body, and UI chrome.",
  scale: "Size, weight, and rhythm for the type hierarchy.",
  reading: "Measure limits for comfortable long-form reading.",
};

function FontRoleCard({ role }: { role: FontRole }) {
  const { family, fallback } = fonts[role];

  return (
    <li className="v-type-card v-type-card--font">
      <div
        className="v-type-card__preview v-type-card__preview--font"
        style={{ fontFamily: `var(${fontRoleCssVar(role)})` }}
      >
        Aa
      </div>
      <div className="v-type-card__body">
        <code className="v-type-card__token">fonts.{role}</code>
        <p className="v-type-card__value">
          {family}, {fallback}
        </p>
      </div>
    </li>
  );
}

const scaleGroupLabels: Record<FontRole, string> = {
  display: "Display",
  reading: "Reading",
  interface: "Interface",
};

const scaleGroupDescriptions: Record<FontRole, string> = {
  display: "Headings and hero type.",
  reading: "Long-form body copy.",
  interface: "Labels, captions, and UI chrome.",
};

function groupScaleByFont() {
  const groups: Record<FontRole, (typeof typographyEntries)[number][]> = {
    display: [],
    reading: [],
    interface: [],
  };

  for (const entry of typographyEntries) {
    const role = entry[1].font as FontRole;
    groups[role].push(entry);
  }

  return fontRoles
    .filter((role) => groups[role].length > 0)
    .map((role) => ({ role, entries: groups[role] }));
}

function ScaleCard({
  name,
  style,
}: {
  name: (typeof typographyEntries)[number][0];
  style: (typeof typographyEntries)[number][1];
}) {
  const token = `typography.${typographyTokenKey(name)}`;

  return (
    <li className="v-type-card v-type-card--scale">
      <p className="v-type-card__preview v-type-card__preview--scale" style={typographyStyle(name, style)}>
        Ag
      </p>
      <div className="v-type-card__body">
        <code className="v-type-card__token">{token}</code>
        <p className="v-type-card__value">
          {style.size}px / {style.lineHeight} · {style.font} · {style.weight}
        </p>
      </div>
    </li>
  );
}

function ScaleGroup({ role, entries }: { role: FontRole; entries: (typeof typographyEntries)[number][] }) {
  return (
    <div className={`v-type-scale-group v-type-scale-group--${role}`}>
      <p className="v-type-scale-group__label">{scaleGroupLabels[role]}</p>
      <p className="v-type-scale-group__desc">{scaleGroupDescriptions[role]}</p>
      <ul className="v-type-grid v-type-grid--scale">
        {entries.map(([name, style]) => (
          <ScaleCard key={name} name={name} style={style} />
        ))}
      </ul>
    </div>
  );
}

function ReadingWidthCard({
  token,
  value,
  measureRatio,
}: {
  token: string;
  value: string;
  measureRatio: number;
}) {
  return (
    <li className="v-type-card v-type-card--reading">
      <div
        className="v-type-card__preview v-type-card__preview--measure"
        style={{ "--v-measure-ratio": measureRatio } as CSSProperties}
        aria-hidden
      >
        <div className="v-type-card__measure-col">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="v-type-card__body">
        <code className="v-type-card__token">{token}</code>
        <p className="v-type-card__value">{value}</p>
      </div>
    </li>
  );
}

export function TypographyTokenBoard() {
  return (
    <div className="v-type-board">
      <section className="v-type-section">
        <header className="v-type-section__header">
          <h4 className="v-type-section__title">Font roles</h4>
          <p className="v-type-section__desc">{sectionDescriptions.fonts}</p>
        </header>
        <ul className="v-type-grid">
          {fontRoles.map((role) => (
            <FontRoleCard key={role} role={role} />
          ))}
        </ul>
      </section>

      <section className="v-type-section">
        <header className="v-type-section__header">
          <h4 className="v-type-section__title">Type scale</h4>
          <p className="v-type-section__desc">{sectionDescriptions.scale}</p>
        </header>
        <div className="v-type-scale-groups">
          {groupScaleByFont().map(({ role, entries }) => (
            <ScaleGroup key={role} role={role} entries={entries} />
          ))}
        </div>
      </section>

      <section className="v-type-section">
        <header className="v-type-section__header">
          <h4 className="v-type-section__title">Reading width</h4>
          <p className="v-type-section__desc">{sectionDescriptions.reading}</p>
        </header>
        <ul className="v-type-grid">
          <ReadingWidthCard
            token="reading.max-width"
            value={reading.maxWidth}
            measureRatio={1}
          />
          <ReadingWidthCard
            token="reading.optimal-width"
            value={reading.optimalWidth}
            measureRatio={60 / 65}
          />
        </ul>
      </section>
    </div>
  );
}

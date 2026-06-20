import type { ReactNode } from "react";
import { CopyHexCode } from "@/components/visionary/CopyHexCode";
import { NavIcon, dsNavIcons } from "@/lib/nav-icons";
import { slugify } from "@/lib/slugify";

export type TokenRow = {
  token: string;
  value: string;
  note?: string;
};

type TokenTableProps = {
  rows: TokenRow[];
  caption?: string;
};

export function TokenTable({ rows, caption }: TokenTableProps) {
  return (
    <div className="v-table-wrap">
      <table className="v-table">
        {caption && <caption className="v-table__caption">{caption}</caption>}
        <thead>
          <tr>
            <th scope="col">Token</th>
            <th scope="col">Value</th>
            {rows.some((r) => r.note) && <th scope="col">Note</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.token}>
              <td>
                <code className="v-code">{row.token}</code>
              </td>
              <td>
                <code className="v-code v-code--muted">{row.value}</code>
              </td>
              {rows.some((r) => r.note) && (
                <td className="v-table__note">{row.note ?? "—"}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type ColorRampStep = {
  step: string | number;
  hex: string;
};

export function ColorRamp({ steps }: { steps: ColorRampStep[] }) {
  return (
    <ul className="v-color-ramp" aria-label="Color scale">
      {steps.map(({ step, hex }) => (
        <li key={step} className="v-color-ramp__step">
          <span
            className="v-color-ramp__chip"
            style={{ backgroundColor: hex }}
            aria-hidden
          />
          <span className="v-color-ramp__step-label">{step}</span>
          <CopyHexCode hex={hex} className="v-copy-hex--ramp" />
        </li>
      ))}
    </ul>
  );
}

type DocPageProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  children: ReactNode;
};

export function DocPage({ title, description, eyebrow, children }: DocPageProps) {
  return (
    <article className="v-doc">
      {eyebrow && <p className="v-doc__eyebrow">{eyebrow}</p>}
      <h1 className="v-doc__title">{title}</h1>
      {description && <p className="v-doc__desc">{description}</p>}
      <div className="v-doc__body">{children}</div>
    </article>
  );
}

export function SectionBlock({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: ReactNode;
}) {
  const sectionId = id ?? slugify(title);

  return (
    <section id={sectionId} className="v-section v-section--anchor">
      <h2 className="v-section__title">{title}</h2>
      {children}
    </section>
  );
}

export function RuleList({ rules }: { rules: string[] }) {
  return (
    <ul className="v-rules">
      {rules.map((rule) => (
        <li key={rule}>{rule}</li>
      ))}
    </ul>
  );
}

export function LinkGrid({
  links,
  showIcons = false,
}: {
  links: { title: string; href: string; description: string }[];
  showIcons?: boolean;
}) {
  return (
    <ul className="v-link-grid">
      {links.map((link) => (
        <li key={link.href}>
          <a href={link.href} className="v-link-card">
            {showIcons && (
              <NavIcon href={link.href} map={dsNavIcons} className="v-link-card__icon" />
            )}
            <span className="v-link-card__title">{link.title}</span>
            <span className="v-link-card__desc">{link.description}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function flattenObject(
  obj: Record<string, unknown>,
  prefix = "",
): TokenRow[] {
  const rows: TokenRow[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const token = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      rows.push(...flattenObject(value as Record<string, unknown>, token));
    } else {
      rows.push({ token, value: String(value) });
    }
  }

  return rows;
}

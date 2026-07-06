import type { Metadata } from "next";
import { ExportDocument, ExportSection } from "@/components/export/ExportDocument";
import { visionaryMeta, themes } from "@design-system/visionary";

export const metadata: Metadata = {
  title: `${visionaryMeta.name} — Overview`,
};

const foundations = [
  "Colors — primitive palettes, semantic roles, functional status, and product themes",
  "Typography — display, reading, and interface font roles with a defined scale",
  "Spacing — 4px-based scale from 4 to 96",
  "Radius — sm, md, lg, xl, and pill",
  "Elevation — card, dropdown, modal shadows and overlay scrim",
  "Icons — size scale and usage guidance",
  "Layout — breakpoints, grid, containers, and reading widths",
  "Accessibility — WCAG AA contrast, focus ring, touch targets, reduced motion",
] as const;

const components = [
  "Button",
  "Input & Textarea",
  "Card",
  "Alert & Toast",
  "Modal",
  "Select, Checkbox, Radio, Switch",
  "Tabs, Accordion, Menu, Breadcrumb",
  "Badge, Chip, Avatar",
  "Table, Pagination, Empty State",
] as const;

export default function DesignSystemExportPage() {
  return (
    <ExportDocument
      title={visionaryMeta.name}
      eyebrow={`Version ${visionaryMeta.version}`}
    >
      <p className="v-export__prose v-export__prose--lead">{visionaryMeta.description}</p>

      <ExportSection title="Principles">
        <ul className="v-export__list">
          {visionaryMeta.principles.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>
      </ExportSection>

      <ExportSection
        title="How it works"
        description="Foundations define the visual language. Components apply those foundations through token slots. Themes adapt personality per product."
      >
        <p className="v-export__prose">
          Foundations → Semantic tokens → Components → Themes → Product UI
        </p>
        <ul className="v-export__list">
          <li>Use semantic and component tokens in product UI — not raw primitives.</li>
          <li>Themes remap allowed slots without forking foundations.</li>
          <li>Accessibility requirements apply to every surface.</li>
        </ul>
      </ExportSection>

      <ExportSection title="Token architecture">
        <ul className="v-export__list">
          <li>
            <strong>Primitive</strong> — raw palette values (green.500, spacing.4). Not used
            directly in product UI.
          </li>
          <li>
            <strong>Semantic</strong> — purpose-driven roles (background.default, action.primary).
            Shared across all products.
          </li>
          <li>
            <strong>Component</strong> — slot assignments for Button, Input, Card, Alert, Modal.
          </li>
          <li>
            <strong>Theme</strong> — product personality overrides (Lucky Charm, Dream Fund).
          </li>
        </ul>
      </ExportSection>

      <ExportSection title="Products">
        <article className="v-export__card">
          <h3 className="v-export__card-title">{themes.luckyCharm.name}</h3>
          <p className="v-export__card-desc">
            Green primary, lavender accent, iridescence highlights.
          </p>
        </article>
        <article className="v-export__card">
          <h3 className="v-export__card-title">{themes.dreamFund.name}</h3>
          <p className="v-export__card-desc">
            Green primary with warm warning-toned accent for dream-first financial screens.
          </p>
        </article>
      </ExportSection>

      <ExportSection title="Foundations">
        <ul className="v-export__list">
          {foundations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </ExportSection>

      <ExportSection title="Components">
        <ul className="v-export__chips">
          {components.map((name) => (
            <li key={name} className="v-export__chip">
              {name}
            </li>
          ))}
        </ul>
      </ExportSection>

      <ExportSection title="Specification">
        <p className="v-export__prose">
          Source of truth: {visionaryMeta.specPath}. All design values map to
          design-system/visionary tokens or --v-* CSS variables.
        </p>
      </ExportSection>

      <footer className="v-export__footer">
        {visionaryMeta.name} · {visionaryMeta.products.join(", ")}
      </footer>
    </ExportDocument>
  );
}

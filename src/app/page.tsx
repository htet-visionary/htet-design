import {
  DocPage,
  LinkGrid,
  RuleList,
  SectionBlock,
} from "@/components/visionary/DocParts";
import { visionaryMeta, themes } from "@design-system/visionary";

export default function OverviewPage() {
  return (
    <DocPage
      eyebrow={`Version ${visionaryMeta.version}`}
      title={visionaryMeta.name}
      description={visionaryMeta.description}
    >
      <SectionBlock title="Principles">
        <ul className="v-principle-list">
          {visionaryMeta.principles.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock title="Token architecture">
        <p className="v-doc__desc" style={{ marginBottom: 0 }}>
          Tokens flow downward only. Product UI consumes semantic and component
          tokens. Themes remap allowed slots.
        </p>
        <p className="v-layer-diagram">
          Primitive → Semantic → Component → Theme → Product UI
        </p>
        <RuleList
          rules={[
            "Do not use primitive tokens directly in product UI.",
            "Component tokens reference semantic tokens only.",
            "Themes must not override status, focus, disabled, or overlay tokens.",
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Products">
        <LinkGrid
          links={[
            {
              title: themes.luckyCharm.name,
              href: "/themes/lucky-charm",
              description: "Green primary, lavender accent, iridescence highlights.",
            },
            {
              title: themes.dreamFund.name,
              href: "/themes/dream-fund",
              description: "Green primary with warm warning-toned accent.",
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Explore">
        <LinkGrid
          links={[
            {
              title: "Tokens",
              href: "/tokens",
              description: "Architecture, primitives, semantic, and component layers.",
            },
            {
              title: "Foundations",
              href: "/foundations",
              description: "Typography, spacing, radius, elevation, motion, layout.",
            },
            {
              title: "Accessibility",
              href: "/accessibility",
              description: "WCAG AA, focus ring, touch targets, reduced motion.",
            },
            {
              title: "Components",
              href: "/components",
              description: "Button, Input, Card, Alert, Modal foundations.",
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Specification">
        <RuleList
          rules={[
            `Source of truth: ${visionaryMeta.specPath}`,
            "All design values map to design-system/visionary tokens or --v-* CSS variables.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}

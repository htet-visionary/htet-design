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

      <SectionBlock title="How it works">
        <p className="v-doc__desc" style={{ marginBottom: 0 }}>
          Foundations define the visual language. Components apply those
          foundations through token slots. Themes adapt personality per product.
        </p>
        <p className="v-layer-diagram">
          Foundations → Semantic tokens → Components → Themes → Product UI
        </p>
        <RuleList
          rules={[
            "Use semantic and component tokens in product UI — not raw primitives.",
            "Themes remap allowed slots without forking foundations.",
            "Accessibility requirements apply to every surface.",
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
              title: "Foundations",
              href: "/foundations",
              description: "Colors, typography, spacing, radius, elevation, motion, layout.",
            },
            {
              title: "Accessibility",
              href: "/accessibility",
              description: "WCAG AA, focus ring, touch targets, reduced motion.",
            },
            {
              title: "Components",
              href: "/components/button",
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

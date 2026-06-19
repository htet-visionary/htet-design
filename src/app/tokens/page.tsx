import {
  DocPage,
  LinkGrid,
  RuleList,
  SectionBlock,
} from "@/components/visionary/DocParts";

export default function TokensPage() {
  return (
    <DocPage
      eyebrow="Tokens"
      title="Token architecture"
      description="Four layers with a single responsibility each. Tokens flow downward only."
    >
      <SectionBlock title="Layers">
        <LinkGrid
          links={[
            {
              title: "Primitives",
              href: "/tokens/primitives",
              description: "Raw palette values — definitions only, not for product UI.",
            },
            {
              title: "Semantic",
              href: "/tokens/semantic",
              description: "Purpose-driven roles: background, text, action, status.",
            },
            {
              title: "Component",
              href: "/tokens/components",
              description: "Button, Input, Card, Alert, Modal token slots.",
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Consumption rules">
        <RuleList
          rules={[
            "Product UI → Theme (if active) → Component token → Semantic token → Primitive",
            "Never hardcode hex, spacing, radius, shadows, typography, or z-index in UI.",
            "Never skip the semantic layer in components.",
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Themes">
        <p className="v-doc__desc" style={{ marginBottom: 0 }}>
          Themes remap semantic and component slots for product personality.
          See{" "}
          <a href="/themes" className="v-link-card__title">
            Themes
          </a>
          .
        </p>
      </SectionBlock>
    </DocPage>
  );
}

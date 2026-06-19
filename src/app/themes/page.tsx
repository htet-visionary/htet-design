import {
  DocPage,
  LinkGrid,
  RuleList,
  SectionBlock,
} from "@/components/visionary/DocParts";

export default function ThemesPage() {
  return (
    <DocPage
      eyebrow="System"
      title="Theme architecture"
      description="Products express personality by remapping semantic and component slots."
    >
      <SectionBlock title="Layer flow">
        <p className="v-layer-diagram">
          Foundation → Semantic → Component → Theme → Product UI
        </p>
      </SectionBlock>

      <SectionBlock title="Product themes">
        <LinkGrid
          links={[
            {
              title: "Lucky Charm",
              href: "/themes/lucky-charm",
              description: "Lavender accent and iridescence highlights.",
            },
            {
              title: "Dream Fund",
              href: "/themes/dream-fund",
              description: "Warning-toned accent with fixed status tokens.",
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Override scope">
        <RuleList
          rules={[
            "May override: brand.*, action.accent*, action.primary* (caution), decorative highlights.",
            "Must not override: status.*, disabled.*, focus.*, overlay.*, functional scales.",
            "Load one theme per product surface.",
            "Never wire theme accent into alert or validation slots.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}

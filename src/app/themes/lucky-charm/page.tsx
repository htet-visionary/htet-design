import {
  DocPage,
  RuleList,
  SectionBlock,
  TokenTable,
} from "@/components/visionary/DocParts";
import { luckyCharmTheme } from "@design-system/visionary";

export default function LuckyCharmThemePage() {
  return (
    <DocPage
      eyebrow="Guidelines · Themes"
      title="Lucky Charm"
      description="Green primary with lavender accent and iridescence for decorative moments."
    >
      <SectionBlock title="Theme definition">
        <TokenTable
          rows={[
            { token: "primary", value: luckyCharmTheme.primary },
            { token: "accent", value: luckyCharmTheme.accent },
            { token: "highlight", value: luckyCharmTheme.highlight ?? "—" },
            {
              token: "overrides.actionAccent",
              value: luckyCharmTheme.overrides.actionAccent ?? "—",
            },
            {
              token: "overrides.brandAccent",
              value: luckyCharmTheme.overrides.brandAccent ?? "—",
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Iridescence">
        <RuleList
          rules={[
            "Iridescence is decorative only — hero, celebrations, marketing.",
            "Never use iridescence for status, body text, or core actions.",
            "Hero CTA gradients are marketing exceptions — not semantic tokens.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}

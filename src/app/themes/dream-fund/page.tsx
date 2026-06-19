import {
  DocPage,
  RuleList,
  SectionBlock,
  TokenTable,
} from "@/components/visionary/DocParts";
import { dreamFundTheme } from "@design-system/visionary";

export default function DreamFundThemePage() {
  return (
    <DocPage
      eyebrow="Themes"
      title="Dream Fund"
      description="Warm warning-toned accent for brand personality. Status tokens stay fixed."
    >
      <SectionBlock title="Theme definition">
        <TokenTable
          rows={[
            { token: "primary", value: dreamFundTheme.primary },
            { token: "accent", value: dreamFundTheme.accent },
            {
              token: "overrides.actionAccent",
              value: dreamFundTheme.overrides.actionAccent ?? "—",
            },
            {
              token: "overrides.actionAccentHover",
              value: dreamFundTheme.overrides.actionAccentHover ?? "—",
            },
            {
              token: "overrides.brandAccent",
              value: dreamFundTheme.overrides.brandAccent ?? "—",
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Accent vs status">
        <RuleList
          rules={[
            "Accent applies to branding, secondary buttons, and highlights.",
            "Alerts and validation always use status.warning.* / status.error.*.",
            "Never use theme accent inside alert or form error slots.",
            "Warning banners always consume status.warning.*.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}

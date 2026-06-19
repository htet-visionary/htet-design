import {
  DocPage,
  RuleList,
  SectionBlock,
  TokenTable,
} from "@/components/visionary/DocParts";
import { component } from "@design-system/visionary";

export default function ButtonPage() {
  const { primary, secondary, destructive, disabled, shared } = component.button;

  return (
    <DocPage
      eyebrow="Guidelines · Components"
      title="Button"
      description="Primary, secondary, and destructive action patterns."
    >
      <SectionBlock title="Token slots">
        <TokenTable
          rows={[
            { token: "primary.background", value: String(primary.background) },
            {
              token: "primary.background-hover",
              value: String(primary.backgroundHover),
            },
            { token: "secondary.text", value: String(secondary.text) },
            {
              token: "destructive.background",
              value: String(destructive.background),
            },
            { token: "disabled.background", value: String(disabled.background) },
            { token: "shared.radius", value: shared.radius },
            { token: "shared.min-height", value: shared.minHeight },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Usage rules">
        <RuleList
          rules={[
            "One primary button per view section.",
            "Destructive buttons require confirmation for irreversible actions.",
            "Secondary buttons handle cancel and low-emphasis actions.",
            "Disabled buttons do not fire events.",
            "Button labels use sentence case.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}

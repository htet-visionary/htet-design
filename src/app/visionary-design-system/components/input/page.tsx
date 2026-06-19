import {
  DocPage,
  RuleList,
  SectionBlock,
  TokenTable,
} from "@/components/visionary/DocParts";
import { component } from "@design-system/visionary";

export default function InputPage() {
  const input = component.input;

  return (
    <DocPage
      eyebrow="Guidelines · Components"
      title="Input"
      description="Form fields with label, helper, error, and focus states."
    >
      <SectionBlock title="Token slots">
        <TokenTable
          rows={Object.entries(input).map(([key, val]) => ({
            token: `input.${key}`,
            value: String(val),
          }))}
        />
      </SectionBlock>

      <SectionBlock title="Usage rules">
        <RuleList
          rules={[
            "Every input requires a visible label.",
            "Placeholder text is not a label.",
            "Error state uses status.error.* — not destructive action tokens.",
            "Helper text appears below the field.",
            "Disabled inputs are not focusable.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}

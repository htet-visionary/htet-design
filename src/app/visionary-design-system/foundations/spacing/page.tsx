import { DocPage, RuleList, SectionBlock } from "@/components/visionary/DocParts";
import { SpacingScalePreview } from "@/components/visionary/FoundationPreviews";
import { SpacingUsagePreview } from "@/components/visionary/SpacingUsagePreview";

export default function SpacingPage() {
  return (
    <DocPage
      eyebrow="Foundations"
      title="Spacing"
      description="4px base unit. Use spacing tokens only — no one-off values."
    >
      <SectionBlock title="Scale">
        <SpacingScalePreview />
      </SectionBlock>

      <SectionBlock
        title="Usage"
        description="How spacing tokens are used across different parts of the interface."
      >
        <SpacingUsagePreview />
      </SectionBlock>

      <SectionBlock title="Rules">
        <RuleList rules={["Do not create one-off spacing values."]} />
      </SectionBlock>
    </DocPage>
  );
}

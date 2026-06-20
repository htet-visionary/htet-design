import { DocPage, RuleList, SectionBlock } from "@/components/visionary/DocParts";
import { RadiusScalePreview, RadiusUsagePreview } from "@/components/visionary/RadiusPreview";

export default function RadiusPage() {
  return (
    <DocPage
      eyebrow="Foundations"
      title="Radius"
      description="Soft corners from sm to pill. No arbitrary radius values."
    >
      <SectionBlock title="Scale">
        <RadiusScalePreview />
      </SectionBlock>

      <SectionBlock
        title="Usage"
        description="How radius tokens map to common components."
      >
        <RadiusUsagePreview />
      </SectionBlock>

      <SectionBlock title="Rules">
        <RuleList rules={["Do not use arbitrary radius values."]} />
      </SectionBlock>
    </DocPage>
  );
}

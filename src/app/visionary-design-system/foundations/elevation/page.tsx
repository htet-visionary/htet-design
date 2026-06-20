import { DocPage, RuleList, SectionBlock } from "@/components/visionary/DocParts";
import {
  ElevationLevelsPreview,
  ElevationUsagePreview,
} from "@/components/visionary/ElevationPreview";

export default function ElevationPage() {
  return (
    <DocPage
      eyebrow="Foundations"
      title="Elevation"
      description="Shadows and z-index communicate layering — not importance."
    >
      <SectionBlock title="Levels">
        <ElevationLevelsPreview />
      </SectionBlock>

      <SectionBlock
        title="Usage"
        description="How elevation levels map to common surfaces."
      >
        <ElevationUsagePreview />
      </SectionBlock>

      <SectionBlock title="Rules">
        <RuleList
          rules={[
            "Do not stack more than one modal level.",
            "Do not introduce new shadows without approval.",
            "Dropdowns inside modals inherit modal z-index context.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}

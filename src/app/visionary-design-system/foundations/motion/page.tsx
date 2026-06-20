import { DocPage, RuleList, SectionBlock } from "@/components/visionary/DocParts";
import {
  MotionDurationScalePreview,
  MotionEasingScalePreview,
  MotionUsagePreview,
} from "@/components/visionary/MotionPreview";

export default function MotionPage() {
  return (
    <DocPage
      eyebrow="Foundations"
      title="Motion"
      description="Subtle, purposeful, non-decorative animation."
    >
      <SectionBlock
        title="Durations"
        description="Hover each track to preview timing."
      >
        <MotionDurationScalePreview />
      </SectionBlock>

      <SectionBlock
        title="Easing"
        description="Hover each track to preview the curve."
      >
        <MotionEasingScalePreview />
      </SectionBlock>

      <SectionBlock
        title="Usage"
        description="How duration and easing combine for common transitions."
      >
        <MotionUsagePreview />
      </SectionBlock>

      <SectionBlock title="Rules">
        <RuleList
          rules={[
            "Enter is slightly slower than exit.",
            "Use transform and opacity only for standard UI transitions.",
            "Do not animate layout properties (width, height, top) unless required.",
            "Set all durations to instant when prefers-reduced-motion is active.",
            "Opacity fade only, max 100ms for modal and alert under reduced motion.",
            "No parallax, scale, or slide transforms under reduced motion.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}

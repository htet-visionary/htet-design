import {
  DocPage,
  RuleList,
  SectionBlock,
  TokenTable,
} from "@/components/visionary/DocParts";
import { MotionPreview } from "@/components/visionary/FoundationPreviews";
import { motion } from "@design-system/visionary";

export default function MotionPage() {
  return (
    <DocPage
      eyebrow="Foundations"
      title="Motion"
      description="Subtle, purposeful, non-decorative animation."
    >
      <SectionBlock title="Durations">
        <MotionPreview />
        <TokenTable
          rows={Object.entries(motion.duration).map(([name, ms]) => ({
            token: `motion.duration.${name}`,
            value: `${ms}ms`,
            note: `var(--v-motion-${name === "instant" ? "instant" : name})`,
          }))}
        />
      </SectionBlock>

      <SectionBlock title="Easing">
        <TokenTable
          rows={Object.entries(motion.easing).map(([name, curve]) => ({
            token: `motion.easing.${name}`,
            value: curve,
          }))}
        />
      </SectionBlock>

      <SectionBlock title="Enter / exit">
        <TokenTable
          rows={[
            {
              token: "enter",
              value: "motion.duration.normal + motion.easing.enter",
              note: "opacity, transform",
            },
            {
              token: "exit",
              value: "motion.duration.fast + motion.easing.exit",
              note: "opacity, transform",
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Reduced motion">
        <RuleList
          rules={[
            "Set durations to motion.duration.instant.",
            "Opacity fade only, max 100ms for modal/alert.",
            "No parallax, scale, or slide transforms.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}

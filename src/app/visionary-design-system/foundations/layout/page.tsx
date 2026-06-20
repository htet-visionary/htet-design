import { DocPage, RuleList, SectionBlock } from "@/components/visionary/DocParts";
import {
  BreakpointsScalePreview,
  ContainerScalePreview,
  GridScalePreview,
  LayoutUsagePreview,
  TouchTargetPreview,
} from "@/components/visionary/LayoutPreview";

export default function LayoutPage() {
  return (
    <DocPage
      eyebrow="Foundations"
      title="Layout"
      description="Mobile-first breakpoints, containers, and 12-column grid."
    >
      <SectionBlock title="Breakpoints">
        <BreakpointsScalePreview />
      </SectionBlock>

      <SectionBlock title="Containers">
        <ContainerScalePreview />
      </SectionBlock>

      <SectionBlock title="Grid">
        <GridScalePreview />
      </SectionBlock>

      <SectionBlock
        title="Usage"
        description="How layout tokens map to common page structures."
      >
        <LayoutUsagePreview />
      </SectionBlock>

      <SectionBlock title="Touch targets">
        <TouchTargetPreview />
      </SectionBlock>

      <SectionBlock title="Rules">
        <RuleList
          rules={[
            "Design mobile-first; add complexity at md and above.",
            "Page shells use container.*; articles and forms use content.*.",
            "Single column below md; span cards in multiples of 3 or 4 on desktop.",
            "Max two nested grid levels.",
            "Visual size may be smaller only when the hit area meets touchTarget.minimum.",
            "No custom breakpoints without approval.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}

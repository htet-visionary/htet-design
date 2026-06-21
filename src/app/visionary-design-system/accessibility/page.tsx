import { DocPage, RuleList, SectionBlock } from "@/components/visionary/DocParts";
import {
  ContrastPreview,
  FocusPreview,
  KeyboardPreview,
  ReducedMotionPreview,
  TouchTargetPreview,
} from "@/components/visionary/AccessibilityPreview";

export default function AccessibilityPage() {
  return (
    <DocPage
      eyebrow="Guidelines"
      title="Accessibility"
      description="WCAG 2.1 Level AA minimum for all Visionary products."
    >
      <SectionBlock title="Guidelines">
        <RuleList
          rules={[
            "Target WCAG 2.1 Level AA for all products and surfaces.",
            "Validate semantic pairings before release; do not ship unverified token combinations.",
            "All components must be keyboard navigable, labeled, and use correct roles or ARIA.",
            "Use :focus-visible and focus.ring tokens — do not disable focus indicators.",
            "Respect prefers-reduced-motion: reduce for all non-essential animation.",
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Contrast">
        <ContrastPreview />
      </SectionBlock>

      <SectionBlock title="Focus">
        <FocusPreview />
      </SectionBlock>

      <SectionBlock title="Touch target">
        <TouchTargetPreview />
      </SectionBlock>

      <SectionBlock title="Keyboard">
        <KeyboardPreview />
      </SectionBlock>

      <SectionBlock title="Reduced motion">
        <ReducedMotionPreview />
      </SectionBlock>
    </DocPage>
  );
}

import { DocPage, RuleList, SectionBlock } from "@/components/visionary/DocParts";
import {
  ContrastRequirementsPreview,
  FocusRingPreview,
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
      <SectionBlock title="Contrast requirements">
        <ContrastRequirementsPreview />
        <RuleList
          rules={[
            "Validate semantic pairings before release.",
            "Do not ship new token combinations without contrast verification.",
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Focus ring">
        <FocusRingPreview />
        <RuleList
          rules={[
            "Use :focus-visible, not :focus alone.",
            "Do not remove outlines without a compliant replacement.",
            "Nested interactives each receive their own focus ring.",
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Touch targets">
        <TouchTargetPreview />
        <RuleList
          rules={[
            "Visual size may be smaller only when the hit area meets touchTarget.minimum.",
            "Icon-only controls must expand their hit area to 44px minimum.",
            "Dense desktop layouts may use 44px minimum; mobile should prefer 48px.",
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Reduced motion">
        <ReducedMotionPreview />
        <RuleList
          rules={[
            "Respect prefers-reduced-motion: reduce.",
            "Non-essential animation → motion.duration.instant.",
            "Opacity fade only, max 100ms for modal and alert enter.",
            "No autoplay decorative motion.",
            "Essential feedback such as loading indicators may remain but must not flash.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}

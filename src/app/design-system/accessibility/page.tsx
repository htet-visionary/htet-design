import {
  DocPage,
  RuleList,
  SectionBlock,
  TokenTable,
} from "@/components/visionary/DocParts";
import { focusRing, touchTarget } from "@design-system/visionary";

export default function AccessibilityPage() {
  return (
    <DocPage
      eyebrow="Guidelines"
      title="Accessibility"
      description="WCAG 2.1 Level AA minimum for all Visionary products."
    >
      <SectionBlock title="Contrast requirements">
        <TokenTable
          rows={[
            { token: "Body text on background", value: "4.5:1 minimum" },
            {
              token: "Large text (18px+ regular, 14px+ bold)",
              value: "3:1 minimum",
            },
            { token: "UI components / graphical objects", value: "3:1 minimum" },
            { token: "Focus indicator vs adjacent colors", value: "3:1 minimum" },
            {
              token: "Text on solid action or status fills",
              value: "4.5:1 minimum",
              note: "use text.on-solid",
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Focus ring">
        <TokenTable
          rows={[
            { token: "width", value: `${focusRing.width}px` },
            { token: "style", value: focusRing.style },
            { token: "color", value: "focus.ring", note: "var(--v-focus-ring)" },
            { token: "offset", value: `${focusRing.offset}px` },
            {
              token: "offset-color",
              value: "focus.ring-offset",
              note: "var(--v-focus-ring-offset)",
            },
          ]}
        />
        <RuleList
          rules={[
            "Use :focus-visible, not :focus alone.",
            "Do not remove outlines without a compliant replacement.",
            "Nested interactives each receive their own focus ring.",
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Touch targets">
        <TokenTable
          rows={[
            {
              token: "minimum",
              value: `${touchTarget.minimum}px`,
              note: "var(--v-touch-min)",
            },
            {
              token: "recommended",
              value: `${touchTarget.recommended}px`,
              note: "var(--v-touch-recommended)",
            },
            {
              token: "spacing-between-targets",
              value: `${touchTarget.spacingBetween}px`,
              note: "spacing.2",
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Reduced motion">
        <RuleList
          rules={[
            "Respect prefers-reduced-motion: reduce.",
            "Non-essential animation → motion.duration.instant.",
            "Opacity fade only, max 100ms for modal/alert enter.",
            "No autoplay decorative motion.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}

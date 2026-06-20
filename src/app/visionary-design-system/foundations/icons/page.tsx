import { DocPage, RuleList, SectionBlock } from "@/components/visionary/DocParts";
import {
  IconSizeScalePreview,
  IconUsagePreview,
} from "@/components/visionary/IconsPreview";
import { touchTarget } from "@design-system/visionary";

export default function IconsPage() {
  return (
    <DocPage
      eyebrow="Foundations"
      title="Icons"
      description="Outline icons with a fixed size scale and stroke weight."
    >
      <SectionBlock title="Size scale">
        <IconSizeScalePreview />
      </SectionBlock>

      <SectionBlock title="Usage">
        <IconUsagePreview />
      </SectionBlock>

      <SectionBlock title="Rules">
        <RuleList
          rules={[
            "Decorative icons must use aria-hidden.",
            "Icon-only controls require an accessible name (aria-label).",
            `Icon-only controls must meet touch-target.minimum (${touchTarget.minimum}px).`,
            "Apply semantic color tokens — never hard-code hex values on icons.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}

import { DocPage, RuleList, SectionBlock } from "@/components/visionary/DocParts";
import { TypographyTokenBoard } from "@/components/visionary/TypographyTokenBoard";

export default function TypographyPage() {
  return (
    <DocPage
      eyebrow="Foundations"
      title="Typography"
      description="Display for headings, reading for body, interface for UI chrome."
    >
      <SectionBlock title="Tokens">
        <TypographyTokenBoard />
      </SectionBlock>

      <SectionBlock title="Rules">
        <RuleList
          rules={[
            "Display font for headings and hero only.",
            "Max three type levels per screen.",
            "Minimum text size is 14px — use label or caption, not smaller values.",
            "Prefer weight over size for sub-hierarchy.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}

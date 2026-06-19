import {
  DocPage,
  RuleList,
  SectionBlock,
  TokenTable,
} from "@/components/visionary/DocParts";
import { fonts, reading, typography } from "@design-system/visionary";

export default function TypographyPage() {
  const scaleRows = Object.entries(typography).map(([name, style]) => ({
    token: `typography.${name}`,
    value: `${style.size}px / ${style.lineHeight} · ${style.font} · ${style.weight}`,
    note: `letter-spacing: ${style.letterSpacing}`,
  }));

  return (
    <DocPage
      eyebrow="Foundations"
      title="Typography"
      description="Display for headings, reading for body, interface for UI chrome."
    >
      <SectionBlock title="Font roles">
        <TokenTable
          rows={[
            {
              token: "fonts.display",
              value: `${fonts.display.family}, ${fonts.display.fallback}`,
            },
            {
              token: "fonts.reading",
              value: `${fonts.reading.family}, ${fonts.reading.fallback}`,
            },
            {
              token: "fonts.interface",
              value: `${fonts.interface.family}, ${fonts.interface.fallback}`,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Type scale">
        <TokenTable rows={scaleRows} />
      </SectionBlock>

      <SectionBlock title="Reading width">
        <TokenTable
          rows={[
            { token: "reading.maxWidth", value: reading.maxWidth },
            { token: "reading.optimalWidth", value: reading.optimalWidth },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Rules">
        <RuleList
          rules={[
            "Display font for headings and hero only.",
            "Max three type levels per screen.",
            "Prefer weight over size for sub-hierarchy.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}

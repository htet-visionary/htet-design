import {
  DocPage,
  RuleList,
  SectionBlock,
  TokenTable,
} from "@/components/visionary/DocParts";
import { fonts, reading } from "@design-system/visionary";
import {
  fontRoleCssVar,
  typographyCssVar,
  typographyEntries,
  typographyStyle,
  typographyTokenKey,
} from "@/lib/typography-utils";

export default function TypographyPage() {
  const scaleRows = typographyEntries.map(([name, style]) => ({
    token: `typography.${typographyTokenKey(name)}`,
    value: `${style.size}px / ${style.lineHeight} · ${style.font} · ${style.weight}`,
    note: `var(${typographyCssVar(name)})`,
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
              note: `var(${fontRoleCssVar("display")})`,
            },
            {
              token: "fonts.reading",
              value: `${fonts.reading.family}, ${fonts.reading.fallback}`,
              note: `var(${fontRoleCssVar("reading")})`,
            },
            {
              token: "fonts.interface",
              value: `${fonts.interface.family}, ${fonts.interface.fallback}`,
              note: `var(${fontRoleCssVar("interface")})`,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Type scale">
        <ul className="v-type-specimen-grid">
          {typographyEntries.map(([name, style]) => (
            <li key={name} className="v-type-specimen">
              <p className="v-type-specimen__sample" style={typographyStyle(name, style)}>
                Visionary Design System
              </p>
              <code className="v-code v-code--sm">
                typography.{typographyTokenKey(name)}
              </code>
            </li>
          ))}
        </ul>
        <TokenTable rows={scaleRows} />
      </SectionBlock>

      <SectionBlock title="Reading width">
        <TokenTable
          rows={[
            {
              token: "reading.max-width",
              value: reading.maxWidth,
              note: "var(--v-reading-max)",
            },
            {
              token: "reading.optimal-width",
              value: reading.optimalWidth,
              note: "var(--v-reading-optimal)",
            },
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

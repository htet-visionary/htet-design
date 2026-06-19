import {
  DocPage,
  RuleList,
  SectionBlock,
  TokenTable,
} from "@/components/visionary/DocParts";
import { radius } from "@design-system/visionary";

export default function RadiusPage() {
  const rows = Object.entries(radius).map(([name, px]) => ({
    token: `radius.${name}`,
    value: `${px}px`,
    note: `var(--v-radius-${name})`,
  }));

  return (
    <DocPage
      eyebrow="Foundations"
      title="Radius"
      description="Soft corners from sm to pill. No arbitrary radius values."
    >
      <SectionBlock title="Scale">
        <TokenTable rows={rows} />
      </SectionBlock>

      <SectionBlock title="Component mapping">
        <TokenTable
          rows={[
            { token: "input", value: "radius.sm", note: "form fields" },
            { token: "button, alert", value: "radius.md", note: "actions, alerts" },
            { token: "card, modal", value: "radius.lg", note: "containers" },
            { token: "pill controls", value: "radius.pill", note: "pills only" },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Rules">
        <RuleList rules={["Do not use arbitrary radius values."]} />
      </SectionBlock>
    </DocPage>
  );
}

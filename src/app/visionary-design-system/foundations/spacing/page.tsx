import {
  DocPage,
  RuleList,
  SectionBlock,
  TokenTable,
} from "@/components/visionary/DocParts";
import {
  SpacingScalePreview,
  SpacingUsagePreview,
} from "@/components/visionary/FoundationPreviews";
import { spacing } from "@design-system/visionary";

export default function SpacingPage() {
  const rows = Object.entries(spacing).map(([step, px]) => ({
    token: `spacing.${step}`,
    value: `${px}px`,
    note: `var(--v-space-${step})`,
  }));

  return (
    <DocPage
      eyebrow="Foundations"
      title="Spacing"
      description="4px base unit. Use spacing tokens only — no one-off values."
    >
      <SectionBlock title="Scale">
        <SpacingScalePreview />
        <TokenTable rows={rows} />
      </SectionBlock>

      <SectionBlock title="Usage">
        <SpacingUsagePreview />
        <TokenTable
          caption="Recommended contexts"
          rows={[
            { token: "inline gaps", value: "spacing.1–2", note: "icon + text" },
            {
              token: "component padding",
              value: "spacing.3–4",
              note: "internal padding",
            },
            {
              token: "between components",
              value: "spacing.4–6",
              note: "related groups",
            },
            {
              token: "section separation",
              value: "spacing.8–12",
              note: "vertical rhythm",
            },
            {
              token: "page rhythm",
              value: "spacing.12–16",
              note: "page-level gaps",
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Rules">
        <RuleList rules={["Do not create one-off spacing values."]} />
      </SectionBlock>
    </DocPage>
  );
}

import {
  DocPage,
  RuleList,
  SectionBlock,
  TokenTable,
} from "@/components/visionary/DocParts";
import {
  breakpoints,
  container,
  content,
  grid,
  touchTarget,
} from "@design-system/visionary";

export default function LayoutPage() {
  return (
    <DocPage
      eyebrow="Foundations"
      title="Layout"
      description="Mobile-first breakpoints, containers, and 12-column grid."
    >
      <SectionBlock title="Breakpoints">
        <TokenTable
          rows={Object.entries(breakpoints).map(([name, px]) => ({
            token: `breakpoints.${name}`,
            value: `${px}px`,
          }))}
        />
      </SectionBlock>

      <SectionBlock title="Containers">
        <TokenTable
          rows={[
            ...Object.entries(container).map(([name, val]) => ({
              token: `container.${name}`,
              value: typeof val === "number" ? `${val}px` : val,
            })),
            ...Object.entries(content).map(([name, px]) => ({
              token: `content.${name}`,
              value: `${px}px`,
            })),
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Grid">
        <TokenTable
          rows={[
            { token: "grid.columns", value: String(grid.columns) },
            { token: "grid.gutter", value: `${grid.gutter}px` },
            { token: "grid.gutterLg", value: `${grid.gutterLg}px` },
            { token: "grid.margin", value: `${grid.margin}px` },
            { token: "grid.marginLg", value: `${grid.marginLg}px` },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Touch targets">
        <TokenTable
          rows={[
            {
              token: "touchTarget.minimum",
              value: `${touchTarget.minimum}px`,
            },
            {
              token: "touchTarget.recommended",
              value: `${touchTarget.recommended}px`,
            },
            {
              token: "touchTarget.spacingBetween",
              value: `${touchTarget.spacingBetween}px`,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Rules">
        <RuleList
          rules={[
            "Design mobile-first; add complexity at md and above.",
            "Single column below md.",
            "Max two nested grid levels.",
            "No custom breakpoints without approval.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}

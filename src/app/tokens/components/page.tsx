import {
  DocPage,
  flattenObject,
  RuleList,
  SectionBlock,
  TokenTable,
} from "@/components/visionary/DocParts";
import { component } from "@design-system/visionary";

export default function ComponentTokensPage() {
  const rows = flattenObject(component as unknown as Record<string, unknown>);

  return (
    <DocPage
      eyebrow="Tokens"
      title="Component tokens"
      description="Maps semantic roles to Button, Input, Card, Alert, and Modal parts."
    >
      <SectionBlock title="Token slots">
        <TokenTable rows={rows} />
      </SectionBlock>

      <SectionBlock title="Rules">
        <RuleList
          rules={[
            "Component tokens reference semantic tokens only — never primitives.",
            "If a property has no slot, propose a spec change before inventing a value.",
            "See /components for usage rules per component.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}

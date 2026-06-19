import {
  DocPage,
  RuleList,
  SectionBlock,
  TokenTable,
} from "@/components/visionary/DocParts";
import { component } from "@design-system/visionary";

export default function CardPage() {
  const card = component.card;

  return (
    <DocPage
      eyebrow="Guidelines · Components"
      title="Card"
      description="Groups related content with optional subtle variant."
    >
      <SectionBlock title="Token slots">
        <TokenTable
          rows={Object.entries(card).map(([key, val]) => ({
            token: `card.${key}`,
            value: String(val),
          }))}
        />
      </SectionBlock>

      <SectionBlock title="Usage rules">
        <RuleList
          rules={[
            "Cards group related content.",
            "One primary action per card maximum.",
            "Use background-subtle for nested or de-emphasized cards.",
            "Do not nest elevated cards inside elevated cards.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}

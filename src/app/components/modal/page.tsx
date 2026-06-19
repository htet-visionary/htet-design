import {
  DocPage,
  RuleList,
  SectionBlock,
  TokenTable,
} from "@/components/visionary/DocParts";
import { component } from "@design-system/visionary";

export default function ModalPage() {
  const modal = component.modal;

  return (
    <DocPage
      eyebrow="Components"
      title="Modal"
      description="Dialog with scrim, focus trap, and destructive confirmation flows."
    >
      <SectionBlock title="Token slots">
        <TokenTable
          rows={Object.entries(modal).map(([key, val]) => ({
            token: `modal.${key}`,
            value: String(val),
          }))}
        />
      </SectionBlock>

      <SectionBlock title="Usage rules">
        <RuleList
          rules={[
            "Modals require a scrim and trap focus while open.",
            "Close on scrim click only for non-destructive content.",
            "Destructive modals require explicit cancel and confirm buttons.",
            "Return focus to the triggering element on close.",
            "One modal open at a time.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}

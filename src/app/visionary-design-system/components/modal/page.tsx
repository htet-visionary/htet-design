import { DocPage, SectionBlock } from "@/components/visionary/DocParts";
import { ModalVariantsPreview } from "@/components/visionary/ModalDocPreview";

export default function ModalPage() {
  return (
    <DocPage
      eyebrow="Guidelines · Components"
      title="Modal"
      description="Overlay patterns for dialogs, confirmations, alerts, fullscreen views, and drawers."
    >
      <SectionBlock title="Variants">
        <ModalVariantsPreview />
      </SectionBlock>
    </DocPage>
  );
}

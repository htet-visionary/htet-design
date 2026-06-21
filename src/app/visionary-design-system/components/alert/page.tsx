import { DocPage, SectionBlock } from "@/components/visionary/DocParts";
import {
  AlertDismissiblePreview,
  AlertVariantsPreview,
} from "@/components/visionary/AlertDocPreview";

export default function AlertPage() {
  return (
    <DocPage
      eyebrow="Guidelines · Components"
      title="Alert"
      description="Inline status communication across variants and dismissible patterns."
    >
      <SectionBlock title="Variants">
        <AlertVariantsPreview />
      </SectionBlock>

      <SectionBlock title="Dismissible">
        <AlertDismissiblePreview />
      </SectionBlock>
    </DocPage>
  );
}

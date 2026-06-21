import { DocPage, SectionBlock } from "@/components/visionary/DocParts";
import {
  ToastDismissiblePreview,
  ToastVariantsPreview,
} from "@/components/visionary/ToastDocPreview";

export default function ToastPage() {
  return (
    <DocPage
      eyebrow="Guidelines · Components"
      title="Toast"
      description="Transient feedback messages across variants and dismissible patterns."
    >
      <SectionBlock title="Variants">
        <ToastVariantsPreview />
      </SectionBlock>

      <SectionBlock title="Dismissible">
        <ToastDismissiblePreview />
      </SectionBlock>
    </DocPage>
  );
}

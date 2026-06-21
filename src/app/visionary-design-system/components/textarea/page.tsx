import { DocPage, SectionBlock } from "@/components/visionary/DocParts";
import {
  TextareaRowsPreview,
  TextareaSizesPreview,
  TextareaValidationPreview,
  TextareaVariantsPreview,
} from "@/components/visionary/TextareaDocPreview";

export default function TextareaPage() {
  return (
    <DocPage
      eyebrow="Guidelines · Components"
      title="Textarea"
      description="Multi-line fields across states, sizes, row expansion, and validation feedback."
    >
      <SectionBlock title="Variants">
        <TextareaVariantsPreview />
      </SectionBlock>

      <SectionBlock title="Sizes">
        <TextareaSizesPreview />
      </SectionBlock>

      <SectionBlock title="Rows">
        <TextareaRowsPreview />
      </SectionBlock>

      <SectionBlock title="Success, error, and warning">
        <TextareaValidationPreview />
      </SectionBlock>
    </DocPage>
  );
}

import { DocPage, SectionBlock } from "@/components/visionary/DocParts";
import {
  InputIconAffixPreview,
  InputSizesPreview,
  InputValidationPreview,
  InputVariantsPreview,
} from "@/components/visionary/InputDocPreview";

export default function InputPage() {
  return (
    <DocPage
      eyebrow="Guidelines · Components"
      title="Input"
      description="Form fields across states, sizes, inline icons, and validation feedback."
    >
      <SectionBlock title="Variants">
        <InputVariantsPreview />
      </SectionBlock>

      <SectionBlock title="Sizes">
        <InputSizesPreview />
      </SectionBlock>

      <SectionBlock title="Prefix and suffix icons">
        <InputIconAffixPreview />
      </SectionBlock>

      <SectionBlock title="Success, error, and warning">
        <InputValidationPreview />
      </SectionBlock>
    </DocPage>
  );
}

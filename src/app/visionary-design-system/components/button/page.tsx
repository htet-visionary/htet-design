import { DocPage, SectionBlock } from "@/components/visionary/DocParts";
import {
  ButtonIconAffixPreview,
  ButtonSizesPreview,
  ButtonVariantsPreview,
  IconButtonPreview,
  LinkButtonPreview,
} from "@/components/visionary/ButtonDocPreview";

export default function ButtonPage() {
  return (
    <DocPage
      eyebrow="Guidelines · Components"
      title="Button"
      description="Green and accent action patterns across variants, states, sizes, and icon treatments."
    >
      <SectionBlock title="Variants">
        <ButtonVariantsPreview />
      </SectionBlock>

      <SectionBlock title="Sizes">
        <ButtonSizesPreview />
      </SectionBlock>

      <SectionBlock title="Prefix and suffix icons">
        <ButtonIconAffixPreview />
      </SectionBlock>

      <SectionBlock title="Link button">
        <LinkButtonPreview />
      </SectionBlock>

      <SectionBlock title="Icon button">
        <IconButtonPreview />
      </SectionBlock>
    </DocPage>
  );
}

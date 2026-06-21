import { DocPage, SectionBlock } from "@/components/visionary/DocParts";
import { CardVariantsPreview } from "@/components/visionary/CardDocPreview";

export default function CardPage() {
  return (
    <DocPage
      eyebrow="Guidelines · Components"
      title="Card"
      description="Empty card surfaces using component tokens for background, border, radius, and elevation."
    >
      <SectionBlock title="Variants">
        <CardVariantsPreview />
      </SectionBlock>
    </DocPage>
  );
}

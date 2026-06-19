import { DocPage } from "@/components/visionary/DocParts";
import { PrimitiveSection } from "@/lib/color-sections";

export default function PrimitiveColorsPage() {
  return (
    <DocPage
      eyebrow="Foundations · Colors"
      title="Primitive"
      description="Brand and neutral ramps. Raw values — not for direct use in product UI."
    >
      <PrimitiveSection />
    </DocPage>
  );
}

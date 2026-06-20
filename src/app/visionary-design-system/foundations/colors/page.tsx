import { DocPage } from "@/components/visionary/DocParts";
import { PrimitiveSection, SemanticSection } from "@/lib/color-sections";

export default function ColorsPage() {
  return (
    <DocPage
      eyebrow="Foundations"
      title="Colors"
      description="Primitive ramps and semantic roles."
    >
      <PrimitiveSection />
      <SemanticSection />
    </DocPage>
  );
}

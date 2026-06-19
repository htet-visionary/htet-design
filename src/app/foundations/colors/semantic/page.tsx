import { DocPage } from "@/components/visionary/DocParts";
import { SemanticSection } from "@/lib/color-sections";

export default function SemanticColorsPage() {
  return (
    <DocPage
      eyebrow="Foundations · Colors"
      title="Semantic"
      description="Purpose-driven UI roles shared across all Visionary products."
    >
      <SemanticSection />
    </DocPage>
  );
}

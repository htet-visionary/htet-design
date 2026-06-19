import { DocPage } from "@/components/visionary/DocParts";
import {
  ColorsOverviewSection,
  FunctionalSection,
  PrimitiveSection,
  SemanticSection,
} from "@/lib/color-sections";

export default function ColorsPage() {
  return (
    <DocPage
      eyebrow="Foundations"
      title="Colors"
      description="Brand primitives, semantic roles, and functional status palettes."
    >
      <ColorsOverviewSection />
      <PrimitiveSection />
      <SemanticSection />
      <FunctionalSection />
    </DocPage>
  );
}

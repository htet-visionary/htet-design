import { DocPage } from "@/components/visionary/DocParts";
import {
  ColorsHubLinks,
  ColorsOverviewSection,
  FunctionalSection,
  PrimitiveSection,
  SemanticSection,
  ThemesSection,
} from "@/lib/color-sections";

export default function ColorsPage() {
  return (
    <DocPage
      eyebrow="Foundations"
      title="Colors"
      description="Brand primitives, semantic roles, functional status palettes, and product themes."
    >
      <ColorsOverviewSection />
      <ColorsHubLinks />
      <PrimitiveSection />
      <SemanticSection />
      <FunctionalSection />
      <ThemesSection />
    </DocPage>
  );
}

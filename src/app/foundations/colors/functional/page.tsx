import { DocPage } from "@/components/visionary/DocParts";
import { FunctionalSection } from "@/lib/color-sections";

export default function FunctionalColorsPage() {
  return (
    <DocPage
      eyebrow="Foundations · Colors"
      title="Functional"
      description="Status palettes for success, warning, error, and info feedback."
    >
      <FunctionalSection />
    </DocPage>
  );
}

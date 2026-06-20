import { DocPage } from "@/components/visionary/DocParts";
import {
  ComponentSection,
  PrimitiveSection,
  SemanticSection,
} from "@/lib/color-sections";

export default function ColorsPage() {
  return (
    <DocPage
      eyebrow="Foundations"
      title="Colors"
      description="Primitive ramps, semantic roles, and component color slots."
    >
      <PrimitiveSection />
      <SemanticSection />
      <ComponentSection />
    </DocPage>
  );
}

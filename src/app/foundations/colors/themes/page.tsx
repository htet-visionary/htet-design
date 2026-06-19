import { DocPage } from "@/components/visionary/DocParts";
import { ThemesSection } from "@/lib/color-sections";

export default function ColorThemesPage() {
  return (
    <DocPage
      eyebrow="Foundations · Colors"
      title="Themes"
      description="Product themes are color layers built on primitive, semantic, and functional tokens."
    >
      <ThemesSection />
    </DocPage>
  );
}

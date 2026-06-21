import { componentDocPage } from "@/components/visionary/componentDocPage";
import { DividerVariantsPreview } from "@/components/visionary/DividerDocPreview";

export default function DividerPage() {
  return componentDocPage({
    title: "Divider",
    description: "Separates related content with horizontal or vertical rules.",
    preview: <DividerVariantsPreview />,
  });
}

import { componentDocPage } from "@/components/visionary/componentDocPage";
import { TagVariantsPreview } from "@/components/visionary/DisplayDocPreview";

export default function TagPage() {
  return componentDocPage({
    title: "Tag",
    description: "Metadata labels with optional remove action.",
    preview: <TagVariantsPreview />,
  });
}

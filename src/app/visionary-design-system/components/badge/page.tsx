import { componentDocPage } from "@/components/visionary/componentDocPage";
import { BadgeVariantsPreview } from "@/components/visionary/DisplayDocPreview";

export default function BadgePage() {
  return componentDocPage({
    title: "Badge",
    description: "Compact status labels and counters.",
    preview: <BadgeVariantsPreview />,
  });
}

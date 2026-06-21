import { componentDocPage } from "@/components/visionary/componentDocPage";
import { ChipVariantsPreview } from "@/components/visionary/DisplayDocPreview";

export default function ChipPage() {
  return componentDocPage({
    title: "Chip",
    description: "Filter and choice chips with selected state.",
    preview: <ChipVariantsPreview />,
  });
}

import { componentDocPage } from "@/components/visionary/componentDocPage";
import { EmptyStateVariantsPreview } from "@/components/visionary/DisplayDocPreview";

export default function EmptyStatePage() {
  return componentDocPage({
    title: "Empty state",
    description: "Placeholder when no data or results exist.",
    preview: <EmptyStateVariantsPreview />,
  });
}

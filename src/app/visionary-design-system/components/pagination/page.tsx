import { componentDocPage } from "@/components/visionary/componentDocPage";
import { PaginationVariantsPreview } from "@/components/visionary/DisplayDocPreview";

export default function PaginationPage() {
  return componentDocPage({
    title: "Pagination",
    description: "Page navigation for long result sets.",
    preview: <PaginationVariantsPreview />,
  });
}

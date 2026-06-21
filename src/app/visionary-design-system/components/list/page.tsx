import { componentDocPage } from "@/components/visionary/componentDocPage";
import { ListVariantsPreview } from "@/components/visionary/DisplayDocPreview";

export default function ListPage() {
  return componentDocPage({
    title: "List",
    description: "Stacked content rows with optional metadata.",
    preview: <ListVariantsPreview />,
    sectionTitle: "Layouts",
  });
}

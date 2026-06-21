import { componentDocPage } from "@/components/visionary/componentDocPage";
import { TableVariantsPreview } from "@/components/visionary/DisplayDocPreview";

export default function TablePage() {
  return componentDocPage({
    title: "Table",
    description: "Tabular data with header and row styling.",
    preview: <TableVariantsPreview />,
  });
}

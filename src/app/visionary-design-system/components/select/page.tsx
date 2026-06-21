import { componentDocPage } from "@/components/visionary/componentDocPage";
import { SelectVariantsPreview } from "@/components/visionary/FormControlsDocPreview";

export default function SelectPage() {
  return componentDocPage({
    title: "Select",
    description: "Single-choice dropdown fields with label and value states.",
    preview: <SelectVariantsPreview />,
  });
}

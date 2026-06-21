import { componentDocPage } from "@/components/visionary/componentDocPage";
import { CheckboxVariantsPreview } from "@/components/visionary/FormControlsDocPreview";

export default function CheckboxPage() {
  return componentDocPage({
    title: "Checkbox",
    description: "Binary and multi-select form controls with labels.",
    preview: <CheckboxVariantsPreview />,
  });
}

import { componentDocPage } from "@/components/visionary/componentDocPage";
import { RadioVariantsPreview } from "@/components/visionary/FormControlsDocPreview";

export default function RadioPage() {
  return componentDocPage({
    title: "Radio",
    description: "Single selection within a mutually exclusive group.",
    preview: <RadioVariantsPreview />,
  });
}

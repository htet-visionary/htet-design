import { componentDocPage } from "@/components/visionary/componentDocPage";
import { SwitchVariantsPreview } from "@/components/visionary/FormControlsDocPreview";

export default function SwitchPage() {
  return componentDocPage({
    title: "Switch",
    description: "Toggle controls for immediate on/off settings.",
    preview: <SwitchVariantsPreview />,
  });
}

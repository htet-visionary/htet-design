import { componentDocPage } from "@/components/visionary/componentDocPage";
import { TextareaVariantsPreview } from "@/components/visionary/FormControlsDocPreview";

export default function TextareaPage() {
  return componentDocPage({
    title: "Textarea",
    description: "Multi-line text fields for longer form content.",
    preview: <TextareaVariantsPreview />,
  });
}
